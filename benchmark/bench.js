const testFolder = '../querycollection';

var benchmarkConfigs = {
    "very-slow": {
        warmup_rps: 20,
        warmup_duration: 1000,
        rps: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
    },
    "slow": {
        warmup_rps: 50,
        warmup_duration: 500,
        rps: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
    },
    "medium": {
        warmup_rps: 100,
        warmup_duration: 3,
        rps: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    },
    "fast": {
        warmup_rps: 150,
        warmup_duration: 200,
        rps: [250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500]
    },
    "very-fast": {
        warmup_rps: 150,
        warmup_duration: 200,
        rps: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
    }
}

var args = process.argv.slice(2);
var queryFiles = getQueryFiles()
if(args.length == 0){
    console.log("running all tests")
    for(var queryFile of queryFiles){
        benchMarkQuery(queryFile)
    }
} else  {
    console.log("running one test")
    var queryFile = getQueryFileForName(args[0])
    benchMarkQuery(queryFile)
}

function getQueryFileForName(name){
    var queryFiles = getQueryFiles();
    var matches = queryFiles.filter(queryFile => queryFile.filePath.includes(name))
    if(matches.length > 1){
        throw new Error("more than one test matched the given name. Provide a non ambiguous name.")
    }
    return queryFiles[0];
};

function getQueryFiles(){
    var walk         = require('walk');
    var path         = require('path');
    var queryFiles   = [];

    options = {
        listeners: {
            file: function (root, fileStats, next) {
                if(fileStats.name.endsWith(".graphql")){
                    // console.log(root)
                    // console.log(fileStats.name)
                    var fileName = path.basename(fileStats.name, '.graphql')
                    var parts = fileName.split('_')
                    var query = {
                        name : parts[parts.length - 2],
                        speed: parts[parts.length - 1],
                        filePath: root + "/" + fileStats.name
                    }
                    queryFiles.push(query);
                }
                next();
            },
            errors: function (root, nodeStatsArray, next) {
                next();
            }
        }
    };
    
    walker = walk.walkSync(testFolder, options);
    return queryFiles;
}

function benchMarkQuery(query){
    var sleep  = require('sleep');
    var fs     = require('fs')
    var config = benchmarkConfigs[query.speed]  
    
    var url = "http://localhost:4466"
    var graphqlQuery = fs.readFileSync(query.filePath, {encoding: "utf-8"});

    console.log("")
    console.log("")
    console.log(`----------------- Warmup: ${query.name} $PROGRAM_DIR ${url} ${config.warmup_rps}Req/s ${config.warmup_duration}s -----------------`)
    console.log("")
    console.log(graphqlQuery)
    runVegeta(url, graphqlQuery, config.warmup_rps, config.warmup_duration)

    sleep.sleep(15) // give the service a bit of time to recover

    console.log("----------------- Benching: $BENCH_NAME -----------------")
    for(var rps of config.rps) {
        console.log(`${rps} req/s`)
        runVegeta(url, graphqlQuery, rps, 60)
    }
}

function runVegeta(url, graphqlQueryAsString, rps, duration){
    var graphqlQuery = {
        query: graphqlQueryAsString
    }
    const spawnSync = require('child_process').spawnSync;
    const execSync = require('child_process').execSync;
    // todo: implement
    var attack = `
      POST ${url}
      Content-Type: application/json
      ${JSON.stringify(graphqlQuery)}
    `
    attack = "GET http://localhost:80"
    var result = execSync(`vegeta attack -rate=${rps} -duration="${duration}s" -timeout="10s" | vegeta report`, { input : attack }).toString()
    console.log(result)
    // vegeta attack -rate=$RPS -duration=""$DURATION"s" -timeout=""$TIMEOUT"s" -targets=./temp/temptargets.txt | vegeta report > "$BENCH_STATS_FILE"
}

