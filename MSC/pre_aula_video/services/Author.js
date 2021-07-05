const Author = require('../models/mongoAuthor');

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

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;

  return true;
}

const getAll = async () => {
  const authors = await Author.getAll();

  return authors.map(getNewAuthor); // formatando os campos
}

const findById = async (id) => {
  const auth = await Author.findById(id);

  return getNewAuthor(auth);
}

const create = async (firstName, middleName, lastName) => {
  const authorIsValid = isValid(firstName, middleName, lastName);

  if (!authorIsValid) return false;
      // insertedId mongoDB
  const { insertedId } = await Author.create(firstName, middleName, lastName); 

  return getNewAuthor({
    id: insertedId,
    firstName,
    middleName,
    lastName,
  });
}

module.exports = {
  getAll,
  findById,
  create,
}