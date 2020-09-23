const express = require('express');
const router = express.Router();
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

    userId = req.body.userId;
    category = req.body.category;
    userName = req.body.userName;
    placeName = req.body.placeName;
    placeId = req.body.placeId;
    chosenTime = req.body.chosenTime;
    chosenDate = req.body.chosenDate;
    reservationDate = req.body.reservationDate;
    reservationTime = req.body.reservationTime;

    sqlQuery = `INSERT INTO reservations(user_id, category, user_name, place_name, place_id, chosen_time, chosen_date, reservation_time, reservation_date) VALUES('${userId}', '${category}', '${userName}', '${placeName}', '${placeId}', '${chosenTime}', '${chosenDate}', '${reservationTime}', '${reservationDate}')`;

    try {
        con.query(sqlQuery, function (err) {
            if (err) {
                res.sendStatus(202);
            } else {
                tableName = category.toLowerCase();

                sqlQuery2 = `UPDATE ${tableName} SET places = places - 1 WHERE id = '${placeId}'`;
                console.log(sqlQuery2);
                try {
                    con.query(sqlQuery2, function (err) {
                        if (err) {
                            res.sendStatus(202);
                        } else {
                            console.log("1 reservation inserted");
                            res.sendStatus(201);
                        }
                    });
                } catch {
                    console.log('Error in reservations.js (Inner SQL Statment)');
                }
            }
        });
    } catch {
        console.log('Error in reservations.js');
    }

});


module.exports = router;