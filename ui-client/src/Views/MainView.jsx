/**
 * Dependencies
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

/**
 * Model
 */
import v1Model from '../Models/v1Model';

/**
 * Components
 */
import Spinner from '../Components/Spinner/Spinner';
import WeatherItem from '../Components/WeatherItem/WeatherItem';
import Select from '../Components/Select/Select';
import NoResults from '../Components/NoResults/NoResults';

/**
 * Utils
 */
import {isObject} from '../utils/Objects';

/**
 * Styles
 */  
const ContainerWeekWeather = styled.div`
flex-wrap: no-wrap;

@media (max-width: 768px) {
  flex-wrap: wrap;
}
`
const ContainerSelect = styled.div`
  width: 80%;
  max-width: 300px; 
  margin: 20px auto;
  text-align: center;
`

/**
 * Hook de la vista principal
 */
const MainView = () =>  {

  /**
   * State
   */
  let [spinner, showSpinner] = useState(true)
  let [forecastWeather, changeForescastData] = useState({});
  let [mainDay, changeMainDay] = useState(null);
  let [idCity, changeCity] = useState(null);
  let [messageError, changeMessageError] = useState(false)
  let [cityOptions, changeCityOptions] = useState([
    {
    "value": 3430668,
    "text": "Miramar"
    },
    {
      "value": 3430708,
    "text": "Mercedes"
    },
    {
      "value": 3430787,
    "text": "Mataderos"
    },
    {
      "value": 3430813,
    "text": "Martínez"
    },
    {
    "value": 3430838,
    "text": "Mariano Acosta"
    }
  ]);

   /**
   * @desc Hook de efecto que es renderizado luego de que se monto el componente.
   *
   * @doc https://es.reactjs.org/docs/hooks-reference.html#useeffect
   *
   * @return { Boolean }
   */
  useEffect(() => {  

  /**
   * Obtiene la ubicacion desde la cual se realiza la request
   */
  const getLocation =  async () => {

    try {

      // Obtenemos la locación actual
      const result = await v1Model.getLocation();

      // Validamos la respuestas.
      return await validateHttpResponse(result, async () => {

        // Desestructuramos respuesta
        const { data = {} } = result;
        let idCity = data.id

        // Modificamos el state
        cityOptions.unshift({text: data.city, value: data.id})
        changeCityOptions(cityOptions)
        changeCity(idCity)    

      }, () => { }, ".getLocation()");

    } catch(error) {

      console.log(error)
      return false

    }

  } 
    // Obtenemos la localización actual
    getLocation()
  }, [cityOptions])

 
 
  /**
   * @desc Hook de efecto que es renderizado luego de que se monto el componente.
   *
   * @doc https://es.reactjs.org/docs/hooks-reference.html#useeffect
   *
   * @return { Boolean }
   */
  useEffect(() => {

     /**
     * Obtenemos clima actual
     * 
     * @return { Promise<Boolean> }
     */
    const getCurrentWeather =  async () => {

      try {

        // Realizamos la consulta para obtener el clima del día actual
        const result = await v1Model.getCurrentWeather(idCity)

        // Validamos la repsuesta
        return await validateHttpResponse(result, async () => {

          // Desestructuramos respuesta
          let { data } = result;

          // Cambiamos la data del día actual
          changeMainDay(data)

      })

      } catch(error) {

        console.log(error)
        return false

      }
    
    }


   /**
   * Obtenemos clima actual
   * 
   * @return { Promise<Boolean> }
   */
    const getForecastWeather =  async() => {

      try {

        // Realizamos la consulta para obtener el clima de los siguientes seis días
        const result = await v1Model.getForecastWeather(idCity)
    
        return await validateHttpResponse(result, async () => {
    
          // Desestructuramos la respuesta
          const { data } = result
      
          // Modificamos el state
          changeForescastData(data)
          showSpinner(false)
    
        })

      } catch(error) {

        console.log(error)
        return false

      }   
    
    }

    if(idCity){

      // Seteamos el messageError en true ya que vuelve a cargar
      changeMainDay(null)
      changeForescastData([])
      showSpinner(true)

      getCurrentWeather()
      getForecastWeather()     
      
    }

  }, [idCity,changeCity])


  /**
   * @desc Valida la respuesta de una request
   * 
   * @param { JSON }  Object
   * 
   * @return { Promise<Boolean> }
   */
  const validateHttpResponse = async (response, callback) => {

    try {

        // Evaluamos el argumento requerido.
        if (!isObject(response)) {
          throw new TypeError("response expected a object, but received: " + typeof response);
        }

        if (!response.hasOwnProperty("code") || typeof response.code !== "number") {
          throw new TypeError("code in object response not exist or not is a number, but received: " + typeof response.code);
        }

        // Validamos que se haya procesado correctamente.
        [200, 201].indexOf(response.code) > -1 && callback();

        // Validamos los casos de fallos.
        if ([400, 404, 500].indexOf(response.code) > -1) {
    
          // Mostramos mensaje de error
          changeMessageError(true)
          // Ocultamos spinner
          showSpinner(false)
          return false;

        }

        return true;

      } catch (error) {

        console.log( error );
        return false;

      }

  }


  /**
   * Obtiene los cambios en el select
   * 
   * @param { Number } idCity
   * @param { String } citySelected
   */
    const onChangeSelect = (idCity) => {

      try {

        changeCity(idCity)
        return true

      } catch(error){

        console.log(error, 'ERROR')
        return false

      }

    };


    /**
     * Devuelve el Main Content
     * 
     */
    const returnMainContent = () => {
      return (
        <div>
            <div>
              <ContainerSelect>
                <label>Seleccione una ciudad</label>
                <Select
                  value={idCity}
                  onChangeSelect={(idCity, citySelected)=> onChangeSelect(idCity)}
                  options={cityOptions}
                />
              </ContainerSelect>
              <WeatherItem type="big" date={moment()} timeSection={mainDay} />
            </div>
            <ContainerWeekWeather className="d-flex justify-content-space-between">
            {
              Object.keys(forecastWeather).map((listItem, key) => {
                return <WeatherItem key={key} type="small" date={listItem} timeSection={forecastWeather[listItem]} />
              })
            }
            </ContainerWeekWeather>
          </div>
      )
    }


    return (
      <div className="container-fluid">
        { /** Spinner */}
        {
          spinner && <Spinner/>
        }
        { /** Main Content */ }
        {
          (!messageError && Object.keys(forecastWeather).length > 0 && mainDay !== null ) && returnMainContent()
        }
        { /** Mensaje de error */ }      
        {
          (!spinner && messageError) && <NoResults/>
        }
      </div>
    );
  }

  export default MainView;