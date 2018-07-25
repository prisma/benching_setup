import { writeFileSync } from "fs";
import { execSync } from "child_process";

export interface VegetaResult {
  latencies: VegetaLantencies;
  status_codes: Map<string, number>;
}

interface VegetaLantencies {
  total: number;
  mean: number;
  "50th": number;
  "95th": number;
  "99th": number;
  max: number;
}

export function runVegeta(url, graphqlQueryAsString, rps, duration): VegetaResult {
  const graphqlQuery = {
    query: graphqlQueryAsString
  };

  writeFileSync("body.json", JSON.stringify(graphqlQuery));
  const attack = `
        POST ${url}
        Content-Type: application/json
        @body.json
      `;
  const result = execSync(
    `vegeta attack -rate=${Math.round(rps)} -duration="${duration}s" -timeout="10s" | vegeta report -reporter=json`,
    { input: attack }
  ).toString();
  const vegetaResult: VegetaResult = JSON.parse(result);

  // vegeta is measuring in nano seconds. Therefore we convert to milli seconds.
  for (const key of ["mean", "50th", "95th", "99th", "max"]) {
    vegetaResult.latencies[key] /= 1000000;
  }
  console.log(vegetaResult);

  return vegetaResult;
}
