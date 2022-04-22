const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/notes", (req,res) => {
   
    const { title, note} = req.body;
   
    if (title && note) { 
        const newNote = {
            title,
            note,
        };
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note')
    }
});


app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));