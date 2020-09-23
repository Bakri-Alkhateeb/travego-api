const express = require('express');
const router = express.Router();
var crypto = require('crypto');
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

    phoneNumber = req.body.phoneNumber;
    fullName = req.body.fullName;
    password = crypto.createHash('sha256').update(req.body.password).digest('hex');

    sqlQuery = `insert into users (phone_number, password, full_name) VALUES ('${phoneNumber}', '${password}', '${fullName}')`;
    try {
        
        con.query(sqlQuery, function (err) {
            if (err) {
                res.sendStatus(202);
                console.log(err);
            } else {
                console.log("1 user added");
                res.sendStatus(201);
            }
        });

    } catch{
        console.log('Error in signup.js');
    }

});


module.exports = router;