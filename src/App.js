import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import Loading from './components/Loading';
import Error from './components/Error';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemonData = res.data.results;

        const pokemonDetails = await Promise.all(
          pokemonData.map(async (pokemon) => {
            const pokemonInfo = await axios.get(pokemon.url);
            return {
              name: pokemonInfo.data.name,
              id: pokemonInfo.data.id,
              image: pokemonInfo.data.sprites.front_default || 'https://via.placeholder.com/150?text=No+Image', // Fallback to a placeholder if no image
              types: pokemonInfo.data.types.map((type) => type.type.name),
            };
          })
        );

        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Pokémon data');
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="app-container">
      <header className="app-header">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="logo"
          className="logo"
        />
        <h1>Poke Explorer</h1>
      </header>

      <div className="filters">
        <SearchBar setSearchTerm={setSearchTerm} />
        <TypeFilter setSelectedType={setSelectedType} />
      </div>

      <div className="pokemon-grid">
        {filteredPokemons.length === 0 ? (
          <p>No Pokémon found</p>
        ) : (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
