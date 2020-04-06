/**
 * Dependencies
 */
const axios = require('axios');

/**
 * Utils
 */
const apiKeys = require('../utils/Constants');

/**
 * Modelo que obtiene la localización desde la cual se realiza la request
 * 
 * @return { Promise }
 */
exports.getLocation =  () => {
      
  return axios.get(`http://api.ipapi.com/api/check?access_key=${apiKeys.ipApi}`)
  .then(response => {
    return response.data
  })
  .catch(error => {
    console.log(error);
  });
}

/**
 * Devuelve la data del clima del día actual
 * 
 * @param { Number } id
 * @return { Promise }
 */
exports.getCurrentWeather =  (id) => {
    
  return axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKeys.weatherApi}&units=metric`)
  .then(response => {
     return response.data
  })
  .catch(error => {
    console.log(error);
  });

}

/**
 * Devuelve un listado con la data de los proximos seis días
 * 
 * @params { Number } id
 * @return { Promise }
 */
exports.getForecastWeather =  (id) => {
    
  return axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${apiKeys.weatherApi}&units=metric`)
  .then(response => {
     return response.data
  })
  .catch(error => {
    console.log(error);
  });
 
}