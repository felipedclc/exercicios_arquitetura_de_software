const MovieModel = require('../models/movieModel');

const getNewMovie = (movieData) => {
  const { id, title, directedBy, releaseYear } = movieData;

  return { id, title, directedBy, releaseYear };
};

const isValid = (title, directedBy, releaseYear) => {
  if (!title || typeof title !== 'string') return false;
  if (!directedBy || typeof directedBy !== 'number') return false;
  if (!releaseYear || typeof releaseYear !== 'string') return false;
  
  return true;
};

const getAll = async () => {
  const movies = await MovieModel.getAll();

  return movies.map(getNewMovie);
};

const create = async (title, directedBy, releaseYear) => {
  const moviesIsValid = isValid(title, directedBy, releaseYear);

  if (!moviesIsValid) return false;

  const { id } = await MovieModel.create({ title, directedBy, releaseYear });

  return { id };
};

module.exports = {
  getAll,
  create,
};