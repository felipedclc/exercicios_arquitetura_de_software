const SongService = require('../services/songService');

const findaAllSongs = async (_req, res, _next) => {
  const songs = await SongService.findAll();
  
  return res.status(200).json(songs);
}

const findSongById = async (req, res, _next) => {
  const { id } = req.params;

  const song = await SongService.findById(id);

  return res.status(200).json(song);
}

const createSong = async (req, res, next) => {
  const { name, album } = req.body; // atributos do objeto song

  const newSong = await SongService.createSong(name, album);

  if (!newSong) return res.status(400).json({ message: 'Música já cadastrada' });

  return res.status(201).json(newSong);
}

module.exports = {
  findaAllSongs,
  findSongById,
  createSong,
}