import { warmupAndBenchmark } from "../helpers/bench";
import { getQueryFileForName, getQueryFiles, QueryFile } from "../helpers/query_files";
import { getServerInfo, PrismaServerInfo } from "../helpers/server_info";
import { getActiveConnector } from "../helpers/connectors";
import { Connector } from "../result_storage/binding";
import {
    createBenchmarkingSession,
    ensureVersionExists,
    storeBenchmarkResults,
    incrementQueriesRun,
    markSessionAsFinished,
} from "../result_storage/result_storage";
import { benchmarkedServer } from "./constants";
import { PrismaConnector } from "../helpers/connectors";

// IMPORTANT: warmup_duration must be a multiple of 30!
const benchmarkConfigs = {
    "very-slow": {
        warmup_duration: 900, // 15 minutes
        rps: [25, 50, 75, 100, 125, 150, 175, 200, 225, 250]
    },
    slow: {
        warmup_duration: 480, // 8 minutes
        rps: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
    },
    medium: {
        warmup_duration: 300, // 5 minutes
        rps: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    },
    fast: {
        warmup_duration: 300, // 5 minutes
        rps: [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 4000]
    },
    "very-fast": {
        warmup_duration: 300, // 5 minutes
        rps: [400, 800, 1200, 1600, 2000, 2400, 2800, 3200, 3600, 4000]
    }
};

main().catch(console.error);

async function main() {
    const args = process.argv.slice(2);
    const queryFiles = getQueryFiles();
    const testToRun = args[0];
    const activeConnector = await getActiveConnector(benchmarkedServer);
    await ensureVersionExists(activeConnector.serverInfo.version);

    if (testToRun == null || testToRun === "all") {
        for (const queryFile of queryFiles) {
            await benchmarkAndStoreResults(activeConnector, queryFile);
        }
    } else {
        console.log("running one test");
        const queryFile = getQueryFileForName(testToRun);
        await benchmarkAndStoreResults(activeConnector, queryFile);
    }
}

async function benchmarkAndStoreResults(
    connector: PrismaConnector,
    query: QueryFile,
): Promise<void> {
    const config = benchmarkConfigs[query.speed];

    if (connector.supportsQuery(query)) {
        const result = await warmupAndBenchmark(benchmarkedServer, query, config.warmup_duration, config.rps);

        await storeBenchmarkResults(
            connector.typeEnumForStorage,
            connector.serverInfo.version,
            connector.serverInfo.commit,
            query.name,
            result.results,
            result.startedAt,
            result.finishedAt
        )
    } else {
        console.log(`skipping query ${query.name} as it is marked as ignored for this connector`);
    }
}
