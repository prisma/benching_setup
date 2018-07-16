import { random, range, groupBy } from "lodash";
import * as pMap from "p-map";
import fetch from "node-fetch";

interface Options {
  endpoint: string;
  totalCount: number;
  batchSize?: number;
  concurrency?: number;
  genreCount?: number;
  mediaCount?: number;
}

class Client {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  async request(queries: string[] | string) {
    const q = Array.isArray(queries) ? queries : [queries];
    await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(q.map(query => ({ query })))
    }).then(res => res.json());
  }
}

export async function fill(options: Options) {
  const mergedOptions = {
    genreCount: 100,
    mediaCount: 100,
    concurrency: 1,
    batchSize: 1,
    ...options
  };
  const {
    endpoint,
    genreCount,
    mediaCount,
    totalCount,
    concurrency,
    batchSize
  } = mergedOptions;

  const client = new Client(endpoint);

  console.log(`Creating ${genreCount} genres`);
  await createGenres(client, genreCount);

  console.log(`Creating ${mediaCount} mediaTypes`);
  await createMediaTypes(client, mediaCount);

  console.log(`Creating ${totalCount} content`);
  await createContent({
    client,
    mediaCount,
    totalCount,
    genreCount,
    concurrency,
    batchSize
  });
}

function createGenres(client: Client, n = 1) {
  let query = `mutation createGenres {`;

  for (let i = 1; i <= n; i++) {
    query += `\n  _${i}: createGenre(data: { GenreId: ${i}, Name: "genre${i}"}) { id }`;
  }

  query += "\n}";

  return client.request(query);
}

function createMediaTypes(client: Client, n = 1) {
  let query = `mutation createMediaTypes {`;

  for (let i = 1; i <= n; i++) {
    query += `\n  _${i}: createMediaType(data: { MediaTypeId: ${i}, Name: "mediaType${i}"}) { id }`;
  }

  query += "\n}";

  return client.request(query);
}

let trackCounter = 1;

interface ContentOptions {
  client: Client;
  mediaCount: number;
  genreCount: number;
  totalCount: number;
  concurrency: number;
  batchSize: number;
}

let albumCounter = 1;
async function createContent({
  client,
  mediaCount,
  totalCount,
  genreCount,
  concurrency,
  batchSize
}: ContentOptions) {
  const items = groupBy(
    range(1, totalCount + 1),
    a => a % Math.ceil(totalCount / batchSize)
  );
  await pMap(
    Object.keys(items),
    async i => {
      let before = Date.now();
      const queries = items[i].map(batch => {
        const mediaId = random(1, mediaCount);
        const genreId = random(1, genreCount);
        const albums = range(5)
          .map(_ =>
            makeAlbum({
              genreId,
              mediaId,
              albumId: albumCounter++,
              artistId: batch
            })
          )
          .join(",");
        return `
      mutation createContent {
        createArtist(
          data: {
            ArtistId: ${batch}
            Name: "artist${batch}"
            Albums: {
              create: [
                ${albums}
              ]
            }
          }
      ) {
        id
      } 
    }
    `;
      });

      await client.request(queries);
      console.log(
        `Done with content ${items[i].join(", ")} in ${Date.now() - before}ms`
      );
    },
    { concurrency }
  );
}

function makeAlbum({ genreId, mediaId, albumId, artistId }) {
  const tracks = range(20)
    .map(
      _ => `
                {
                  TrackId: ${++trackCounter}
                  Name: "track${trackCounter}"
                  Composer: "track${trackCounter}composer"
                  Milliseconds: ${random(100000, 1000000)}
                  Bytes: ${random(1000000, 5000000)}
                  UnitPrice: ${parseFloat(random(0.5, 5).toFixed(2))}
                  Genre: { connect: { GenreId: ${genreId} } }
                  MediaType: { connect: { MediaTypeId: ${mediaId} } }
                }`
    )
    .join(",\n");

  return `{
            AlbumId: ${albumId}
            Title: "artist${artistId}album${albumId}"
            Tracks: {
              create: [
                ${tracks}
              ]
            }
          }`;
}
