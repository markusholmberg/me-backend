var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Idag är det onsdag mina dudes"
        }
    };

    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        "user@example.com",
        "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (res, err) => {
        if (err) {
            console.log(err)
        }

        return;
        console.log("User added")
    });

    res.json(data);
});

module.exports = router;
