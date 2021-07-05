const connection = require('./mysqlConnection');

const getNewAuthor = ({ id, firstName, middleName, lastName }) => {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(' ');
  return {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
  }
}

const serialize = (authorData) => { // deixando tudo em camel case
  return {
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name,
  }
}

const getAll = async () => {
  // Depois, ao executá-la, informamos um array com o id para o método `execute`.
  const [authors] = await connection.execute('SELECT * FROM authors');
  // [] - pega apenas a variavel "authors" (apenas a lista de autores)
  return authors.map(serialize).map(getNewAuthor);
};

const findById = async (id) => {
  // O `mysql2` vai realizar, de forma segura, a substituição do `?` pelo id informado.
  const [authorData] = await connection.execute('SELECT * FROM authors WHERE id=?', [id]);

  if (authorData.length === 0) return null;
  // transforma os objetos em camelCase, mesmo que retorne apenas 1 elemnto ainda é o array e olocando o [0] pegamos apenas o elemento

  const { firstName, middleName, lastName } = authorData.map(serialize)[0];

  return getNewAuthor({
    id,
    firstName,
    middleName,
    lastName
  });
}

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;

  return true;
}

const create = async (firstName, middleName, lastName) => connection.execute(
    'INSERT INTO model_example.authors (first_name, middle_name, last_name) VALUES (?, ?, ?)',
    [firstName, middleName, lastName]
  )

module.exports = {
  getAll,
  findById,
  isValid,
  create,
}