var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.get('/', function(req, res, next) {
    const data = {
        name: "Markus Holmberg",
        placeofbirth: "Singapore",
        about: "I'm 21 years old. Studying my third year of Webprogramming at Blekinge Institute of Technology"
    };
    res.json(data);

});

module.exports = router;
