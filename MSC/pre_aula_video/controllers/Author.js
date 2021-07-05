const author = require('../services/Author'); // controller comunica com o service

const getAll = async (req, res) => {
  const authors = await author.getAll();

  res.status(200).json(authors);
}

const findById = async (req, res) => {
  const { id } = req.params;
  const auth = await author.findById(id);

  if (!auth) return res.status(404).json({
    message: 'Not found'
  });

  return res.status(200).json(auth);
}

const create = async (req, res) => {
  const { first_name, middle_Name, last_name } = req.body;

  /* if (!author.isValid(first_name, middle_Name, last_name)) { // isValid ja vem do service
    return res.status(400).jsom({message: 'Dados inválidos'})
  } */

  await author.create(first_name, middle_Name, last_name);

  if (!author) return res.status(400).jsom({message: 'Dados inválidos'})

  return res.status(201).json({message: 'Autor criado com sucesso'});
}

module.exports = {
  getAll,
  findById,
  create,
}