// Initializes the `user` service on path `/user`
const createService = require('feathers-mongodb');
const hooks = require('./user.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/user', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('user');

  mongoClient.then(db => {
    service.Model = db.collection('user');
  });

  service.hooks(hooks);
};
