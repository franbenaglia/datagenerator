const express = require('express');
const uploadRoute = require('./routes/upload.js');

const app = express();

const server = require("http").createServer(app);

const PORT = 3000;

app.use('/command', uploadRoute);

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});