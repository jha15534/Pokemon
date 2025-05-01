import React from 'react';

const TypeFilter = ({ setSelectedType }) => {
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="type-filter">
      <select onChange={handleTypeChange}>
        <option value="">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="bug">Bug</option>
        {/* Add more Pokémon types as needed */}
      </select>
    </div>
  );
};

export default TypeFilter;
