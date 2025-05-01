import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
