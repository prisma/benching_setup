#!/bin/bash
curl http://169.254.169.254/metadata/v1/tags/ > tags.txt
# CONNECTOR=`cat tags.txt | head -1 | tail -1`
# VERSION=`cat tags.txt | head -2 | tail -1` | tr : .
# IMPORT_FILE=`cat tags.txt | head -3 | tail -1`
function getValue {
    KEY=$1
    LINE=`cat tags.txt | grep $KEY`
    echo ${LINE#$KEY:}
}
CONNECTOR=`getValue connector`
IMPORT_FILE=`getValue import`
VERSION=`getValue version | tr _ .`
echo "Starting benchmark for Connector $CONNECTOR with version $VERSION based on import file $IMPORT_FILE"
cd ../setup_scripts/prisma-server && ./start.sh $CONNECTOR $VERSION
docker run --net=host prismagraphql/benchmarks:latest reset-server $IMPORT_FILE
docker run --net=host prismagraphql/benchmarks:latest bench-server $CONNECTOR artistNameContainsString
