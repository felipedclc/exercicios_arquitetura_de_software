const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
const PORT = 3000

app.use(bodyParser.json());

app.post('/user', middlewares.createUser);

app.get('/user', middlewares.findAll);

app.use(middlewares.error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));