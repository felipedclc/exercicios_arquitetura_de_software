const mongoConnection = require('./mongoConnection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return mongoConnection() // retorna uma lista de autores
    .then((db) => db.collection('authors').find().toArray()) // acessando a collection do mongo
    .then((authors) => {
      return authors.map(({ _id, firstName, middleName, lastName }) => { 
        return {
          id: _id,
          firstName: firstName, // quando a chave e o valor são iguais não precisa colocar os 2 
          middleName,
          lastName, 
        }
      });
    });
};

const findById = async (id) => {
  const authorData = await mongoConnection()
    .then((db) => db.collection('authors').findOne(ObjectId(id)));

    if (!authorData) return null;

    const { firstName, middleName, lastName } = authorData;

    return {
      id,
      firstName,
      middleName,
      lastName,
    };
}

const create = async (firstName, middleName, lastName) => {
  await mongoConnection()
    .then((db) => db.collection('authors').insertOne({ firstName, middleName, lastName }));
}

module.exports = {
  getAll,
  findById,
  create,
}