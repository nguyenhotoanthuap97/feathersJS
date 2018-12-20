const MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const app = express(feathers());
//json parsing
app.use(express.json());

//url encoder body parsing
app.use(express.urlencoded({
  extends: true
}));
//set up rest transport
app.configure(express.rest());
app.configure(socketio());

app.on('connection', connection => app.channel('everybody').join(connection));

app.publish(() => app.channel('everybody'));

//error handler
app.use(express.errorHandler());

app.use((req, res, next) => {
  console.log(`Incomming request!!! with req: ${JSON.stringify(req.body)}`);
  next();
})

MongoClient.connect('mongodb://localhost:27017/Feathers').then(client => {
  app.use('mongotest', service({
    Model: client.db('Feathers').collection('products')
  }));
  app.service('mongotest').hooks({
    before: {
      create: async context => {
        context.data.createAt = new Date();
        context.data.updateAt = new Date();
        return context;
      },
      update: async context => {
        context.data.updateAt = new Date();
        return context;
      },
      patch: async context => {
        context.data.updateAt = new Date();
        return context;
      },
      find: async context => {
        context.params.query = {
          type: 'accessory'
        };
        return context;
      }
    },
    error: async context => {
      context.result = {
        error: context.error
      }
      context.error = '';
      console.error(`Error	in	'${context.path}'	service	method	'${context.method}'`);
      return context;
    }
  });
});

app.listen(8088, () => {
  console.log('Server starts on port 8088');
})