const fs = require('fs')
const path = require('path')
const globby = require('globby')
exports = module.exports = {}

const contractDir = path.join(process.cwd(), '/truffle/build/contracts')
const contractPath = globby.sync('*.json', {
  cwd: contractDir,
  absolute: false,
  nodir: true
})

for (const filename of contractPath) {
  const name = filename.replace(/.json$/, '')
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: function () {
      console.log('init')
      return require(path.join(contractDir, filename))
    }
  })
}