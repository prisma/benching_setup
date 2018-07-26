import { warmup, benchmark } from "../helpers/bench";
import { startToProfileCpu, startToProfileMemory, stopToProfile } from "../helpers/profile";
import { getQueryFileForName } from "../helpers/query_files";
import { benchmarkedServer } from "./constants";

main().catch(console.error);

async function main() {
  const args = process.argv.slice(2);
  if (args.length != 3) {
    console.log("You must provide exactly 3 arguments. Usage: <query> <warmup time> <rps>");
    process.exit(1);
  }
  const testToRun = args[0];
  const warmupDuration = Number(args[1]);
  const rps = Number(args[2]);
  const queryFile = getQueryFileForName(testToRun);

  await warmup(benchmarkedServer, queryFile, warmupDuration, [rps]);
  startToProfileCpu();
  benchmark(benchmarkedServer, queryFile, [rps]);
  stopToProfile(`${queryFile.name}_CPU_${rps}`);

  startToProfileMemory();
  benchmark(benchmarkedServer, queryFile, [rps]);
  stopToProfile(`${queryFile.name}_Memory_${rps}`);
}
