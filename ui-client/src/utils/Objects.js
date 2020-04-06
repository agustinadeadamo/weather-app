/**
 * @desc Verifica el tipo de un elemento.
 * 
 * @param { Any } data 
 * 
 * @return { Boolean }
 */
export const isObject = data => (data instanceof Object 
    && !Array.isArray(data) 
    && typeof data === "object");
