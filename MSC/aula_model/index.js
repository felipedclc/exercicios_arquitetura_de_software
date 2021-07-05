const express = require('express')
const bodyParser = require('body-parser')
const characterModel = require('./model/mongoModel');

const app = express()
const PORT = 3000

app.use(bodyParser.json())

// lista todos os personagens
app.get('/characters', async (req, res) => {
  const characters = await characterModel.getAll();

  return res.status(200).json(characters)
})

// listar um unico personagem
app.get('/characters/:id', async (req, res) => {
  const {id} = req.params;

 const character = await characterModel.findOne(id); 

  return res.status(200).json(character)
})

app.post('/characters', async (req, res) => {
  const {name, cartoon} = req.body;

  const newCharacter = await characterModel.create(name, cartoon)

  return res.status(201).json(newCharacter);
})

app.put('/characters/:id', async (req, res) => {
  const {id} = req.params;
  const {name, cartoon} = req.body;

  const editedCharacter = await characterModel.edit(id, name, cartoon);

  return res.status(200).json(editedCharacter)
})

app.delete('/characters/:id', async (req, res) => {
  const {id} = req.params;

  await characterModel.exclude(id)

  return res.status(200).json({message: 'Success delete'})
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))