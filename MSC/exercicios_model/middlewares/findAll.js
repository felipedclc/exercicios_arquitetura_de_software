const rescue = require("express-rescue");
const { findAll } = require("../models/User");

module.exports = rescue(async (req, res, next) => {
  const users = await findAll();

  // caso nenhum resultado seja encontrado, o próprio MongoDB retornará um array vazio
  return res.status(200).json(users);
});