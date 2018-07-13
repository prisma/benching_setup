#!/bin/bash
set -e
CONNECTOR="${1:?Provide the connector you want to use for this test run}"
ID=$2
if [ -z "${ID}" ]; then
    echo "No Droplet ID provided. Will create a new Droplet."
    IMAGE_ID=$(doctl compute image list | grep perf-testing | awk '{print $1}')
    echo "Will use image $IMAGE_ID as a base image for this droplet."
    ID=`doctl compute droplet create $CONNECTOR-perf-test --no-header --format "ID" --wait --size 1gb --region fra1 --image $IMAGE_ID --ssh-keys f9:60:c8:4e:27:83:ec:59:b9:bb:a6:20:9f:2e:2d:3b`
fi

echo "ID is $ID"
IP=`doctl compute droplet get $ID --no-header --format="PublicIPv4"`
echo "IP is $IP"

echo "Starting Prisma with the connector $CONNECTOR"
ssh root@$IP "cd setup_scripts && ./setup_prisma.sh $CONNECTOR"