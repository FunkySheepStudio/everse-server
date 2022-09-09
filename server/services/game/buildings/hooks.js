const sendResult = require('../../../hooks/sendResult')

function Clean (context) {
  context.app.service('/api/game/buildings_models')
    .remove(null, {
      query: {
        building_id: context.result.osm_id
      }
    })
  
  context.app.service('/api/game/buildings_materials')
    .remove(null, {
      query: {
        building_id: context.result.osm_id
      }
    })
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [sendResult],
    get: [],
    create: [sendResult],
    update: [],
    patch: [],
    remove: [Clean]
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
