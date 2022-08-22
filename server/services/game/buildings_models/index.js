const path = require('path')
const slash = require('slash')
const multer = require('multer')

const createModel = require('./model')
const { Service } = require('./class')
const hooks = require('./hooks')

// Build dynamicly the api path
const api = slash(path.relative(process.cwd(), __dirname)).replace('server/services', '/api')

module.exports = (app) => {
  const options = {
    _id: api,
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use(options._id, new Service(options, app))
  const service = app.service(options._id)

  service.hooks(hooks)

  //  Routes to files publishing and downloading
  const filesDirectory = path.join(app.get('homePath'), 'files')
  const upload = multer({ dest: filesDirectory })
  app.post('/buildings_models', upload.single(), (req, res, next) => {
    if (req.file) {
      service.create(
        {
          _id: req.file.filename,
          building_id: req.file.originalname,
          index: 0
        })
      res.send(req.file.filename)
    }
  })

  app.get('/buildings_models:file(*)', (req, res) => {
    const file = req.params.file
    const fileLocation = path.join(filesDirectory, file)
    res.download(fileLocation, file + '.obj')
  })
}
