// Dispatch the incoming messages to the others services

async function dispatch (context) {
  //  Only for incoming messages to avoid loops
  if (context.data.direction === 'incoming') {
    if (!context.data.params) {
      context.data.params = {}
    }
  
    context.data.params.socket = context.data.socket
  
    //  Clean the data
    switch (context.data.request) {
      case 'find':
        context.data.params.query = context.data.data.query
  
        context.app.service(context.data.service).find(context.data.params)
          .catch((err) => {
            context.app.log(err)
          })
  
        // Stringify the query since it can contain unothaurized caracters
        context.data.data = JSON.stringify(context.data.data)
        context.data.params = JSON.stringify(context.data.params)
  
        break
      case 'get':
        context.app.service(context.data.service).get(context.data.data.key, context.data.params)
          .catch((err) => {
            context.app.log(err)
          })
        break
      case 'create':
        context.app.service(context.data.service).create(context.data.data, context.data.params)
          .catch((err) => {
            context.app.log(err)
          })
        break
      case 'update':
        context.app.service(context.data.service).update(context.data.key, context.data.data, context.data.params)
          .catch((err) => {
            context.app.log(err)
          })
        break
      case 'patch':
        context.app.service(context.data.service).patch(context.data.key, context.data.data, context.data.params)
          .catch((err) => {
            context.app.log(err)
          })
        break
      case 'remove':
        context.app.service(context.data.service).remove(context.data.key, context.data.params)
          .catch((err) => {
            context.app.log(err)
          })
        break
      default:
        break
    }
  }
  return await context.app.service('/api/system/services').get(context.data.service)
    .then((data) => {
      if (data.log_messages == false)
      {
        context.result = false;
      }

      return context
    })
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [dispatch],
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
