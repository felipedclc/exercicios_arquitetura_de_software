const mysql = require('mysql2/promise')

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '104668',
  database: 'cartoons'
})

const getAll = async () => {
  const [characters] = await connection.execute('SELECT * FROM cartoons.characters');

  return characters;
}

const findOne = async (id) => {
  const [character] = await connection.execute(
    'SELECT * FROM cartoons.characters WHERE id=?', [id])

  return character;
}

const create = async (name, cartoon) => {
  const [character] = await connection.execute(
    'INSERT INTO cartoons.characters (name, cartoon) VALUES (?, ?)', [name, cartoon])

  const result = {
    id: character.insertId,
    name,
    cartoon
  }

  return result;
}

const edit = async (id, name, cartoon) => {
  await connection.execute(
    'UPDATE cartoons.characters SET name=?, cartoon=? WHERE id=?', [name, cartoon, id])

  const result = {
    id,
    name,
    cartoon
  }

  return result;
}

const exclude = async (id) => {
  await connection.execute('DELETE FROM cartoons.characters WHERE id=?', [id])

  return null
}

module.exports = {
  getAll,
  findOne,
  create,
  edit,
  exclude
}