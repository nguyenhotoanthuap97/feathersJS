// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.log('New products was created!!!');
    
    context.data = {
      name: context.data.name,
      type: context.data.type,
      price: context.data.price,
      createAt: new Date().getTime()
    }

    return context;
  };
};
