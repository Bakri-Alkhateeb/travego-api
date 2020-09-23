const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hotelsRoutes = require('./api/routes/hotels.js')
const hotelsInsertRoutes = require('./api/routes/hotelsInsert')
const restaurantsRoutes = require('./api/routes/restaurants.js')
const restaurantsInsertRoutes = require('./api/routes/restaurantsInsert')
const cafesRoutes = require('./api/routes/cafes.js')
const cafesInsertRoutes = require('./api/routes/cafesInsert')
const loginRoutes = require('./api/routes/login')
const signupRoutes = require('./api/routes/signup')
const reservationsRoutes = require('./api/routes/reservations')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json({})
    }
    next();
})

app.use('/hotels', hotelsRoutes);
app.use('/hotelsInsert', hotelsInsertRoutes);
app.use('/restaurants', restaurantsRoutes);
app.use('/restaurantsInsert', restaurantsInsertRoutes);
app.use('/cafes', cafesRoutes);
app.use('/cafesInsert', cafesInsertRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/restaurantsImages', express.static('restaurantsImages'));
app.use('/hotelsImages', express.static('hotelsImages'));
app.use('/cafesImages', express.static('cafesImages'));

app.use('/', (req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use('/', (error, req, res, next) => {
    res.status(error.status || 500);    
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;