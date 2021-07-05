const express = require('express');
const songController = require('./controllers/songController');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/songs', songController.findaAllSongs);
app.get('/songs/:id', songController.findSongById);
app.post('/songs', songController.createSong);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));