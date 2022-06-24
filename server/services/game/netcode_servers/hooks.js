const os = require('node:os');
const path = require('path')
const { execFile } = require('node:child_process')
const { kill } = require('node:process')

//  Spawn the child process
function Spawn (context) {
  let execPath = path.join(__dirname, 'Builds')

  switch (os.platform()) {
    case 'win32':
      execPath = path.join(execPath, 'Win', 'Everse.exe')
      break;
    case 'linux':
      execPath = path.join(execPath, 'Linux', 'netcode.x86_64')
      break;
    default:
      break;
  }
  const child = execFile(execPath)
  context.data.pid = child.pid

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
    create: [Spawn],
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
    remove: [Kill]
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
