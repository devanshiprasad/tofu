import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="enter ingredient..." />
      <button className="search-button">Search</button>
    </div>
  );
}

export default SearchBar;