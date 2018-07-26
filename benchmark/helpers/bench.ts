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
  var cpuTresholdHasBeenReached = await warmup(benchmarkedServer, query, warmupDuration, rpses);
  const results: BenchmarkResult[] = !cpuTresholdHasBeenReached ? await benchmark(benchmarkedServer, query, rpses) : [];
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
  const graphqlQuery = readFileSync(query.filePath, { encoding: "utf-8" });

  var cpuTresholdHasBeenReached = false;
  var warmupRps = rpses[0];
  console.log("");
  console.log("");
  console.log(
    `-------- Warmup: ${query.name} ${benchmarkedServer} warming up to ${warmupRps}req/s ${warmupDuration}s ---------`
  );
  const iterations = warmupDuration / 30;
  for (var i = 1; i <= iterations; i++) {
    if (cpuTresholdHasBeenReached) {
      console.log(`CPU treshold reached. Stopping the warmup.`);
      break;
    }
    const rps = (warmupRps / iterations) * i;
    const duration = 30;
    console.log(`Warm up step: ${rps}req/s for ${duration}s`);
    console.log(graphqlQuery);
    runVegeta(benchmarkedServer, graphqlQuery, rps, duration);
    cpuTresholdHasBeenReached = isCpuTresholdReached();
  }

  await new Promise(r => setTimeout(r, 10000)); // give the service a bit of time to recover

  return cpuTresholdHasBeenReached;
}

export function benchmark(benchmarkedServer: string, query: QueryFile, rpses: number[]): BenchmarkResult[] {
  const graphqlQuery = readFileSync(query.filePath, { encoding: "utf-8" });
  const results: BenchmarkResult[] = [];
  for (const rps of rpses) {
    if (isCpuTresholdReached()) {
      console.log(`CPU treshold reached. Skipping the remaining RPSes.`);
      break;
    }
    console.log(`----------------- Benching: ${query.name} at ${rps} req/s -----------------`);
    const vegetaResult = runVegeta(benchmarkedServer, graphqlQuery, rps, benchmarkDuration);
    results.push({
      rps: rps,
      successes: vegetaResult.status_codes["200"],
      failures: failures(vegetaResult),
      avg: vegetaResult.latencies.mean,
      p50: vegetaResult.latencies["50th"],
      p95: vegetaResult.latencies["95th"],
      p99: vegetaResult.latencies["99th"]
    });
  }

  return results;
}

function isCpuTresholdReached(): boolean {
  const loadLastMinute = loadavg()[0];
  const numberOfCpus = cpus().length;
  console.log(`CPU load is: ${loadLastMinute}`);
  return loadLastMinute > numberOfCpus * 1.5;
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
