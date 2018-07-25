import { createBenchmarkDroplet } from "../helpers/droplets";

main().catch(console.error);

async function main() {
  const args = process.argv.slice(2);
  if (args.length != 5) {
    console.log(
      "You must provide exactly 5 arguments. Usage: <connector> <version> <import-file> <test> <destroy-droplet>"
    );
    process.exit(1);
  }
  console.log("starting the droplet");
  const connector = args[0];
  const version = args[1];
  const importFile = Number(args[2]);
  const test = args[3];
  const destroyDroplet = args[4].toLowerCase() == "true";
  const droplet = await createBenchmarkDroplet(connector, version, importFile, test, destroyDroplet);
  console.log(`Droplet ID is: ${droplet.id}`);
}
