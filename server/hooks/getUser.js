module.exports = async function (context) {
  if (context.params?.socket && !context.params?.user) {
    await context.app.service('/api/system/connection').get(context.params.socket)
      .then((connection) => {
        if (connection.user != "")
        {
          context.params.user = connection.user
        } else {
          throw("Enable to find the user associated to the socket")
        }
      }).catch((err) => {
        throw(err)
      });
  }
  return context
}
