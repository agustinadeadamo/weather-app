/**
 * Dependencias
 */
import React, { Fragment } from "react";
import moment from 'moment';
import styled from 'styled-components'

/**
 * Utils
 */
import Translate from '../../utils/Translate'


/**
 * Styles
 */
const ContainerWeatherItem = styled.div`
    width: ${props => props.type === "small" ? "15%":  "50%"}; 
    margin: 10px auto;
    border-radius: 10px;
    color: ${props => props.type === "small" ? "#000":  "#3b6978"};
    background-color: ${props => props.type === "small" ? "#cae8d5":  "transparent"};
    padding: 15px 10px;
    text-align: center;

    @media (max-width: 768px) {
      width 90%;
    }

    p {
      margin-bottom: 0
    }

    img{
      max-width: ${props => props.type === "small" ? "30px":  "50px"};
    }
  `

  const MainTime = styled.div`
    font-size: 80px; 
    margin: 0 auto;
  ` 

/**
 * Componente que muestra información del clima
 * 
 * @param { Object } props 
 */
const WeatherItem = (props) => {

  let {

    // Fecha
    date = "",

    // Data del clima
    timeSection = {},

    // Define por el componente big o small
    type = "small"

} = props


  return (
    <Fragment>
      <ContainerWeatherItem type={type}>
      <div className="row">
        <div className={`${type === 'big' ? 'col-12' :'col-4 col-md-12 center-block'}`}>
          <p>{Translate([moment(date).format('dddd')])}</p>
        </div>
        {
          type === 'big' && (
            <div className="col-12">
              <MainTime className="font-weight-bold col-12">{timeSection.temp}°</MainTime>
            </div>
          )
        }
        <div  className={`${type === 'big' ? 'col-12' :'col-2 col-md-12'}`}>
          <img src={`http://openweathermap.org/img/w/${timeSection.icon}.png`} alt="icon" />
        </div>
        <div  className={`${type === 'big' ? 'col-12' :'col-6 col-md-12'}`}>
          <p>{ timeSection.min }° / {timeSection.max }°</p>
        </div>
      </div>
   </ContainerWeatherItem>
    </Fragment>
  );
}

export default WeatherItem