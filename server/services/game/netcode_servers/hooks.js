const os = require('node:os');
const path = require('path')
const { execFile } = require('node:child_process');

//  Set default creation values
function create (context) {
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
  const child = execFile(execPath, [], (error, stdout, stderr) => {
    if (error) {
      console.log(stderr);
      throw error;
    }
    console.log(stdout);
  });

  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [create],
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
    remove: []
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
