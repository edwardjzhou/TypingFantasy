const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
app.use(bodyParser.json());


// websockets for chatbox
// http to serve websockets 
const http = require("http").createServer(app);
// https to https request for serving audio fiels
const https = require("https")
const request = require("request");
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  var clientIpAddress =
    socket.request.headers["x-forwarded-for"] ||
    socket.request.connection.remoteAddress;
  request(`http://ip-api.com/json/${clientIpAddress}`, function (
    error,
    response,
    body
  ) {
    io.emit(
      "a user connected",
      JSON.parse(response.body)[`city`] +
        ', ' +
        JSON.parse(response.body)[`country`]
    );
  });
  console.log(" new request from : " + clientIpAddress);
  console.log("a user connected");

  socket.on("word typed", (word) => {
    io.emit("word typed", word);
  });

  socket.on("disconnect", () => {
    io.emit("a user disconnected");
  });
});

app.use(express.static("public"));
app.use("/src",express.static(path.join(__dirname, "src"))) // everything at get ./src of app.js is hosted in virtual /src
app.get("/dist/main.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/main.js"));
});

//  these are the split js bundles
app.get("/dictionaryChinese.bundle.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/dictionaryChinese.bundle.js"));
});

app.get("/dictionaryEnglish.bundle.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/dictionaryEnglish.bundle.js"));
});
//end split budnles


const fs = require("fs");
// this route sends out the current high scores
app.get("/highscore", (req, res) => {
  sendHighScores(req, res);
});

//this route makes the new high score and responds to requester with the new 10 high scores
app.post(`/highscore`, (req, res) => {
  const [score, name] = req.body;
  const answer = JSON.stringify({
    highScores: calcHighScores([score, name]),
  });

  fs.writeFileSync(`./src/highscores.json`, answer);
  sendHighScores(req, res);
});

// this is the user asking if he should be considered for a high score
app.post(`/newhighscore`, (req, res) => {
  // req.body = [3434,`player`]
  const [score = Number.MIN_SAFE_INTEGER, _] = req.body; // it's a number and string despite JSON.stringify without using JSON.parse because of JSON body parser module?
  res.send(shouldHighScoresUpdate(score));

  // fetch('./newhighscore', {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify([230, 'Edward'])
  // });
});

function calcHighScores([score, name = "Unnamed"]) {
  const data = readCurrentHighScores().highScores;
  // console.log(`what i was given`,data)
  data.push([score, name]);
  data.sort((a, b) => {
    return b[0] - a[0];
  });
  console.log(data);
  return data.slice(0, 10);
}
// HIGHSCORES.json IS: {"highScores":{"highScores":[[123,"Edward"],[50,"John"],[30,"Crono"],[25,"Scala"], [15,"Robo"]]}

function shouldHighScoresUpdate(tentativeScore) {
  const data = readCurrentHighScores().highScores;
  // const data =  { highScores } = readCurrentHighScores()
  //data =  [[123, "Edward"], [50, "John"], [30, "Crono"], [25, "Scala"], [15, "Robo"]]
  const comparator = ([score, _]) => tentativeScore > score;
  // highscores arent full yet (10 max scores) || if its higher than the lowest score
  if (data.length < 10 || data.some(comparator)) return true;
  else return false;
}

function readCurrentHighScores() {
  return JSON.parse(fs.readFileSync(`./src/highscores.json`));
}

function sendHighScores(req, res) {
  const data = readCurrentHighScores();
  console.log(data);
  res.send(data[`highScores`]);
}

// cron https://github.com/ncb000gt/node-cron
var CronJob = require("cron").CronJob;

// keep alive heroku/my django project dynamos with a CRON JOB
new CronJob(
  "0 * * * *",
  function () {
    //top o' the hour 0 * * * *
    // console.log('You will see this message every second w 6stars');
    request("http://edwardpa.pythonanywhere.com/", function (
      error,
      response,
      body
    ) {
      // console.log('error:', error);
      console.log("statusCode:", response && response.statusCode);
      console.log(response.body);
    });
    // request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
  },
  null,
  true,
  "America/Los_Angeles"
);

