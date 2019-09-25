var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const jwt = require('jsonwebtoken');
require("dotenv").config();


router.get('/week/:id', function(req, res, next) {
    db.all(`SELECT * FROM reports WHERE week = ?;`, req.params.id, (error, rows) => {
        if (error) {
            res.status(400).json({"error": error.message});
            return;
        }
        res.json({
            "data":rows
        })
    });
});



router.post("/week/:id", function(req, res, next) {
    const week = req.body.week;
    const data = req.body.report;
    const token = req.body.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            res.status(401).send({"error": "You are not authorized!"})
        }
        db.run(`INSERT INTO reports (week, report) VALUES (?, ?);`, [week, data], (error, rows) => {
            if (error) {
                res.status(500).send({"error": error.message});
                return;
            }
            res.json({
                "message": "success",
                "data": rows,
                "token": token
            })
        })
    });


})

router.post("/week/:id/update", function(req, res, next) {
    const week = req.body.week;
    const data = req.body.report;
    const token = req.body.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            res.send(401).json({"error": "You are not authorized!"})
        }
        db.run(`UPDATE reports SET report = ? WHERE week = ?;`, [data, week], (error, rows) => {
            if (error) {
                res.status(500).send({"error": error.message});
                return;
            }
            res.json({
                "message": "success",
                "data": rows,
                "token": req.body.token
            })
        })
    });


})

module.exports = router;
