const path = require('path')
const fs = require('fs/promises');

function Clean (context) {
  if (context.id == null)
  {
    context.result.forEach(item => {
      const filePath = path.join(context.app.get('homePath'), 'files', item._id)
      fs.unlink(filePath)
    })
  } else {
    const filePath = path.join(context.app.get('homePath'), 'files', context.id)
    fs.unlink(filePath)
  }
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
    find: [],
    get: [],
    create: [],
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
