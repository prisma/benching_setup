import { readFileSync } from "fs";
import { cpus, loadavg } from "os";
import { BenchmarkResult } from "../result_storage/result_storage";
import { QueryFile } from "./query_files";
import { runVegeta, VegetaResult } from "./vegeta";

const benchmarkDuration = 60;

export interface BenchmarkQueryResult {
  startedAt: Date;
  finishedAt: Date;
  graphqlQuery: string;
  results: BenchmarkResult[];
}

export async function warmupAndBenchmark(
  benchmarkedServer: string,
  query: QueryFile,
  warmupDuration: number,
  rpses: number[]
): Promise<BenchmarkQueryResult> {
  const graphqlQuery = readFileSync(query.filePath, { encoding: "utf-8" });
  const startedAt = new Date();
  await warmup(benchmarkedServer, query, warmupDuration, rpses);
  const results: BenchmarkResult[] = await benchmark(benchmarkedServer, query, rpses);
  const finishedAt = new Date();

  return {
    startedAt: startedAt,
    finishedAt: finishedAt,
    graphqlQuery: graphqlQuery,
    results: results
  };
}

export async function warmup(
  benchmarkedServer: string,
  query: QueryFile,
  warmupDuration: number,
  rpses: number[]
): Promise<boolean> {
  const graphqlQuery = query.query;
  const fullPath = benchmarkedServer + query.path();

  var warmupRps = rpses[0];
  console.log("");
  console.log("");
  console.log(
    `-------- Warmup: ${query.name} ${fullPath} warming up to ${warmupRps}req/s ${warmupDuration}s ---------`
  );
  const iterations = warmupDuration / 30;
  for (var i = 1; i <= iterations; i++) {
    const rps = (warmupRps / iterations) * i;
    const duration = 30;
    console.log(`Warm up step: ${rps}req/s for ${duration}s`);
    console.log(graphqlQuery);
    runVegeta(fullPath, graphqlQuery, rps, duration);
  }
  const cpuTresholdHasBeenReached = isCpuTresholdReached();

  // give the service a bit of time to recover
  if (cpuTresholdHasBeenReached) {
    await new Promise(r => setTimeout(r, 60000));
  } else {
    await new Promise(r => setTimeout(r, 10000));
  }

  return cpuTresholdHasBeenReached;
}

export function benchmark(benchmarkedServer: string, query: QueryFile, rpses: number[]): BenchmarkResult[] {
  const graphqlQuery = query.query;
  const fullPath = benchmarkedServer + query.path();
  const results: BenchmarkResult[] = [];
  for (const rps of rpses) {
    console.log(`----------------- Benching: ${query.name} at ${rps} req/s -----------------`);
    const vegetaResult = runVegeta(fullPath, graphqlQuery, rps, benchmarkDuration);
    results.push({
      rps: rps,
      successes: vegetaResult.status_codes["200"],
      failures: failures(vegetaResult),
      avg: vegetaResult.latencies.mean,
      p50: vegetaResult.latencies["50th"],
      p95: vegetaResult.latencies["95th"],
      p99: vegetaResult.latencies["99th"],
      cpuLoad: cpuLoad(),
      cpuCount: cpuCount()
    });
    if (isCpuTresholdReached()) {
      console.log(`CPU treshold reached. Skipping the remaining RPSes.`);
      break;
    }
  }

  return results;
}

function isCpuTresholdReached(): boolean {
  console.log(`CPU load is: ${cpuLoad()}`);
  return cpuLoad() > cpuCount() * 1.5;
}

function cpuLoad(): number {
  return loadavg()[0];
}

function cpuCount(): number {
  return cpus().length;
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
