const os = require('node:os')
const path = require('path')
const { execFile } = require('node:child_process')
const { kill } = require('node:process')
const crypto = require('crypto')

//  Spawn the child process
function CreateUser (context) {
  const user = {
    login: crypto.randomBytes(16).toString('hex'),
    password: crypto.randomBytes(16).toString('hex'),
    nickname: 'server_' + crypto.randomBytes(16).toString('hex'),
    admin: false,
    latitude: 0,
    longitude: 0
  }

  return context.app.service('/api/system/users').create(user)
    .then((serverUser) => {
      context.data.userLogin = user.login
      context.data.userPassword = user.password
      context.data.userId = serverUser._id
    })
    .then(() => {
      return context
    })
}

//  Spawn the child process
function DeleteUser (context) {
  return context.app.service('/api/system/users').remove(context.result.userId)
    .then(() => {
      return context
    })
}

//  Spawn the child process
function Spawn (context) {
  let execPath = path.join(__dirname, 'Builds')

  switch (os.platform()) {
    case 'win32':
      execPath = path.join(execPath, 'Win', 'Everse.exe')
      break
    case 'linux':
      execPath = path.join(execPath, 'Linux', 'netcode.x86_64')
      break
    default:
      break
  }

  const child = execFile(execPath, [context.data.userLogin, context.data.userPassword])
  context.data.pid = child.pid

  child.stdout.setEncoding('utf8')
  child.stdout.on('data', (data) => {
    context.app.service('/api/game/netcode_servers_output').create({
      pid: context.data.pid,
      type: 'log',
      data
    }).catch((err) => {
      context.app.log(err)
    })
  })

  child.stderr.on('data', (data) => {
    context.app.service('/api/game/netcode_servers_output').create({
      pid: context.data.pid,
      type: 'err',
      data
    }).catch((err) => {
      context.app.log(err)
    })
  })

  child.on('close', (data) => {
    context.app.service('/api/game/netcode_servers_output').create({
      pid: context.data.pid,
      type: 'out',
      data
    }).catch((err) => {
      context.app.log(err)
    })
  })

  return context
}

function Kill (context) {
  kill(context.result.pid)

  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [CreateUser, Spawn],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [DeleteUser, Kill]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
