const ServiceClass = require('../../service.class')
const Client = require('bitcoin-core');

exports.Service = class Service extends ServiceClass {
  setup (app) {
    super.setup()
    this.Connect()
  }

  Connect () {
    /*
    const client = new Client(
      {
        port: 18332,
        network: 'testnet',
        username: 'user',
        password: 'password'
      }
    )
    //client.loadWallet('testwallet')
    client.getBalance().then(result => console.log(result)) */
  }
}
