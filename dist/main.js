/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/ 		var prefetchChunks = data[3] || [];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		// chunk prefetching for javascript
/******/ 		prefetchChunks.forEach(function(chunkId) {
/******/ 			if(installedChunks[chunkId] === undefined) {
/******/ 				installedChunks[chunkId] = null;
/******/ 				var link = document.createElement('link');
/******/
/******/ 				if (__webpack_require__.nc) {
/******/ 					link.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				link.rel = "prefetch";
/******/ 				link.as = "script";
/******/ 				link.href = jsonpScriptSrc(chunkId);
/******/ 				document.head.appendChild(link);
/******/ 			}
/******/ 		});
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"0":"./dictionaryChinese","./dictionaryEnglish":"./dictionaryEnglish"}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	var startupResult = (function() {
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ 	})();
/******/
/******/ 	webpackJsonpCallback([[], {}, 0, [0,"./dictionaryEnglish"]]);
/******/ 	return startupResult;
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/actor.js":
/*!**********************!*\
  !*** ./src/actor.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Actor; });\n// inspired by AP Commputer Science's GridWorld\n// read up on interface mixins implements, class Location, class Grid\nclass Actor {\n    constructor(x,y) {\n        this.x = x\n        this.y = y\n    }\n\n    animate(){\n        // 1. determine what image we want to animate.\n        // 2. i feel like there should be a (move 1 step in time) method or should it just be animate\n    }\n    \n    get location(){\n        return {\n            x: this.x,\n            y: this.y\n        }\n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/actor.js?");

/***/ }),

