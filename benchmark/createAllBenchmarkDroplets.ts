import { createBenchmarkDroplets } from "./droplets";
import { getLatestVersionFromDockerHub } from "./docker_hub";
const fetch = require("node-fetch");

main().catch(console.error);

async function main() {
  if (process.env["DIGITAL_OCEAN_ACCESS_TOKEN"] == undefined) {
    console.log("env var DIGITAL_OCEAN_ACCESS_TOKEN must bet set");
    process.exit(1);
  }
  const version = await getLatestVersionFromDockerHub();
  console.log(`Will benchmark version ${version}`);
  await createBenchmarkDroplets(version);
}
