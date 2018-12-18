import { execSync } from "child_process";
import { QueryFile } from "./query_files";
import { getServerInfo, PrismaServerInfo } from "./server_info";
import { Connector } from "../result_storage/binding";

export interface PrismaConnector {
  name: string;
  serverInfo: PrismaServerInfo;
  dataModelFile: string;
  importData(size: number);
  supportsQuery(query: QueryFile): boolean;
  typeEnumForStorage: Connector;
}

export async function getActiveConnector(server: string): Promise<PrismaConnector> {
  const serverInfo = await getServerInfo(server);
  switch (serverInfo.primaryConnector) {
    case "mongo":
      return new MongoConnector(serverInfo);
    case "mysql":
      return new SqlConnector(serverInfo, "MySQL");
    case "postgres":
      return new SqlConnector(serverInfo, "Postgres");
    default:
      throw new Error(`The connector '${serverInfo.primaryConnector}' is not supported here.`);
  }
}

class MongoConnector implements PrismaConnector {
  dataModelFile: string = "datamodel_mongo.prisma";
  serverInfo: PrismaServerInfo;
  name: string;
  typeEnumForStorage = "MongoDB" as Connector;

  constructor(serverInfo: PrismaServerInfo) {
    this.serverInfo = serverInfo;
    this.name = serverInfo.primaryConnector;
  }

  importData(importFile: number) {
    execSync(
      `mongorestore --host=localhost --port=27017 --username=prisma --password=prisma --authenticationDatabase=admin --gzip --archive=import_data/mongo_${importFile}`,
      { stdio: "inherit" }
    );
  }

  supportsQuery(query: QueryFile): boolean {
    return !query.query.startsWith("#Ignore Document");
  }
}

class SqlConnector implements PrismaConnector {
  dataModelFile: string = "datamodel_sql.prisma";
  serverInfo: PrismaServerInfo;
  name: string;
  typeEnumForStorage: Connector;

  constructor(serverInfo: PrismaServerInfo, typeEnumForStorage: Connector) {
    this.serverInfo = serverInfo;
    this.name = serverInfo.primaryConnector;
    this.typeEnumForStorage = typeEnumForStorage;
  }

  importData(size: number) {
    execSync(`prisma import --data ./import_data/import_${size}.zip`, { stdio: "inherit" });
  }

  supportsQuery(query: QueryFile): boolean {
    return true;
  }
}
