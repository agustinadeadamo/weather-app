/**
 * @desc Solicitudes.
 */
class Requests {

  /**
  * @desc Constructor de la utilidad.
  * 
  * @return { void }
  */
  constructor() {

    // Conjunto de cabeceras
    this.headersArray = new Headers();

    // Cabeceras
    this.headersArray.append('Accept', 'application/json');
    this.headersArray.append('Content-Type', 'application/json');

  }

  /**
   * @desc Realiza una solicitud de metodo GET
   * 
   * @param { String } endpoint 
   * @param { String } responseType
   * 
   * @return { Promise }
   */
  async get(endpoint, responseType = "json") {

    try {

      // Cabeceras.
      let headers = this.headersArray,
        method = "GET",
        cache = 'default';

      // Armamos el requester
      let request = new Request(endpoint, { method, headers, cache });

      // Almacenamos las cabeceras de la respuesta.
      let responseHeader = null;

      // Realizamos la solicitud
      let response = await fetch(request);

      // Almacenamos las cabecera de la respuesta.
      responseHeader = response.headers;

      if ([200, 201, 400, 401, 403, 404, 500].indexOf(response.status) > -1) {

        // Respuesta parseada
        let responseParsed = await response[responseType]();

        // Asignamos a la respuesta las cabeceras.
        responseParsed.headers = responseHeader;

        // Codigo
        responseParsed.code = response.status;

        // Parseamos la respuesta.
        return responseParsed;

      }

    } catch (error) {

      // Rechazamos la solicitud.
      return error;

    }

  }

}

export default Requests;