const servers = require('./servers')

module.exports = function (app) {
  app.configure(servers)
}
