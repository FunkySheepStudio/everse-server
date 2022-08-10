const ServiceClass = require('../../service.class')
const Client = require('bitcoin-core');

exports.Service = class Service extends ServiceClass {
  setup (app) {
    super.setup()
    this._find()
      .then((servers) => {
        servers.data.forEach(server => {
          this.Connect(server)  
        });
      })
  }

  Connect (server) {
    try {
      const client = new Client(
        {
          host: server.address,
          port: server.port,
          network: server.network,
          username: server.login,
          password: server.password
        }
      )
      this.Ping(client, server)
    } catch (error) {
      this.patch(server._id, {
        online: false
      })
    }

    //client.getBalance().then(result => console.log(result))
    //client.loadWallet('wallet.dat')
  }

  Ping(client, server)
  {
    client.ping()
    .then(() => {
      this.patch(server._id, {
        online: true
      })
    })
    .catch(() => {
      this.patch(server._id, {
        online: false
      })
    })
  }
}
