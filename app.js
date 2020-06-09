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

// app.get('/src/dictionaryEnglish.js', (req, res) => {
//     res.sendFile(path.join(__dirname + '/src/dictionaryEnglish.js'))
// });

// app.get('/src/dictionaryChinese.js', (req, res) => {
//     res.sendFile(path.join(__dirname + '/src/dictionaryChinese.js'))
// });

// app.get('/0.main.js', (req, res) => {
//     res.sendFile(path.join(__dirname + '/src/dictionaryChinese.js'))
// });
app.get('/dist/dictionaryChinese.bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/dictionaryChinese.bundle.js'))
});

app.get('/dist/dictionaryEnglish.bundle.js', (req, res) => {
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
    // if (shouldHighScoresUpdate(req.body[]) )
    // const newHighScores = [...data[`highScores`], ] 
    // const sortedNewHighScores = newHighScores.sort( () => {} )
    // fs.writeFileSync(`./src/highscores.json`, JSON.stringify(data))
    console.log(req.body)
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

function updateHighScores (score) {
    const data = readCurrentHighScores().highScores

}

function sortHighScores() {

}

//    if (readCurrentHighScores().highScores?.length) return false 
function shouldHighScoresUpdate (tentativeScore) {
    const data = readCurrentHighScores().highScores
    //data =  [[123, "Edward"], [50, "John"], [30, "Crono"], [25, "Scala"], [15, "Robo"]]
    const comparator = ([score, _]) => tentativeScore > score
    // highscores arent full yet (10 max scores) || if its higher than the lowest score
    if ( data.length < 10 || data.some(comparator) ) return true
    else return false
}

function readCurrentHighScores () {
    return JSON.parse(fs.readFileSync(`./src/highscores.json`))
}

// error : closures are formed from where the function was WRITTEN not where its invoked 
function sendHighScores(req, res) {
    const data = readCurrentHighScores()
    res.send(data[`highScores`])
}

// pseudocode for POST route:
// ALL gameovered users post us their score
// check if its a new high score; 
// if its a new high score
//      we 1. update the high score and 2. send it to him
// else 
//      jsut reutrn current high scores and news its not a high score 

//or do we check if his score warrants it in the first place FIRST then get his info only AFTER that so eh doesnt waste time entering name/score?



//    fetch('http://localhost:3001/highscore', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ a: 1, b: 'Textual content' })
//     });
       




app.listen(port);
