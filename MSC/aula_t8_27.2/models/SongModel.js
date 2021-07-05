const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findAllModel = () => connection().then((db) => db.collection('songs').find().toArray());

const findByIDModel = (id) => {
  if (!ObjectId.isValid(id)) return null

  return connection().then((db) => db.collection('songs').find({ _id: ObjectId(id) }))
}

// procurando por nome e album
const findByNameAndAlbum = (name, album) => {
  return connection().then((db) => db.collection('songs').findOne({ name, album })) // name: name
}

const createSongModel = async (name, album) => {
  const newSong = await connection()
    .then((db) => db.collection('songs').insertOne({ name, album }));
 
  return {
    id: newSong.insertedId,
    name,
    album,
  }
}

module.exports = {
  findAllModel,
  findByIDModel,
  findByNameAndAlbum,
  createSongModel,
}