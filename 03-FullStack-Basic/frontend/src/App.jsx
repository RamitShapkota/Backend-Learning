import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function App() {
 const [jokes, setJoks] = useState([]);

 useEffect(() => {

  //add Proxy to avoid below long url
  axios.get('http://http://localhost:3000/api/jokes')
  .then((response)=>{
    setJoks(response.data);
  })
  .catch((error)=>{
    console.log(error);
  })
 })

  return (
    <>
      <h1>Full Stack Application</h1>
      <p>JOKES: {jokes.length}</p>

      {
        jokes.map((joke,index) => {
          <div key={joke.id}>
            <h3>{joke.title}</h3> 
            <p>{joke.content}</p>
          </div>
        })
      }
    </>
  )
}

export default App
