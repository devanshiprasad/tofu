import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <button className="nav-button">button 2</button>
          <button className="nav-button">button 3</button>
          <button className="nav-button">button 4</button>
        </div>
      </nav>
      <div className="search-section">
        <input type="text" placeholder="search bar" className="search-bar" />
        <button className="search-button">button</button>
      </div>
    </div>
  );
}

export default App;

