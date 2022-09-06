module.exports = function (context) {
  if (context.params?.user) {
    context.data.user_id = context.params.user
  }
  return context
}
