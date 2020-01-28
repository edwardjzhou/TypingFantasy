// node app.js
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/main.js', (req,res)=>{
    res.sendFile(path.join(__dirname + '/dist/main.js'))
});

app.listen(3000);
