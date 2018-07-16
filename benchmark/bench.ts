const testFolder = "./querycollection";
import sleep from "sleep";
import fs from "fs";
import walk from "walk";
import path from "path";
import { execSync } from "child_process";
import { Prisma } from "./binding";

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
    rps: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
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
debugger;

const args = process.argv.slice(2);
const queryFiles = getQueryFiles();
if (args.length == 0) {
  console.log("running all tests");
  for (const queryFile of queryFiles) {
    benchMarkQuery(queryFile);
  }
} else {
  console.log("running one test");
  const queryFile = getQueryFileForName(args[0]);
  benchMarkQuery(queryFile);
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
        if (fileStats.name.endsWith(".graphql")) {
          // console.log(root)
          // console.log(fileStats.name)
          const fileName = path.basename(fileStats.name, ".graphql");
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
        next();
      }
    }
  };

  walk.walkSync(testFolder, options);
  return queryFiles;
}

function benchMarkQuery(query): void {
  const config = benchmarkConfigs[query.speed];

  const url = "http://localhost:4466";
  const graphqlQuery = fs.readFileSync(query.filePath, { encoding: "utf-8" });

  console.log("");
  console.log("");
  console.log(
    `----------------- Warmup: ${query.name} $PROGRAM_DIR ${url} ${
      config.warmup_rps
    }Req/s ${config.warmup_duration}s -----------------`
  );
  console.log("");
  console.log(graphqlQuery);
  runVegeta(url, graphqlQuery, config.warmup_rps, config.warmup_duration);

  sleep.sleep(15); // give the service a bit of time to recover

  console.log("----------------- Benching: $BENCH_NAME -----------------");
  for (const rps of config.rps) {
    console.log(`${rps} req/s`);
    runVegeta(url, graphqlQuery, rps, 60);
  }
}

function runVegeta(url, graphqlQueryAsString, rps, duration): void {
  const graphqlQuery = {
    query: graphqlQueryAsString
  };
  const attack = `
      POST ${url}
      Content-Type: application/json
      ${JSON.stringify(graphqlQuery)}
    `;
  const result = execSync(
    `vegeta attack -rate=${rps} -duration="${duration}s" -timeout="10s" | vegeta report -reporter=json`,
    { input: attack }
  ).toString();
  //   const json = JSON.parse(result);
  console.log(result);

  const prisma = new Prisma({
    endpoint: "https://eu1.prisma.sh/mavilein-089a7b/result_storage/dev"
  });
  console.log(prisma);

  // prisma.mutation.upsert();
}
