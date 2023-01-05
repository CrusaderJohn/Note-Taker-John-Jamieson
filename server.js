const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

// A function that generates a string of random numbers and letters
function uniqueID()
{
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
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
    return res.status(200).json(notes);
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    console.log(req.body);

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uniqueID(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : res.json(parsedNotes)

                );
            }
        });

        // res.send(JSON.parse(notes));
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});