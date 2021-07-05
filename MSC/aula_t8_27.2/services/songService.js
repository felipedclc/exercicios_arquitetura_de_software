const SongModel = require('../models/SongModel');

// colocar como ponte(proxy) para o controller
const findAll = async () => {
  const songs = await SongModel.findAllModel();

  return songs;
}

const findById = async (id) => {
  const song = await SongModel.findByIDModel(id);

  return song;
}

// tirando a duplicidade para cadastro (deve ser feito na camada service)
const createSong = async (name, album) => {
  console.log('passou aqui');

  const searchSong = await SongModel.findByNameAndAlbum();
  if (searchSong) return false;
  const newSong = SongModel.create(name, album);

  console.log(newSong);
}

module.exports = {
  findAll,
  createSong,
  findById,
}