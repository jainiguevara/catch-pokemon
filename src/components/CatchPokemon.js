import React, { useContext } from 'react'

import Filters from './Filters';
import { PokemonContext } from '../contexts/PokemonContext';

const styles = {
  listItem: {
    flexDirection: 'column'
  },
  header: {
    fontSize: 20
  }
}

const CatchPokemon = () => {
  const {
    pokemon,
    message,
  } = useContext(PokemonContext)

  const renderTable = () => {
    if (pokemon) {
      const { id, name, types, encounters, stats } = pokemon
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={styles.header}>
            <b>Name: {name.toUpperCase()}</b>
          </div>
          <div>
            ID: {id}
          </div>
          <div>
            Types: {types.reduce((acc, value, i, a) => {
              if (i === (a.length - 1)) {
                acc = acc + value.toUpperCase()
              } else {
                acc = acc + `${value.toUpperCase()}, `
              }
              return acc
            }, '')}
          </div>
          <br />
          {!encounters || encounters.length > 0 ? (
              <>
              <div>Encounters:</div>
              {encounters.map((e, i) => (
                <div key={i} style={styles.listItem}>
                {`${i + 1}. ${e.location} (METHOD: ${e.methods[0].method})`}
                </div>
              ))}
              </>
            ) : null
          } 
          <br />
          {!stats || stats.length > 0 ? (
              <>
              <div>Stats:</div>
              {stats.map((s, i) => (
                <div key={i} style={styles.listItem}>
                {`${s.stat.toUpperCase()}: ${s.base}`}
                </div>
              ))}
              </>
            ) : null
          } 
        </div>
      )
    }
  }

  return (
    <div>
      <div className="pokemon-header">
        <Filters />
      </div>
      <div className="pokemon-app">
        {message === '' ? renderTable() : message}
      </div>  
    </div>
  );
}

export default CatchPokemon
