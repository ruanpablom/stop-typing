import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [ typing, setTyping ] = useState();
  const [ typingTimeout, setTypingTimeout ] = useState();
  
  const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
  })

  const fetchPokemon = async (pokemon) => {
    try{
      const result = await api.get(`pokemon/${pokemon}`);
      console.log(result.data);
    }catch(err){
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    e.preventDefault();
    
    if(typingTimeout){
      clearTimeout(typingTimeout);
    }

    setTyping(false);
    setTypingTimeout(setTimeout(async () => {
      await fetchPokemon(value);
    }, 2000));
  }

  return (
    <input onChange={handleChange} />
  );
}

export default App;
