#!/bin/bash
curl http://169.254.169.254/metadata/v1/tags/ > metadata
function getValue {
    KEY=$1
    LINE=`cat metadata | grep $KEY`
    echo ${LINE#$KEY:}
}
CONNECTOR=`getValue connector`
IMPORT_FILE=`getValue import`
VERSION=`getValue version | tr _ .`
API_TOKEN=`getValue api_token`
TEST=`getValue test`
echo "Starting benchmark for Connector $CONNECTOR with version $VERSION based on import file $IMPORT_FILE"
CURRENT_DIR=`pwd`
cd ../setup_scripts/prisma-server && ./start.sh $CONNECTOR $VERSION && cd -
docker run -it --net=host prismagraphql/benchmarks:latest reset-server $IMPORT_FILE
docker run -it --net=host prismagraphql/benchmarks:latest bench-server $CONNECTOR $TEST

if [ -n "${API_TOKEN}" ]; then
  pwd
  $CURRENT_DIR/delete_this_droplet.sh $API_TOKEN
fi