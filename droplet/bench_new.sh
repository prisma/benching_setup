#!/bin/bash
set -e
CONNECTOR="${1:?Provide the connector you want to use for this test run}"
PRISMA_VERSION="${2:?Provide the Prisma version you want to use for this test run}"
# IMPORT_FILE=$3
ID=$3
if [ -z "${ID}" ]; then
    echo "No Droplet ID provided. Will create a new Droplet."
    ID=`doctl compute droplet create perf-test-base-snapshot --no-header --format "ID" --wait --size 1gb --region fra1 --image 30970148 --ssh-keys f9:60:c8:4e:27:83:ec:59:b9:bb:a6:20:9f:2e:2d:3b`
fi
echo "ID is $ID"
IP=`doctl compute droplet get $ID --no-header --format="PublicIPv4"`
echo "IP is $IP"
echo "Uploading the required setup script"
rsync -av --progress ../setup_scripts/prisma-server root@$IP:.
echo "Starting the Prisma Server"
ssh root@$IP "cd prisma-server && ./start.sh $CONNECTOR $PRISMA_VERSION"
# if [ -n "${IMPORT_FILE}" ]; then
#     echo "Resetting the data of the Prisma server"
#     ssh root@$IP "docker run --net=host prismagraphql/benchmarks:latest reset-server $IMPORT_FILE"  
# fi
echo "Starting the Benchmark..."
ssh root@$IP "docker run --net=host prismagraphql/benchmarks:latest bench-server $CONNECTOR"  

# echo "Deleting Droplet"
# doctl compute droplet delete --force $ID