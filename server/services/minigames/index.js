const planes = require('./planes')

module.exports = function (app) {
  app.configure(planes)
}
