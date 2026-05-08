require('dotenv').config();

const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 5000;


// Serve frontend static files
app.use(express.static(path.join(__dirname, 'dist')));


// API Route
app.get("/api/jokes", (req, res) => {

    const jokes = [
        {
            id: 1,
            title: 'The Programmer',
            content: 'Why do programmers prefer dark mode? Because light attracts bugs.'
        },
        {
            id: 2,
            title: 'The Database',
            content: 'A SQL query walks into a bar and asks, "Can I join you?"'
        }
    ];

    res.send(jokes);

});


// React fallback route
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});