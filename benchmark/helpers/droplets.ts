import { DigitalOcean } from "dots-wrapper";
import { readFileSync } from "fs";
import { IDroplet } from "../../node_modules/dots-wrapper/src/lib/common/interfaces";

const token = process.env["DIGITAL_OCEAN_ACCESS_TOKEN"];
const digitalOcean = new DigitalOcean(token as string);

export async function createBenchmarkDroplets(version: string): Promise<void> {
  const connectors = ["postgres", "mysql", "mongo"];
  const importFiles = [1000, 10000];
  const test = "all";

  for (const connector of connectors) {
    for (const importFile of importFiles) {
      await createBenchmarkDroplet(connector, version, importFile, test, true);
    }
  }
}

export async function createBenchmarkDroplet(
  connector: string,
  version: string,
  importFile: number,
  test: string,
  destroyDroplet: boolean
): Promise<IDroplet> {
  const cloudConfig = readFileSync("./droplet/benchmark_cloud_config_template", { encoding: "utf-8" })
    .replace("$CONNECTOR", connector)
    .replace("$VERSION", version)
    .replace("$IMPORT_FILE", importFile.toString())
    .replace("$TEST", test)
    .replace("$API_TOKEN", destroyDroplet ? token! : "");
  const sshKey = await getSSHKey();
  const droplet = await digitalOcean.Droplet.create({
    name: `benchmark-${connector}-${version}-${importFile}-${test}`,
    tags: [
      `connector:${connector}`,
      `version:${version.replace(".", "_")}`, // DO does not allow dots in tags. Therefore we are escaping it.
      `import:${importFile}`,
      `test:${test}`
    ],
    size: "8gb",
    region: "fra1",
    image: "docker-18-04",
    ssh_keys: [sshKey.fingerprint],
    user_data: cloudConfig
  }).toPromise();
  return droplet;
}

export async function createCronDroplet(): Promise<IDroplet> {
  const cloudConfig = readFileSync("./droplet/cron_cloud_config", { encoding: "utf-8" });
  const sshKey = await getSSHKey();
  const droplet = await digitalOcean.Droplet.create({
    name: `benchmark-cronjob`,
    tags: [`api_token:${token}`],
    size: "1gb",
    region: "fra1",
    image: "docker-18-04",
    ssh_keys: [sshKey.fingerprint],
    user_data: cloudConfig
  }).toPromise();
  return droplet;
}

async function getSSHKey() {
  const keys = await digitalOcean.SSHKey.list(0).toPromise();
  return keys.items[0];
}
