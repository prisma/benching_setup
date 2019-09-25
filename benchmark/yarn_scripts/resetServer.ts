import { execSync } from "child_process";
import { benchmarkedServer } from "./constants";
import { getActiveConnector, PrismaConnector } from "../helpers/connectors";
import { chdir } from "process";

main().catch(console.error);

async function main() {
  const args = process.argv.slice(2);
  const importFile = args[0];
  if (importFile == null) {
    console.log("Please provide the import file to use. Valid values: 1000|10000");
    process.exit();
  }
  //const connector = await getActiveConnector(benchmarkedServer);
  //runPrismaDeploy(connector);
  //resetData();
  //importData(connector, importFile);
}

function runPrismaDeploy(connector: PrismaConnector) {
  chdir("setup_scripts/prisma-service");
  console.log(execSync(`cp ${connector.dataModelFile} datamodel.prisma`).toString());
  execSync(`prisma deploy --force --json`, { stdio: "inherit" });
}

function resetData() {
  const result = execSync(`prisma reset --force`).toString();
  console.log(result);
}

function importData(connector: PrismaConnector, importFile: string) {
  connector.importData(parseInt(importFile));
}
