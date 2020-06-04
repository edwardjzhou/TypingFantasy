var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser')
app.use(bodyParser.json())



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/dist/main.js', (req,res)=>{
    res.sendFile(path.join(__dirname + '/dist/main.js'))
});

app.get('/src/ChronoTrigger1000GuardiaForestBG.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/ChronoTrigger1000GuardiaForestBG.png'))
});

app.get('/src/chrono.gif', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chrono.gif'))
});

app.get('/src/cronobattleleft.gif', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/cronobattleleft.gif'))
});
app.get('/src/cronobattleright.gif', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/cronobattleright.gif'))
});

app.get('/src/cronobattleup.gif', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/cronobattleup.gif'))
});

app.get('/src/cronobattledown.gif', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/cronobattledown.gif'))
});
app.get('/src/cronodownthrust.gif', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/cronodownthrust.gif'))
});
app.get('/src/520448.jpg', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/520448.jpg'))
});
app.get('/src/blue.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/blue.png'))
});

app.get('/src/TechnodeChocobo.mp3', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/TechnodeChocobo.mp3'))
});

app.get('/src/Blue_Imp.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/Blue_Imp.png'))
});

app.get('/src/chronotype/ChronoType.eot', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chronotype/ChronoType.eot'))
});
app.get('/src/chronotype/ChronoType.woff', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chronotype/ChronoType.woff'))
});
app.get('/src/chronotype/ChronoType.ttf', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chronotype/ChronoType.ttf'))
});
app.get('/src/chronotype/ChronoType.svg', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chronotype/ChronoType.svg'))
});
app.get('/src/blue.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/blue.png'))
});

app.get('/src/splash.jpg', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/splash.jpg'))
});
app.get('/src/squarereticle.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/squarereticle.png'))
});
app.get('/src/cursor.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/cursor.png'))
});

// stuff for high score
// fs.readFile('./src/highscores.txt', 'utf8', function (err, data) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);
// });


// 1. read the json {1: [name, score],... 5:}

//can we FS the chinese string w downloadble definitions as well as post high scores to a notepad file?    
const fs = require('fs');

app.get('/highscore', (req, res)=> {

    let data = JSON.parse(fs.readFileSync(`./src/highscores.json`))


    //add new score into it
    //sort for top 5
    //write top 5
    //{"key1": "value1", "key2": "value2"} vs [{"key1": "value1"}, {"key2": "value2"}]

    // console.log(data)

    
    res.send(data[`highScores`]
)
})

app.post(`/highscore`, (req,res) => {
    // console.log(req.body)
    fs.writeFileSync(`./src/highscores.json`, JSON.stringify(data))

})

//    fetch('http://localhost:3001/highscore', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ a: 1, b: 'Textual content' })
//     });
       


   // console.log(req.params) // params is the route so it should be {} since we're still in root directory /highscore
    // console.log(req.query) //http://localhost:3001/highscore?asdf=5 would give { asdf: '5' }
    // console.log(req.body) //no body is undefined    
    // fs.write(fd, buffer, offset, length, position, callback) //theres a string ver too 
    // fs.appendFile('./src/highscores.txt', `hi`, (err, fd) => {
    //     if (err) throw err;
    //     console.log(fd)
    //     res.send(JSON.stringify()) 
    // });
    // fs.writeFile(file, data[, options], callback) //overwrites. synchronous. cant use multiple times.
    // let data = fs.readFileSync(`./src/highscores.txt`)//buffered stuff like 65 65
    // console.log(data)



app.listen(port);
