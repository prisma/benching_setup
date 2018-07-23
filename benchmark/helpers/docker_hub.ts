const fetch = require("node-fetch");

interface DockerTagsResult {
  results: DockerTag[];
}
interface DockerTag {
  name: string;
}

export async function getLatestVersionFromDockerHub(): Promise<string> {
  const response = await fetch("https://registry.hub.docker.com/v2/repositories/prismagraphql/prisma/tags/");
  const result: DockerTagsResult = await response.json();
  const nonHerokuTags = result.results.filter(r => !r.name.includes("heroku"));
  return nonHerokuTags[0].name;
}
