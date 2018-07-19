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
echo "Starting benchmark for Connector $CONNECTOR with version $VERSION based on import file $IMPORT_FILE"
cd ../setup_scripts/prisma-server && ./start.sh $CONNECTOR $VERSION
docker run --net=host prismagraphql/benchmarks:latest reset-server $IMPORT_FILE
docker run --net=host prismagraphql/benchmarks:latest bench-server $CONNECTOR artistNameContainsString
