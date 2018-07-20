import { DigitalOcean } from "dots-wrapper";
import { readFileSync } from "fs";
import { IDroplet } from "../node_modules/dots-wrapper/src/lib/common/interfaces";

const token = process.env["DIGITAL_OCEAN_ACCESS_TOKEN"];
const digitalOcean = new DigitalOcean(token as string);

main().catch(console.error);

async function main() {
  const args = process.argv.slice(2);
  if (args.length != 4) {
    console.log("You must provide exactly 4 arguments. Usage: <connector> <version> <import-file> <test>");
    process.exit(1);
  }
  console.log("starting the droplet");
  const connector = args[0];
  const version = args[1];
  const importFile = Number(args[2]);
  const test = args[3];
  const droplet = await createBenchmarkDroplet(connector, version, importFile, test);
  console.log(`Droplet ID is: ${droplet.id}`);
}

async function createBenchmarkDroplet(
  connector: string,
  version: string,
  importFile: number,
  test: string
): Promise<IDroplet> {
  const cloudConfig = readFileSync("./droplet/cloud_config", { encoding: "utf-8" });
  console.log(cloudConfig);
  const sshKey = await getSSHKey();
  const droplet = await digitalOcean.Droplet.create({
    name: `benchmark-${connector}-${version}-${importFile}-${test}`,
    tags: [
      `connector:${connector}`,
      `version:${version.replace(".", "_")}`, // DO does not allow dots in tags. Therefore we are escaping it.
      `import:${importFile}`,
      `test:${test}`,
      `api_token:${token}`
    ],
    size: "8gb",
    region: "fra1",
    image: "docker-16-04",
    ssh_keys: [sshKey.fingerprint],
    user_data: cloudConfig
  }).toPromise();
  return droplet;
}

async function getSSHKey() {
  const keys = await digitalOcean.SSHKey.list(0).toPromise();
  return keys.items[0];
}
