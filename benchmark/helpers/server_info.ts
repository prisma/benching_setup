const fetch = require("node-fetch");

export interface PrismaServerInfo {
  version: string;
  commit: string;
  primary_connector: string;
}
export async function getServerInfo(server: string): Promise<PrismaServerInfo> {
  const managementEndpoint = server + "/server_info"
  const response = await fetch(managementEndpoint, { method: "GET" })
  const json = await response.json()
  return json
}
