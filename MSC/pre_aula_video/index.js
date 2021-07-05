const bodyParser = require('body-parser');
const express = require('express');
const { getAll, findById, create } = require('./controllers/Author');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // para conseguir usar o req.body

// const author = require('./models/mysqlAuthor'); // controler não se comunica diretamente com o model
// const author = require('./models/mongoAuthor'); // controler não se comunica diretamente com o model

app.get('/authors', getAll);
app.get('/authors/:id', findById);
app.post('/authors', create);

app.listen(port, () => console.log('Online'));