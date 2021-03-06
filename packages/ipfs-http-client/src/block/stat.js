'use strict'

const CID = require('cids')
const configure = require('../lib/configure')
const toUrlSearchParams = require('../lib/to-url-search-params')

module.exports = configure(api => {
  return async (cid, options = {}) => {
    const res = await api.post('block/stat', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: new CID(cid).toString(),
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return { cid: new CID(data.Key), size: data.Size }
  }
})
