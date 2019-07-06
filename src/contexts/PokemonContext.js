import React, { useEffect, useState } from 'react';

import Pokemon from './../classes/Pokemon';
import request from './../api';

// key to be used for the localStorage
const key = 'pokemons'

let PokemonContext;
PokemonContext = React.createContext();
const { Provider } = PokemonContext;

const PokemonProvider = ({ children }) => {
  // NOTE! pokemons state must be immutable.
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [param, setParam] = useState('');
  const [message, setMessage] = useState('');

  // Check if there is exisiting pokemons in localStorage.
  // If null, then will create a pokemons empty array
  // Else populate Pokemons state
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(key));
    if (data === null) {
      localStorage.setItem(key, JSON.stringify([]))
    } else {
      setAllPokemons(data)
    }
  }, [])

  const handleParamChange = text => {
    setParam(text);
  }

  // fetch Pokemon fron the API and save to localStorage
  const fetchPokemon = async () => {
    const response = await request(`/pokemon/${param.toLowerCase()}`);
    if (response === 'Not Found') {
      return response
    }
    const encounters = await request(`/pokemon/${param.toLowerCase()}/encounters`);
    const date = Math.floor(Date.now() / 1000);
    const pokemon = new Pokemon({ ...response, encounters }, date);
    return pokemon;
  }

  // Gets current data in local storage
  // push new pokemon and save to updates storage
  const saveToStorage = pokemon => {
    const data = JSON.parse(localStorage.getItem(key));
    const filtered = data.filter(item => item.id !== pokemon.id)
    filtered.push(pokemon);
    localStorage.setItem(key, JSON.stringify(filtered))
  }

  // Get Pokemon class from storage.
  // If Pokemon is not in storage,
  // call fetchPokemon and saveToStorage.
  // Else check if more than or equal to 7 days
  // then fetchPokemon and saveToStorage again
  // Afterwards set to pokemon state
  const getPokemon = () => {
    setMessage('')
    const item = allPokemons.find(d => d.id === param || d.name === param)
    if (!item) {
      fetchPokemon(param).then(item => {
        if (item === 'Not Found') {
          setMessage(item)
        } else {
          saveToStorage(item)
          setPokemon(item)
        }
        setParam('')
      })
    } else {
      const date = Math.floor(Date.now() / 1000)
      const days = Math.floor((date - item.dateUpdated) / 86400)
      if (days >= 7) {
        fetchPokemon(param).then(item => {
          if (item === 'Not Found') {
            setMessage(item)
          } else {
            saveToStorage(item)
            setPokemon(item)
          }
          setParam('')
        })
      } else {
        setPokemon(item)
        setParam('')        
      }
    }
  }

  return (
    <Provider value={{
      allPokemons,
      pokemon,
      param,
      message,
      setMessage,
      getPokemon,
      handleParamChange,
    }}>
      {children}
    </Provider>
  )
}

export { PokemonProvider, PokemonContext }
