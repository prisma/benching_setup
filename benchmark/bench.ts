const testFolder = "./benchmark/queries";
import { readFileSync, writeFileSync } from "fs";
import { loadavg, cpus } from "os";
import { walkSync } from "walk";
import { basename } from "path";
import { execSync } from "child_process";
import {
  Prisma,
  RunUpdateManyWithoutBenchmarkQueryInput,
  RunCreateManyWithoutBenchmarkQueryInput,
  Connector
} from "./binding";

const prismaServer = "https://benchmark-results_prisma-internal.prisma.sh";
const resultStorageEndpoint = prismaServer + "/benchmark/dev";
const resultStorage = new Prisma({
  endpoint: resultStorageEndpoint
});
const benchmarkedServer = "http://localhost:4466";
const benchmarkDuration = 60;

const benchmarkConfigs = {
  "very-slow": {
    warmup_rps: 20,
    warmup_duration: 1000,
    rps: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
  },
  slow: {
    warmup_rps: 50,
    warmup_duration: 500,
    rps: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
  },
  medium: {
    warmup_rps: 100,
    warmup_duration: 300,
    rps: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    // warmup_duration: 3,
    // rps: [100, 200]
  },
  fast: {
    warmup_rps: 150,
    warmup_duration: 200,
    rps: [250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500]
  },
  "very-fast": {
    warmup_rps: 150,
    warmup_duration: 200,
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
  const serverInfo = await getServerInfo();
  const importFileSize = await getImportFileSize();

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

function getQueryFileForName(name) {
  const queryFiles = getQueryFiles();
  const matches = queryFiles.filter(queryFile => queryFile.name == name);
  if (matches.length > 1) {
    throw new Error("more than one test matched the given name. Provide a non ambiguous name.");
  }
  return matches[0];
}

interface PrismaServerInfo {
  version: string;
  commit: string;
}
async function getServerInfo(): Promise<PrismaServerInfo> {
  const query = `
  {
    serverInfo {
      version
      commit
    }
  }
  `;
  const managementEndpoint = benchmarkedServer + "/management";
  return await fetch(managementEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: query })
  })
    .then(res => res.json())
    .then(json => json["data"]["serverInfo"]);
}

async function getImportFileSize(): Promise<number> {
  const query = `
    {
      artistsConnection {
        aggregate {
          count
        }
      }
    }
  `;
  const response = await fetch(benchmarkedServer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: query })
  });
  const json = await response.json();
  return json["data"]["artistsConnection"]["aggregate"]["count"] as number;
}

async function createBenchmarkingSession(queriesToRun: number) {
  return await resultStorage.mutation.createBenchmarkingSession({
    data: {
      queriesToRun: queriesToRun,
      queriesRun: 0,
      started: new Date()
    }
  });
}

async function incrementQueriesRun(sessionId: string) {
  var currentCount = await resultStorage.query.benchmarkingSession({
    where: { id: sessionId }
  });
  return await resultStorage.mutation.updateBenchmarkingSession({
    where: {
      id: sessionId
    },
    data: {
      queriesRun: currentCount!.queriesRun + 1
    }
  });
}

async function markSessionAsFinished(sessionId: string) {
  return await resultStorage.mutation.updateBenchmarkingSession({
    where: {
      id: sessionId
    },
    data: {
      finished: new Date()
    }
  });
}

interface QueryFile {
  name: string;
  speed: string;
  filePath: string;
}

function getQueryFiles(): QueryFile[] {
  const queryFiles: QueryFile[] = [];

  const options = {
    listeners: {
      file: function(root, fileStats, next) {
        // console.log(fileStats.name);
        if (fileStats.name.endsWith(".graphql")) {
          // console.log(root)
          // console.log(fileStats.name);
          const fileName = basename(fileStats.name, ".graphql");
          const parts = fileName.split("_");
          const query = {
            name: parts[parts.length - 2],
            speed: parts[parts.length - 1],
            filePath: root + "/" + fileStats.name
          };
          queryFiles.push(query);
        }
        next();
      },
      errors: function(_0, _1, next) {
        console.log("error");
        console.log(_1);
        next();
      }
    }
  };

  walkSync(testFolder, options);
  return queryFiles;
}

