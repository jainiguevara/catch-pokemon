import React, { useContext } from 'react';

import { PokemonContext } from './../contexts/PokemonContext';

// Common component for the text field
const TextField = props => {
  const { name } = props;
  const {
    param,
    handleParamChange,
    getPokemon,
    setMessage,
  } = useContext(PokemonContext);

  // Calls handleOnChange based on what function
  // Filters.js passed to this property
  const onChange = e => {
    handleParamChange(e.target.value)
  }

  const handleEnter = e => {
    if (e.key === 'Enter') {
      if (param !== '') {
        getPokemon()
      } else {
        setMessage('Please enter a value')
      }
    }
  }

  return (
    <div className="input-filter">
      <div><strong>{name}</strong></div>
      <input
       type="text"
       value={param}
       placeholder="(ex. Pikachu) then hit ENTER"
       onChange={onChange}
       onKeyPress={handleEnter}
      />
    </div>
  );
};

export default TextField;
