var mongoose = require('mongoose');

var context = {};

context.generate = function () {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb+srv://pruebas:6UABIERvmLKaYRoZ@pruebas-z2cae.mongodb.net/Test?retryWrites=true", { useNewUrlParser: true })
    .then(() => console.log('Db Connection Succesful'))
    .catch((err) => console.error(err));
};

module.exports = context;