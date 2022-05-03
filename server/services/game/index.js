const markers = require('./markers')

module.exports = function (app) {
  app.configure(markers)
}
