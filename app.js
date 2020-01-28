// node app.js
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/typingfantasy.html'));
});

app.get('/words.js', (req,res)=>{
    res.sendFile(path.join(__dirname + '/words.js'))
});

app.listen(3000);
