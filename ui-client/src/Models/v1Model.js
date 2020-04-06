/**
 * @desc Utilidades
 */
import Requests from "../utils/Request";
import { ServerInfo } from '../utils/Constants';

/**
 * @desc Modelo
 */
class AuditsModel {

    /**
     * @desc Obtenemos la localizacion actual
     *  
     * @return { Promise }
     */
    static async getLocation() {

        try {

            // Requester
            const request = new Requests();
            // Respuesta
            return await request.get(`${ServerInfo}/v1/location`);

        } catch (error) {
            return false;
        }

    }


     /**
     * @desc btenemos el clima del día actual
     * 
     * @param { Number } id
     * 
     * @return { Promise }
     */
    static async getCurrentWeather(id) {

        try {

            // Requester
            const request = new Requests();
            // Respuesta
            return await request.get(`${ServerInfo}/v1/current/${id}`);

        } catch (error) {
                return false;
        }

    }


     /**
     * @desc Obtenemos el clima para los siguientes cinco días.
     * 
     * @param { Number } id
     * 
     * @return { Promise }
     */
    static async getForecastWeather(id) {

        try {

            // Requester
            const request = new Requests();
            // Respuesta
            return await request.get(`${ServerInfo}/v1/forecast/${id}`);

        } catch (error) {
            return false;
        }

    }

}

export default AuditsModel;