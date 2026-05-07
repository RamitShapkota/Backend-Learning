import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function App() {
 const [jokes, setJokes] = useState([]);

 useEffect(() => {
  //add Proxy to avoid below long url
  axios.get('/api/jokes')
  .then((response)=>{
    setJokes(response.data);
  })
  .catch((error)=>{
    console.log(error);
  })
 })

  return (
    <>
      <h1>Full Stack Application done by ramit</h1>
      <p>JOKES: {jokes.length}</p>

      {
        jokes.map((joke,index) => (
          <div key={joke.id}>
            <h3>{joke.title}</h3> 
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
