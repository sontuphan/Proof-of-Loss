let PoL = artifacts.require('PoL')

let instance = null;
contract('PoL', function(accounts) {
  before('get deployed contracts', async function() {
    instance = await PoL.deployed();
  })

  it('should recoverBalance', async function() {
    result = await instance.recoverBalance(accounts[1], { from: accounts[0], value: web3.toWei('1', 'ether') })
    assert(result.receipt)
    assert(result.logs)
    assert.equal(result.logs.length, 1)

    let receipt = result.receipt
    let log = result.logs[0]
    assert.equal(receipt.status, 1)
    assert.equal(log.event, 'RecoverBalance')
    assert.equal(log.args._owner, accounts[1])
    assert.equal(log.args._receiver, accounts[0])
    assert.equal(log.args._state, true)
  })
})
