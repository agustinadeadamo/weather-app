/*
 * ResponseHandler
 */
var express = require('express');

    exports.statusCodes = {
        OK: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500
    };

    /**
     *  Respuesta de solicitud correcta.
     *
     * @param res   response
     * @param data  datos de retorno
     *
     * @return { Object }
     */
    exports.ok = (res, data) => {

        // Codigo de respuesta.
        const code = 200;

        // Enviamos la respuesta.
        res.status(code).json({ code, data });
    }

    /**
     * Respuesta de solicitud invalida.
     *
     * @param res       response
     * @param message   mensaje
     *
     * @return { Object }
     */
    exports.badRequest = (res, textMessage = "Parámetros invalidos.") => {

        // Mensaje de respuesta
        const message = `${textMessage}`;

        // Codigo de respuesta.
        const code = 400;

        console.log(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

    /**
     *  Respuesta de solicitud invalida.
     *
     * @param res       response
     * @param message   mensaje
     *
     * @return { Object }
     */
    exports.notFound = (res, textMessage = "No se encontro el recurso solicitado.") => {

        // Mensaje de respuesta
        const message = `${textMessage}`;

        // Codigo de respuesta.
        const code = 404;

        console.log(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

    /**
     *  Recurso no encontrado.
     *
     * @param res       response
     * @param message   mensaje
     *
     * @return { Object }
     */
    exports.internalError = (res, textMessage) => {

        // Mensaje de respuesta
        const message = `${textMessage}`;

        // Codigo de respuesta.
        const code = 500;

        console.log(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

    /**
     *  Respuesta personalizada.
     *
     * @param res       response
     * @param message   mensaje
     * @param code      { http code }
     *
     * @return { Object }
     */
    exports.customCode = (res, textMessage, code = 200) => {

        // Mensaje de respuesta
        const message = `${textMessage}`;

        console.log(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

