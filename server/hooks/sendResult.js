module.exports = (context) => {
  if (context.params?.socket) {
    const message = {
      method: context.method,
      service: '/' + context.path
    }
  
    if (context.result) {
      switch (context.method) {
        case 'find':
          message.data = context.result
          context.app.service('/api/system/messages').sendToSocket(context.params.socket, message, context.params.socket)
          break
        case 'get':
          if (context.params.socket) {
            message.data = context.result
            context.app.service('/api/system/messages').sendToSocket(context.params.socket, message, context.params.socket)
          }
          break
        default:
          if (context.params.ack) {
            message.data = context.result
            context.app.service('/api/system/messages').sendToSocket(context.params.socket, message, context.params.socket)
          }
          break
      }
    }
  
    if (context.error) {
      message.data = context.error.message
      context.app.service('/api/system/messages').sendToSocket(context.params.socket, message, context.params.socket)
    }
  }
}
