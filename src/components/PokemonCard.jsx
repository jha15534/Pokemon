import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <div>
        {pokemon.types.map((type) => (
          <span key={type} className={`type-badge type-${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
