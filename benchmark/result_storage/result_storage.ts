import {
    Prisma,
    Connector,
} from "./binding";

const Influx = require('influx');
const os = require('os')
const prismaServer = "https://benchmark-results_prisma-internal.prisma.sh";
const resultStorageEndpoint = prismaServer + "/benchmark/dev";
const resultStorage = new Prisma({
    endpoint: resultStorageEndpoint
});

export async function createBenchmarkingSession(queriesToRun: number) {
    return await resultStorage.mutation.createBenchmarkingSession({
        data: {
            queriesToRun: queriesToRun,
            queriesRun: 0,
            started: new Date()
        }
    });
}

export async function incrementQueriesRun(sessionId: string) {
    var currentCount = await resultStorage.query.benchmarkingSession({
        where: { id: sessionId }
    });
    return await resultStorage.mutation.updateBenchmarkingSession({
        where: {
            id: sessionId
        },
        data: {
            queriesRun: currentCount!.queriesRun + 1
        }
    });
}

export async function markSessionAsFinished(sessionId: string) {
    return await resultStorage.mutation.updateBenchmarkingSession({
        where: {
            id: sessionId
        },
        data: {
            finished: new Date()
        }
    });
}

export async function ensureVersionExists(name: string) {
    return await resultStorage.mutation.upsertVersion({
        where: { name: name },
        create: { name: name },
        update: {}
    });
}

export interface BenchmarkResult {
    rps: number;
    successes: number;
    failures: number;
    avg: number;
    p50: number;
    p95: number;
    p99: number;
    cpuLoad: number;
    cpuCount: number;
}

export async function storeBenchmarkResults(
    connector: Connector,
    version: string,
    commit: string,
    queryName: string,
    results: BenchmarkResult[],
    startedAt: Date,
    finishedAt: Date
): Promise<void> {
    console.log(`storing ${results.length} results`);

    const points = results.map(function(result) {
        return {
            measurement: 'response_times',
            fields: {
                successes: result.successes,
                failures: result.failures,
                avg: result.avg,
                p50: result.p50 * 1000000,
                p95: result.p95 * 1000000,
                p99: result.p99 * 1000000,
                cpuLoad: result.cpuLoad,
            },
            tags: {
                version,
                commit,
                connector,
                queryName,
                host: os.hostname(),
                startedAt: startedAt.toString(),
                finishedAt: finishedAt.toString(),
                rps: result.rps.toString(),
                cpuCount: result.cpuCount.toString(),
            }
        }
    })

    console.log(points)

    let influx = new Influx.InfluxDB({
        host: 'localhost',
        database: 'benchmark',
        schema: [
            {
                measurement: 'response_times',
                fields: {
                    successes: Influx.FieldType.INTEGER,
                    failures: Influx.FieldType.INTEGER,
                    avg: Influx.FieldType.INTEGER,
                    p50: Influx.FieldType.INTEGER,
                    p95: Influx.FieldType.INTEGER,
                    p99: Influx.FieldType.INTEGER,
                    cpuLoad: Influx.FieldType.INTEGER,
                },
                tags: [
                    'host',
                    'startedAt',
                    'finishedAt',
                    'rps',
                    'queryName',
                    'connector',
                    'commit',
                    'version',
                    'cpuCount'
                ]
            }
        ]
    })

    influx.writePoints(points)
}
