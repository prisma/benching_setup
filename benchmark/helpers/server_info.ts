const fetch = require("node-fetch");

export interface PrismaServerInfo {
  version: string;
  commit: string;
  primaryConnector: string;
}
export async function getServerInfo(server: string): Promise<PrismaServerInfo> {
  const query = `
    {
      serverInfo {
        version
        commit
        primaryConnector
      }
    }
    `;
  const managementEndpoint = server + "/management";
  const json = await graphQlRequest(managementEndpoint, query);
  return json["data"]["serverInfo"];
}

export async function getImportFileSize(server: string): Promise<number> {
  const query = `
      {
        artistsConnection {
          aggregate {
            count
          }
        }
      }
    `;
  const json = await graphQlRequest(server, query);
  return json["data"]["artistsConnection"]["aggregate"]["count"] as number;
}

async function graphQlRequest(url: string, query: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: query })
  });
  const json = await response.json();
  return json;
}
