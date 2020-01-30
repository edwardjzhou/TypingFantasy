// node app.js
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/dist/main.js', (req,res)=>{
    res.sendFile(path.join(__dirname + '/dist/main.js'))
});

app.get('/src/ChronoTrigger1000GuardiaForestBG.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/ChronoTrigger1000GuardiaForestBG.png'))
});

app.get('/src/chrono.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chrono.png'))
});

app.get('/src/cronobattleleft.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/cronobattleleft.gif'))
});

app.listen(3000);
