var express = require('express');
var express = require('express');
const v1 = require('../controllers/v1');

var api = express.Router();

// Rutas de acceso al v1
api.get('/location', v1.getLocation);
api.get('/current/:id', v1.getCurrentWeather);
api.get('/forecast/:id', v1.getForecastWeather);

module.exports = api;