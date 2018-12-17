import { execSync } from "child_process";
import { QueryFile } from "./query_files";
import { getServerInfo, PrismaServerInfo } from "./server_info";

export interface PrismaConnector {
  name: string;
  serverInfo: PrismaServerInfo;
  dataModelFile: string;
  importData(size: number);
  supportsQuery(query: QueryFile): boolean;
}

export async function getActiveConnector(server: string): Promise<PrismaConnector> {
  const serverInfo = await getServerInfo(server);
  switch (serverInfo.primaryConnector) {
    case "mongo":
      return new MongoConnector(serverInfo);
    case "mysql":
      return new SqlConnector(serverInfo);
    case "postgres":
      return new SqlConnector(serverInfo);
    default:
      throw new Error(`The connector '${serverInfo.primaryConnector}' is not supported here.`);
  }
}

class MongoConnector implements PrismaConnector {
  dataModelFile: string = "datamodel_mongo.prisma";
  serverInfo: PrismaServerInfo;
  name: string;

  constructor(serverInfo: PrismaServerInfo) {
    this.serverInfo = serverInfo;
    this.name = serverInfo.primaryConnector;
  }

  importData(importFile: number) {
    console.log("Mongo does not support import yet.");
    const result = execSync(
      `mongorestore --host=localhost --port=27017 --username=prisma --password=prisma --authenticationDatabase=admin --archive=import_data/mongo_${importFile}`
    ).toString();
    console.log(result);
  }

  supportsQuery(query: QueryFile): boolean {
    return !query.query.startsWith("#Ignore Document");
  }
}

class SqlConnector implements PrismaConnector {
  dataModelFile: string = "datamodel_sql.prisma";
  serverInfo: PrismaServerInfo;
  name: string;

  constructor(serverInfo: PrismaServerInfo) {
    this.serverInfo = serverInfo;
    this.name = serverInfo.primaryConnector;
  }

  importData(size: number) {
    const result = execSync(`prisma import --data ./import_data/${size}import.zip`).toString();
    console.log(result);
  }

  supportsQuery(query: QueryFile): boolean {
    return true;
  }
}
