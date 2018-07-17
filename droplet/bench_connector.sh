CONNECTOR="${1:?Provide the connector you want to use for this test run}"
IMPORT_FILE=$2

DROPLET_ID=$(doctl compute droplet list | grep $CONNECTOR-perf-test | awk '{print $1}')
if [ -z "${DROPLET_ID}" ]; then
    echo "There is no Droplet for benchmarking the $CONNECTOR yet. You need to create one first."
    exit 1
fi
IP=`doctl compute droplet get $ID --no-header --format="PublicIPv4"`
echo "IP is $IP"

if [ -n "${IMPORT_FILE}" ]; then
    ssh root@$IP "docker run --net=host prismagraphql/benchmarks:latest reset-server $IMPORT_FILE"  
fi
ssh root@$IP "docker run --net=host prismagraphql/benchmarks:latest bench-server $CONNECTOR"  