interface BenchmarkResult {
  rps: number;
  vegetaResult: VegetaResult;
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
  console.log("");
  console.log("");
  console.log(
    `----------------- Warmup: ${query.name} ${url} ${config.warmup_rps}Req/s ${
      config.warmup_duration
    }s -----------------`
  );
  console.log("");
  console.log(graphqlQuery);
  runVegeta(url, graphqlQuery, config.warmup_rps, config.warmup_duration);

  await new Promise(r => setTimeout(r, 10000)); // give the service a bit of time to recover

  const results: BenchmarkResult[] = [];
  var cpuTresholdReached = false;
  for (const rps of config.rps) {
    console.log(`----------------- Benching: ${query.name} at ${rps} req/s -----------------`);
    if (!cpuTresholdReached) {
      const vegetaResult = runVegeta(url, graphqlQuery, rps, benchmarkDuration);
      results.push({
        rps: rps,
        vegetaResult: vegetaResult
      });

      const loadLastMinute = loadavg()[0];
      const numberOfCpus = cpus().length;
      cpuTresholdReached = loadLastMinute > numberOfCpus;
      console.log(loadLastMinute, numberOfCpus);
      if (cpuTresholdReached) {
        console.log(`CPU treshold reached. Load was: ${loadLastMinute}`);
      }
    } else {
      console.log(`Skipping ${rps} req/s because CPU treshold was reached.`);
    }
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

interface VegetaResult {
  latencies: VegetaLantencies;
  status_codes: Map<string, number>;
}

interface VegetaLantencies {
  total: number;
  mean: number;
  "50th": number;
  "95th": number;
  "99th": number;
  max: number;
}

function runVegeta(url, graphqlQueryAsString, rps, duration): VegetaResult {
  const graphqlQuery = {
    query: graphqlQueryAsString
  };

  writeFileSync("body.json", JSON.stringify(graphqlQuery));
  const attack = `
      POST ${url}
      Content-Type: application/json
      @body.json
    `;
  const result = execSync(
    `vegeta attack -rate=${rps} -duration="${duration}s" -timeout="10s" | vegeta report -reporter=json`,
    { input: attack }
  ).toString();
  const vegetaResult: VegetaResult = JSON.parse(result);

  // vegeta is measuring in nano seconds
  for (const key of ["mean", "50th", "95th", "99th", "max"]) {
    vegetaResult.latencies[key] /= 1000000;
  }
  console.log(vegetaResult);

  return vegetaResult;
}

async function storeBenchmarkResults(
  sessionId: string,
  connector: string,
  version: string,
  commit: string,
  importFile: number,
  queryName: string,
  query: string,
  results: BenchmarkResult[],
  startedAt: Date,
  finishedAt: Date
): Promise<void> {
  console.log(`storing ${results.length} results`);
  const latencies = results.map(result => {
    const failures = Object.keys(result.vegetaResult.status_codes).reduce((accumulator, statusCode) => {
      if (statusCode != "200") {
        let value = result.vegetaResult.status_codes[statusCode];
        return value + accumulator;
      } else {
        return accumulator;
      }
    }, 0);
    return {
      rps: result.rps,
      avg: result.vegetaResult.latencies.mean,
      p50: result.vegetaResult.latencies["50th"],
      p95: result.vegetaResult.latencies["95th"],
      p99: result.vegetaResult.latencies["99th"],
      failures: failures,
      successes: result.vegetaResult.status_codes["200"]
    };
  });

  const nestedCreateRun: RunUpdateManyWithoutBenchmarkQueryInput | RunCreateManyWithoutBenchmarkQueryInput = {
    create: [
      {
        connector: connector as Connector,
        startedAt: startedAt,
        finishedAt: finishedAt,
        version: version,
        commit: commit,
        importFile: importFile,
        latencies: {
          create: latencies
        },
        session: {
          connect: {
            id: sessionId
          }
        }
      }
    ]
  };
  const data = {
    where: { name: queryName },
    update: {
      runs: nestedCreateRun
    },
    create: {
      name: queryName,
      query: query,
      runs: nestedCreateRun
    }
  };
  // console.log(JSON.stringify(data, null, 2));
  await resultStorage.mutation.upsertBenchmarkedQuery(data);
}
