require('dotenv').config()

const express = require('express')
// import express from "express" same as above line
const app = express()
const port =process.env.PORT || 300

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req,res) => {
  res.send('RamitSonar')
})

app.get('/login',(req,res) => {
  res.send('<h1>This is your login page</h1>')
})

app.get('/youtube', (req,res) => {
  res.send('<h2>This is youtube page</h2>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
