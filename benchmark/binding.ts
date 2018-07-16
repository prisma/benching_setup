import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    performanceTests: <T = PerformanceTest[]>(args: { where?: PerformanceTestWhereInput, orderBy?: PerformanceTestOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    latencies: <T = Latency[]>(args: { where?: LatencyWhereInput, orderBy?: LatencyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    testRuns: <T = TestRun[]>(args: { where?: TestRunWhereInput, orderBy?: TestRunOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    performanceTestsConnection: <T = PerformanceTestConnection>(args: { where?: PerformanceTestWhereInput, orderBy?: PerformanceTestOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    latenciesConnection: <T = LatencyConnection>(args: { where?: LatencyWhereInput, orderBy?: LatencyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    testRunsConnection: <T = TestRunConnection>(args: { where?: TestRunWhereInput, orderBy?: TestRunOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createPerformanceTest: <T = PerformanceTest>(args: { data: PerformanceTestCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createLatency: <T = Latency>(args: { data: LatencyCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTestRun: <T = TestRun>(args: { data: TestRunCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPerformanceTests: <T = BatchPayload>(args: { data: PerformanceTestUpdateInput, where?: PerformanceTestWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyLatencies: <T = BatchPayload>(args: { data: LatencyUpdateInput, where?: LatencyWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTestRuns: <T = BatchPayload>(args: { data: TestRunUpdateInput, where?: TestRunWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPerformanceTests: <T = BatchPayload>(args: { where?: PerformanceTestWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyLatencies: <T = BatchPayload>(args: { where?: LatencyWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTestRuns: <T = BatchPayload>(args: { where?: TestRunWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    performanceTest: <T = PerformanceTestSubscriptionPayload | null>(args: { where?: PerformanceTestSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    latency: <T = LatencySubscriptionPayload | null>(args: { where?: LatencySubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    testRun: <T = TestRunSubscriptionPayload | null>(args: { where?: TestRunSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  PerformanceTest: (where?: PerformanceTestWhereInput) => Promise<boolean>
  Latency: (where?: LatencyWhereInput) => Promise<boolean>
  TestRun: (where?: TestRunWhereInput) => Promise<boolean>
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

const typeDefs = `type AggregateLatency {
  count: Int!
}

type AggregatePerformanceTest {
  count: Int!
}

type AggregateTestRun {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

enum Connector {
  Postgres
  MySQL
  MongoDB
}

scalar DateTime

type Latency {
  rps: Int
  median: Int
  p95: Int
  p99: Int
  successes: Int
  failures: Int
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
  rps: Int
  median: Int
  p95: Int
  p99: Int
  successes: Int
  failures: Int
}

input LatencyCreateManyInput {
  create: [LatencyCreateInput!]
}

"""An edge in a connection."""
type LatencyEdge {
  """The item at the end of the edge."""
  node: Latency!

  """A cursor for use in pagination."""
  cursor: String!
}

enum LatencyOrderByInput {
  rps_ASC
  rps_DESC
  median_ASC
  median_DESC
  p95_ASC
  p95_DESC
  p99_ASC
  p99_DESC
  successes_ASC
  successes_DESC
  failures_ASC
  failures_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type LatencyPreviousValues {
  rps: Int
  median: Int
  p95: Int
  p99: Int
  successes: Int
  failures: Int
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

input LatencyUpdateInput {
  rps: Int
  median: Int
  p95: Int
  p99: Int
  successes: Int
  failures: Int
}

input LatencyUpdateManyInput {
  create: [LatencyCreateInput!]
}

input LatencyWhereInput {
  """Logical AND on all given filters."""
  AND: [LatencyWhereInput!]

  """Logical OR on all given filters."""
  OR: [LatencyWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [LatencyWhereInput!]
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
  median: Int

  """All values that are not equal to given value."""
  median_not: Int

  """All values that are contained in given list."""
  median_in: [Int!]

  """All values that are not contained in given list."""
  median_not_in: [Int!]

  """All values less than the given value."""
  median_lt: Int

  """All values less than or equal the given value."""
  median_lte: Int

  """All values greater than the given value."""
  median_gt: Int

  """All values greater than or equal the given value."""
  median_gte: Int
  p95: Int

  """All values that are not equal to given value."""
  p95_not: Int

  """All values that are contained in given list."""
  p95_in: [Int!]

  """All values that are not contained in given list."""
  p95_not_in: [Int!]

  """All values less than the given value."""
  p95_lt: Int

  """All values less than or equal the given value."""
  p95_lte: Int

  """All values greater than the given value."""
  p95_gt: Int

  """All values greater than or equal the given value."""
  p95_gte: Int
  p99: Int

  """All values that are not equal to given value."""
  p99_not: Int

  """All values that are contained in given list."""
  p99_in: [Int!]

  """All values that are not contained in given list."""
  p99_not_in: [Int!]

  """All values less than the given value."""
  p99_lt: Int

  """All values less than or equal the given value."""
  p99_lte: Int

  """All values greater than the given value."""
  p99_gt: Int

  """All values greater than or equal the given value."""
  p99_gte: Int
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
  _MagicalBackRelation_LatencyToTestRun_every: TestRunWhereInput
  _MagicalBackRelation_LatencyToTestRun_some: TestRunWhereInput
  _MagicalBackRelation_LatencyToTestRun_none: TestRunWhereInput
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createPerformanceTest(data: PerformanceTestCreateInput!): PerformanceTest!
  createLatency(data: LatencyCreateInput!): Latency!
  createTestRun(data: TestRunCreateInput!): TestRun!
  updateManyPerformanceTests(data: PerformanceTestUpdateInput!, where: PerformanceTestWhereInput): BatchPayload!
  updateManyLatencies(data: LatencyUpdateInput!, where: LatencyWhereInput): BatchPayload!
  updateManyTestRuns(data: TestRunUpdateInput!, where: TestRunWhereInput): BatchPayload!
  deleteManyPerformanceTests(where: PerformanceTestWhereInput): BatchPayload!
  deleteManyLatencies(where: LatencyWhereInput): BatchPayload!
  deleteManyTestRuns(where: TestRunWhereInput): BatchPayload!
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

type PerformanceTest {
  name: String
  query: String
  runs(where: TestRunWhereInput, orderBy: TestRunOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TestRun!]
}

"""A connection to a list of items."""
type PerformanceTestConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PerformanceTestEdge]!
  aggregate: AggregatePerformanceTest!
}

input PerformanceTestCreateInput {
  name: String
  query: String
  runs: TestRunCreateManyInput
}

"""An edge in a connection."""
type PerformanceTestEdge {
  """The item at the end of the edge."""
  node: PerformanceTest!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PerformanceTestOrderByInput {
  name_ASC
  name_DESC
  query_ASC
  query_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PerformanceTestPreviousValues {
  name: String
  query: String
}

type PerformanceTestSubscriptionPayload {
  mutation: MutationType!
  node: PerformanceTest
  updatedFields: [String!]
  previousValues: PerformanceTestPreviousValues
}

input PerformanceTestSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PerformanceTestSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PerformanceTestSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PerformanceTestSubscriptionWhereInput!]

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
  node: PerformanceTestWhereInput
}

input PerformanceTestUpdateInput {
  name: String
  query: String
  runs: TestRunUpdateManyInput
}

input PerformanceTestWhereInput {
  """Logical AND on all given filters."""
  AND: [PerformanceTestWhereInput!]

  """Logical OR on all given filters."""
  OR: [PerformanceTestWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PerformanceTestWhereInput!]
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
  runs_every: TestRunWhereInput
  runs_some: TestRunWhereInput
  runs_none: TestRunWhereInput
}

type Query {
  performanceTests(where: PerformanceTestWhereInput, orderBy: PerformanceTestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PerformanceTest]!
  latencies(where: LatencyWhereInput, orderBy: LatencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Latency]!
  testRuns(where: TestRunWhereInput, orderBy: TestRunOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TestRun]!
  performanceTestsConnection(where: PerformanceTestWhereInput, orderBy: PerformanceTestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PerformanceTestConnection!
  latenciesConnection(where: LatencyWhereInput, orderBy: LatencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LatencyConnection!
  testRunsConnection(where: TestRunWhereInput, orderBy: TestRunOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TestRunConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  performanceTest(where: PerformanceTestSubscriptionWhereInput): PerformanceTestSubscriptionPayload
  latency(where: LatencySubscriptionWhereInput): LatencySubscriptionPayload
  testRun(where: TestRunSubscriptionWhereInput): TestRunSubscriptionPayload
}

type TestRun {
  latencies(where: LatencyWhereInput, orderBy: LatencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Latency!]
  date: DateTime
  database: Connector
  version: String
  commit: String
}

"""A connection to a list of items."""
type TestRunConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TestRunEdge]!
  aggregate: AggregateTestRun!
}

input TestRunCreateInput {
  date: DateTime
  database: Connector
  version: String
  commit: String
  latencies: LatencyCreateManyInput
}

input TestRunCreateManyInput {
  create: [TestRunCreateInput!]
}

"""An edge in a connection."""
type TestRunEdge {
  """The item at the end of the edge."""
  node: TestRun!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TestRunOrderByInput {
  date_ASC
  date_DESC
  database_ASC
  database_DESC
  version_ASC
  version_DESC
  commit_ASC
  commit_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TestRunPreviousValues {
  date: DateTime
  database: Connector
  version: String
  commit: String
}

type TestRunSubscriptionPayload {
  mutation: MutationType!
  node: TestRun
  updatedFields: [String!]
  previousValues: TestRunPreviousValues
}

input TestRunSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TestRunSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TestRunSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TestRunSubscriptionWhereInput!]

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
  node: TestRunWhereInput
}

input TestRunUpdateInput {
  date: DateTime
  database: Connector
  version: String
  commit: String
  latencies: LatencyUpdateManyInput
}

input TestRunUpdateManyInput {
  create: [TestRunCreateInput!]
}

input TestRunWhereInput {
  """Logical AND on all given filters."""
  AND: [TestRunWhereInput!]

  """Logical OR on all given filters."""
  OR: [TestRunWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TestRunWhereInput!]
  date: DateTime

  """All values that are not equal to given value."""
  date_not: DateTime

  """All values that are contained in given list."""
  date_in: [DateTime!]

  """All values that are not contained in given list."""
  date_not_in: [DateTime!]

  """All values less than the given value."""
  date_lt: DateTime

  """All values less than or equal the given value."""
  date_lte: DateTime

  """All values greater than the given value."""
  date_gt: DateTime

  """All values greater than or equal the given value."""
  date_gte: DateTime
  database: Connector

  """All values that are not equal to given value."""
  database_not: Connector

  """All values that are contained in given list."""
  database_in: [Connector!]

  """All values that are not contained in given list."""
  database_not_in: [Connector!]
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
  latencies_every: LatencyWhereInput
  latencies_some: LatencyWhereInput
  latencies_none: LatencyWhereInput
  _MagicalBackRelation_PerformanceTestToTestRun_every: PerformanceTestWhereInput
  _MagicalBackRelation_PerformanceTestToTestRun_some: PerformanceTestWhereInput
  _MagicalBackRelation_PerformanceTestToTestRun_none: PerformanceTestWhereInput
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type PerformanceTestOrderByInput =   'name_ASC' |
  'name_DESC' |
  'query_ASC' |
  'query_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type TestRunOrderByInput =   'date_ASC' |
  'date_DESC' |
  'database_ASC' |
  'database_DESC' |
  'version_ASC' |
  'version_DESC' |
  'commit_ASC' |
  'commit_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Connector =   'Postgres' |
  'MySQL' |
  'MongoDB'

export type LatencyOrderByInput =   'rps_ASC' |
  'rps_DESC' |
  'median_ASC' |
  'median_DESC' |
  'p95_ASC' |
  'p95_DESC' |
  'p99_ASC' |
  'p99_DESC' |
  'successes_ASC' |
  'successes_DESC' |
  'failures_ASC' |
  'failures_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export interface LatencyUpdateManyInput {
  create?: LatencyCreateInput[] | LatencyCreateInput
}

export interface PerformanceTestWhereInput {
  AND?: PerformanceTestWhereInput[] | PerformanceTestWhereInput
  OR?: PerformanceTestWhereInput[] | PerformanceTestWhereInput
  NOT?: PerformanceTestWhereInput[] | PerformanceTestWhereInput
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
  runs_every?: TestRunWhereInput
  runs_some?: TestRunWhereInput
  runs_none?: TestRunWhereInput
}

export interface TestRunUpdateManyInput {
  create?: TestRunCreateInput[] | TestRunCreateInput
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

export interface PerformanceTestUpdateInput {
  name?: String
  query?: String
  runs?: TestRunUpdateManyInput
}

export interface PerformanceTestSubscriptionWhereInput {
  AND?: PerformanceTestSubscriptionWhereInput[] | PerformanceTestSubscriptionWhereInput
  OR?: PerformanceTestSubscriptionWhereInput[] | PerformanceTestSubscriptionWhereInput
  NOT?: PerformanceTestSubscriptionWhereInput[] | PerformanceTestSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PerformanceTestWhereInput
}

export interface LatencyCreateInput {
  rps?: Int
  median?: Int
  p95?: Int
  p99?: Int
  successes?: Int
  failures?: Int
}

export interface TestRunWhereInput {
  AND?: TestRunWhereInput[] | TestRunWhereInput
  OR?: TestRunWhereInput[] | TestRunWhereInput
  NOT?: TestRunWhereInput[] | TestRunWhereInput
  date?: DateTime
  date_not?: DateTime
  date_in?: DateTime[] | DateTime
  date_not_in?: DateTime[] | DateTime
  date_lt?: DateTime
  date_lte?: DateTime
  date_gt?: DateTime
  date_gte?: DateTime
  database?: Connector
  database_not?: Connector
  database_in?: Connector[] | Connector
  database_not_in?: Connector[] | Connector
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
  latencies_every?: LatencyWhereInput
  latencies_some?: LatencyWhereInput
  latencies_none?: LatencyWhereInput
  _MagicalBackRelation_PerformanceTestToTestRun_every?: PerformanceTestWhereInput
  _MagicalBackRelation_PerformanceTestToTestRun_some?: PerformanceTestWhereInput
  _MagicalBackRelation_PerformanceTestToTestRun_none?: PerformanceTestWhereInput
}

export interface PerformanceTestCreateInput {
  name?: String
  query?: String
  runs?: TestRunCreateManyInput
}

export interface TestRunCreateManyInput {
  create?: TestRunCreateInput[] | TestRunCreateInput
}

export interface TestRunCreateInput {
  date?: DateTime
  database?: Connector
  version?: String
  commit?: String
  latencies?: LatencyCreateManyInput
}

export interface LatencyCreateManyInput {
  create?: LatencyCreateInput[] | LatencyCreateInput
}

export interface TestRunUpdateInput {
  date?: DateTime
  database?: Connector
  version?: String
  commit?: String
  latencies?: LatencyUpdateManyInput
}

export interface TestRunSubscriptionWhereInput {
  AND?: TestRunSubscriptionWhereInput[] | TestRunSubscriptionWhereInput
  OR?: TestRunSubscriptionWhereInput[] | TestRunSubscriptionWhereInput
  NOT?: TestRunSubscriptionWhereInput[] | TestRunSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TestRunWhereInput
}

export interface LatencyWhereInput {
  AND?: LatencyWhereInput[] | LatencyWhereInput
  OR?: LatencyWhereInput[] | LatencyWhereInput
  NOT?: LatencyWhereInput[] | LatencyWhereInput
  rps?: Int
  rps_not?: Int
  rps_in?: Int[] | Int
  rps_not_in?: Int[] | Int
  rps_lt?: Int
  rps_lte?: Int
  rps_gt?: Int
  rps_gte?: Int
  median?: Int
  median_not?: Int
  median_in?: Int[] | Int
  median_not_in?: Int[] | Int
  median_lt?: Int
  median_lte?: Int
  median_gt?: Int
  median_gte?: Int
  p95?: Int
  p95_not?: Int
  p95_in?: Int[] | Int
  p95_not_in?: Int[] | Int
  p95_lt?: Int
  p95_lte?: Int
  p95_gt?: Int
  p95_gte?: Int
  p99?: Int
  p99_not?: Int
  p99_in?: Int[] | Int
  p99_not_in?: Int[] | Int
  p99_lt?: Int
  p99_lte?: Int
  p99_gt?: Int
  p99_gte?: Int
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
  _MagicalBackRelation_LatencyToTestRun_every?: TestRunWhereInput
  _MagicalBackRelation_LatencyToTestRun_some?: TestRunWhereInput
  _MagicalBackRelation_LatencyToTestRun_none?: TestRunWhereInput
}

export interface LatencyUpdateInput {
  rps?: Int
  median?: Int
  p95?: Int
  p99?: Int
  successes?: Int
  failures?: Int
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface TestRunPreviousValues {
  date?: DateTime
  database?: Connector
  version?: String
  commit?: String
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

export interface AggregateTestRun {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface PerformanceTestConnection {
  pageInfo: PageInfo
  edges: PerformanceTestEdge[]
  aggregate: AggregatePerformanceTest
}

/*
 * An edge in a connection.

 */
export interface TestRunEdge {
  node: TestRun
  cursor: String
}

export interface Latency {
  rps?: Int
  median?: Int
  p95?: Int
  p99?: Int
  successes?: Int
  failures?: Int
}

export interface AggregateLatency {
  count: Int
}

export interface TestRun {
  latencies?: Latency[]
  date?: DateTime
  database?: Connector
  version?: String
  commit?: String
}

/*
 * A connection to a list of items.

 */
export interface LatencyConnection {
  pageInfo: PageInfo
  edges: LatencyEdge[]
  aggregate: AggregateLatency
}

export interface PerformanceTest {
  name?: String
  query?: String
  runs?: TestRun[]
}

/*
 * An edge in a connection.

 */
export interface PerformanceTestEdge {
  node: PerformanceTest
  cursor: String
}

export interface PerformanceTestSubscriptionPayload {
  mutation: MutationType
  node?: PerformanceTest
  updatedFields?: String[]
  previousValues?: PerformanceTestPreviousValues
}

export interface BatchPayload {
  count: Long
}

export interface LatencySubscriptionPayload {
  mutation: MutationType
  node?: Latency
  updatedFields?: String[]
  previousValues?: LatencyPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface TestRunConnection {
  pageInfo: PageInfo
  edges: TestRunEdge[]
  aggregate: AggregateTestRun
}

export interface LatencyPreviousValues {
  rps?: Int
  median?: Int
  p95?: Int
  p99?: Int
  successes?: Int
  failures?: Int
}

export interface TestRunSubscriptionPayload {
  mutation: MutationType
  node?: TestRun
  updatedFields?: String[]
  previousValues?: TestRunPreviousValues
}

export interface AggregatePerformanceTest {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface LatencyEdge {
  node: Latency
  cursor: String
}

export interface PerformanceTestPreviousValues {
  name?: String
  query?: String
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

export type DateTime = Date | string

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number