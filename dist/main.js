/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener('DOMContentLoaded', ()=> {\n    canvas = document.getElementById('canvas');\n    ctx = canvas.getContext('2d');\n    ctx.fillStyle = \"black\";\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    document.addEventListener(\"keydown\", keyPush);\n\n    word = []\n    // window.word = word\n    wordsList = ['asdf', 'magic', 'qwerty']\n    function getRandomInt(max) {\n        return Math.floor(Math.random() * Math.floor(max));\n    }\n\n    setInterval(game, 1000 / 30); //30fps\n\n})\n\nfunction game() {\n    fontSize = 50;\n\n    //handles deleting old characters \n    ctx.clearRect(0, canvas.height - fontSize, canvas.width, fontSize)\n    //end deleting\n\n    //handles recoloring deleted user text area (maybe clearRect is redundant)\n    ctx.fillStyle = \"grey\";\n    ctx.fillRect(0, canvas.height - fontSize, canvas.width, fontSize)\n    //end recoloring\n\n    //user input word\n    ctx.fillStyle = \"blue\";\n    ctx.font = `bold ${fontSize}px Arial`;\n    ctx.fillText(word.join(''), 0, (canvas.height));\n    //end user input word\n    // console.log(canvas.width/fontSize) = 25.6 atm but it can fit approx 44 charss-- all in arial 50s on a 1280 width\n}\n// var img = new Image();\n\n// // User Variables - customize these to change the image being scrolled, its\n// // direction, and the speed.\n\n// img.src = 'https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg';\n// var CanvasXSize = 1000;\n// var CanvasYSize = 500;\n// var speed = 20; // lower is faster\n// var scale = 3.05;\n// var y = 0; // vertical offset\n\n// // Main program\n\n// var dx = 0.75;\n// var imgW;\n// var imgH;\n// var x = 0;\n// var clearX;\n// var clearY;\n// var ctx;\n\n// img.onload = function () {\n//     imgW = img.width * scale;\n//     imgH = img.height * scale;\n\n//     if (imgW > CanvasXSize) {\n//         // image larger than canvas\n//         x = CanvasXSize - imgW;\n//     }\n//     if (imgW > CanvasXSize) {\n//         // image width larger than canvas\n//         clearX = imgW;\n//     } else {\n//         clearX = CanvasXSize;\n//     }\n//     if (imgH > CanvasYSize) {\n//         // image height larger than canvas\n//         clearY = imgH;\n//     } else {\n//         clearY = CanvasYSize;\n//     }\n\n//     // get canvas context\n//     ctx = document.getElementById('canvas').getContext('2d');\n\n//     // set refresh rate\n//     return setInterval(draw, speed);\n// }\n\n// function draw() {\n//     ctx.clearRect(0, 0, clearX, clearY); // clear the canvas\n\n//     // if image is <= Canvas Size\n//     if (imgW <= CanvasXSize) {\n//         // reset, start from beginning\n//         if (x > CanvasXSize) {\n//             x = -imgW + x;\n//         }\n//         // draw additional image1\n//         if (x > 0) {\n//             ctx.drawImage(img, -imgW + x, y, imgW, imgH);\n//         }\n//         // draw additional image2\n//         if (x - imgW > 0) {\n//             ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);\n//         }\n//     }\n\n//     // image is > Canvas Size\n//     else {\n//         // reset, start from beginning\n//         if (x > (CanvasXSize)) {\n//             x = CanvasXSize - imgW;\n//         }\n//         // draw aditional image\n//         if (x > (CanvasXSize - imgW)) {\n//             ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);\n//         }\n//     }\n//     // draw image\n//     ctx.drawImage(img, x, y, imgW, imgH);\n//     // amount to move\n//     x += dx;\n// }\nfunction makeEnemy() {\n    Math.randomcanvas.width\n    enemies = []\n    enemiesWords = []\n    // each enemy: \n    // 1. has a rendered pic at random location\n    // 2. has a word in enemieswords array thats checked per keypress\n    enemyId++\n}\n\nfunction destroyEnemy() {\n\n}\n\nfunction keyPush(e) {\n    //couldve used fromCharCode()\n    switch (e.keyCode) {\n        case 65:\n            word.push('a')\n            console.log(word)\n            break;\n        case 66:\n            word.push('b')\n            break;\n        case 67:\n            word.push('c')\n            break;\n        case 68:\n            word.push('d')\n            break;\n        case 69:\n            word.push('e')\n            break;\n        case 70:\n            word.push('f')\n            break;\n        case 71:\n            word.push('g')\n            break;\n        case 72:\n            word.push('h')\n            break;\n        case 73:\n            word.push('i')\n            break;\n        case 74:\n            word.push('j')\n            break;\n        case 75:\n            word.push('k')\n            break;\n        case 76:\n            word.push('l')\n            break;\n        case 77:\n            word.push('m')\n            break;\n        case 78:\n            word.push('n')\n            break;\n        case 79:\n            word.push('o')\n            break;\n        case 80:\n            word.push('p')\n            break;\n        case 81:\n            word.push('q')\n            break;\n        case 82:\n            word.push('r')\n            break;\n        case 83:\n            word.push('s')\n            break;\n        case 84:\n            word.push('t')\n            break;\n        case 85:\n            word.push('u')\n            break;\n        case 86:\n            word.push('v')\n            break;\n        case 87:\n            word.push('w')\n            break;\n        case 88:\n            word.push('x')\n            break;\n        case 89:\n            word.push('y')\n            break;\n        case 90:\n            word.push('z')\n            break;\n        case 32:\n            // console.log('SPACE BAR pressed PAUSE');\n            break;\n        case 8:\n            // console.log('Delete Keymac/backspace pc Pressed');\n            word.pop()\n            break;\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });