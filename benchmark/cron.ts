import { createBenchmarkDroplets } from "./droplets";
import { CronJob } from "cron";
const fetch = require("node-fetch");
// Runs Monday to Saturday at 19:00:00
const cron = new CronJob("00 05 20 * * 1-6", trigger, null, false, "Europe/Berlin");
// const cron = new CronJob("00 40 13 * * 1-6", trigger, null, false, "Europe/Berlin");

main().catch(console.error);

async function main() {
  console.log("cron started");
  if (process.env["DIGITAL_OCEAN_ACCESS_TOKEN"] == undefined) {
    console.log("env var DIGITAL_OCEAN_ACCESS_TOKEN must bet set");
    process.exit(1);
  }
  cron.start();
}

async function trigger() {
  console.log("Cron triggered. Will create the benchmark droplets now.");
  const version = await getLatestVersionFromDockerHub();
  console.log(`Will benchmark version ${version}`);
  await createBenchmarkDroplets(version);
}

interface DockerTagsResult {
  results: DockerTag[];
}
interface DockerTag {
  name: string;
}

async function getLatestVersionFromDockerHub(): Promise<string> {
  const response = await fetch("https://registry.hub.docker.com/v2/repositories/prismagraphql/prisma/tags/");
  const result: DockerTagsResult = await response.json();
  const nonHerokuTags = result.results.filter(r => !r.name.includes("heroku"));
  return nonHerokuTags[0].name;
}
