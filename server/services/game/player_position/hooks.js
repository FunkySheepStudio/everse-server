const sendResult = require('../../../hooks/sendResult')

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
    find: [],
    get: [sendResult],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [sendResult],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
