module.exports = function (context) {
  if (context.params?.socket) {
    context.data.socket = context.params.socket
  }
  return context
}
