import { createCronDroplet } from "./droplets";

main().catch(console.error);

async function main() {
  console.log("starting the cron droplet");
  const droplet = await createCronDroplet();
  console.log(`Droplet ID is: ${droplet.id}`);
}
