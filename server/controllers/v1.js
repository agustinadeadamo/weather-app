/**
 * Dependencies
 */
const moment = require('moment');

/**
 * Models
 */
const v1Model = require('../models/v1');

/**
 * Utils
 */
const ResponseHandler = require('../utils/ResponseHandler');
const HttpRequestError = require('../utils/HttpRequestError');

const { NOT_FOUND, BAD_REQUEST } = ResponseHandler.statusCodes;

/**
 * Obtiene la localizacion desde donde se está realizando la request
 *
 * @param req         Request de la llamada
 * @param res         Response de la llamada
 *
 */
exports.getLocation = async (req, res) => {

    try {

        // Obtenemos el id y el nombre de la ciudad desde la cual se realiza la request
        const result = await v1Model.getLocation()

        // Se verifica la respuesta y se envía un mensaje acorde a este
        if(result === undefined || result.succes === false){
            throw new HttpRequestError(BAD_REQUEST, "(getLocation): Error al obtener la ubicación");
        }

        const data = {
            city: result.city,
            id: result.location.geoname_id
        }

        // Respondemos a la solicitud
        ResponseHandler.ok(res, data);

    } catch (error) {

        console.log(`(getLocation): Se produjo un error al realizar la operación (${error.stack})`);

        // Verificamos el tipo de excepción
        if (error instanceof HttpRequestError) {
            // Respondemos con error
            ResponseHandler.customCode(res, error.message, error.status);
        } else {
            // Respondemos con error
            ResponseHandler.internalError(res, "(getLocation): Se produjo un error al realizar la operación");
        }
        
    }
}


/**
 * Obtiene el clima actual
 *
 * @param req         Request de la llamada
 * @param res         Response de la llamada
 *
 */
exports.getCurrentWeather = async (req, res) => {

    try {

        // Obtenemos los parametros del request
        const {
            id = null
        } = req.params;

        // Verificamos que vengan los parametros necesarios
        if(id === null){
            throw new HttpRequestError(NOT_FOUND, "(getCurrentWeather): id  requerido");
        }

        // Obtenemos el clima del día actual
        const result = await v1Model.getCurrentWeather(id)

        // Se verifica la respuesta y se envía un mensaje acorde a este
        if(result === undefined || result.cod !== 200){
            throw new HttpRequestError(BAD_REQUEST, "(getCurrentWeather): Error al obtener información del clima actual");
        }

        const data = {
            temp: result.main.temp,
            min: result.main.temp_min,
            max: result.main.temp_max,
            icon: result.weather[0].icon
        }

        // Respondemos a la solicitud
        ResponseHandler.ok(res, data);

    } catch (error) {

        console.log(`(getCurrentWeather): Se produjo un error al realizar la operación (${error.stack})`);
        
        // Verificamos el tipo de excepción
        if (error instanceof HttpRequestError) {
            // Respondemos con error
            ResponseHandler.customCode(res, error.message, error.status);
        } else {
            // Respondemos con error
            ResponseHandler.internalError(res, "(getCurrentWeather): Se produjo un error al realizar la operación");
        }
        
    }
}


/**
 * Obtiene el clima de los siguientes cinco días
 *
 * @param req         Request de la llamada
 * @param res         Response de la llamada
 *
 */
exports.getForecastWeather = async (req, res) => {

    try {

        // Obtenemos los parametros del request
        const {
            id = null
        } = req.params;

        // Verificamos que vengan los parametros necesarios
        if(id === null){
            throw new HttpRequestError(NOT_FOUND, "(getForecastWeather): id  requerido");
        }
  
        // Obtenemos el clima del los siguientes días
        let result = await v1Model.getForecastWeather(id)

        // Se verifica la respuesta y se envía un mensaje acorde a este
        if(result === undefined || result.cod !== '200' || !Array.isArray(result.list)){
            throw new HttpRequestError(BAD_REQUEST, "(getForecastWeather): Error al obtener información del clima actual");
        }

        // Agrupo por fechas el listado
        let data = result.list.reduce((prev, cur) => {

            let weatherPerTime = {
                min: cur.main.temp_min,
                max: cur.main.temp_max,
                icon: cur.weather[0].icon
            }

            let key = cur['dt_txt'].substring(0,10)
            let dataObject = [...prev[key] || [], weatherPerTime]

            prev[key] = dataObject;
            return prev;

        }, {});

        // Obtengo el dia actual y lo elimino del objeto
        let currentDay = moment().format('YYYY-MM-DD')
        delete data[currentDay];

        // Recorremos el objecto para obtener el valor mayor y menor del clima del día entero
        for (let key of Object.keys(data)) {

            // Obtenemos temperatura máxima
            let maxValue = Math.max(...data[key].map(o => o.max));

            // Obtenemos temperatura mínima
            let minValue = Math.min(...data[key].map(o => o.min));

            // Modificamos el obtejo con los nuevos datos
            data[key] = {
                min: minValue, 
                max:maxValue, 
                icon: data[key][0].icon
            }

        }      

        // Respondemos a la solicitud
        ResponseHandler.ok(res, data);
    
    } catch (error) {

        console.log(`(getForecastWeather): Se produjo un error al realizar la operación (${error.stack})`);

        // Verificamos el tipo de excepción
        if (error instanceof HttpRequestError) {
            // Respondemos con error
            ResponseHandler.customCode(res, error.message, error.status);
        } else {
            // Respondemos con error
            ResponseHandler.internalError(res, "(getForecastWeather): Se produjo un error al realizar la operación");
        }

    }
}