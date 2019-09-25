#!/usr/bin/env bash

set -e
CONNECTOR="${1:?Provide the connector you want to use for this test run}"

git submodule update --init
cd prisma-engine
git pull
cd ../setup_scripts/prisma-server

echo "Updating the Prisma server"
docker-compose -f docker-compose.$CONNECTOR.yml build

echo "Stopping the Prisma server"
docker-compose -f docker-compose.$CONNECTOR.yml down
./start.sh $CONNECTOR

#cd ../..
#prisma2 lift up
