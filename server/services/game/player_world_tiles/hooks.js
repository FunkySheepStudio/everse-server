const SetSocket = require('../../../hooks/setSocket')

function SendAssets (context) {
  context.app.service('/api/game/buildings')
    .find({
      query: {
        latitude: {
          $gte: context.data.latitude_min,
          $lte: context.data.latitude_max
        },
        longitude: {
          $gte: context.data.longitude_min,
          $lte: context.data.longitude_max
        }
      }
    })
    .then(async (buildings) => {
      const message = {
        method: 'find',
        service: '/api/game/buildings_models'
      }

      let models = []

      for (const building of buildings.data) {
        await context.app.service('/api/game/buildings_models').find({
          query: {
            building_id: building.osm_id,
            lod_level: {
              $lt: 2
            }
          }
        })
          .then((buildingsModels) => {
            buildingsModels.data = buildingsModels.data.map(obj => ({ ...obj, type: 'model' }))
            models = models.concat(buildingsModels.data)
            return models
          })

        await context.app.service('/api/game/buildings_materials').find({
          query: {
            building_id: building.osm_id,
            lod_level: {
              $lt: 2
            }
          }
        })
          .then((buildingsMaterials) => {
            buildingsMaterials.data = buildingsMaterials.data.map(obj => ({ ...obj, type: 'material' }))
            models = models.concat(buildingsMaterials.data)
            return models
          })
      }

      if (models.length !== 0) {
        message.data = models
        context.app.service('/api/system/messages').sendToSocket(context.params.socket, message)
      }
    })
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [SetSocket, SendAssets],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
