

const addCreatedDate = require('../../hooks/add-created-date');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [addCreatedDate()],
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
};
