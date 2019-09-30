var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post('/', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    const secret = process.env.SECRET;
    const payload = { email: req.body.email };
    console.log(req.body)


    db.all(`SELECT * FROM users WHERE email = ?`, [email], (error, rows) => {
        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

        bcrypt.compare(req.body.password, rows[0].password, function(err, response) {
            if (response === true) {
                return token;
            } else {
                return false;
                console.log("Wrong password or email")
            }
        });
        if (error) {
            res.status(400).json({"error": error.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows,
            "token": token
        })
    });

});

module.exports = router;
