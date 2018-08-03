import {
  Prisma,
  RunUpdateManyWithoutBenchmarkQueryInput,
  RunCreateManyWithoutBenchmarkQueryInput,
  Connector,
  ImportFileSize
} from "./binding";

const prismaServer = "https://benchmark-results_prisma-internal.prisma.sh";
const resultStorageEndpoint = prismaServer + "/benchmark/dev";
const resultStorage = new Prisma({
  endpoint: resultStorageEndpoint
});

export async function createBenchmarkingSession(queriesToRun: number) {
  return await resultStorage.mutation.createBenchmarkingSession({
    data: {
      queriesToRun: queriesToRun,
      queriesRun: 0,
      started: new Date()
    }
  });
}

export async function incrementQueriesRun(sessionId: string) {
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

export async function markSessionAsFinished(sessionId: string) {
  return await resultStorage.mutation.updateBenchmarkingSession({
    where: {
      id: sessionId
    },
    data: {
      finished: new Date()
    }
  });
}

export async function ensureVersionExists(name: string) {
  return await resultStorage.mutation.upsertVersion({
    where: { name: name },
    create: { name: name },
    update: {}
  });
}

export interface BenchmarkResult {
  rps: number;
  successes: number;
  failures: number;
  avg: number;
  p50: number;
  p95: number;
  p99: number;
  cpuLoad: number;
  cpuCount: number;
}

export async function storeBenchmarkResults(
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

  const nestedCreateRun: RunUpdateManyWithoutBenchmarkQueryInput | RunCreateManyWithoutBenchmarkQueryInput = {
    create: [
      {
        connector: connector as Connector,
        startedAt: startedAt,
        finishedAt: finishedAt,
        version: {
          connect: {
            name: version
          }
        },
        commit: commit,
        importFile: getImportFileSize(importFile),
        latencies: {
          create: results
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
  await resultStorage.mutation.upsertBenchmarkedQuery(data);
}

function getImportFileSize(importFile: number): ImportFileSize {
  if (importFile == 1000) {
    return "Import1000Nodes";
  } else if (importFile == 10000) {
    return "Import10000Nodes";
  } else {
    throw new Error(`import file size ${importFile} is not valid`);
  }
}
