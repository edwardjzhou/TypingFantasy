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

// this jsut bugged out duno why
app.get('/dictionaryChinese.bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/dictionaryChinese.bundle.js'))
});

app.get('/dictionaryEnglish.bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/dictionaryEnglish.bundle.js'))
});



// 1. read the json {1: [name, score],... 5:}

//can we FS the chinese string w downloadble definitions as well as post high scores to a notepad file?    
const fs = require('fs');

app.get('/highscore', (req, res) => {
    sendHighScores(req, res);
})

//this makes the new high score 
app.post(`/highscore`, (req, res) => {
    const [score, name] = req.body
    const answer = JSON.stringify({ 
        highScores: calcHighScores([score, name])
    })

    fs.writeFileSync(`./src/highscores.json`, answer)
    sendHighScores(req, res);
})

// this is the user asking if he should be considered for a high score
app.post(`/newhighscore`, (req, res) => {
    // req.body = [3434,`player`]
    const [score = Number.MIN_SAFE_INTEGER, _ ] = req.body  // its a number and string despite JSON.stringify without using JSON.parse because of JSON body parser module? 
    res.send(shouldHighScoresUpdate(score))

    // fetch('./newhighscore', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify([230, 'Edward'])
    // });
})

function calcHighScores ( [score, name = "Unnamed"] ) {
    const data = readCurrentHighScores().highScores
    console.log(`1`,data)
    data.push([score, name])
    data.sort( (a,b) => {
        return b[0] - a[0]
    })
    console.log(data)
    return data.slice(0,10)
}
//{"highScores":{"highScores":[[123,"Edward"],[50,"John"],[30,"Crono"],[25,"Scala"], [15,"Robo"]]}


// cron https://github.com/ncb000gt/node-cron
var CronJob = require('cron').CronJob;
var request = require('request');

// keep alive heroku/my django project dynamos with a CRON JOB
new CronJob('0 * * * *', function () { //top o' the hour 0 * * * *
    // console.log('You will see this message every second w 6stars');
    let res = {};
    request('http://edwardpa.pythonanywhere.com/', function (error, response, body) {
        // console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        console.log(body)
    });
    // request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))

}, null, true, 'America/Los_Angeles');




function shouldHighScoresUpdate (tentativeScore) {
    const data = readCurrentHighScores().highScores
    // const data =  { highScores } = readCurrentHighScores()
    //data =  [[123, "Edward"], [50, "John"], [30, "Crono"], [25, "Scala"], [15, "Robo"]]
    const comparator = ([score, _]) => tentativeScore > score
    // highscores arent full yet (10 max scores) || if its higher than the lowest score
    if ( data.length < 10 || data.some(comparator) ) return true
    else return false
}

function readCurrentHighScores () {
    return JSON.parse(fs.readFileSync(`./src/highscores.json`))
}

function sendHighScores(req, res) {
    const data = readCurrentHighScores()
    console.log(data)
    res.send(data[`highScores`])
}





app.listen(port);
