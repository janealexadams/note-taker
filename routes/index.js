const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {readFromFile, writeToFile} = require('../helpers/fsUtils');

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// GET route to return a specific note
router.get('/notes/:id', (req, res) => {
    const requestedNote = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === requestedNote);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });

// POST route for a new tip
router.post('/notes', async (req, res) => {
    let notes = await readFromFile('./db/db.json');
    let parseNotes = JSON.parse(notes);
    const {title,text} = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4(),
    };

    parseNotes.push(newNote)
    const updatedNotes = await writeToFile('./db/db.json', JSON.stringify(parseNotes))
    res.json(updatedNotes);
});

// DELETE Route 
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((parseNotes) => JSON.parse(parseNotes))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', JSON.stringify(result));
  
        // Respond to the DELETE request
        res.json(`Note has been deleted 🗑️`);
      });
  });


module.exports = router;