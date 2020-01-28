
// document.addEventListener('DOMContentLoaded', () => {

// canvas = document.getElementById('canvas');
// ctx = canvas.getContext('2d');
// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// document.addEventListener("keydown", keyPush);

// word = []
// // window.word = word
// wordsList = ['asdf','magic','qwerty']
// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

// setInterval(game, 1000 / 30); //30fps
// })

// function game() {
//     fontSize = 50;

//     //handles deleting old characters 
//     ctx.clearRect(0, canvas.height - fontSize, canvas.width, fontSize)
//     //end deleting

//     //handles recoloring deleted user text area (maybe clearRect is redundant)
//     ctx.fillStyle = "grey";
//     ctx.fillRect(0, canvas.height - fontSize, canvas.width, fontSize)
//     //end recoloring

//     //user input word
//     ctx.fillStyle = "blue";
//     ctx.font = `bold ${fontSize}px Arial`;
//     ctx.fillText(word.join(''),0 , (canvas.height));
//     //end user input word
//     // console.log(canvas.width/fontSize) = 25.6 atm but it can fit approx 44 charss-- all in arial 50s on a 1280 width
// }
// // var img = new Image();

// // // User Variables - customize these to change the image being scrolled, its
// // // direction, and the speed.

// // img.src = 'https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg';
// // var CanvasXSize = 1000;
// // var CanvasYSize = 500;
// // var speed = 20; // lower is faster
// // var scale = 3.05;
// // var y = 0; // vertical offset

// // // Main program

// // var dx = 0.75;
// // var imgW;
// // var imgH;
// // var x = 0;
// // var clearX;
// // var clearY;
// // var ctx;

// // img.onload = function () {
// //     imgW = img.width * scale;
// //     imgH = img.height * scale;

// //     if (imgW > CanvasXSize) {
// //         // image larger than canvas
// //         x = CanvasXSize - imgW;
// //     }
// //     if (imgW > CanvasXSize) {
// //         // image width larger than canvas
// //         clearX = imgW;
// //     } else {
// //         clearX = CanvasXSize;
// //     }
// //     if (imgH > CanvasYSize) {
// //         // image height larger than canvas
// //         clearY = imgH;
// //     } else {
// //         clearY = CanvasYSize;
// //     }

// //     // get canvas context
// //     ctx = document.getElementById('canvas').getContext('2d');

// //     // set refresh rate
// //     return setInterval(draw, speed);
// // }

// // function draw() {
// //     ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

// //     // if image is <= Canvas Size
// //     if (imgW <= CanvasXSize) {
// //         // reset, start from beginning
// //         if (x > CanvasXSize) {
// //             x = -imgW + x;
// //         }
// //         // draw additional image1
// //         if (x > 0) {
// //             ctx.drawImage(img, -imgW + x, y, imgW, imgH);
// //         }
// //         // draw additional image2
// //         if (x - imgW > 0) {
// //             ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
// //         }
// //     }

// //     // image is > Canvas Size
// //     else {
// //         // reset, start from beginning
// //         if (x > (CanvasXSize)) {
// //             x = CanvasXSize - imgW;
// //         }
// //         // draw aditional image
// //         if (x > (CanvasXSize - imgW)) {
// //             ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
// //         }
// //     }
// //     // draw image
// //     ctx.drawImage(img, x, y, imgW, imgH);
// //     // amount to move
// //     x += dx;
// // }
// function makeEnemy() {
//     Math.randomcanvas.width 
//     enemies = []
//     enemiesWords = []
//     // each enemy: 
//     // 1. has a rendered pic at random location
//     // 2. has a word in enemieswords array thats checked per keypress
//     enemyId++
// }

// function destroyEnemy() {

// }

// function keyPush(e) {
// //couldve used fromCharCode()
//     switch (e.keyCode) {
//         case 65:
//             word.push('a')
//             console.log(word)
//             break;
//         case 66:
//             word.push('b')
//             break;
//         case 67:
//             word.push('c')
//             break;
//         case 68:
//             word.push('d')
//             break;
//         case 69:
//             word.push('e')
//             break;
//         case 70:
//             word.push('f')
//             break;
//         case 71:
//             word.push('g')
//             break;
//         case 72:
//             word.push('h')
//             break;
//         case 73:
//             word.push('i')
//             break;
//         case 74:
//             word.push('j')
//             break;
//         case 75:
//             word.push('k')
//             break;
//         case 76:
//             word.push('l')
//             break;
//         case 77:
//             word.push('m')
//             break;
//         case 78:
//             word.push('n')
//             break;
//         case 79:
//             word.push('o')
//             break;
//         case 80:
//             word.push('p')
//             break;
//         case 81:
//             word.push('q')
//             break;
//         case 82:
//             word.push('r')
//             break;
//         case 83:
//             word.push('s')
//             break;
//         case 84:
//             word.push('t')
//             break;
//         case 85:
//             word.push('u')
//             break;
//         case 86:
//             word.push('v')
//             break;
//         case 87:
//             word.push('w')
//             break;
//         case 88:
//             word.push('x')
//             break;
//         case 89:
//             word.push('y')
//             break;
//         case 90:
//             word.push('z')
//             break;
//         case 32:
//             // console.log('SPACE BAR pressed PAUSE');
//             break;
//         case 8:
//             // console.log('Delete Keymac/backspace pc Pressed');
//             word.pop()
//             break;
//     }
// }

