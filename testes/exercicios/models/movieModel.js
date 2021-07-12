const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('movies').find().toArray())
    .then((movies) => movies.map(({ _id, ...moviesData }) => ({
      id: _id, // formatando o _id do mongodb
      ...moviesData,
    })));
};

const create = async ({ title, directedBy, releaseYear }) => {
  await connection().then((db) => db.collection('movies')
    .insertOne({ title, directedBy, releaseYear }));
};

module.exports = {
  getAll,
  create,
}