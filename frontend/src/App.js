import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
//import axios from 'axios';

const homeUrl = process.env.REACT_APP_FETCH_URL;

function App() {
  //const [games, setGames] = useState([]);
  const [games, setGames] = useState([]);
  useEffect(() => {
    search();
  },[]);

  async function search() {
    const resp = await fetch(`http://localhost:3001/games/upcoming`);
    const data = await resp.json();
    setGames(data.games);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
      {games.length ? (
        <div className='row py-sm-4 align-items-start'>
          {games.map(g => (
            <div>{g.name}</div>
          ))}
        </div>
      ) : (
          <div></div>
      )}
    </div>

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