new CronJob(
  "1 0 1 * *",
  () => {
    // 00:01 on every first day of a month '1 0 1 * *'
    fs.writeFileSync(
      `./src/highscores.json`,
      JSON.stringify({
        highScores: [
          [123, "Edward"],
          [50, "John"],
          [30, "Crono"],
          [25, "Scala"],
          [15, "Robo"],
        ],
      })
    );
  },
  null,
  true,
  "America/Los_Angeles"
);
// # 1. Entry: Minute when the process will be started[0 - 60]
// # 2. Entry: Hour when the process will be started[0 - 23]
// # 3. Entry: Day of the month when the process will be started[1 - 28 / 29 / 30 / 31]
// # 4. Entry: Month of the year when the process will be started[1 - 12]
// # 5. Entry: Weekday when the process will be started[0 - 6][0 is Sunday]
//So according to this your 5 8 * * 0 would run 8:05 every Sunday.

// app.get('/sound', (req, res) => {
//     request('https://ssl.gstatic.com/dictionary/static/sounds/20180430/chuck--_us_1.mp3', function (error, response, body) {
//         // console.log('error:', error);
//         console.log('statusCode:', response && response.statusCode);
//         console.log(body)
//     });
//     res.send(body)
// })

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

// pipe it instead of keeping on server?
app.get("/word/:word", function (req, res) {
  const dirCont = fs.readdirSync(`./words`);

  if (dirCont.includes(req.params.word + `.mp3`)) {
    res.sendFile(path.join(__dirname + `/words/${req.params.word}.mp3`));
  } else {
    const language = req.params.word.match(/[\u3400-\u9FBF]/);

    switch (!language) {
      case false: // CHINESE would be language = [anything]
        handleChinese(req, res);
        break;
      case true: // ENGLISH would be language=null
        handleEnglish(req, res);
        break;
      default:
        handleEnglish(req, res);
    }  
  }
});

function handleEnglish(req, res) {
  const file = fs.createWriteStream(`words/${req.params.word}.mp3`);
  const request = https.get(
    `https://ssl.gstatic.com/dictionary/static/sounds/20180430/${encodeURI(
      req.params.word
    )}--_us_1.mp3`,
    function onResponse (response) {
      if (response.headers[`content-type`] === `audio/mpeg`) {
        response.pipe(file);
        response.pipe(res);
        
        // file.on("finish", function () {
        //   file.close(() =>
        //     res.sendFile(
        //       path.join(__dirname + `/words/${req.params.word}.mp3`)
        //     )
        //   );
        // });
      } else {
        const secondRequest = https.get(
          `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${encodeURI(
            req.params.word
          )}&tl=en&client=tw-ob`,
          function (response) {
            response.pipe(file);
            file.on("finish", function () {
              file.close(() =>
                res.sendFile(
                  path.join(__dirname + `/words/${req.params.word}.mp3`)
                )
              );
            });
          }
        );
      }
    }
  );
}

function handleChinese(req,res) {
  const file = fs.createWriteStream(`words/${req.params.word}.mp3`);
  const request = https.get(
    `https://gss0.baidu.com/6KAZsjip0QIZ8tyhnq/text2audio?tex=${encodeURI(
      req.params.word
    )}&cuid=baike&lan=ZH&ctp=1&pdt=31&vol=9&spd=4&per=4100`,
    function (response) {
      // if (true) {
        console.log(request.headers);
        response.pipe(file);
        file.on("finish", function () {
          file.close(() =>
            res.sendFile(
              path.join(__dirname + `/words/${req.params.word}.mp3`)
            )
          );
        });
      // } else {
      //   fs.unlink(`words/${req.params.word}.mp3`, () => {});
      // }
    }
  );
}


http.listen(port, () => {
  console.log(`listening on *:${port}`);
});


//piping readstreams:
//https://flaviocopes.com/nodejs-streams/#signaling-a-writable-stream-that-you-ended-writing

//translation w/o captcha
// https://translate.google.com.vn/translate_tts?ie=UTF-8&q=%E4%B8%AD%E6%96%87&tl=zh-CN&client=tw-ob
