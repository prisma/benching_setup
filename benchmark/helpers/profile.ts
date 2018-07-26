import { execSync, spawn, exec } from "child_process";
import { writeFileSync } from "fs";

const asyncProfilerPath = "/Applications/async-profiler";

export function startToProfileCpu() {
  console.log("profiling cpu");
  startToProfile("cpu");
}

export function startToProfileMemory() {
  console.log("profiling memory");
  startToProfile("alloc");
}

export function stopToProfile(name: string) {
  console.log("stoppping to profile");
  stopToProfileAndWriteFlamegraph(name);
}

function startToProfile(event: string) {
  return execSync(
    `cd ${asyncProfilerPath} && ./profiler.sh start -e ${event} $(jps | grep PrismaLocalMain | awk '{print $1}')`
  ).toString();
}

function stopToProfileAndWriteFlamegraph(name: string) {
  const profilerResult = execSync(
    `cd ${asyncProfilerPath} && ./profiler.sh stop -o collapsed $(jps | grep PrismaLocalMain | awk '{print $1}')`
  ).toString();
  if (profilerResult.length == 0) {
    console.log(`profiler result for ${name} was empty.`);
    return;
  }
  writeFileSync(name + ".result", profilerResult);

  const cleanedResult = profilerResult
    .split("\n")
    .filter(line => !line.includes("sun/misc/Unsafe"))
    .join("\n");

  const flameGraph = execSync(`cd ${asyncProfilerPath}/Flamegraph && ./flamegraph.pl`, {
    input: cleanedResult
  }).toString();
  writeFileSync(name + ".svg", flameGraph);
}
