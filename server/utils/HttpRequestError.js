/*
 * HttpRequestError.ts
 */
module.exports = class HttpRequestError extends Error {

    constructor(status, message) {

        super()
        this.status = status;
        this.message = message;    
    
    }

}
