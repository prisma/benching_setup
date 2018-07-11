import { fill } from './fill'

fill({
  endpoint: 'http://localhost:4466',
  totalCount: 5000,
  concurrency: 10,
  batchSize: 1,
})
