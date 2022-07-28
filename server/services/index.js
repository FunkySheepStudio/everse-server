const System = require('./system')
const game = require('./game')
const bitcoin = require('./bitcoin')

module.exports = function (app) {
  app.configure(System)
  app.configure(game)
  app.configure(bitcoin)
}
