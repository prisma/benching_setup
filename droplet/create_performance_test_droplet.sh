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

if [ -z "${PRISMA_VERSION}" ]; then
    echo "No Prisma version provided. Will fetch latest alpha from Dockerhub."
    PRISMA_VERSION=`curl -sS 'https://registry.hub.docker.com/v2/repositories/prismagraphql/prisma/tags/' | jq '."results"[]["name"]' --raw-output | grep -v heroku | grep alpha | head -n 1`
fi
echo "Starting Prisma version $PRISMA_VERSION with the connector $CONNECTOR"
ssh root@$IP "cd setup_scripts/prisma && ./setup.sh $CONNECTOR $PRISMA_VERSION"