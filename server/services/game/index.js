const netcodeServers = require('./netcode_servers')
const playerPosition = require('./player_position')
const markers = require('./markers')

module.exports = function (app) {
  app.configure(netcodeServers)
  app.configure(playerPosition)
  app.configure(markers)
}
