/**
 * Dependencies
 */
import React from 'react';
import styled from 'styled-components';

/**
 * Images
 */
import  noResults  from '../../assets/no-results.png'; 

/**
 * Styles
 */
const ContainerNoResult = styled.div`
margin: 100px auto;
width: 80%;
text-align: center;
`
/**
 * Componente que muestra un mensaje de error
 */
const NoResults = () => {

    return (
        <ContainerNoResult>        
            <img src={noResults} alt={"noResults"} />
            <p>No se pudo realizar la búsqueda correctamente</p>
        </ContainerNoResult>
    )

}

export default NoResults
