const router = require('express').Router();
const fs = require('fs');
// const db = require('../../db/db.json');
const uniqid = require('uniqid');


// GET /notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));
        res.json(data)
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


module.exports = router;