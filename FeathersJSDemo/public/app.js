// const feathers = require('@feathersjs/feathers');
const app = feathers();

app.use('test', {
  async get(name) {
    return {
      name,
      message: `My name is ${name}`
    };
  }
});

async function getTest(name) {
  const service = app.service('test');
  const test = await service.get(name);

  console.log(test);
}

getTest('Toàn Thư');