set -e
CONNECTOR="${1:?Provide the connector you want to use for this test run}"
export PRISMA_VERSION="${2:?Provide the Prisma version you want to use for this test run}"
echo "Starting the Prisma server with version $PRISMA_VERSION"
docker-compose -f docker-compose.$CONNECTOR.yml up -d
sleep 30