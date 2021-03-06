'use strict'

const { BigNumber } = require('bignumber.js')
const configure = require('../lib/configure')

module.exports = configure(api => {
  return async function * bw (options = {}) {
    const res = await api.post('stats/bw', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: options,
      transform: (stats) => ({
        totalIn: new BigNumber(stats.TotalIn),
        totalOut: new BigNumber(stats.TotalOut),
        rateIn: new BigNumber(stats.RateIn),
        rateOut: new BigNumber(stats.RateOut)
      })
    })

    yield * res.ndjson()
  }
})
