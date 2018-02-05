const path = require('path')
exports = module.exports = function (prog) {
  process.on('unhandledRejection', function (err) {
    console.error(err)
  })
}