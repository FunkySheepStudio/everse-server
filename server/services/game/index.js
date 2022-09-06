const netcodeServers = require('./netcode_servers')
const netcodeServersOutput = require('./netcode_servers_output')
const playerPosition = require('./player_position')
const playerWorldTiles = require('./player_world_tiles')
const markers = require('./markers')
const events = require('./events')
const buildings = require('./buildings')
const buildingsModels = require('./buildings_models')

module.exports = function (app) {
  app.configure(netcodeServers)
  app.configure(netcodeServersOutput)
  app.configure(playerPosition)
  app.configure(playerWorldTiles)
  app.configure(markers)
  app.configure(events)
  app.configure(buildings)
  app.configure(buildingsModels)
}
