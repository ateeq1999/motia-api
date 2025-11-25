import { RedisStateAdapter } from '@motiadev/adapter-redis-state'
import { config } from '@motiadev/core'
const statesPlugin = require('@motiadev/plugin-states/plugin')
const endpointPlugin = require('@motiadev/plugin-endpoint/plugin')
const logsPlugin = require('@motiadev/plugin-logs/plugin')
const observabilityPlugin = require('@motiadev/plugin-observability/plugin')

export default config({
  plugins: [observabilityPlugin, statesPlugin, endpointPlugin, logsPlugin],
  adapters: {
    state: new RedisStateAdapter({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    }),
  },
})