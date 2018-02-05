const Eth = require('ethjs');
exports = module.exports = function (url, opts) {
  //ref https://github.com/ethjs/ethjs
  const eth = new Eth(new Eth.HttpProvider(url))
  return {
    eth: eth
  }
}