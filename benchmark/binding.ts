import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    benchmarkingSessions: <T = BenchmarkingSession[]>(args: { where?: BenchmarkingSessionWhereInput, orderBy?: BenchmarkingSessionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    benchmarkedQueries: <T = BenchmarkedQuery[]>(args: { where?: BenchmarkedQueryWhereInput, orderBy?: BenchmarkedQueryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    runs: <T = Run[]>(args: { where?: RunWhereInput, orderBy?: RunOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    latencies: <T = Latency[]>(args: { where?: LatencyWhereInput, orderBy?: LatencyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    benchmarkingSession: <T = BenchmarkingSession | null>(args: { where: BenchmarkingSessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    benchmarkedQuery: <T = BenchmarkedQuery | null>(args: { where: BenchmarkedQueryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    run: <T = Run | null>(args: { where: RunWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    latency: <T = Latency | null>(args: { where: LatencyWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    benchmarkingSessionsConnection: <T = BenchmarkingSessionConnection>(args: { where?: BenchmarkingSessionWhereInput, orderBy?: BenchmarkingSessionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    benchmarkedQueriesConnection: <T = BenchmarkedQueryConnection>(args: { where?: BenchmarkedQueryWhereInput, orderBy?: BenchmarkedQueryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    runsConnection: <T = RunConnection>(args: { where?: RunWhereInput, orderBy?: RunOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    latenciesConnection: <T = LatencyConnection>(args: { where?: LatencyWhereInput, orderBy?: LatencyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createBenchmarkingSession: <T = BenchmarkingSession>(args: { data: BenchmarkingSessionCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createBenchmarkedQuery: <T = BenchmarkedQuery>(args: { data: BenchmarkedQueryCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createRun: <T = Run>(args: { data: RunCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createLatency: <T = Latency>(args: { data: LatencyCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateBenchmarkingSession: <T = BenchmarkingSession | null>(args: { data: BenchmarkingSessionUpdateInput, where: BenchmarkingSessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateBenchmarkedQuery: <T = BenchmarkedQuery | null>(args: { data: BenchmarkedQueryUpdateInput, where: BenchmarkedQueryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateRun: <T = Run | null>(args: { data: RunUpdateInput, where: RunWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateLatency: <T = Latency | null>(args: { data: LatencyUpdateInput, where: LatencyWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteBenchmarkingSession: <T = BenchmarkingSession | null>(args: { where: BenchmarkingSessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteBenchmarkedQuery: <T = BenchmarkedQuery | null>(args: { where: BenchmarkedQueryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteRun: <T = Run | null>(args: { where: RunWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteLatency: <T = Latency | null>(args: { where: LatencyWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertBenchmarkingSession: <T = BenchmarkingSession>(args: { where: BenchmarkingSessionWhereUniqueInput, create: BenchmarkingSessionCreateInput, update: BenchmarkingSessionUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertBenchmarkedQuery: <T = BenchmarkedQuery>(args: { where: BenchmarkedQueryWhereUniqueInput, create: BenchmarkedQueryCreateInput, update: BenchmarkedQueryUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertRun: <T = Run>(args: { where: RunWhereUniqueInput, create: RunCreateInput, update: RunUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertLatency: <T = Latency>(args: { where: LatencyWhereUniqueInput, create: LatencyCreateInput, update: LatencyUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyBenchmarkingSessions: <T = BatchPayload>(args: { data: BenchmarkingSessionUpdateInput, where?: BenchmarkingSessionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyBenchmarkedQueries: <T = BatchPayload>(args: { data: BenchmarkedQueryUpdateInput, where?: BenchmarkedQueryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyRuns: <T = BatchPayload>(args: { data: RunUpdateInput, where?: RunWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyLatencies: <T = BatchPayload>(args: { data: LatencyUpdateInput, where?: LatencyWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyBenchmarkingSessions: <T = BatchPayload>(args: { where?: BenchmarkingSessionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyBenchmarkedQueries: <T = BatchPayload>(args: { where?: BenchmarkedQueryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyRuns: <T = BatchPayload>(args: { where?: RunWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyLatencies: <T = BatchPayload>(args: { where?: LatencyWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    benchmarkingSession: <T = BenchmarkingSessionSubscriptionPayload | null>(args: { where?: BenchmarkingSessionSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    benchmarkedQuery: <T = BenchmarkedQuerySubscriptionPayload | null>(args: { where?: BenchmarkedQuerySubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    run: <T = RunSubscriptionPayload | null>(args: { where?: RunSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    latency: <T = LatencySubscriptionPayload | null>(args: { where?: LatencySubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  BenchmarkingSession: (where?: BenchmarkingSessionWhereInput) => Promise<boolean>
  BenchmarkedQuery: (where?: BenchmarkedQueryWhereInput) => Promise<boolean>
  Run: (where?: RunWhereInput) => Promise<boolean>
  Latency: (where?: LatencyWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateBenchmarkedQuery {
  count: Int!
}

type AggregateBenchmarkingSession {
  count: Int!
}

type AggregateLatency {
  count: Int!
}

type AggregateRun {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type BenchmarkedQuery implements Node {
  id: ID!
  name: String!
  query: String!
  runs(where: RunWhereInput, orderBy: RunOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Run!]
}

"""A connection to a list of items."""
type BenchmarkedQueryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [BenchmarkedQueryEdge]!
  aggregate: AggregateBenchmarkedQuery!
}

input BenchmarkedQueryCreateInput {
  name: String!
  query: String!
  runs: RunCreateManyInput
}

"""An edge in a connection."""
type BenchmarkedQueryEdge {
  """The item at the end of the edge."""
  node: BenchmarkedQuery!

  """A cursor for use in pagination."""
  cursor: String!
}

enum BenchmarkedQueryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  query_ASC
  query_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type BenchmarkedQueryPreviousValues {
  id: ID!
  name: String!
  query: String!
}

type BenchmarkedQuerySubscriptionPayload {
  mutation: MutationType!
  node: BenchmarkedQuery
  updatedFields: [String!]
  previousValues: BenchmarkedQueryPreviousValues
}

input BenchmarkedQuerySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [BenchmarkedQuerySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [BenchmarkedQuerySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [BenchmarkedQuerySubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: BenchmarkedQueryWhereInput
}

input BenchmarkedQueryUpdateInput {
  name: String
  query: String
  runs: RunUpdateManyInput
}

input BenchmarkedQueryWhereInput {
  """Logical AND on all given filters."""
  AND: [BenchmarkedQueryWhereInput!]

  """Logical OR on all given filters."""
  OR: [BenchmarkedQueryWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [BenchmarkedQueryWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  query: String

  """All values that are not equal to given value."""
  query_not: String

  """All values that are contained in given list."""
  query_in: [String!]

  """All values that are not contained in given list."""
  query_not_in: [String!]

  """All values less than the given value."""
  query_lt: String

  """All values less than or equal the given value."""
  query_lte: String

  """All values greater than the given value."""
  query_gt: String

  """All values greater than or equal the given value."""
  query_gte: String

  """All values containing the given string."""
  query_contains: String

  """All values not containing the given string."""
  query_not_contains: String

  """All values starting with the given string."""
  query_starts_with: String

  """All values not starting with the given string."""
  query_not_starts_with: String

  """All values ending with the given string."""
  query_ends_with: String

  """All values not ending with the given string."""
  query_not_ends_with: String
  runs_every: RunWhereInput
  runs_some: RunWhereInput
  runs_none: RunWhereInput
}

input BenchmarkedQueryWhereUniqueInput {
  id: ID
  name: String
}

type BenchmarkingSession implements Node {
  id: ID!
  queriesToRun: Int!
  queriesRun: Int!
  started: DateTime!
  finished: DateTime
  runs(where: RunWhereInput, orderBy: RunOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Run!]
}

"""A connection to a list of items."""
type BenchmarkingSessionConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [BenchmarkingSessionEdge]!
  aggregate: AggregateBenchmarkingSession!
}

input BenchmarkingSessionCreateInput {
  queriesToRun: Int!
  queriesRun: Int!
  started: DateTime!
  finished: DateTime
  runs: RunCreateManyWithoutSessionInput
}

input BenchmarkingSessionCreateOneWithoutRunsInput {
  create: BenchmarkingSessionCreateWithoutRunsInput
  connect: BenchmarkingSessionWhereUniqueInput
}

input BenchmarkingSessionCreateWithoutRunsInput {
  queriesToRun: Int!
  queriesRun: Int!
  started: DateTime!
  finished: DateTime
}

"""An edge in a connection."""
type BenchmarkingSessionEdge {
  """The item at the end of the edge."""
  node: BenchmarkingSession!

  """A cursor for use in pagination."""
  cursor: String!
}

enum BenchmarkingSessionOrderByInput {
  id_ASC
  id_DESC
  queriesToRun_ASC
  queriesToRun_DESC
  queriesRun_ASC
  queriesRun_DESC
  started_ASC
  started_DESC
  finished_ASC
  finished_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type BenchmarkingSessionPreviousValues {
  id: ID!
  queriesToRun: Int!
  queriesRun: Int!
  started: DateTime!
  finished: DateTime
}

type BenchmarkingSessionSubscriptionPayload {
  mutation: MutationType!
  node: BenchmarkingSession
  updatedFields: [String!]
  previousValues: BenchmarkingSessionPreviousValues
}

input BenchmarkingSessionSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [BenchmarkingSessionSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [BenchmarkingSessionSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [BenchmarkingSessionSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: BenchmarkingSessionWhereInput
}

input BenchmarkingSessionUpdateInput {
  queriesToRun: Int
  queriesRun: Int
  started: DateTime
  finished: DateTime
  runs: RunUpdateManyWithoutSessionInput
}

input BenchmarkingSessionUpdateOneWithoutRunsInput {
  create: BenchmarkingSessionCreateWithoutRunsInput
  connect: BenchmarkingSessionWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: BenchmarkingSessionUpdateWithoutRunsDataInput
  upsert: BenchmarkingSessionUpsertWithoutRunsInput
}

input BenchmarkingSessionUpdateWithoutRunsDataInput {
  queriesToRun: Int
  queriesRun: Int
  started: DateTime
  finished: DateTime
}

input BenchmarkingSessionUpsertWithoutRunsInput {
  update: BenchmarkingSessionUpdateWithoutRunsDataInput!
  create: BenchmarkingSessionCreateWithoutRunsInput!
}

input BenchmarkingSessionWhereInput {
  """Logical AND on all given filters."""
  AND: [BenchmarkingSessionWhereInput!]

  """Logical OR on all given filters."""
  OR: [BenchmarkingSessionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [BenchmarkingSessionWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  queriesToRun: Int

  """All values that are not equal to given value."""
  queriesToRun_not: Int

  """All values that are contained in given list."""
  queriesToRun_in: [Int!]

  """All values that are not contained in given list."""
  queriesToRun_not_in: [Int!]

  """All values less than the given value."""
  queriesToRun_lt: Int

  """All values less than or equal the given value."""
  queriesToRun_lte: Int

  """All values greater than the given value."""
  queriesToRun_gt: Int

  """All values greater than or equal the given value."""
  queriesToRun_gte: Int
  queriesRun: Int

  """All values that are not equal to given value."""
  queriesRun_not: Int

  """All values that are contained in given list."""
  queriesRun_in: [Int!]

  """All values that are not contained in given list."""
  queriesRun_not_in: [Int!]

  """All values less than the given value."""
  queriesRun_lt: Int

  """All values less than or equal the given value."""
  queriesRun_lte: Int

  """All values greater than the given value."""
  queriesRun_gt: Int

  """All values greater than or equal the given value."""
  queriesRun_gte: Int
  started: DateTime

  """All values that are not equal to given value."""
  started_not: DateTime

  """All values that are contained in given list."""
  started_in: [DateTime!]

  """All values that are not contained in given list."""
  started_not_in: [DateTime!]

  """All values less than the given value."""
  started_lt: DateTime

  """All values less than or equal the given value."""
  started_lte: DateTime

  """All values greater than the given value."""
  started_gt: DateTime

  """All values greater than or equal the given value."""
  started_gte: DateTime
  finished: DateTime

  """All values that are not equal to given value."""
  finished_not: DateTime

  """All values that are contained in given list."""
  finished_in: [DateTime!]

  """All values that are not contained in given list."""
  finished_not_in: [DateTime!]

  """All values less than the given value."""
  finished_lt: DateTime

  """All values less than or equal the given value."""
  finished_lte: DateTime

  """All values greater than the given value."""
  finished_gt: DateTime

  """All values greater than or equal the given value."""
  finished_gte: DateTime
  runs_every: RunWhereInput
  runs_some: RunWhereInput
  runs_none: RunWhereInput
}

input BenchmarkingSessionWhereUniqueInput {
  id: ID
}

enum Connector {
  Postgres
  MySQL
  MongoDB
}

scalar DateTime

type Latency implements Node {
  id: ID!
  rps: Int!
  avg: Float!
  p50: Float!
  p95: Float!
  p99: Float!
  successes: Int!
  failures: Int!
}

"""A connection to a list of items."""
type LatencyConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [LatencyEdge]!
  aggregate: AggregateLatency!
}

input LatencyCreateInput {
  rps: Int!
  avg: Float!
  p50: Float!
  p95: Float!
  p99: Float!
  successes: Int!
  failures: Int!
}

input LatencyCreateManyInput {
  create: [LatencyCreateInput!]
  connect: [LatencyWhereUniqueInput!]
}

"""An edge in a connection."""
type LatencyEdge {
  """The item at the end of the edge."""
  node: Latency!

  """A cursor for use in pagination."""
  cursor: String!
}

enum LatencyOrderByInput {
  id_ASC
  id_DESC
  rps_ASC
  rps_DESC
  avg_ASC
  avg_DESC
  p50_ASC
  p50_DESC
  p95_ASC
  p95_DESC
  p99_ASC
  p99_DESC
  successes_ASC
  successes_DESC
  failures_ASC
  failures_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type LatencyPreviousValues {
  id: ID!
  rps: Int!
  avg: Float!
  p50: Float!
  p95: Float!
  p99: Float!
  successes: Int!
  failures: Int!
}

type LatencySubscriptionPayload {
  mutation: MutationType!
  node: Latency
  updatedFields: [String!]
  previousValues: LatencyPreviousValues
}

input LatencySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [LatencySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [LatencySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [LatencySubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: LatencyWhereInput
}

input LatencyUpdateDataInput {
  rps: Int
  avg: Float
  p50: Float
  p95: Float
  p99: Float
  successes: Int
  failures: Int
}

input LatencyUpdateInput {
  rps: Int
  avg: Float
  p50: Float
  p95: Float
  p99: Float
  successes: Int
  failures: Int
}

input LatencyUpdateManyInput {
  create: [LatencyCreateInput!]
  connect: [LatencyWhereUniqueInput!]
  disconnect: [LatencyWhereUniqueInput!]
  delete: [LatencyWhereUniqueInput!]
  update: [LatencyUpdateWithWhereUniqueNestedInput!]
  upsert: [LatencyUpsertWithWhereUniqueNestedInput!]
}

input LatencyUpdateWithWhereUniqueNestedInput {
  where: LatencyWhereUniqueInput!
  data: LatencyUpdateDataInput!
}

input LatencyUpsertWithWhereUniqueNestedInput {
  where: LatencyWhereUniqueInput!
  update: LatencyUpdateDataInput!
  create: LatencyCreateInput!
}

input LatencyWhereInput {
  """Logical AND on all given filters."""
  AND: [LatencyWhereInput!]

  """Logical OR on all given filters."""
  OR: [LatencyWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [LatencyWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  rps: Int

  """All values that are not equal to given value."""
  rps_not: Int

  """All values that are contained in given list."""
  rps_in: [Int!]

  """All values that are not contained in given list."""
  rps_not_in: [Int!]

  """All values less than the given value."""
  rps_lt: Int

  """All values less than or equal the given value."""
  rps_lte: Int

  """All values greater than the given value."""
  rps_gt: Int

  """All values greater than or equal the given value."""
  rps_gte: Int
  avg: Float

  """All values that are not equal to given value."""
  avg_not: Float

  """All values that are contained in given list."""
  avg_in: [Float!]

  """All values that are not contained in given list."""
  avg_not_in: [Float!]

  """All values less than the given value."""
  avg_lt: Float

  """All values less than or equal the given value."""
  avg_lte: Float

  """All values greater than the given value."""
  avg_gt: Float

  """All values greater than or equal the given value."""
  avg_gte: Float
  p50: Float

  """All values that are not equal to given value."""
  p50_not: Float

  """All values that are contained in given list."""
  p50_in: [Float!]

  """All values that are not contained in given list."""
  p50_not_in: [Float!]

  """All values less than the given value."""
  p50_lt: Float

  """All values less than or equal the given value."""
  p50_lte: Float

  """All values greater than the given value."""
  p50_gt: Float

  """All values greater than or equal the given value."""
  p50_gte: Float
  p95: Float

  """All values that are not equal to given value."""
  p95_not: Float

  """All values that are contained in given list."""
  p95_in: [Float!]

  """All values that are not contained in given list."""
  p95_not_in: [Float!]

  """All values less than the given value."""
  p95_lt: Float

  """All values less than or equal the given value."""
  p95_lte: Float

  """All values greater than the given value."""
  p95_gt: Float

  """All values greater than or equal the given value."""
  p95_gte: Float
  p99: Float

  """All values that are not equal to given value."""
  p99_not: Float

  """All values that are contained in given list."""
  p99_in: [Float!]

  """All values that are not contained in given list."""
  p99_not_in: [Float!]

  """All values less than the given value."""
  p99_lt: Float

  """All values less than or equal the given value."""
  p99_lte: Float

  """All values greater than the given value."""
  p99_gt: Float

  """All values greater than or equal the given value."""
  p99_gte: Float
  successes: Int

  """All values that are not equal to given value."""
  successes_not: Int

  """All values that are contained in given list."""
  successes_in: [Int!]

  """All values that are not contained in given list."""
  successes_not_in: [Int!]

  """All values less than the given value."""
  successes_lt: Int

  """All values less than or equal the given value."""
  successes_lte: Int

  """All values greater than the given value."""
  successes_gt: Int

  """All values greater than or equal the given value."""
  successes_gte: Int
  failures: Int

  """All values that are not equal to given value."""
  failures_not: Int

  """All values that are contained in given list."""
  failures_in: [Int!]

  """All values that are not contained in given list."""
  failures_not_in: [Int!]

  """All values less than the given value."""
  failures_lt: Int

  """All values less than or equal the given value."""
  failures_lte: Int

  """All values greater than the given value."""
  failures_gt: Int

  """All values greater than or equal the given value."""
  failures_gte: Int
}

input LatencyWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createBenchmarkingSession(data: BenchmarkingSessionCreateInput!): BenchmarkingSession!
  createBenchmarkedQuery(data: BenchmarkedQueryCreateInput!): BenchmarkedQuery!
  createRun(data: RunCreateInput!): Run!
  createLatency(data: LatencyCreateInput!): Latency!
  updateBenchmarkingSession(data: BenchmarkingSessionUpdateInput!, where: BenchmarkingSessionWhereUniqueInput!): BenchmarkingSession
  updateBenchmarkedQuery(data: BenchmarkedQueryUpdateInput!, where: BenchmarkedQueryWhereUniqueInput!): BenchmarkedQuery
  updateRun(data: RunUpdateInput!, where: RunWhereUniqueInput!): Run
  updateLatency(data: LatencyUpdateInput!, where: LatencyWhereUniqueInput!): Latency
  deleteBenchmarkingSession(where: BenchmarkingSessionWhereUniqueInput!): BenchmarkingSession
  deleteBenchmarkedQuery(where: BenchmarkedQueryWhereUniqueInput!): BenchmarkedQuery
  deleteRun(where: RunWhereUniqueInput!): Run
  deleteLatency(where: LatencyWhereUniqueInput!): Latency
  upsertBenchmarkingSession(where: BenchmarkingSessionWhereUniqueInput!, create: BenchmarkingSessionCreateInput!, update: BenchmarkingSessionUpdateInput!): BenchmarkingSession!
  upsertBenchmarkedQuery(where: BenchmarkedQueryWhereUniqueInput!, create: BenchmarkedQueryCreateInput!, update: BenchmarkedQueryUpdateInput!): BenchmarkedQuery!
  upsertRun(where: RunWhereUniqueInput!, create: RunCreateInput!, update: RunUpdateInput!): Run!
  upsertLatency(where: LatencyWhereUniqueInput!, create: LatencyCreateInput!, update: LatencyUpdateInput!): Latency!
  updateManyBenchmarkingSessions(data: BenchmarkingSessionUpdateInput!, where: BenchmarkingSessionWhereInput): BatchPayload!
  updateManyBenchmarkedQueries(data: BenchmarkedQueryUpdateInput!, where: BenchmarkedQueryWhereInput): BatchPayload!
  updateManyRuns(data: RunUpdateInput!, where: RunWhereInput): BatchPayload!
  updateManyLatencies(data: LatencyUpdateInput!, where: LatencyWhereInput): BatchPayload!
  deleteManyBenchmarkingSessions(where: BenchmarkingSessionWhereInput): BatchPayload!
  deleteManyBenchmarkedQueries(where: BenchmarkedQueryWhereInput): BatchPayload!
  deleteManyRuns(where: RunWhereInput): BatchPayload!
  deleteManyLatencies(where: LatencyWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  benchmarkingSessions(where: BenchmarkingSessionWhereInput, orderBy: BenchmarkingSessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BenchmarkingSession]!
  benchmarkedQueries(where: BenchmarkedQueryWhereInput, orderBy: BenchmarkedQueryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BenchmarkedQuery]!
  runs(where: RunWhereInput, orderBy: RunOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Run]!
  latencies(where: LatencyWhereInput, orderBy: LatencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Latency]!
  benchmarkingSession(where: BenchmarkingSessionWhereUniqueInput!): BenchmarkingSession
  benchmarkedQuery(where: BenchmarkedQueryWhereUniqueInput!): BenchmarkedQuery
  run(where: RunWhereUniqueInput!): Run
  latency(where: LatencyWhereUniqueInput!): Latency
  benchmarkingSessionsConnection(where: BenchmarkingSessionWhereInput, orderBy: BenchmarkingSessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BenchmarkingSessionConnection!
  benchmarkedQueriesConnection(where: BenchmarkedQueryWhereInput, orderBy: BenchmarkedQueryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BenchmarkedQueryConnection!
  runsConnection(where: RunWhereInput, orderBy: RunOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RunConnection!
  latenciesConnection(where: LatencyWhereInput, orderBy: LatencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LatencyConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Run implements Node {
  id: ID!
  session(where: BenchmarkingSessionWhereInput): BenchmarkingSession
  latencies(where: LatencyWhereInput, orderBy: LatencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Latency!]
  connector: Connector!
  version: String!
  importFile: Int!
  commit: String!
  startedAt: DateTime!
  finishedAt: DateTime!
}

"""A connection to a list of items."""
type RunConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [RunEdge]!
  aggregate: AggregateRun!
}

input RunCreateInput {
  connector: Connector!
  version: String!
  importFile: Int!
  commit: String!
  startedAt: DateTime!
  finishedAt: DateTime!
  session: BenchmarkingSessionCreateOneWithoutRunsInput
  latencies: LatencyCreateManyInput
}

input RunCreateManyInput {
  create: [RunCreateInput!]
  connect: [RunWhereUniqueInput!]
}

input RunCreateManyWithoutSessionInput {
  create: [RunCreateWithoutSessionInput!]
  connect: [RunWhereUniqueInput!]
}

input RunCreateWithoutSessionInput {
  connector: Connector!
  version: String!
  importFile: Int!
  commit: String!
  startedAt: DateTime!
  finishedAt: DateTime!
  latencies: LatencyCreateManyInput
}

"""An edge in a connection."""
type RunEdge {
  """The item at the end of the edge."""
  node: Run!

  """A cursor for use in pagination."""
  cursor: String!
}

enum RunOrderByInput {
  id_ASC
  id_DESC
  connector_ASC
  connector_DESC
  version_ASC
  version_DESC
  importFile_ASC
  importFile_DESC
  commit_ASC
  commit_DESC
  startedAt_ASC
  startedAt_DESC
  finishedAt_ASC
  finishedAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type RunPreviousValues {
  id: ID!
  connector: Connector!
  version: String!
  importFile: Int!
  commit: String!
  startedAt: DateTime!
  finishedAt: DateTime!
}

type RunSubscriptionPayload {
  mutation: MutationType!
  node: Run
  updatedFields: [String!]
  previousValues: RunPreviousValues
}

input RunSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [RunSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [RunSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RunSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: RunWhereInput
}

input RunUpdateDataInput {
  connector: Connector
  version: String
  importFile: Int
  commit: String
  startedAt: DateTime
  finishedAt: DateTime
  session: BenchmarkingSessionUpdateOneWithoutRunsInput
  latencies: LatencyUpdateManyInput
}

input RunUpdateInput {
  connector: Connector
  version: String
  importFile: Int
  commit: String
  startedAt: DateTime
  finishedAt: DateTime
  session: BenchmarkingSessionUpdateOneWithoutRunsInput
  latencies: LatencyUpdateManyInput
}

input RunUpdateManyInput {
  create: [RunCreateInput!]
  connect: [RunWhereUniqueInput!]
  disconnect: [RunWhereUniqueInput!]
  delete: [RunWhereUniqueInput!]
  update: [RunUpdateWithWhereUniqueNestedInput!]
  upsert: [RunUpsertWithWhereUniqueNestedInput!]
}

input RunUpdateManyWithoutSessionInput {
  create: [RunCreateWithoutSessionInput!]
  connect: [RunWhereUniqueInput!]
  disconnect: [RunWhereUniqueInput!]
  delete: [RunWhereUniqueInput!]
  update: [RunUpdateWithWhereUniqueWithoutSessionInput!]
  upsert: [RunUpsertWithWhereUniqueWithoutSessionInput!]
}

input RunUpdateWithoutSessionDataInput {
  connector: Connector
  version: String
  importFile: Int
  commit: String
  startedAt: DateTime
  finishedAt: DateTime
  latencies: LatencyUpdateManyInput
}

input RunUpdateWithWhereUniqueNestedInput {
  where: RunWhereUniqueInput!
  data: RunUpdateDataInput!
}

input RunUpdateWithWhereUniqueWithoutSessionInput {
  where: RunWhereUniqueInput!
  data: RunUpdateWithoutSessionDataInput!
}

input RunUpsertWithWhereUniqueNestedInput {
  where: RunWhereUniqueInput!
  update: RunUpdateDataInput!
  create: RunCreateInput!
}

input RunUpsertWithWhereUniqueWithoutSessionInput {
  where: RunWhereUniqueInput!
  update: RunUpdateWithoutSessionDataInput!
  create: RunCreateWithoutSessionInput!
}

input RunWhereInput {
  """Logical AND on all given filters."""
  AND: [RunWhereInput!]

  """Logical OR on all given filters."""
  OR: [RunWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RunWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  connector: Connector

  """All values that are not equal to given value."""
  connector_not: Connector

  """All values that are contained in given list."""
  connector_in: [Connector!]

  """All values that are not contained in given list."""
  connector_not_in: [Connector!]
  version: String

  """All values that are not equal to given value."""
  version_not: String

  """All values that are contained in given list."""
  version_in: [String!]

  """All values that are not contained in given list."""
  version_not_in: [String!]

  """All values less than the given value."""
  version_lt: String

  """All values less than or equal the given value."""
  version_lte: String

  """All values greater than the given value."""
  version_gt: String

  """All values greater than or equal the given value."""
  version_gte: String

  """All values containing the given string."""
  version_contains: String

  """All values not containing the given string."""
  version_not_contains: String

  """All values starting with the given string."""
  version_starts_with: String

  """All values not starting with the given string."""
  version_not_starts_with: String

  """All values ending with the given string."""
  version_ends_with: String

  """All values not ending with the given string."""
  version_not_ends_with: String
  importFile: Int

  """All values that are not equal to given value."""
  importFile_not: Int

  """All values that are contained in given list."""
  importFile_in: [Int!]

  """All values that are not contained in given list."""
  importFile_not_in: [Int!]

  """All values less than the given value."""
  importFile_lt: Int

  """All values less than or equal the given value."""
  importFile_lte: Int

  """All values greater than the given value."""
  importFile_gt: Int

  """All values greater than or equal the given value."""
  importFile_gte: Int
  commit: String

  """All values that are not equal to given value."""
  commit_not: String

  """All values that are contained in given list."""
  commit_in: [String!]

  """All values that are not contained in given list."""
  commit_not_in: [String!]

  """All values less than the given value."""
  commit_lt: String

  """All values less than or equal the given value."""
  commit_lte: String

  """All values greater than the given value."""
  commit_gt: String

  """All values greater than or equal the given value."""
  commit_gte: String

  """All values containing the given string."""
  commit_contains: String

  """All values not containing the given string."""
  commit_not_contains: String

  """All values starting with the given string."""
  commit_starts_with: String

  """All values not starting with the given string."""
  commit_not_starts_with: String

  """All values ending with the given string."""
  commit_ends_with: String

  """All values not ending with the given string."""
  commit_not_ends_with: String
  startedAt: DateTime

  """All values that are not equal to given value."""
  startedAt_not: DateTime

  """All values that are contained in given list."""
  startedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  startedAt_not_in: [DateTime!]

  """All values less than the given value."""
  startedAt_lt: DateTime

  """All values less than or equal the given value."""
  startedAt_lte: DateTime

  """All values greater than the given value."""
  startedAt_gt: DateTime

  """All values greater than or equal the given value."""
  startedAt_gte: DateTime
  finishedAt: DateTime

  """All values that are not equal to given value."""
  finishedAt_not: DateTime

  """All values that are contained in given list."""
  finishedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  finishedAt_not_in: [DateTime!]

  """All values less than the given value."""
  finishedAt_lt: DateTime

  """All values less than or equal the given value."""
  finishedAt_lte: DateTime

  """All values greater than the given value."""
  finishedAt_gt: DateTime

  """All values greater than or equal the given value."""
  finishedAt_gte: DateTime
  session: BenchmarkingSessionWhereInput
  latencies_every: LatencyWhereInput
  latencies_some: LatencyWhereInput
  latencies_none: LatencyWhereInput
}

input RunWhereUniqueInput {
  id: ID
}

type Subscription {
  benchmarkingSession(where: BenchmarkingSessionSubscriptionWhereInput): BenchmarkingSessionSubscriptionPayload
  benchmarkedQuery(where: BenchmarkedQuerySubscriptionWhereInput): BenchmarkedQuerySubscriptionPayload
  run(where: RunSubscriptionWhereInput): RunSubscriptionPayload
  latency(where: LatencySubscriptionWhereInput): LatencySubscriptionPayload
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type BenchmarkingSessionOrderByInput =   'id_ASC' |
  'id_DESC' |
  'queriesToRun_ASC' |
  'queriesToRun_DESC' |
  'queriesRun_ASC' |
  'queriesRun_DESC' |
  'started_ASC' |
  'started_DESC' |
  'finished_ASC' |
  'finished_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type RunOrderByInput =   'id_ASC' |
  'id_DESC' |
  'connector_ASC' |
  'connector_DESC' |
  'version_ASC' |
  'version_DESC' |
  'importFile_ASC' |
  'importFile_DESC' |
  'commit_ASC' |
  'commit_DESC' |
  'startedAt_ASC' |
  'startedAt_DESC' |
  'finishedAt_ASC' |
  'finishedAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Connector =   'Postgres' |
  'MySQL' |
  'MongoDB'

export type LatencyOrderByInput =   'id_ASC' |
  'id_DESC' |
  'rps_ASC' |
  'rps_DESC' |
  'avg_ASC' |
  'avg_DESC' |
  'p50_ASC' |
  'p50_DESC' |
  'p95_ASC' |
  'p95_DESC' |
  'p99_ASC' |
  'p99_DESC' |
  'successes_ASC' |
  'successes_DESC' |
  'failures_ASC' |
  'failures_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type BenchmarkedQueryOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'query_ASC' |
  'query_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface LatencyCreateManyInput {
  create?: LatencyCreateInput[] | LatencyCreateInput
  connect?: LatencyWhereUniqueInput[] | LatencyWhereUniqueInput
}

export interface BenchmarkingSessionWhereInput {
  AND?: BenchmarkingSessionWhereInput[] | BenchmarkingSessionWhereInput
  OR?: BenchmarkingSessionWhereInput[] | BenchmarkingSessionWhereInput
  NOT?: BenchmarkingSessionWhereInput[] | BenchmarkingSessionWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  queriesToRun?: Int
  queriesToRun_not?: Int
  queriesToRun_in?: Int[] | Int
  queriesToRun_not_in?: Int[] | Int
  queriesToRun_lt?: Int
  queriesToRun_lte?: Int
  queriesToRun_gt?: Int
  queriesToRun_gte?: Int
  queriesRun?: Int
  queriesRun_not?: Int
  queriesRun_in?: Int[] | Int
  queriesRun_not_in?: Int[] | Int
  queriesRun_lt?: Int
  queriesRun_lte?: Int
  queriesRun_gt?: Int
  queriesRun_gte?: Int
  started?: DateTime
  started_not?: DateTime
  started_in?: DateTime[] | DateTime
  started_not_in?: DateTime[] | DateTime
  started_lt?: DateTime
  started_lte?: DateTime
  started_gt?: DateTime
  started_gte?: DateTime
  finished?: DateTime
  finished_not?: DateTime
  finished_in?: DateTime[] | DateTime
  finished_not_in?: DateTime[] | DateTime
  finished_lt?: DateTime
  finished_lte?: DateTime
  finished_gt?: DateTime
  finished_gte?: DateTime
  runs_every?: RunWhereInput
  runs_some?: RunWhereInput
  runs_none?: RunWhereInput
}

export interface RunUpdateManyInput {
  create?: RunCreateInput[] | RunCreateInput
  connect?: RunWhereUniqueInput[] | RunWhereUniqueInput
  disconnect?: RunWhereUniqueInput[] | RunWhereUniqueInput
  delete?: RunWhereUniqueInput[] | RunWhereUniqueInput
  update?: RunUpdateWithWhereUniqueNestedInput[] | RunUpdateWithWhereUniqueNestedInput
  upsert?: RunUpsertWithWhereUniqueNestedInput[] | RunUpsertWithWhereUniqueNestedInput
}

export interface RunUpdateManyWithoutSessionInput {
  create?: RunCreateWithoutSessionInput[] | RunCreateWithoutSessionInput
  connect?: RunWhereUniqueInput[] | RunWhereUniqueInput
  disconnect?: RunWhereUniqueInput[] | RunWhereUniqueInput
  delete?: RunWhereUniqueInput[] | RunWhereUniqueInput
  update?: RunUpdateWithWhereUniqueWithoutSessionInput[] | RunUpdateWithWhereUniqueWithoutSessionInput
  upsert?: RunUpsertWithWhereUniqueWithoutSessionInput[] | RunUpsertWithWhereUniqueWithoutSessionInput
}

export interface BenchmarkedQueryUpdateInput {
  name?: String
  query?: String
  runs?: RunUpdateManyInput
}

export interface RunCreateInput {
  connector: Connector
  version: String
  importFile: Int
  commit: String
  startedAt: DateTime
  finishedAt: DateTime
  session?: BenchmarkingSessionCreateOneWithoutRunsInput
  latencies?: LatencyCreateManyInput
}

export interface RunUpsertWithWhereUniqueWithoutSessionInput {
  where: RunWhereUniqueInput
  update: RunUpdateWithoutSessionDataInput
  create: RunCreateWithoutSessionInput
}

export interface BenchmarkedQuerySubscriptionWhereInput {
  AND?: BenchmarkedQuerySubscriptionWhereInput[] | BenchmarkedQuerySubscriptionWhereInput
  OR?: BenchmarkedQuerySubscriptionWhereInput[] | BenchmarkedQuerySubscriptionWhereInput
  NOT?: BenchmarkedQuerySubscriptionWhereInput[] | BenchmarkedQuerySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: BenchmarkedQueryWhereInput
}

export interface LatencyUpsertWithWhereUniqueNestedInput {
  where: LatencyWhereUniqueInput
  update: LatencyUpdateDataInput
  create: LatencyCreateInput
}

export interface BenchmarkingSessionSubscriptionWhereInput {
  AND?: BenchmarkingSessionSubscriptionWhereInput[] | BenchmarkingSessionSubscriptionWhereInput
  OR?: BenchmarkingSessionSubscriptionWhereInput[] | BenchmarkingSessionSubscriptionWhereInput
  NOT?: BenchmarkingSessionSubscriptionWhereInput[] | BenchmarkingSessionSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: BenchmarkingSessionWhereInput
}

export interface LatencyUpdateDataInput {
  rps?: Int
  avg?: Float
  p50?: Float
  p95?: Float
  p99?: Float
  successes?: Int
  failures?: Int
}

export interface LatencyUpdateInput {
  rps?: Int
  avg?: Float
  p50?: Float
  p95?: Float
  p99?: Float
  successes?: Int
  failures?: Int
}

export interface LatencyUpdateWithWhereUniqueNestedInput {
  where: LatencyWhereUniqueInput
  data: LatencyUpdateDataInput
}

export interface BenchmarkingSessionWhereUniqueInput {
  id?: ID_Input
}

export interface LatencyUpdateManyInput {
  create?: LatencyCreateInput[] | LatencyCreateInput
  connect?: LatencyWhereUniqueInput[] | LatencyWhereUniqueInput
  disconnect?: LatencyWhereUniqueInput[] | LatencyWhereUniqueInput
  delete?: LatencyWhereUniqueInput[] | LatencyWhereUniqueInput
  update?: LatencyUpdateWithWhereUniqueNestedInput[] | LatencyUpdateWithWhereUniqueNestedInput
  upsert?: LatencyUpsertWithWhereUniqueNestedInput[] | LatencyUpsertWithWhereUniqueNestedInput
}

export interface RunWhereUniqueInput {
  id?: ID_Input
}

export interface RunUpdateWithoutSessionDataInput {
  connector?: Connector
  version?: String
  importFile?: Int
  commit?: String
  startedAt?: DateTime
  finishedAt?: DateTime
  latencies?: LatencyUpdateManyInput
}

export interface RunUpsertWithWhereUniqueNestedInput {
  where: RunWhereUniqueInput
  update: RunUpdateDataInput
  create: RunCreateInput
}

export interface BenchmarkingSessionCreateInput {
  queriesToRun: Int
  queriesRun: Int
  started: DateTime
  finished?: DateTime
  runs?: RunCreateManyWithoutSessionInput
}

export interface BenchmarkingSessionUpdateWithoutRunsDataInput {
  queriesToRun?: Int
  queriesRun?: Int
  started?: DateTime
  finished?: DateTime
}

export interface RunCreateManyWithoutSessionInput {
  create?: RunCreateWithoutSessionInput[] | RunCreateWithoutSessionInput
  connect?: RunWhereUniqueInput[] | RunWhereUniqueInput
}

export interface RunUpdateDataInput {
  connector?: Connector
  version?: String
  importFile?: Int
  commit?: String
  startedAt?: DateTime
  finishedAt?: DateTime
  session?: BenchmarkingSessionUpdateOneWithoutRunsInput
  latencies?: LatencyUpdateManyInput
}

export interface RunCreateWithoutSessionInput {
  connector: Connector
  version: String
  importFile: Int
  commit: String
  startedAt: DateTime
  finishedAt: DateTime
  latencies?: LatencyCreateManyInput
}

export interface LatencySubscriptionWhereInput {
  AND?: LatencySubscriptionWhereInput[] | LatencySubscriptionWhereInput
  OR?: LatencySubscriptionWhereInput[] | LatencySubscriptionWhereInput
  NOT?: LatencySubscriptionWhereInput[] | LatencySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: LatencyWhereInput
}

export interface RunUpdateWithWhereUniqueWithoutSessionInput {
  where: RunWhereUniqueInput
  data: RunUpdateWithoutSessionDataInput
}

export interface RunWhereInput {
  AND?: RunWhereInput[] | RunWhereInput
  OR?: RunWhereInput[] | RunWhereInput
  NOT?: RunWhereInput[] | RunWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  connector?: Connector
  connector_not?: Connector
  connector_in?: Connector[] | Connector
  connector_not_in?: Connector[] | Connector
  version?: String
  version_not?: String
  version_in?: String[] | String
  version_not_in?: String[] | String
  version_lt?: String
  version_lte?: String
  version_gt?: String
  version_gte?: String
  version_contains?: String
  version_not_contains?: String
  version_starts_with?: String
  version_not_starts_with?: String
  version_ends_with?: String
  version_not_ends_with?: String
  importFile?: Int
  importFile_not?: Int
  importFile_in?: Int[] | Int
  importFile_not_in?: Int[] | Int
  importFile_lt?: Int
  importFile_lte?: Int
  importFile_gt?: Int
  importFile_gte?: Int
  commit?: String
  commit_not?: String
  commit_in?: String[] | String
  commit_not_in?: String[] | String
  commit_lt?: String
  commit_lte?: String
  commit_gt?: String
  commit_gte?: String
  commit_contains?: String
  commit_not_contains?: String
  commit_starts_with?: String
  commit_not_starts_with?: String
  commit_ends_with?: String
  commit_not_ends_with?: String
  startedAt?: DateTime
  startedAt_not?: DateTime
  startedAt_in?: DateTime[] | DateTime
  startedAt_not_in?: DateTime[] | DateTime
  startedAt_lt?: DateTime
  startedAt_lte?: DateTime
  startedAt_gt?: DateTime
  startedAt_gte?: DateTime
  finishedAt?: DateTime
  finishedAt_not?: DateTime
  finishedAt_in?: DateTime[] | DateTime
  finishedAt_not_in?: DateTime[] | DateTime
  finishedAt_lt?: DateTime
  finishedAt_lte?: DateTime
  finishedAt_gt?: DateTime
  finishedAt_gte?: DateTime
  session?: BenchmarkingSessionWhereInput
  latencies_every?: LatencyWhereInput
  latencies_some?: LatencyWhereInput
  latencies_none?: LatencyWhereInput
}

export interface LatencyCreateInput {
  rps: Int
  avg: Float
  p50: Float
  p95: Float
  p99: Float
  successes: Int
  failures: Int
}

export interface RunUpdateInput {
  connector?: Connector
  version?: String
  importFile?: Int
  commit?: String
  startedAt?: DateTime
  finishedAt?: DateTime
  session?: BenchmarkingSessionUpdateOneWithoutRunsInput
  latencies?: LatencyUpdateManyInput
}

export interface BenchmarkedQueryCreateInput {
  name: String
  query: String
  runs?: RunCreateManyInput
}

export interface LatencyWhereUniqueInput {
  id?: ID_Input
}

export interface RunCreateManyInput {
  create?: RunCreateInput[] | RunCreateInput
  connect?: RunWhereUniqueInput[] | RunWhereUniqueInput
}

export interface BenchmarkingSessionUpdateOneWithoutRunsInput {
  create?: BenchmarkingSessionCreateWithoutRunsInput
  connect?: BenchmarkingSessionWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: BenchmarkingSessionUpdateWithoutRunsDataInput
  upsert?: BenchmarkingSessionUpsertWithoutRunsInput
}

export interface BenchmarkingSessionUpdateInput {
  queriesToRun?: Int
  queriesRun?: Int
  started?: DateTime
  finished?: DateTime
  runs?: RunUpdateManyWithoutSessionInput
}

export interface BenchmarkingSessionCreateWithoutRunsInput {
  queriesToRun: Int
  queriesRun: Int
  started: DateTime
  finished?: DateTime
}

export interface BenchmarkingSessionCreateOneWithoutRunsInput {
  create?: BenchmarkingSessionCreateWithoutRunsInput
  connect?: BenchmarkingSessionWhereUniqueInput
}

export interface LatencyWhereInput {
  AND?: LatencyWhereInput[] | LatencyWhereInput
  OR?: LatencyWhereInput[] | LatencyWhereInput
  NOT?: LatencyWhereInput[] | LatencyWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  rps?: Int
  rps_not?: Int
  rps_in?: Int[] | Int
  rps_not_in?: Int[] | Int
  rps_lt?: Int
  rps_lte?: Int
  rps_gt?: Int
  rps_gte?: Int
  avg?: Float
  avg_not?: Float
  avg_in?: Float[] | Float
  avg_not_in?: Float[] | Float
  avg_lt?: Float
  avg_lte?: Float
  avg_gt?: Float
  avg_gte?: Float
  p50?: Float
  p50_not?: Float
  p50_in?: Float[] | Float
  p50_not_in?: Float[] | Float
  p50_lt?: Float
  p50_lte?: Float
  p50_gt?: Float
  p50_gte?: Float
  p95?: Float
  p95_not?: Float
  p95_in?: Float[] | Float
  p95_not_in?: Float[] | Float
  p95_lt?: Float
  p95_lte?: Float
  p95_gt?: Float
  p95_gte?: Float
  p99?: Float
  p99_not?: Float
  p99_in?: Float[] | Float
  p99_not_in?: Float[] | Float
  p99_lt?: Float
  p99_lte?: Float
  p99_gt?: Float
  p99_gte?: Float
  successes?: Int
  successes_not?: Int
  successes_in?: Int[] | Int
  successes_not_in?: Int[] | Int
  successes_lt?: Int
  successes_lte?: Int
  successes_gt?: Int
  successes_gte?: Int
  failures?: Int
  failures_not?: Int
  failures_in?: Int[] | Int
  failures_not_in?: Int[] | Int
  failures_lt?: Int
  failures_lte?: Int
  failures_gt?: Int
  failures_gte?: Int
}

export interface RunUpdateWithWhereUniqueNestedInput {
  where: RunWhereUniqueInput
  data: RunUpdateDataInput
}

export interface BenchmarkingSessionUpsertWithoutRunsInput {
  update: BenchmarkingSessionUpdateWithoutRunsDataInput
  create: BenchmarkingSessionCreateWithoutRunsInput
}

export interface BenchmarkedQueryWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface BenchmarkedQueryWhereInput {
  AND?: BenchmarkedQueryWhereInput[] | BenchmarkedQueryWhereInput
  OR?: BenchmarkedQueryWhereInput[] | BenchmarkedQueryWhereInput
  NOT?: BenchmarkedQueryWhereInput[] | BenchmarkedQueryWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  query?: String
  query_not?: String
  query_in?: String[] | String
  query_not_in?: String[] | String
  query_lt?: String
  query_lte?: String
  query_gt?: String
  query_gte?: String
  query_contains?: String
  query_not_contains?: String
  query_starts_with?: String
  query_not_starts_with?: String
  query_ends_with?: String
  query_not_ends_with?: String
  runs_every?: RunWhereInput
  runs_some?: RunWhereInput
  runs_none?: RunWhereInput
}

export interface RunSubscriptionWhereInput {
  AND?: RunSubscriptionWhereInput[] | RunSubscriptionWhereInput
  OR?: RunSubscriptionWhereInput[] | RunSubscriptionWhereInput
  NOT?: RunSubscriptionWhereInput[] | RunSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: RunWhereInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface LatencyPreviousValues {
  id: ID_Output
  rps: Int
  avg: Float
  p50: Float
  p95: Float
  p99: Float
  successes: Int
  failures: Int
}

/*
 * A connection to a list of items.

 */
export interface BenchmarkingSessionConnection {
  pageInfo: PageInfo
  edges: BenchmarkingSessionEdge[]
  aggregate: AggregateBenchmarkingSession
}

export interface RunSubscriptionPayload {
  mutation: MutationType
  node?: Run
  updatedFields?: String[]
  previousValues?: RunPreviousValues
}

export interface BenchmarkedQuery extends Node {
  id: ID_Output
  name: String
  query: String
  runs?: Run[]
}

/*
 * A connection to a list of items.

 */
export interface LatencyConnection {
  pageInfo: PageInfo
  edges: LatencyEdge[]
  aggregate: AggregateLatency
}

export interface AggregateLatency {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface RunEdge {
  node: Run
  cursor: String
}

export interface BatchPayload {
  count: Long
}

export interface AggregateBenchmarkedQuery {
  count: Int
}

export interface BenchmarkingSession extends Node {
  id: ID_Output
  queriesToRun: Int
  queriesRun: Int
  started: DateTime
  finished?: DateTime
  runs?: Run[]
}

/*
 * A connection to a list of items.

 */
export interface BenchmarkedQueryConnection {
  pageInfo: PageInfo
  edges: BenchmarkedQueryEdge[]
  aggregate: AggregateBenchmarkedQuery
}

export interface Latency extends Node {
  id: ID_Output
  rps: Int
  avg: Float
  p50: Float
  p95: Float
  p99: Float
  successes: Int
  failures: Int
}

/*
 * An edge in a connection.

 */
export interface BenchmarkingSessionEdge {
  node: BenchmarkingSession
  cursor: String
}

export interface RunPreviousValues {
  id: ID_Output
  connector: Connector
  version: String
  importFile: Int
  commit: String
  startedAt: DateTime
  finishedAt: DateTime
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface BenchmarkingSessionSubscriptionPayload {
  mutation: MutationType
  node?: BenchmarkingSession
  updatedFields?: String[]
  previousValues?: BenchmarkingSessionPreviousValues
}

export interface AggregateRun {
  count: Int
}

export interface BenchmarkedQueryPreviousValues {
  id: ID_Output
  name: String
  query: String
}

export interface BenchmarkedQuerySubscriptionPayload {
  mutation: MutationType
  node?: BenchmarkedQuery
  updatedFields?: String[]
  previousValues?: BenchmarkedQueryPreviousValues
}

export interface Run extends Node {
  id: ID_Output
  session?: BenchmarkingSession
  latencies?: Latency[]
  connector: Connector
  version: String
  importFile: Int
  commit: String
  startedAt: DateTime
  finishedAt: DateTime
}

export interface BenchmarkingSessionPreviousValues {
  id: ID_Output
  queriesToRun: Int
  queriesRun: Int
  started: DateTime
  finished?: DateTime
}

/*
 * A connection to a list of items.

 */
export interface RunConnection {
  pageInfo: PageInfo
  edges: RunEdge[]
  aggregate: AggregateRun
}

/*
 * An edge in a connection.

 */
export interface LatencyEdge {
  node: Latency
  cursor: String
}

export interface LatencySubscriptionPayload {
  mutation: MutationType
  node?: Latency
  updatedFields?: String[]
  previousValues?: LatencyPreviousValues
}

export interface AggregateBenchmarkingSession {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface BenchmarkedQueryEdge {
  node: BenchmarkedQuery
  cursor: String
}

export type DateTime = Date | string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string