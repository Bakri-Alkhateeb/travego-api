const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const KEY = `${process.env.KEY}`;
const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASS}`,
})

router.post('/', (req, res) => {

    password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    phoneNumber = req.body.phoneNumber;

    const sqlQuery = `SELECT id, full_name FROM users WHERE phone_number = '${phoneNumber}' and password = '${password}';`;

    con.query(sqlQuery, function (err, rows) {

        var userId, fullName;

        try {
            if (rows.length > 0) {

                var payload = {
                    phoneNumber: req.body.phoneNumber,
                }

                rows.forEach((row) => {
                    userId = row.id;
                    fullName = row.full_name;
                });

                var token = jwt.sign(payload, KEY, { algorithm: 'HS256' });
                console.log("Logged In");

                res.status(201).json({
                    token: token,
                    id: userId,
                    fullName: fullName
                })

            } else {
                console.error("User Not Found, login.js");
                console.log(err);
                res.sendStatus(202);
            }
            
        } catch{
            console.log('Error in login.js');
        }
    });

});

module.exports = router;