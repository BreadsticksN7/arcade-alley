import { React, useEffect, useState} from 'react';
import { v4 as uuid } from 'uuid';


function Home(){
  const [ releases, setReleases ] = useState([]);
  useEffect(() => {
    getLatest();
  }, []);

  async function getLatest(){
    let res = await fetch(`http://localhost:3001/games/`);
    const data = await res.json();
    setReleases(data.games);
  };

  const [ upcoming, setUpcoming ] = useState([]);
  useEffect(() => {
    getUpcoming();
  }, []);

  async function getUpcoming(){
    let res = await fetch(`http://localhost:3001/games/upcoming`);
    const data = await res.json();
    setUpcoming(data.games);
  };

  return (
    <div>
      <div>
      <h3>Latest Releases</h3>
      {releases.length ? (
        <div className='row py-sm-4 align-items-start'>
          {releases.map(g => (
            <div key={uuid()}>{g.name}</div>
          ))}
        </div>
      ) : (
          <div></div>
      )}
    </div>
    <div>
      <h3>Upcoming Releases</h3>
      {upcoming.length ? (
        <div className='row py-sm-4 align-items-start'>
          {upcoming.map(g => (
            <div key={uuid()}>{g.name}</div>
          ))}
        </div>
      ) : (
          <div></div>
      )}
    </div>
    </div>
  );
};

export default Home;
