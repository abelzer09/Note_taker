const router = require('express').Router();
const utility = require('../db/utility');
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);




router.get(`/notes`, (req,res) => {
    readFromFile('./db/db.json').then((data) => 
    // console.log(JSON.parse(data)))
    res.json(JSON.parse(data)));
    
});

router.post('/notes', (req,res) => {
   
    const { title, text} = req.body;
    console.log(req.body)
   
    if (title && text) { 
        const newNote = {
            title,
            text,
        };
        utility.readAndAppend(newNote,'db/db.json' );

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note')
    }
});

// router.delete('/notes/:id', (req,res) => {
    
// });

module.exports = router