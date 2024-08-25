import React from 'react';

function SearchBar() {
  return (
   <>
   <div>
      <h1>Recipe Search</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter a food item"
      />
      <select value={diet} onChange={e => setDiet(e.target.value)}>
        <option value="">Select Diet</option>
        <option value="low-carb">Low Carb</option>
        <option value="high-protein">High Protein</option>
        <option value="low-fat">Low Fat</option>
        <option value="vegan">Vegan</option>
      </select>
      <select value={health} onChange={e => setHealth(e.target.value)}>
        <option value="">Select Allergy</option>
        <option value="peanut-free">Peanut Free</option>
        <option value="gluten-free">Gluten Free</option>
        <option value="dairy-free">Dairy Free</option>
      </select>
      <button onClick={searchRecipes}>Search</button>
</div>
   </>
  );
}

export default SearchBar;