const ServiceClass = require('../../service.class')

exports.Service = class Service extends ServiceClass {
  setup (app) {
    app.log = this.log.bind(this)
    super.setup(app)
  }

  log (err) {
    let log = {
      time: new Date().getTime(),
      message: err.message
    }

    this.create(log)
      .catch((err) => {
        console.log(err)
      })
  }
}
