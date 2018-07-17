const testFolder = "./benchmark/querycollection";
import { readFileSync, writeFileSync } from "fs";
import { walkSync } from "walk";
import { basename } from "path";
import { execSync } from "child_process";
import {
  Prisma,
  TestRunUpdateManyInput,
  TestRunCreateManyInput,
  Connector
} from "./binding";

const prismaServer = "https://benchmark-results_prisma-internal.prisma.sh";
const resultStorageEndpoint = prismaServer + "/benchmark/dev";
const benchmarkedServer = "http://localhost:4466";

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
    warmup_duration: 3,
    // rps: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    rps: [100, 200]
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
  const connector = args[0];
  const testToRun = args[1];
  if (connector == null) {
    console.log("You must provide the connector as the first argument");
    process.exit();
  }
  if (testToRun == null || testToRun === "all") {
    console.log("running all tests");
    for (const queryFile of queryFiles) {
      await benchMarkQuery(connector, queryFile);
    }
  } else {
    console.log("running one test");
    const queryFile = getQueryFileForName(args[0]);
    await benchMarkQuery(connector, queryFile);
  }
}

function getQueryFileForName(name) {
  const queryFiles = getQueryFiles();
  const matches = queryFiles.filter(queryFile =>
    queryFile.filePath.includes(name)
  );
  if (matches.length > 1) {
    throw new Error(
      "more than one test matched the given name. Provide a non ambiguous name."
    );
  }
  return queryFiles[0];
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
  connector: string,
  query: QueryFile
): Promise<void> {
  const config = benchmarkConfigs[query.speed];
  const graphqlQuery = readFileSync(query.filePath, { encoding: "utf-8" });
  const url = benchmarkedServer;

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

  const serverInfo = await getServerInfo();
  await new Promise(r => setTimeout(r, 10000)); // give the service a bit of time to recover

  const results: BenchmarkResult[] = [];
  console.log(`----------------- Benching: ${query.name} -----------------`);
  for (const rps of config.rps) {
    console.log(`${rps} req/s`);
    const vegetaResult = runVegeta(url, graphqlQuery, rps, 3);
    results.push({
      rps: rps,
      vegetaResult: vegetaResult
    });
  }

  await storeBenchmarkResults(
    connector,
    serverInfo.version,
    serverInfo.commit,
    query.name,
    graphqlQuery,
    results
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
  // console.log(vegetaResult);

  return vegetaResult;
}

async function storeBenchmarkResults(
  connector: string,
  version: string,
  commit: string,
  queryName: string,
  query: string,
  results: BenchmarkResult[]
): Promise<void> {
  console.log(`storing ${results.length} results`);
  const prisma = new Prisma({
    endpoint: resultStorageEndpoint
  });
  const latencies = results.map(result => {
    const failures = Object.keys(result.vegetaResult.status_codes).reduce(
      (accumulator, statusCode) => {
        if (statusCode != "200") {
          let value = result.vegetaResult.status_codes[statusCode];
          return value + accumulator;
        } else {
          return accumulator;
        }
      },
      0
    );
    return {
      rps: result.rps,
      median: result.vegetaResult.latencies.mean,
      p95: result.vegetaResult.latencies["95th"],
      p99: result.vegetaResult.latencies["99th"],
      failures: failures,
      successes: result.vegetaResult.status_codes["200"]
    };
  });
  const nestedCreateRun: TestRunUpdateManyInput | TestRunCreateManyInput = {
    create: [
      {
        connector: connector as Connector,
        date: new Date(),
        version: version,
        commit: commit,
        latencies: {
          create: latencies
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
  await prisma.mutation.upsertPerformanceTest(data);
}
