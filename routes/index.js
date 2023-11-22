const router = require('express').Router();
const path = require('path');
const {readFromFile, writeToFile} = require('../helpers/fsUtils');


// GET /api/notes will read the db.json file and return all saved notes as JSON.
router.get('/notes', async (req, res) => {
    let notes = await readFromFile('./db/db.json');
    let parseNotes = JSON.parse(notes);
    res.json(parseNotes);
});


// GET route to returns a specific note
router.get('/api/notes/:id', (req, res) => {
    const requestedNote = req.params.id();
  
    // Iterate through the note id to check if it matches `req.params.id`
    for (let i = 0; i < termData.length; i++) {
      if (requestedNote === parseNotes[i].id()) {
        return res.json(parseNotes[i]);
      }
    }
  
    // Return a message if the id doesn't exist in our DB
    return res.json('No note found with that id');
  });

// GET route for retrieving notes.html.
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