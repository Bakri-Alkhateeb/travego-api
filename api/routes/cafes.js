const exphotels = require('express');
const router = exphotels.Router();
const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASS}`,
})

router.get('/', (req, res) => {

    sqlQuery = 'SELECT * FROM cafes ORDER BY id ASC';

    try {
        con.query(sqlQuery, function (err, rows) {
            if (err) {
                console.log(err);
            } else {

                if (rows.length > 0) {

                    res.status(201).json({
                        cafes: rows
                    })

                } else {
                    console.error("Cafes count is 0");
                    console.log(err);
                    res.sendStatus(202);
                }
            }
        });
    } catch{
        console.log('Error in cafes.js');
    }
});

module.exports = router;