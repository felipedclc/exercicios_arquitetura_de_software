// estrutura padrão para connectar o express no mongodb

const { MongoClient } = require('mongodb');

const mongoDB_URL = 'mongodb://127.0.0.1:27017'; // 27017(porta padrão mongo)

const mongoConnection = () => {
  return MongoClient
    .connect(mongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db('model_example'))
    .catch((err) => {
      console.log(err);
      process.exit();
    });
}

module.exports = mongoConnection;