#!/bin/sh

set -e
CONNECTOR="${1:?Provide the connector you want to use for this test run}"
export PRISMA_VERSION="${2:?Provide the Prisma version you want to use for this test run}"

echo "Starting the Prisma server with version $PRISMA_VERSION"
docker-compose -f docker-compose.$CONNECTOR.yml up -d

echo "Waiting until Prisma has finished booting"
until curl -s 'http://localhost:4466' > /dev/null
do
  echo "The prisma server has not booted yet. Will try again in 1 second."
  sleep 1;
done
