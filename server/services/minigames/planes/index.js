const sessions = require('./sessions')
const gates = require('./gates')

module.exports = function (app) {
  app.configure(sessions)
  app.configure(gates)
}
