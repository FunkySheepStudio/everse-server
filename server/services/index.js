const System = require('./system')
const game = require('./game')

module.exports = function (app) {
  app.configure(System)
  app.configure(game)
}
