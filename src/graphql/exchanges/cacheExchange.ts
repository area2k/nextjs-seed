import { cacheExchange as createCacheExchange } from '@urql/exchange-graphcache'

import schema from '../__generated__/schema'

export default createCacheExchange({ schema })
