
# Testing Program


# Test Candidates

| Version        | Database           |
| ------------- |:-------------:|
| 1.8     | Postgres |
| 1.8      | SQL      |
| 1.9     | Postgres |
| 1.9      | SQL      |
| 1.10     | Postgres |
| 1.10      | SQL      |
| 1.11     | Postgres |
| 1.11      | SQL      |
| 1.12     | Postgres |
| 1.12      | SQL      |

# Testing Program

We'll use the Chinook Schema 

```graphql
type Artist {
  id: ID! @unique
  ArtistId: Int! @unique
  Name: String!
  Albums: [Album!]!
}

type Album {
  id: ID! @unique
  AlbumId: Int! @unique
  Title: String!
  Artist: Artist!
  Tracks: [Track!]!
}

type Genre {
  id: ID! @unique
  GenreId: Int! @unique
  Name: String!
  Tracks: [Track!]!
}

type MediaType {
  id: ID! @unique
  MediaTypeId: Int! @unique
  Name: String!
  Tracks: [Track!]!
}

type Track {
  id: ID! @unique
  TrackId: Int! @unique
  Name: String!
  Album: Album!
  MediaType: MediaType!
  Genre: Genre!
  Composer: String
  Milliseconds: Int!
  Bytes: Int!
  UnitPrice: Float!
}

```

Using a ts skript we will generate a file with mutations to fill the dbs. We'll use Vegeta to fire these and record the results. See: https://thisdata.com/blog/load-testing-api-interfaces-with-go-and-vegeta/

We'll verify the successfull import using the connection queries to check for the correct cardinalities of the tables. 

Next we'll test queries again with Vegeta.

Last step is testing export and import with the cli, we'll validate file size of the exported zip and then again use the connection queries to check import results.

We'll then export all the results to a Prisma project to start gathering historical data.
export results to a prisma project

# Deploy
# Mutations
# Queries
# Import / Export 

# Prisma Project
