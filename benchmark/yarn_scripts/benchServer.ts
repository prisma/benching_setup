import { warmupAndBenchmark } from "../helpers/bench";
import { getQueryFileForName, getQueryFiles, QueryFile } from "../helpers/query_files";
import { getImportFileSize, getServerInfo, PrismaServerInfo } from "../helpers/server_info";
import { Connector } from "../result_storage/binding";
import {
  createBenchmarkingSession,
  ensureVersionExists,
  incrementQueriesRun,
  markSessionAsFinished,
  storeBenchmarkResults
} from "../result_storage/result_storage";
import { benchmarkedServer } from "./constants";
// IMPORTANT: warmup_duration must be a multiple of 30!
const benchmarkConfigs = {
  "very-slow": {
    warmup_duration: 900, // 15 minutes
    rps: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
  },
  slow: {
    warmup_duration: 480, // 8 minutes
    rps: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
  },
  medium: {
    warmup_duration: 300, // 5 minutes
    rps: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    // warmup_duration: 3,
    // rps: [100, 200]
  },
  fast: {
    warmup_duration: 300, // 5 minutes
    rps: [250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500]
  },
  "very-fast": {
    warmup_duration: 300, // 5 minutes
    rps: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
  }
};

main().catch(console.error);

async function main() {
  const args = process.argv.slice(2);
  const queryFiles = getQueryFiles();
  const connectorArg = args[0];
  const testToRun = args[1];
  if (connectorArg == null) {
    console.log("You must provide the connector as the first argument");
    process.exit();
  }
  const connector = getConnectorForArg(connectorArg);
  const serverInfo = await getServerInfo(benchmarkedServer);
  await ensureVersionExists(serverInfo.version);
  const importFileSize = await getImportFileSize(benchmarkedServer);

  if (testToRun == null || testToRun === "all") {
    const benchmarkingSession = await createBenchmarkingSession(queryFiles.length);
    for (const queryFile of queryFiles) {
      await benchmarkAndStoreResults(benchmarkingSession.id, connector, queryFile, serverInfo, importFileSize);
      await incrementQueriesRun(benchmarkingSession.id);
    }
    await markSessionAsFinished(benchmarkingSession.id);
  } else {
    console.log("running one test");
    const benchmarkingSession = await createBenchmarkingSession(1);
    const queryFile = getQueryFileForName(testToRun);
    await benchmarkAndStoreResults(benchmarkingSession.id, connector, queryFile, serverInfo, importFileSize);
    await incrementQueriesRun(benchmarkingSession.id);
    await markSessionAsFinished(benchmarkingSession.id);
  }
}

function getConnectorForArg(connectorArg: string): Connector {
  switch (connectorArg) {
    case "postgres":
      return "Postgres";
    case "mysql":
      return "MySQL";
    default:
      throw new Error(`${connectorArg} is not supported`);
  }
}

async function benchmarkAndStoreResults(
  sessionId: string,
  connector: string,
  query: QueryFile,
  serverInfo: PrismaServerInfo,
  importFile: number
): Promise<void> {
  const config = benchmarkConfigs[query.speed];
  const result = await warmupAndBenchmark(benchmarkedServer, query, config.warmup_duration, config.rps);

  await storeBenchmarkResults(
    sessionId,
    connector,
    serverInfo.version,
    serverInfo.commit,
    importFile,
    query.name,
    result.graphqlQuery,
    result.results,
    result.startedAt,
    result.finishedAt
  );
}
