const path = require('path');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const Sequelize = require('sequelize');
const service = require('feathers-sequelize');

const app = express(feathers());
//json parsing
app.use(express.json());

//url encoder body parsing
app.use(express.urlencoded({extends: true}));
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
});

const sequelize = new Sequelize('feathers', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Books = sequelize.define('books',
{
  id: {type: Sequelize.INTEGER, primaryKey: true},
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  price: Sequelize.STRING
},
{
  timestamps: false
});

// const Products = sequelize.define('products',
// {
//   id: {type: Sequelize.INTEGER, primaryKey: true},
//   name: Sequelize.STRING,
//   type: Sequelize.STRING,
//   price: Sequelize.STRING,
//   createAt: Sequelize.TIME
// },
// {
//   timestamps: false
// })

app.use('books', service({
  Model: Books,
}));

app.listen(8090, () => {
  console.log('Server starts on port 8090');
})