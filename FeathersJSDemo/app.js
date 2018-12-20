const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

const app = express(feathers());

//json parsing
app.use(express.json());

//url encoder body parsing
app.use(express.urlencoded({extends: true}));
//set up rest transport
app.configure(express.rest());
//error handler
app.use(express.errorHandler());

class Messages {
  constructor() {
    this.messages = [];
    this.currentId = 0;
  }

  async find(params) {
    return this.messages
  }

  async get(id, params) {
    const message = this.messages.find(message => message.id === parseInt(id, 10));

    if (!message) {
      throw new Error(`Message with ${id}'s not found!`);
    }
    return message;
  }
  
  async create(data, params) {
    const message = Object.assign({
      id: ++this.currentId
    }, data);

    this.messages.push(message);

    return message;
  }

  async patch(id, data, params) {
    const message = await this.get(id);
    return Object.assign(message, data);
  }

  async remove(id, params) {
    const message = await this.get(id);
    const index = this.messages.indexOf(message);

    this.messages.splice(index, 1);

    return message;
  }
}

app.use((req, res, next) => {
  console.log('Incomming request!!!');
  next();
})

app.use('messages', new Messages());

app.listen(8008, () => {
  console.log('listen on port 8008')
});