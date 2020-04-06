/**
 * Dependencias
 */
import React from 'react';

/**
 * Componente de selección
 * 
 * @param {Object} props 
 */
const Select = (props) => {

    const {
        onChangeSelect = () => {},
        options = [],
        value = ""
    } = props

  return (
    < select
      value={value}
      onChange={e => onChangeSelect(e.target.value)}
      className="browser-default custom-select" >
      {
        options.map((optionItem, key) =>{
          return (
            <option 
              key={key}
              value={optionItem.value}>
              {optionItem.text}
            </option>
          )
        })
      }
    </select >)
}

export default Select;

