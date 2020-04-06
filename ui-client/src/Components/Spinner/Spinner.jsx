/**
 * Dependencias
 */
import React from 'react';
import styled from 'styled-components';

/**
 * Styles
 */
const ContainerSpinner = styled.div`
      margin: 100px auto;
      width: 100px;
      text-align: center;
    `

/**
 * Componente que muestra el Spinner
 */
const Spinner = () => {

    return (
        <ContainerSpinner>
            <p>Cargando...</p>
            <div className="spinner-border" role="status">
            </div>     
        </ContainerSpinner>
    )

}

export default Spinner
