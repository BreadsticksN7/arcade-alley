import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import IGDBApi from '../helpers/igdbApi';


function App() {

  const [games, setGames] = useState([]);
  useEffect(() => {
    search();
  }, []);
  async function search() {
    let res = await IGDBApi.getUpcoming();
    setGames(res);
  }
  return (
    <div className="App">
      {games}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
