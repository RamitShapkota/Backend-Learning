require('dotenv').config();

const express = require("express");  //common js

const app = express();

const port = process.env.PORT || 5000;



// app.get("/" , (req,res) => {
//     res.send("server is ready");
// })

//get a list of 5 jokes

app.get("/jokes",(req,res)=>{
    const jokes = [
  {
    id: 1,
    title: 'The Programmer',
    content: 'Why do programmers prefer dark mode? Because light attracts bugs.'
  },
  {
    id: 2,
    title: 'The Database',
    content: 'A SQL query walks into a bar, walks up to two tables, and asks, "Can I join you?"'
  },
  {
    id: 3,
    title: 'The Keyboard',
    content: 'Why was the computer cold? It left its Windows open.'
  },
  {
    id: 4,
    title: 'The Web Developer',
    content: 'How do you comfort a JavaScript bug? You console it.'
  },
  {
    id: 5,
    title: 'The Coffee',
    content: 'Java developers never drink decaf because they can’t handle the lack of "Beans."'
  }
];
res.send(jokes)

})

app.listen(port , () =>{
    console.log(`Serve at http://localhost:${port}`);
})