/***/ "./src/crono.js":
/*!**********************!*\
  !*** ./src/crono.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor */ \"./src/actor.js\");\n\n\nclass Crono extends _actor__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    constructor(x, y, canvas, ctx, cronoleftimg, cronorightimg, cronoupimg, cronodownimg, cronothrust, keys, enemies) {\n        super(x,y)\n        this.canvas = canvas\n        this.ctx = ctx\n        this.alive = true ;\n        this.animate = this.animate\n        this.animateDeath = this.animateDeath.bind(this)\n        this.cronoleftimg = cronoleftimg\n        this.cronorightimg= cronorightimg\n        this.cronoupimg = cronoupimg\n        this.cronodownimg = cronodownimg\n        this.lastaction = this.cronodownimg\n        this.cronothrust = cronothrust\n        this.keys = keys\n        this.enemies = enemies\n        this.hp = 100\n\n\n        this.sprites = document.getElementById('sprites') \n        this.takingDamage = false\n        this.animateGrimace = false\n    }\n\n    poll() {\n    }\n    \n    // checkcollision is called every animate() in GAME CLASS\n    checkCollision() { // can use leetcodes overlapping rectangles to detect. want to add a get method for this.x,this.y and this.x + canvaswidthtakenupbycrono, etc.\n        for (const enemy of this.enemies) {\n            if (enemy.alive === false) continue\n\n            if ( ( (enemy.x - this.x)**2 + (enemy.y - this.y)**2 )**.5  < 20) {\n                this.takeDamage()\n            //  console.log('collision with enemy detected')\n\n            }\n        }\n    }\n\n    takeDamage() {\n        if (this.takingDamage === false) {\n            this.hp-- \n            this.takingDamage = true\n            this.animateGrimace = true\n            setTimeout( () => {\n                this.takingDamage = false\n            }, 5000)\n        } else if (this.takingDamage =  true && this.animateGrimace===true) {\n            this.ctx.drawImage(this.sprites, 80, 80, 30, 30, this.x, this.y, 50, 50)            \n            setTimeout(()=>this.animateGrimace = false,500)\n        }\n   \n\n    }\n\n    animateAttack(x, y, attackPicture) {\n        let leftsY\n        let leftsX\n        // x bigger the more right, y bigger the lower, arclength, 1\n        // this.y is where crono is y is where enemy is at the start\n        this.circleCenterY = (this.y + y )/ 2\n        this.circleCenterX = (this.x + x )/ 2\n        this.diameter = Math.pow(Math.pow((this.x-x),2) + Math.pow((this.y-y),2), 0.5)\n        // which unit is on the LEFT?\n        if (this.x < x){\n            leftsY = this.y\n            leftsX = this.x\n        } else {\n            leftsY = y\n            leftsX = x\n        }\n        this.angleStartClockwise = -Math.atan( (leftsY - this.circleCenterY) / (this.circleCenterX - leftsX)) + Math.PI\n        this.angleEndClockwise = Math.PI + this.angleStartClockwise\n\n        this.x = x\n        this.y = y\n        \n        this.ctx.drawImage(attackPicture, 0, 0, 500, 500, this.x, this.y + 50, 500, 500)\n        \n        this.lastaction = attackPicture\n    }\n    \n    // animate unfortuantely controls movement so i wnet with if(!this.animateGrimace)\n    animate() {\n       \n        let up = this.keys[38]\n        let down = this.keys[40]\n        let left = this.keys[37]\n        let right = this.keys[39]\n\n        if (right){\n            if (this.x < this.canvas.width - 30 && (!down && !up)) {\n                this.x += 4\n                if(!this.animateGrimace) this.ctx.drawImage(this.cronorightimg, 0, 0, 500, 500, this.x, this.y, 500, 500)\n            } else if (this.x > 0 - 30 && (down || up)) {\n                this.x += 2.8\n            }\n            this.lastaction = this.cronorightimg\n        } \n\n        if (left) {\n            if (this.x > 0 - 30 && (!down && !up)) {\n                this.x -= 4\n                if (!this.animateGrimace)this.ctx.drawImage(this.cronoleftimg, 0, 0, 500, 500, this.x, this.y, 500, 500)\n            } else if (this.x > 0 - 30 && (down || up)) {\n                this.x -= 2.8\n            }\n            this.lastaction = this.cronoleftimg\n        }\n\n        // down and up will overpower left and right as a lastaction\n        if (down) {\n            if (this.y < this.canvas.height - 30 && (!left && !right)) {\n                this.y += 4\n            } else if (this.y < this.canvas.height - 30 && (left || right)) {\n                this.y += 2.8\n            }\n            if (!this.animateGrimace)this.ctx.drawImage(this.cronodownimg, 0, 0, 500, 500, this.x, this.y, 500, 500)\n            this.lastaction = this.cronodownimg\n        }\n\n        if (up && !down) {\n            if (this.y > 0 - 30 && (!left && !right)) {\n                this.y -= 4\n            } else if (this.y > 0 - 30 && (left || right)) {\n                this.y -= 2.8\n            }\n            if (!this.animateGrimace)this.ctx.drawImage(this.cronoupimg, 0, 0, 500, 500, this.x, this.y, 500, 500)\n            this.lastaction = this.cronoupimg\n        } \n\n        if ( !left && !up && !right && !right && !down && !this.takingDamage ) {\n            if (!this.animateGrimace) this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)\n        }\n\n        // if (this.takingDamage) {\n        //     this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)\n        // }\n    }\n    \n    animateDeath() {\n        // if I have time\n    }\n\n\n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Crono);\n\n\n//# sourceURL=webpack:///./src/crono.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor */ \"./src/actor.js\");\n\n// bundle splitting = split your bundle up but still dl both for first time users\n// code splitting = dont dl and load code you dont use\n\n\n// import { chineseDictionary as dictionary2 } from './chineseexpansionpack'\n\nclass Enemy extends _actor__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(x, y, canvas, ctx, imp, difficulty, bluepaint, gameMode, squarereticle, dictionary) {\n        super(x,y);\n        this.canvas = canvas;\n        this.ctx = ctx;\n        this.alive = true;\n        this.animate = this.animate.bind(this);\n        this.animateDeath = this.animateDeath.bind(this);\n        this.imp = imp;\n        this.difficulty = difficulty;\n        this.standStill = false;\n        this.bluepaint = bluepaint;\n        this.gameMode = gameMode;\n        this.squarereticle = squarereticle;\n        this.dictionary = dictionary\n\n        // this.dictionary \n        // if (window.mode === `chinese`) {\n        //     import('./dictionaryEnglish.js')\n        //         .then((dict) => {\n        //             this.dictionary= dict\n        //         });\n        // }\n\n        this.word = this.dictionary[Math.floor(Math.random() * this.dictionary.length)];\n        // if (this.gameMode===`english`)\n        // this.word = dictionary[Math.floor(Math.random() * dictionary.length)];\n\n        // else if (this.gameMode===`chinese`)\n        // this.word = dictionary2[Math.floor(Math.random() * dictionary2.length)];\n        \n\n    }\n\n    static CreateEnemy() {\n        // if I have time \n    }\n\n    animateReticle(){\n        this.ctx.drawImage(this.squarereticle, 0, 0, 400, 400, this.x-5, this.y-5, 55, 55)\n\n    }\n\n    animate(cronoX,cronoY){\n        // will this monster move\n        if (this.alive === true && this.standStill === false){\n            let randomMove = Math.random()\n            if(cronoX > this.x){\n                if (randomMove < .70){\n                    this.x += 1\n                } else if(randomMove >= .70 && randomMove < .99){\n                    this.x -= 1\n                } else{\n                    this.standStill = true\n                    setTimeout(() => this.standStill = false , 3000)\n                }\n            } else if(cronoX < this.x) {\n                if (randomMove < .70) {\n                    this.x -= 1\n                } else if (randomMove >= .70 && randomMove < .99) {\n                    this.x += 1\n                } else{\n                    this.standStill = true\n                    setTimeout(() => this.standStill = false, 3000)\n                } \n            }\n            if (cronoY > this.y) {\n                if (randomMove < .70) {\n                    this.y += 1\n                } else if (randomMove >= .70 && randomMove < .99) {\n                    this.y -= 1\n                } else{\n                    this.standStill = true\n                    setTimeout(() => this.standStill = false, 3000)\n                }\n            } else if (cronoY < this.y) {\n                if (randomMove < .70) {\n                    this.y -= 1\n                } else if (randomMove >= .70 && randomMove < .99) {\n                    this.y += 1\n                } else{\n                    this.standStill = true\n                    setTimeout(() => this.standStill = false, 3000)\n                }\n            } \n        }\n        // if alive draw the word above it and the monster itself\n        if (this.alive === true){\n            this.ctx.drawImage(this.imp, 0, 0, 200, 300, this.x, this.y, 500, 500)\n            this.ctx.fillStyle = \"white\";\n            this.ctx.font = `bold 50px ChronoType`;\n            this.ctx.fillText(this.word, this.x, this.y, 500, 500)\n        } \n        // if dead draw a blue splat instead\n        else if (this.alive === false){\n            this.ctx.drawImage(this.bluepaint, 0, 0, 500, 500, this.x, this.y, 60, 60)\n        }\n\n    }\n\n    animateDeath(){\n        // if I have time I can animate the death\n    }\n\n    wander() {\n        //if I have time I can do collision detection\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Enemy);\n\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\n/* harmony import */ var _crono__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crono */ \"./src/crono.js\");\n/* harmony import */ var _trie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trie */ \"./src/trie.js\");\n\n\n\n\n\n\n// // if (this.gameMode === `english`) {\n// import(/* webpackChunkName: \"./dictionaryEnglish\" */ './dictionaryEnglish').then(({ englishDictionary }) => {\n//     this.dictionary = englishDictionary\n//     console.log(this.dictionary)\n//     this.gameLoop();\n\n// }).catch((err) => {\n//     console.log(err)\n// })\n// // } else if (this.gameMode === `chinese`) {\n// import(/* webpackChunkName: \"./dictionaryChinese\" */ './dictionaryChinese').then(({ chineseDictionary }) => {\n//     this.dictionary = chineseDictionary\n\n//     console.log(this.dictionary)\n\n//     this.gameLoop();\n\n// }).catch((err) => {\n//     console.log(err)\n// })\n//                 // }\n\n// on collision settimeout \n\n// TBD 1. Add a monster Try data strcuture to highlight in red possible targets as a sort of demo of tries and like a targeting system to warn a user he\n// messed up in typing a monsters word DONE\n// 2. add chinese input into they key-area\n// 3. add splat sounds for kicks\n// 4. finish collision detection and taking damage NOW\n// 5. implement a high score table with a notepad file or firebase or something with express MIDWAY\n// 6.animate the splash screen with words flying in / also maybe fade to black in the 0-2000 ms transition\n// 7. add in upload your own words\n// 8. draw the tracers for the reticle\n// 9. add symbols to make hp immutable (almost) w const HP = Symbol()\n// this[HP] = 100; Reflect.ownKeys() or Object.getOwnPropertySymbols() can detect\n// 10. https://developers.redhat.com/blog/2017/01/17/data-encapsulation-vs-immutability-in-javascript/ make a factory for enemys? for like a boss rather than inheritanc\n//BUGS TBD: \n// 1.  time needs to stop (timeElapsed ) when game is paused so wpm doesnt go to 0 and the next one enemy doesnt instaspawn after pause\n// 2. need to fix settimeouts on collision/damage taking and animating it\nconst qs = document.querySelector\n\nclass Game {\n    constructor() {\n        this._getResources();\n        this._ensureDefaultSettings();\n        this._addListeners();\n        this.animateSplash();\n        let interval = setInterval(  () => {\n            if (!this.onSplash) {\n                clearInterval(interval);\n                this.dynamicallyLoadLanguageModule()\n            }\n        }, 2000);\n\n    }\n\n    dynamicallyLoadLanguageModule() { \n        // this may be all wrong as it seems after the main package is loaded BOTH of these are prefetched... or is the conditional not for prefetch but for  real load?\n        if (this.gameMode === `english`) {\n            __webpack_require__.e(/*! import() | ./dictionaryEnglish */ \"./dictionaryEnglish\").then(__webpack_require__.bind(null, /*! ./dictionaryEnglish */ \"./src/dictionaryEnglish.js\")).then(({ englishDictionary }) => {\n                this.dictionary = englishDictionary\n                this.gameLoop();\n            }).catch((err) => {\n                alert(err)\n            })\n        } else if (this.gameMode === `chinese`) {\n            __webpack_require__.e(/*! import() | ./dictionaryChinese */ 0).then(__webpack_require__.bind(null, /*! ./dictionaryChinese */ \"./src/dictionaryChinese.js\")).then(({ chineseDictionary }) => {\n                this.dictionary = chineseDictionary\n                this.gameLoop();\n            }).catch((err) => {\n                alert(err)\n            })\n        }\n    }\n\n    get hasGameStarted(){\n        return !this.onSplash\n    }\n\n    get language(){\n        return this.gameMode\n    }\n\n    animateSplash(timeElapsed = 0){\n        // background img\n        this.ctx.drawImage(this.splash, 0, 0, 1200, 900, 0, 0, this.canvas.width, this.canvas.height); //add credits of where i took image from\n\n        //title\n        this.ctx.font = `bold 100px ChronoType`;\n        this.ctx.fillStyle = \"black\";\n        this.ctx.strokeStyle = 'white';\n        this.ctx.strokeText('TYPING FANTASY!', this.canvas.width * .1-2, 100-3);\n        this.ctx.fillText('TYPING FANTASY!', this.canvas.width * .1, 100);\n\n        // language choices\n        this.ctx.font = `bold 50px ChronoType`;\n        this.ctx.fillStyle = \"black\";\n        this.ctx.strokeStyle = 'white';\n        this.ctx.strokeText('Choose a TYPING LANGUAGE and hit ENTER!', this.canvas.width * .05 - 2, (this.canvas.height * .5) - 3);\n        this.ctx.fillText('Choose a TYPING LANGUAGE and hit ENTER!', this.canvas.width * .05, (this.canvas.height * .5));\n        this.ctx.strokeText('ENGLISH 5-letter words', this.canvas.width * .1-2, (this.canvas.height * .6)-3);\n        this.ctx.fillText('ENGLISH 5-letter words', this.canvas.width * .1, (this.canvas.height * .6));\n        this.ctx.strokeText('CHINESE idioms', this.canvas.width * .1 -2, (this.canvas.height * .7)-3);\n        this.ctx.fillText('CHINESE idioms', this.canvas.width * .1, (this.canvas.height * .7));\n\n        // language selection logic\n        let up = this.keys[38];\n        let down = this.keys[40];\n        if (down && this.gameMode ===`english`) this.gameMode=`chinese`;\n        else if (up && this.gameMode===`chinese`) this.gameMode=`english`;\n        if (this.gameMode === `english`) this.ctx.drawImage(this.cursor, 0, 0, 32, 32, 25, 320, 50, 50 ); \n        else if (this.gameMode === `chinese`) this.ctx.drawImage(this.cursor, 0, 0, 32, 32, 25, 380, 50, 50);\n\n        requestAnimationFrame( (rafTimeElapsed) => {\n            if (this.onSplash === true) this.animateSplash(rafTimeElapsed);\n        })\n    }\n\n    _ensureDefaultSettings() {\n        this.isGameover = this.isGameover || false;\n        this.isPaused = this.isPaused || false;\n        this.gameMode = this.gameMode || `english`; \n        this.onSplash = this.onSplash || true;\n        this.lastTimeElapsed = this.lastTimeElapsed || 0;\n        this.rate = this.rate || 2000;\n    }\n\n    drawAttackArc(){  // this remains static after an attack until a new attack. could let chrono class take care of this.\n        // THIS IS WHERE THE ARC IS DRAWN)\n        if (this.player.circleCenterY) {\n            // first line of two\n            this.ctx.beginPath();\n            this.ctx.arc(this.player.circleCenterX, this.player.circleCenterY, this.player.diameter / 2, this.player.angleStartClockwise, this.player.angleEndClockwise, false)\n            this.ctx.strokeStyle = \"#FFFF00\";\n            this.ctx.lineWidth = 2;\n            this.ctx.lineCap = 'round'\n            this.ctx.stroke();\n            this.ctx.closePath();\n\n            // second line of two\n            this.ctx.beginPath();\n            this.ctx.arc(this.player.circleCenterX, this.player.circleCenterY, this.player.diameter / 2 + 10, this.player.angleStartClockwise, this.player.angleEndClockwise, false)\n            this.ctx.strokeStyle = \"#FFFF00\";\n            this.ctx.lineWidth = 1;\n            this.ctx.lineCap = 'round'\n            this.ctx.stroke();\n            this.ctx.closePath();\n        }\n    }\n\n    drawMap(){\n        // original image's 1024x768; we do a background render\n        this.ctx.drawImage(this.forestbg, 0, 0, 500, 350, 0, 0, this.canvas.width, this.canvas.height - 50);\n    }\n\n    drawEnemies(){\n        const possibilities = this.trie.possibilities(this.word.join(``));\n\n        // really shouldve used a enemies hash where enemies[`enemy.word`] = enemy object; a hash where the submitted word maps to the enemy object\n        for (let i = 0; i < this.enemies.length; i++) {\n            this.enemies[i].animate(this.player.x, this.player.y); // move towards player\n            if (possibilities.includes(this.enemies[i].word) && this.enemies[i].alive === true) this.enemies[i].animateReticle();\n        }\n\n    }\n\n    drawTypingArea() {\n        this.fontSize = this.fontSize || 50;\n\n        //handles deleting old characters \n        this.ctx.clearRect(0, this.canvas.height - this.fontSize, this.canvas.width, this.fontSize);\n        //end deleting\n\n        //handles recoloring deleted user text area (maybe clearRect is redundant)\n        this.ctx.fillStyle = \"grey\";\n        this.ctx.fillRect(0, this.canvas.height - this.fontSize, this.canvas.width, this.fontSize);\n        //end recoloring\n\n        //user input word\n        this.ctx.fillStyle = \"blue\";\n        this.ctx.font = `bold ${this.fontSize}px ChronoType`;\n        this.ctx.fillText(this.word.join(''), 0, (this.canvas.height));\n        //end user input word\n        // console.log(canvas.width/fontSize) = 25.6 atm but it can fit approx 44 charss-- all in arial 50s on a 1280 width\n\n    }\n \n    drawWPM() { \n        if (this.then === undefined) {\n            this.then = Date.now();\n        }\n\n        this.now = Date.now();\n        this.time = parseInt((this.now - this.then) / 1000);\n        this.wpm = parseInt(this.destroyedCount / (this.time / 60)) || 0; //0 to get rid of NaN\n        this.ctx.fillStyle = \"blue\";\n        this.ctx.font = `bold ${this.fontSize}px ChronoType`;\n        this.ctx.fillText('Time: ' + this.time + '   WPM: ' + this.wpm, this.canvas.width - 600, (this.canvas.height));\n    }\n\n    drawHeart() {\n        //THIS IS THE HEART ANIMATION FOR HP\n        this.ctx.beginPath();\n        this.ctx.strokeStyle = \"#000000\";\n        this.ctx.strokeWeight = 3;\n        this.ctx.shadowOffsetX = 4.0;\n        this.ctx.shadowOffsetY = 4.0;\n        this.ctx.lineWidth = 10.0;\n        this.ctx.fillStyle = \"#FF0000\";\n\n        let d = 30; // this is like the size\n        let k = 560; // this is where it is on diagonal\n        this.ctx.moveTo(k, k + d / 4);\n\n        this.ctx.quadraticCurveTo(k, k, k + d / 4, k);\n        this.ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);\n        this.ctx.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);\n        this.ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4);\n        this.ctx.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);\n        this.ctx.lineTo(k + d / 2, k + d);\n        this.ctx.lineTo(k + d / 4, k + d * 3 / 4);\n        this.ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4);\n        this.ctx.stroke();\n        this.ctx.fill();\n        this.ctx.closePath();\n        // end heart animation\n\n        // THIS IS THE HP NUMBER ANIMATION\n        this.ctx.fillStyle = \"blue\";\n        this.ctx.font = `bold ${this.fontSize}px ChronoType`;\n        this.ctx.fillText(`${this.player.hp}`, this.canvas.width - 195, (this.canvas.height));\n        \n    }\n\n    animate(timeElapsed = 0) {\n        //still unsure as to best way to do this\n        if (this.player.hp <= 0) {\n            this.isGameover = true\n            this.gameover()\n        }\n\n        // console.log(time)\n        // animate this.player, this.enemies, and maybe track framecount\n        // whoever goes first is drawn on top of. so more important comes last\n        // furthermore, chrono should only give up 1 image of himself to animate not many CAN WE USE PASSING STRINGS THAT ARE EVALED HERE?\n        // OR DO WE JUST STRAIGHT UP CALL ANIMAATE IN THE CHRONO CLASS METHOD\n        if (timeElapsed - this.lastTimeElapsed > this.rate){\n            this.spawnEnemy();\n            this.lastTimeElapsed = timeElapsed;\n        }\n\n        this.drawMap(this.ctx, this.canvas);\n        this.drawAttackArc(this.ctx, this.player);\n        this.drawEnemies(this.enemies, this.player);\n        this.drawTypingArea(this.ctx,this.canvas, this.fontSize);\n        this.drawWPM(this.ctx, this.canvas, this.fontSize);\n        this.drawHeart(this.ctx);\n\n        this.player.checkCollision()\n        this.player.animate();\n\n        this.request = requestAnimationFrame( (rafTimeElapsed) => {\n            if (!this.isPaused && !this.isGameOver) {\n                this.animate(rafTimeElapsed);\n            }\n        }) //will not call the CB until the batch of animations inside current call stack frame animates at once. \n    }\n\n    // almost a misnomer at this point -- all game logic will be in animation from now on\n    gameLoop(){ //responsible for spawning initial actors, creating new actors, and calling animate-- will eventually stick all game logic in here including calls to \"move/act\" rather than letting animate take care of that implicitly\n        if (this.gameMode === `chinese`) {\n            this._detachListeners()\n            this._addListeners()       \n        }\n        this.trie = new _trie__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n        this.enemies = [];\n        this.player = new _crono__WEBPACK_IMPORTED_MODULE_1__[\"default\"](300, 300, this.canvas, this.ctx, this.cronoleftimg, this.cronorightimg, this.cronoupimg, this.cronodownimg, this.cronothrust, this.keys, this.enemies);\n        this.animate();\n    }\n\n    spawnEnemy() {\n        let newEnemy = new _enemy__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Math.floor(Math.random() * this.canvas.width + 1),\n            Math.floor(Math.random() * this.canvas.height + 1), this.canvas, this.ctx, this.imp, 1, this.bluepaint, this.gameMode, this.squarereticle, this.dictionary)\n        this.enemies.push(newEnemy)\n        this.trie.addWord(newEnemy.word)\n        if (this.isGameover) return  //breaks spawning on gameover\n        // while (this.isPaused) {} //temporary solution; actually breaks the call stack\n        // if (this.isPaused) return\n\n        // setTimeout( ()=> this.spawnEnemy(this.rate), 1000 / this.rate)\n    }\n\n    _getResources(){\n        this.canvas = document.getElementById('canvas');\n        this.ctx = this.canvas.getContext('2d');\n        this.cronoleftimg = document.getElementById('cronoleft');\n        this.cronorightimg = document.getElementById('cronoright');\n        this.cronodownimg = document.getElementById('cronodown');\n        this.cronoupimg = document.getElementById('cronoup');\n        this.forestbg = document.getElementById('forest');\n        this.imp = document.getElementById('imp');\n        this.cronothrust = document.getElementById('cronothrust');\n        this.bluepaint = document.getElementById('bluepaint');\n        this.splash = document.getElementById(`splash`);\n        this.cursor = document.getElementById(`cursor`)\n        this.squarereticle = document.getElementById(`squarereticle`);\n    }\n\n    _addListeners(){\n        this.keys = [] // used for moving\n        this.word = [] // what word you've typed \n\n        function preventDefaultViewportJiggling(e) {\n            const arrowsAndSpacebar = {\n                37: true,\n                38: true,\n                39: true,\n                40: true,\n                32: true,\n            }\n\n            Object.freeze(arrowsAndSpacebar)\n            if (arrowsAndSpacebar[e.keyCode]) e.preventDefault()\n        }\n\n        if (this.gameMode===`english`) {\n            this.keydownHandler = (e) => {\n                let key = e.keyCode\n                this.keys[key] = true;\n                \n            \n                preventDefaultViewportJiggling(e)\n\n\n                if (key >= 65 && key <= 90) this.word.push(String.fromCharCode(key).toLowerCase())\n                else if (key === 32 && !this.isGameover) {\n                    if (!this.isPaused) this.pause()\n                    else if (this.isPaused) this.unpause()\n                }\n                else if (key === 8) this.word.pop();\n                else if (key === 13) {\n                    if (this.onSplash) {\n                        this.onSplash = false\n                    } else {\n                        this.handleSubmit()\n                        this.word = [];\n                    }\n                }\n            }\n\n        } else if (this.gameMode ===`chinese`) {\n                this.chineseInput = document.createElement(`input`)\n                this.chineseInput.setAttribute(`placeholder`,`饱经沧桑`)\n                this.chineseInput.style.height = \"40px\"\n                this.chineseInput.style.width = \"200px\"\n                this.chineseInput.style.margin = \"5px\"\n\n                this.chineseAdvisoryText = document.createTextNode(\"Type chinese here\");\n                this.linebreak = document.createElement(\"br\");\n\n                this.canvas.insertAdjacentElement(`afterend`, this.chineseInput);\n                this.chineseInput.insertAdjacentElement(`beforebegin`, this.linebreak);\n\n                this.keydownHandler = (e) => {\n                    let key = e.keyCode //should be nubmer\n                    this.keys[key] = true; //small range of keyboard keys means that this type of bucketing is acceptable\n                    // the larger the range of values in a set hte more costly it is to use bucket sort (just confused myself)\n                    // expense in meemory freom range and multiplying to get the right memory location from index ?\n\n                    //object freeze enum\n                    //prevent arrow keys from messsing with your viewport/scrolling \n\n                    preventDefaultViewportJiggling(e)\n\n                    if (key >= 65 && key <= 90) this.word.push(String.fromCharCode(key).toLowerCase())\n                    else if (key === 32 && !this.isGameover) {\n                        if (!this.isPaused) this.pause()\n                        else if (this.isPaused) this.unpause()\n                    }\n                    else if (key === 8) this.word.pop();\n                    else if (key === 13) {\n                        if (this.onSplash) {\n                            this.onSplash = false\n                        } else {\n                            this.handleSubmit()\n                            this.word = [];\n                        }\n                    }\n            }\n        }\n\n        this.keyupHandler = (e) => {\n            this.keys[e.keyCode] = false;\n        }\n\n        document.body.addEventListener(\"keydown\",  this.keydownHandler, true);\n        document.body.addEventListener(\"keyup\",  this.keyupHandler, true);\n    }\n\n    _detachListeners(){\n        document.body.removeEventListener(\"keydown\", this.keydownHandler, true)\n        document.body.removeEventListener(\"keyup\", this.keyupHandler, true)\n        console.log(`detacehd english listener`)\n        this.keys = []\n        this.word = []\n    }\n\n    animateGameover() {\n        this.ctx.font = `bold 50px ChronoType`;\n        this.ctx.fillStyle = \"red\";\n        this.ctx.fillText('GAMEOVER', this.canvas.width * .4, this.canvas.height * .5);\n        requestAnimationFrame( (timeELapsed) => {\n            if (this.onGameover === true) this.animateGameover(timeElapsed);\n        })\n    }\n\n    gameover() {\n        this.onGameover = true\n        // window.highScores = fetch('http://localhost:3001/highscore', {\n        //     method: 'POST',\n        //     headers: {\n        //         'Accept': 'application/json',\n        //         'Content-Type': 'application/json'\n        //     },\n        //     body: JSON.stringify({ a: 1, b: 'Textual content' })\n        // }).then(res=>console.log(res))\n        this.animateGameover()\n       \n        // fetch('http://localhost:3001/highscore', {\n        //     method: 'POST',\n        //     headers: {\n        //         'Accept': 'application/json',\n        //         'Content-Type': 'application/json'\n        //     },\n        //     body: JSON.stringify({ a: 1, b: 'Textual content' })\n        // });\n\n\n        // cancelAnimationFrame(this.request)\n\n        this._detachListeners()\n\n        this.setTimeout( ()=> {\n            window.game = null\n            window.game = new Game()\n        },5000)\n\n        // animate GAMEOVER in text\n\n        // fetch('./highscore', {\n        //     method: 'post',\n        //     body: \"hi\"\n        // })\n\n        // var tenure = prompt(\"Please enter preferred tenure in years\", \"15\");\n\n        // if (tenure != null) {\n        //     alert(\"You have entered \" + tenure + \" years\");\n        // }\n    }\n\n    pause() {\n        this.isPaused = true \n        this.ctx.font = `bold 50px ChronoType`;\n        this.ctx.fillStyle = \"red\";\n        this.ctx.fillText('PRESS SPACEBAR TO UNPAUSE', this.canvas.width * .2, this.canvas.height * .5);\n    }\n\n    unpause() {\n        this.isPaused = false\n        this.animate()\n\n           \n    }\n    \n    handleSubmit() {\n        if (this.player && this.word.join(``) === `2814019473`) this.player.hp = Infinity\n        for (let i = 0; i < this.enemies.length; i++) {\n            if (this.enemies[i].word === this.word.join(``) && this.enemies[i].alive === true) {\n                this.player.animateAttack(this.enemies[i].x, this.enemies[i].y - 50, this.cronothrust)\n                this.enemies[i].alive = false;\n                this.destroyedCount >= 0 ? this.destroyedCount++ : this.destroyedCount = 0\n            }\n        }\n    }\n\n  \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n// asap:1. walking animaton based on EITHER instance variable keeping track of past actions\n// OR just count requestanimationframe frames IDK\n// 2. collisions and damage on chrono\n// 3. bloody pool for death animation for both crono and monsters\n// 4. functions with instance variables to track last lifetime of animation like the jumping tracers? or just a settimeout\n\n// FUTURE:\n// 1. show WPM somewhere need to keep track of time elapsed DONE\n// 2. gameover reset the game \n// 3. animate attack from crono-- should he just teleport everywhere and use x-attack? OR HUGE ARC with MATH that he flies through SOMEWHAT SOLVED\n// 4. how does crono lose? do monsters need to attack him he needs hp or soemthing or if more than 5monsters are alive at once he loses\n// 5. make it feel more alive with actual edges that crono and monsters cant spawn/cross\n// 6. monsters move randomly left and right to and fro, also spawn preferentially away from existing monsters??\n// 7. animate random movement, walking, and standing so it doesnt look like crono is skating\n// 8. options/welcome screen/ choosing difficulty such as spawn rate\n// 9. animate monster death\n// 10. glitch: moving down+left double animates  SOLVED\n// 11. maybe huge melee limit break swing but will take a lot of either async/instance variables tracking/animationframes counting\n\n\n//https://ezgif.com/gif-to-sprite CONVERT walking gif into a spritesheet\nvar qs = document.querySelector.bind(document)\n// console.log(`this happens before body scripts`)\n// console.log(qs)\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    // console.log(`index.js execution`)\n    \n\n    window.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]() // window for testing\n\n\n \n    // vanilla javascript to manipulate html events to activate cheats!\n    let linkedin = qs(\"a[href='https://www.linkedin.com/in/edzhou/']\");\n    linkedin.addEventListener(`click`, () => {\n        if (!window.game.onSplash) window.game.player.hp = Infinity\n    })\n    \n    let cheatTooltip = qs(`span`)\n    cheatTooltip.style.display =`none`\n    // end cheats\n\n    // ill make this an event listener too. this might be overstepping the annoyance\n    Notification.requestPermission()\n    setTimeout( () => { \n        if (Notification.permission === \"granted\") new Notification(\"You've played for 5 minutes!\")\n    }, 300000)\n\n})\n\n\n\n// from https://orteil.dashnet.org/cookieclicker/\n// var PlaySound = function (url, vol, pitchVar) {\n//     //url : the url of the sound to play (will be cached so it only loads once)\n//     //vol : volume between 0 and 1 (multiplied by game volume setting); defaults to 1 (full volume)\n//     //(DISABLED) pitchVar : pitch variance in browsers that support it (Firefox only at the moment); defaults to 0.05 (which means pitch can be up to -5% or +5% anytime the sound plays)\n//     var volume = 1;\n//     var pitchVar = (typeof pitchVar === 'undefined') ? 0.05 : pitchVar;\n//     var rate = 1 + (Math.random() * 2 - 1) * pitchVar;\n//     if (typeof vol !== 'undefined') volume = vol;\n//     if (!Game.volume || volume == 0) return 0;\n//     if (!Sounds[url]) {\n//         //sound isn't loaded, cache it\n//         Sounds[url] = new Audio(url);\n//         Sounds[url].onloadeddata = function (e) { PlaySound(url, vol, pitchVar); }\n//     }\n//     else if (Sounds[url].readyState >= 2) {\n//         var sound = SoundInsts[SoundI];\n//         SoundI++;\n//         if (SoundI >= 12) SoundI = 0;\n//         sound.src = Sounds[url].src;\n//         //sound.currentTime=0;\n//         sound.volume = Math.pow(volume * Game.volume / 100, 2);\n//         if (pitchSupport && rate != 0) {\n//             sound.preservesPitch = false;\n//             sound.mozPreservesPitch = false;\n//             sound.webkitPreservesPitch = false;\n//             sound.playbackRate = rate;\n//         }\n//         sound.play();\n//     }\n// }\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/trie.js":
/*!*********************!*\
  !*** ./src/trie.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Trie; });\nclass Trie {\n    constructor() {\n        this.trie = {}\n    }\n\n    addWord(string) {\n        let current = this.trie\n        for (const char of string) {\n            if (!current.hasOwnProperty(char)) {\n                current[char] = {}\n            }\n            current = current[char]\n        }\n        current[`finished`] = string\n    }\n\n    removeWord(string) {\n    }\n\n    possibilities(substring) {\n        const possibilities = []\n        if (substring.length === 0) return possibilities //wait until at least 1 letter is typed otherwise possibilities are EVERY word\n        let current = this.trie\n        for (const char of substring) {\n            if (!current.hasOwnProperty(char)) return possibilities \n            current = current[char]\n        }        \n        dfs(current)\n        function dfs(current) {\n            for (const key in current) {\n                if (key === `finished`) possibilities.push(current[key])\n                else dfs(current[key])\n            }\n        }\n        return possibilities\n    }\n}\n\n\n//# sourceURL=webpack:///./src/trie.js?");

/***/ })

/******/ });