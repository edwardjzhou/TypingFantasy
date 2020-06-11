var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser')
app.use(bodyParser.json())


// STATIC files: this may be somewhat not DRY but I didnt want to expose any files unnecessarily while stil developing -- will refactor
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
//end static files

//  these are the split js bundles
app.get('/dictionaryChinese.bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/dictionaryChinese.bundle.js'))
});

app.get('/dictionaryEnglish.bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/dictionaryEnglish.bundle.js'))
});
//end split budnles

// 1. read the json {1: [name, score],... 5:}

const fs = require('fs');

// this route sends out the current high scores
app.get('/highscore', (req, res) => {
    sendHighScores(req, res);
})

//this route makes the new high score and responds to requester with the new 10 high scores
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
    // console.log(`what i was given`,data)
    data.push([score, name])
    data.sort( (a,b) => {
        return b[0] - a[0]
    })
    console.log(data)
    return data.slice(0,10)
}
// HIGHSCORES.json IS: {"highScores":{"highScores":[[123,"Edward"],[50,"John"],[30,"Crono"],[25,"Scala"], [15,"Robo"]]}

function shouldHighScoresUpdate(tentativeScore) {
    const data = readCurrentHighScores().highScores
    // const data =  { highScores } = readCurrentHighScores()
    //data =  [[123, "Edward"], [50, "John"], [30, "Crono"], [25, "Scala"], [15, "Robo"]]
    const comparator = ([score, _]) => tentativeScore > score
    // highscores arent full yet (10 max scores) || if its higher than the lowest score
    if (data.length < 10 || data.some(comparator)) return true
    else return false
}

function readCurrentHighScores() {
    return JSON.parse(fs.readFileSync(`./src/highscores.json`))
}

function sendHighScores(req, res) {
    const data = readCurrentHighScores()
    console.log(data)
    res.send(data[`highScores`])
}

// cron https://github.com/ncb000gt/node-cron
var CronJob = require('cron').CronJob;
var request = require('request');

// keep alive heroku/my django project dynamos with a CRON JOB
new CronJob('0 * * * *', function () { //top o' the hour 0 * * * *
    // console.log('You will see this message every second w 6stars');
    request('http://edwardpa.pythonanywhere.com/', function (error, response, body) {
        // console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        console.log(response.body)
    });
    // request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))

}, null, true, 'America/Los_Angeles');

app.get('/sound', (req, res) => {
    request('https://ssl.gstatic.com/dictionary/static/sounds/20180430/chuck--_us_1.mp3', function (error, response, body) {
        // console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode);
        console.log(body)
    });
    res.send(body)
})


// serve stuff up to DOWNLOAD for the user
// app.get('/download', function (req, res) {
//     // const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
//     const file = `./app.js` 
//     res.download(file); // Set disposition and send it.
// });


// downloading a file to the server
//https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
// const https = require('https');
// app.get('/test', function (req,res) {
//     const file = fs.createWriteStream("file.mp3");
//     // /http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg
//     const request = https.get("https://ssl.gstatic.com/dictionary/static/sounds/20180430/idempotent--_us_1.mp3", function (response) {
//         console.log(file)
//         response.pipe(file);
//         file.on('finish', function () {
//             file.close( () => res.sendFile( path.join(__dirname + '/file.mp3') ) )
//         });
//     });
// })

const https = require('https');
app.get('/word/:word', function (req, res) {

    const dirCont = fs.readdirSync(`./words`); 

    if (dirCont.includes(req.params.word+`.mp3`)) {
        res.sendFile(path.join(__dirname + `/words/${req.params.word}.mp3`))
    } else { 
        const file = fs.createWriteStream(`words/${req.params.word}.mp3`);
        const language = req.params.word.match(/[\u3400-\u9FBF]/)

        switch (!language){
            case false: // CHINESE would be language =[anything]
                handleChinese()
                break;
            case true: // ENGLISH would be language=null
                handleEnglish();
                break;
        }
       
            
        function handleEnglish(){
            const request = https.get(`https://ssl.gstatic.com/dictionary/static/sounds/20180430/${encodeURI(req.params.word)}--_us_1.mp3`, function (response) {
                if (response.headers[`content-type`] === `audio/mpeg`) {   //"text/html")
                    response.pipe(file);
                    file.on('finish', function () {
                        file.close(() => res.sendFile(path.join(__dirname + `/words/${req.params.word}.mp3`)));
                    });
                } else {
                    const secondRequest = https.get(`https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${encodeURI(req.params.word)}&tl=en&client=tw-ob`, function (response) {
                        response.pipe(file);
                        file.on('finish', function () {
                            file.close(() => res.sendFile(path.join(__dirname + `/words/${req.params.word}.mp3`)))
                        });
                    })
                };
            })
        };

        function handleChinese(){
            const request = https.get(`https://gss0.baidu.com/6KAZsjip0QIZ8tyhnq/text2audio?tex=${encodeURI(req.params.word)}&cuid=baike&lan=ZH&ctp=1&pdt=31&vol=9&spd=4&per=4100`, function (response) {
                if (true) {   
                    console.log(request.headers)
                    response.pipe(file);
                    file.on('finish', function () {
                        file.close( () => res.sendFile(path.join(__dirname + `/words/${req.params.word}.mp3`) ) );
                    });
                } else {
                    fs.unlink(`words/${req.params.word}.mp3`, ()=>{})
                }
            })
        }



    }
});

app.listen(port);


//piping readstreams:
//https://flaviocopes.com/nodejs-streams/#signaling-a-writable-stream-that-you-ended-writing

//translation w/o captcha
// https://translate.google.com.vn/translate_tts?ie=UTF-8&q=%E4%B8%AD%E6%96%87&tl=zh-CN&client=tw-ob
