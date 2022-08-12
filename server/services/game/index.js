const netcodeServers = require('./netcode_servers')
const playerPosition = require('./player_position')
const markers = require('./markers')
const events = require('./events')

module.exports = function (app) {
  app.configure(netcodeServers)
  app.configure(playerPosition)
  app.configure(markers)
  app.configure(events)
}
