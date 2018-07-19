#!/bin/bash
set -e
CONNECTOR="${1:?Provide the connector you want to use for this test run}"
PRISMA_VERSION="${2:?Provide the Prisma version you want to use for this test run}"
IMPORT_FILE=$3
# ID=$3
# if [ -z "${ID}" ]; then
#     echo "No Droplet ID provided. Will create a new Droplet."
#     ID=`doctl compute droplet create perf-test-$CONNECTOR --no-header --format "ID" --wait --size 1gb --region fra1 --image 30970148 --ssh-keys f9:60:c8:4e:27:83:ec:59:b9:bb:a6:20:9f:2e:2d:3b`
# fi
echo "Starting benchmark for args: $@"
which doctl
ID=`doctl compute droplet create perf-test-$CONNECTOR --no-header --format "ID" --wait --size 8gb --region fra1 --image 30970148 --ssh-keys 1b:7d:9e:eb:81:55:33:71:94:9d:37:f2:ea:c9:8a:99`
echo "ID is $ID"
IP=`doctl compute droplet get $ID --no-header --format="PublicIPv4"`
echo "IP is $IP"
until ssh -i $HOME/.ssh/prisma_digital_ocean root@$IP exit
do
  echo "The Droplet does not accept SSH connections yet. Will try again in 1 second."
  sleep 1;
done
echo "Uploading the required setup scripts"
#rsync -i $HOME/.ssh/prisma_digital_ocean -av --progress ../setup_scripts/prisma-server root@$IP:.
# rsync -av -e "ssh -i $HOME/.ssh/prisma_digital_ocean" --progress ../setup_scripts/prisma-server root@$IP:.
scp -r -i $HOME/.ssh/prisma_digital_ocean ../setup_scripts/prisma-server root@$IP:.
echo "Starting the Prisma Server"
ssh -i $HOME/.ssh/prisma_digital_ocean root@$IP "cd prisma-server && ./start.sh $CONNECTOR $PRISMA_VERSION"
if [ -n "${IMPORT_FILE}" ]; then
    echo "Resetting the data of the Prisma server"
    ssh -i $HOME/.ssh/prisma_digital_ocean root@$IP "docker run --net=host prismagraphql/benchmarks:latest reset-server $IMPORT_FILE"  
fi
echo "Starting the Benchmark..."
ssh -i $HOME/.ssh/prisma_digital_ocean root@$IP "docker run --net=host prismagraphql/benchmarks:latest bench-server $CONNECTOR"  

echo "Deleting Droplet"
doctl compute droplet delete --force $ID