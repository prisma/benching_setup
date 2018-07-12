npm install -g prisma
docker-compose up -d
sleep 30
mkdir perf-test
cp datamodel.graphql ./perf-test/
cp prisma.yml ./perf-test/
cd perf-test
prisma deploy