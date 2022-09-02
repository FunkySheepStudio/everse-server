const Services = require('./services')
const ServicesFields = require('./services_fields')
const logger = require('./logger')
const users = require('./users')
const authentication = require('./authentication')
const connections = require('./connections')
const messages = require('./messages')

module.exports = function (app) {
  app.configure(Services)
  app.configure(ServicesFields)
  app.configure(logger)
  app.configure(users)
  app.configure(authentication)
  app.configure(connections)
  app.configure(messages)
}
