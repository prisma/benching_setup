import { readFileSync } from "fs";
import { cpus, loadavg } from "os";
import { getQueryFileForName, getQueryFiles, QueryFile } from "../helpers/query_files";
import { getImportFileSize, getServerInfo, PrismaServerInfo } from "../helpers/server_info";
import { runVegeta, VegetaResult } from "../helpers/vegeta";
import { Connector } from "../result_storage/binding";
import {
  BenchmarkResult,
  createBenchmarkingSession,
  incrementQueriesRun,
  markSessionAsFinished,
  storeBenchmarkResults,
  ensureVersionExists
} from "../result_storage/result_storage";

const benchmarkedServer = "http://localhost:4466";
const benchmarkDuration = 60;
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
      await benchMarkQuery(benchmarkingSession.id, connector, queryFile, serverInfo, importFileSize);
      await incrementQueriesRun(benchmarkingSession.id);
    }
    await markSessionAsFinished(benchmarkingSession.id);
  } else {
    console.log("running one test");
    const benchmarkingSession = await createBenchmarkingSession(1);
    const queryFile = getQueryFileForName(testToRun);
    await benchMarkQuery(benchmarkingSession.id, connector, queryFile, serverInfo, importFileSize);
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

async function benchMarkQuery(
  sessionId: string,
  connector: string,
  query: QueryFile,
  serverInfo: PrismaServerInfo,
  importFile: number
): Promise<void> {
  const config = benchmarkConfigs[query.speed];
  const graphqlQuery = readFileSync(query.filePath, { encoding: "utf-8" });
  const url = benchmarkedServer;

  const startedAt = new Date();
  var cpuTresholdHasBeenReached = false;
  var warmupRps = config.rps[0];
  console.log("");
  console.log("");
  console.log(
    `----------------- Warmup: ${query.name} ${url} warming up to ${warmupRps}req/s ${
      config.warmup_duration
    }s -----------------`
  );
  const iterations = config.warmup_duration / 30;
  for (var i = 1; i <= iterations; i++) {
    if (cpuTresholdHasBeenReached) {
      console.log(`CPU treshold reached. Stopping the warmup.`);
      break;
    }
    const rps = (warmupRps / iterations) * i;
    const duration = 30;
    console.log(`Warm up step: ${rps}req/s for ${duration}s`);
    console.log(graphqlQuery);
    runVegeta(url, graphqlQuery, rps, duration);
    cpuTresholdHasBeenReached = isCpuTresholdReached();
  }

  await new Promise(r => setTimeout(r, 10000)); // give the service a bit of time to recover

  const results: BenchmarkResult[] = [];
  for (const rps of config.rps) {
    if (cpuTresholdHasBeenReached) {
      console.log(`CPU treshold reached. Skipping the remaining RPSes.`);
      break;
    }
    console.log(`----------------- Benching: ${query.name} at ${rps} req/s -----------------`);
    const vegetaResult = runVegeta(url, graphqlQuery, rps, benchmarkDuration);
    results.push({
      rps: rps,
      successes: vegetaResult.status_codes["200"],
      failures: failures(vegetaResult),
      avg: vegetaResult.latencies.mean,
      p50: vegetaResult.latencies["50th"],
      p95: vegetaResult.latencies["95th"],
      p99: vegetaResult.latencies["99th"]
    });

    cpuTresholdHasBeenReached = isCpuTresholdReached();
  }
  const finishedAt = new Date();

  await storeBenchmarkResults(
    sessionId,
    connector,
    serverInfo.version,
    serverInfo.commit,
    importFile,
    query.name,
    graphqlQuery,
    results,
    startedAt,
    finishedAt
  );
}

function failures(vegetaResult: VegetaResult): number {
  return Object.keys(vegetaResult.status_codes).reduce((accumulator, statusCode) => {
    if (statusCode != "200") {
      let value = vegetaResult.status_codes[statusCode];
      return value + accumulator;
    } else {
      return accumulator;
    }
  }, 0);
}

function isCpuTresholdReached(): boolean {
  const loadLastMinute = loadavg()[0];
  const numberOfCpus = cpus().length;
  console.log(`CPU load is: ${loadLastMinute}`);
  return loadLastMinute > numberOfCpus * 1.5;
}
