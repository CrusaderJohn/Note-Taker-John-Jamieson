const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

const PORT = 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/pets', (req, res) => res.json(petData));

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});