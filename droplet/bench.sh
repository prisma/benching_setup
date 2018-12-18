#!/bin/bash
CONNECTOR="${1:?You must provide a Connector}"
VERSION="${2:?You must provide a version}"
IMPORT_FILE="${3:?You must provide an import file}"
TEST="${4:?You must provide a test to execute}"
API_TOKEN=$5
echo "Starting benchmark for Connector $CONNECTOR with version $VERSION based on import file $IMPORT_FILE"
CURRENT_DIR=`pwd`
cd ../setup_scripts/prisma-server && ./start.sh $CONNECTOR $VERSION && cd -
yarn reset-server $IMPORT_FILE
yarn bench-server $TEST

if [ -n "${API_TOKEN}" ]; then
  pwd
  $CURRENT_DIR/delete_this_droplet.sh $API_TOKEN
fi