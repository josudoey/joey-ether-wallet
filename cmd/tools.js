module.exports = function (prog) {
  prog
    .command('contracts')
    .description('')
    .action(async function () {
      const contracts = require('../lib/contracts')
      for (const name in contracts) {
        console.log(name)
      }
    })

  prog
    .command('toCheckSumAddress <addr>')
    .description('')
    .action(async function (addr) {
      const util = require('ethereumjs-util')
      const address = util.toChecksumAddress(addr)
      console.log(address)
    })


  prog
    .command('args-encode  <contract> [args...]')
    .description('')
    .action(async function (name, args, opts) {
      const contracts = require('../lib/contracts')
      const contract = contracts[name]
      if (!contract) {
        console.error('contract not found')
        return
      }
      const ABI = require('ethjs').abi

      let constructorAbi
      for (const obj of contract.abi) {
        if (obj.type === 'constructor') {
          constructorAbi = obj
          break
        }
      }

      if (!constructorAbi) {
        console.error(`${name} contract not exists constructor args`)
        return
      }


      // getKeys([{a: 1, b: 2}, {a: 3, b: 4}], 'a') => [1, 3]
      function getKeys(params, key, allowEmpty) {
        var result = []; // eslint-disable-line

        if (!Array.isArray(params)) { throw new Error(`[ethjs-abi] while getting keys, invalid params value ${JSON.stringify(params)}`); }

        for (var i = 0; i < params.length; i++) { // eslint-disable-line
          var value = params[i][key];  // eslint-disable-line
          if (allowEmpty && !value) {
            value = '';
          } else if (typeof (value) !== 'string') {
            throw new Error('[ethjs-abi] while getKeys found invalid ABI data structure, type value not string');
          }
          result.push(value);
        }

        return result;
      }
      const types = getKeys(constructorAbi.inputs, 'type')
      const paramsEncoded = ABI.encodeParams(types, args).substring(2);
      console.log(paramsEncoded)

    })
}