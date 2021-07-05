// Começamos importando a conexão com o banco
const connection = require('./connection');

// Função que remove dos documentos da collection 'users', os campos indesejados
function formatUser(document) {
  // Extraímos as propriedades `_id` e `password` e guardamos o resto das propriedades
  const { _id, password, ...user } = document;

  // Criamos um novo objeto contento os campos já formatados
  const formattedResult = { id: _id, ...user };

  return formattedResult;
};

// Criamos um método para verificar se os dados do usuário são válidos
function isValid({firstName, lastName, email, password}) {
  // Regex que valida strings de 6 ou mais caracteres alfanuméricos
  const PASSWORD_REGEX = /[a-z0-9]{6,}/ig;

  // Criamos um array para poder verificar com facilidade cada campo
  const fields = [firstName, lastName, email, password];

  // Se algum dos itens do array for `undefined`, `null`, ou uma string vazia, retornamos `false`
  if (fields.includes(undefined) || fields.includes(null) || fields.includes('')) return false;

  // Caso passe, retornaremos `true`. Caso constrário, retornaremos `false`
  return PASSWORD_REGEX.test(password);
};

// Função responsável por criar o usuário no banco de dados
function create({ firstName, lastName, email, password }) {
  // Utilizamos o `insertOne` para inserir o usuário na collection `users`
  return connection()
    .then((db) => db.collection('users')
    .insertOne({ firstName, lastName, email, password }))
    // Criando usuário, obtermos o ID gerado pelo banco e retornamos num objeto juntamente
    // com os demais dados do usuário recém-criado
    .then((result) => ({ id: result.insertedId, firstName, lastName, email }));
};

async function findAll() {
  return connection()
    .then((db) => db.collection('users').find().toArray())
    .then((users) => users.map(formatUser))
}

module.exports = {
  isValid,
  create,
  findAll,
};
