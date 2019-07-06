import React from 'react';

import './App.css';
import CatchPokemon from './components/CatchPokemon'
import { PokemonProvider } from './contexts/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <CatchPokemon />
    </PokemonProvider>
  );
}

export default App;
