const router = require('express').Router();
const path = require('path');
const {readFromFile, writeToFile} = require('../helpers/fsUtils');

// /api endpoint.
// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/notes', async (req, res) => {
    let notes = await readFromFile('./db/db.json');
    let parseNotes = JSON.parse(notes);
    res.json(parseNotes);
});

// GET Route for retrieving notes.html.
router.post('/notes', async (req, res) => {
    let notes = await readFromFile('./db/db.json');
    let parseNotes = JSON.parse(notes);
    const {title,text} = req.body;
    const newNote = {title,text}

    parseNotes.push(newNote)
    const updatedNotes = await writeToFile('./db/db.json', JSON.stringify(parseNotes))
    res.json(updatedNotes);
});


// DELETE Route 

module.exports = router;