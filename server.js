const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

// A function that generates a string of random numbers and letters
function uniqueID()
{
    Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get reviews`);

    // Sending all reviews to the client
    return res.status(200).json(notes);
});

app.get('/favicon.ico', (req, res) => {
    console.info(`No favicon.`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});