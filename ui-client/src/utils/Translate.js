/**
 * @desc Diccionarios
 */
import ES_AR from "../language/es-ar";

/**
 * @desc Traductor
 * 
 * @param { String } key 
 * 
 * @return { String }
 */
const Translate = key => {

  try {

    let formatedKey = key[0].toUpperCase()
    const label = ES_AR[formatedKey];

    // Verificamos la traducción.
    if (!label){
      throw new TypeError("(translate.js) key no encontrada: " + key);
    }

    return label;

  } catch (error) {
    return "";
  }

}

export default Translate;