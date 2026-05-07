require('dotenv').config()

const express = require('express')
// import express from "express" same as above line
const app = express()
const port =process.env.PORT || 3000

const gihubData = {
  "login": "RamitShapkota",
  "id": 180934617,
  "node_id": "U_kgDOCsjX2Q",
  "avatar_url": "https://avatars.githubusercontent.com/u/180934617?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/RamitShapkota",
  "html_url": "https://github.com/RamitShapkota",
  "followers_url": "https://api.github.com/users/RamitShapkota/followers",
  "following_url": "https://api.github.com/users/RamitShapkota/following{/other_user}",
  "gists_url": "https://api.github.com/users/RamitShapkota/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/RamitShapkota/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/RamitShapkota/subscriptions",
  "organizations_url": "https://api.github.com/users/RamitShapkota/orgs",
  "repos_url": "https://api.github.com/users/RamitShapkota/repos",
  "events_url": "https://api.github.com/users/RamitShapkota/events{/privacy}",
  "received_events_url": "https://api.github.com/users/RamitShapkota/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Ramit Shapkota",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": null,
  "public_repos": 7,
  "public_gists": 0,
  "followers": 1,
  "following": 1,
  "created_at": "2024-09-09T08:40:56Z",
  "updated_at": "2026-01-18T14:24:58Z"
}

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

app.get('/github',(req,res)=>{
  res.json(gihubData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
