set -e
CONNECTOR="${1:?Provide the connector you want to use for this test run}"
echo "Starting the Prisma stack"
docker-compose -f docker-compose.$CONNECTOR.yml up -d
sleep 30
echo "Deploying the test service"
mkdir perf-test
cp datamodel.graphql ./perf-test/
cp prisma.yml ./perf-test/
cd perf-test
prisma deploy
cd -
pwd
echo "Importing the test data"
prisma import --data ../import_data/1000import.zip