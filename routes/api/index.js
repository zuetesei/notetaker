const router = require('express').Router();
const fs = require('fs');
// const db = require('../../db/db.json');
const uniqid = require('uniqid');


// GET /notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', (req, res) => {
    // const data = await fs.readFile("./db/db.json")
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data)
        res.json(notes)
    })
})

// POST /notes should receive a new note to save on the request body, 
// add it to the db.json file,
// then return the new note to the client
router.post('/api/notes', (req, res) => {
    let newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    }
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;

        let newData = JSON.parse(data);
        console.log(newData);
        newData.push(newNote)

        fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
            if (err) throw err;

            res.send('Note successfully added.');
        })
    })
})

// DELETE /notes/:id should receive a query parameter containing the id of a note to delete
router.delete('/api/notes/:id', (req, res) => {
    // read all the notes 
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data)
        notes = notes.filter(({ id }) => id !== req.params.id)
        // console.log(id)
        // console.log(notes)
        res.json(notes)

        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
            if (err) throw err;
        })
    })
})

module.exports = router;