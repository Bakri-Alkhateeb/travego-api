const express = require('express');
const router = express.Router();
const multer = require('multer');
const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASS}`,
})

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './restaurantsImages');
    },
    filename: function (req, file, callback) {
        callback(null, makeid(10) + "-" + file.originalname)
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('imageFile'), (req, res) => {

    imageName = req.file.path.substring(18);
    name = req.body.name;
    rate = req.body.rate;
    latitude = req.body.latitude;
    longitude = req.body.longitude;
    description = req.body.description;
    places = req.body.places;
    price = req.body.price;

    sqlQuery = `INSERT INTO restaurants(name, rate, latitude, longitude, image, description, places, price) VALUES('${name}', '${rate}', '${latitude}', '${longitude}', '${imageName}', '${description}', '${places}', '${price}');`;
    try {
        con.query(sqlQuery, function (err) {
            if (err) {
                res.sendStatus(202);
                console.log(req.file.path);
            } else {
                console.log("1 restaurant inserted");
                res.sendStatus(204);
            }
        });
    } catch{
        console.log('Error in restaurantsInsert.js');
    }

});


module.exports = router;