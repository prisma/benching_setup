# performance-scripts

## Requirements

- Digital Ocean CLI is installed and set up. An API Token can be created [here](https://cloud.digitalocean.com/settings/api/tokens).
- The SSH Key `prisma_digital_ocean` is in your `~/.ssh` folder. This can be found in 1Password.

## Usage

### Benchmarking Locally

1.  Run `yarn start-server <connector>` to start a Prisma server (`localhost:4466`) with a corresponding database.
2.  Run `yarn reset-server <nodecount>` to deploy the schema for the performance test service, reset the data and import the test data. Node count must match the name of the import files in `setup_scripts/prisma-service/import_data`.
3.  Run `yarn bench-server <connector> <test>` to run the benchmarks against `localhost:4466`. The argument `test` is optional. If provided it runs this test only, otherwise all tests are performed.

### Benchmarking on a Droplet

Run `yarn start-droplet` to boot a droplet that automatically starts a server with the given connector and version. Then the test service is set up and test data is imported. Afterwards all benchmarks are performed. The droplet then deletes itself.

### Generating Test Data

```bash
yarn

# adjust scripts/bin.ts

prisma reset -f && yarn fill
```
