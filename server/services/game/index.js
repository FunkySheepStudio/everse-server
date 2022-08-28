const netcodeServers = require('./netcode_servers')
const netcodeServersOutput = require('./netcode_servers_output')
const playerPosition = require('./player_position')
const markers = require('./markers')
const events = require('./events')
const buildings = require('./buildings')
const buildingsModels = require('./buildings_models')

module.exports = function (app) {
  app.configure(netcodeServers)
  app.configure(netcodeServersOutput)
  app.configure(playerPosition)
  app.configure(markers)
  app.configure(events)
  app.configure(buildings)
  app.configure(buildingsModels)
}
