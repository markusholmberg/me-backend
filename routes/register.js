var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require("bcrypt");
// const myPlaintextPassword = 'longandhardP4$$w0rD';
// const hash = 'superlonghashedpasswordfetchedfromthedatabase';


router.post('/', (req, res, next) => {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.run("INSERT INTO users (firstname, lastname, email, password, year, month, day) VALUES (?, ?, ?, ?, ?, ?, ?)",
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        hash,
        req.body.year,
        req.body.month,
        req.body.day, err => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            } else {
                res.status(201).send();
            }
        });
    })
});

module.exports = router;
