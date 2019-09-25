const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
// const saltRounds = 10;
// const myPlaintextPassword = 'longandhardP4$$w0rD';
// const hash = 'superlonghashedpasswordfetchedfromthedatabase';

const index = require('./routes/index');
const hello = require('./routes/hello');
const reports = require('./routes/reports');
const register = require('./routes/register');
const login = require('./routes/login');

const port = 8333;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
// const payload = { email: "user@example.com" };
// const secret = process.env.JWT_SECRET;

// const token = jwt.sign(payload, secret, { expiresIn: '1h'});
//
// jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
//     if (err) {
//         // not a valid token
//     }
//
//     // valid token
// });

app.use(cors());
//
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // spara lösenord i databasen.
// });
//
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res innehåller nu true eller false beroende på om det är rätt lösenord.
// });

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}



app.use('/', index);
app.use('/hello', hello);
app.use("/reports", reports);
app.use("/register", register);
app.use("/login", login);

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// router.post("/reports",
//     (req, res, next) => checkToken(req, res, next),
//     (req, res) => reports.addReport(res, req.body));
//
// function checkToken(req, res, next) {
//     const token = req.headers['x-access-token'];
//
//     jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
//         if (err) {
//             // send error response
//         }
//
//         // Valid token send on the request
//         next();
//     });
// }

// Add a route


app.get("/hello/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});



// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
