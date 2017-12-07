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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mathematics_js__ = __webpack_require__(3);


class Feature {
	constructor(name) {
		this.NAME = name;
	}

	update() {}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Feature;


class Entity {
	constructor() {
		this.position = new __WEBPACK_IMPORTED_MODULE_0__mathematics_js__["a" /* Vector */](0, 0);
		this.velocity = new __WEBPACK_IMPORTED_MODULE_0__mathematics_js__["a" /* Vector */](0, 0);

		this.features = [];
	}

	addFeature(feature) {
		this.features.push(feature);
		this[feature.NAME] = feature;
	}

	update(deltaTime) {
		this.features.forEach(feature => {
			feature.update(this, deltaTime);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Entity;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = loadImage;
/* harmony export (immutable) */ __webpack_exports__["a"] = loadDataFromJSON;
function loadImage(url) {
	return new Promise(resolve => {
		const img = new Image();
		img.src = url;
		img.addEventListener('load', () => {
			resolve(img);
		});
	});
}

function loadDataFromJSON(nameFile) {
	return fetch(`/src/database/${nameFile}.json`).then(response => response.json());
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loaders_js__ = __webpack_require__(1);


class SourceSprites {
	constructor(image) {
		this.image = image;
		this.widthOfTile;
		this.heightOfTile;
		this.tilesMap = new Map();
		this.startOfTileX;
		this.startOfTileY;
	}

	defineTilePerJSON(fileJSON, nameTile) {
		this.getCoordinatesOfTileFromJSON(fileJSON, nameTile);
		const bufferForTile = document.createElement('canvas');
		bufferForTile.width = this.widthOfTile;
		bufferForTile.height = this.heightOfTile;
		const bufferContext = bufferForTile.getContext('2d');
		bufferContext.drawImage(this.image, this.startOfTileX, this.startOfTileY, this.widthOfTile, this.heightOfTile, 0, 0, this.widthOfTile, this.heightOfTile);
		this.tilesMap.set(nameTile, bufferForTile);
	}

	drawTile(nameTile, context, x, y) {
		const buffer = this.tilesMap.get(nameTile);
		context.drawImage(buffer, x, y);
	}

	getCoordinatesOfTileFromJSON(fileJSON, nameTile) {
		this.startOfTileX = fileJSON[nameTile].frame.x;
		this.startOfTileY = fileJSON[nameTile].frame.y;
		this.widthOfTile = fileJSON[nameTile].frame.w;
		this.heightOfTile = fileJSON[nameTile].frame.h;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SourceSprites;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector {
	constructor(x, y) {
		this.set(x, y);
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadBacgroundSprites;
/* harmony export (immutable) */ __webpack_exports__["b"] = loadHeroSprites;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SourceSprites_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loaders_js__ = __webpack_require__(1);



function loadBacgroundSprites() {
	return Object(__WEBPACK_IMPORTED_MODULE_1__loaders_js__["b" /* loadImage */])('../images/sprites.png')
	// return loadImage('../images/minSprites.png')

	.then(image => {
		const sprites = new __WEBPACK_IMPORTED_MODULE_0__SourceSprites_js__["a" /* default */](image);
		return sprites;
	}).then(sprites => {
		return Object(__WEBPACK_IMPORTED_MODULE_1__loaders_js__["a" /* loadDataFromJSON */])('sprites').then(spritesDataFromJSON => {
			sprites.defineTilePerJSON(spritesDataFromJSON, 'box-g.png');
			sprites.defineTilePerJSON(spritesDataFromJSON, 'box-b1.png');
			return sprites;

			// return loadDataFromJSON('minSprites')
			// .then( spritesDataFromJSON => {
			// 	sprites.defineTilePerJSON(spritesDataFromJSON, 'box-ice.png');
			// 	sprites.defineTilePerJSON(spritesDataFromJSON, 'sky.png');
			// 	return sprites ;

		});
	});
}

function loadHeroSprites() {
	return Object(__WEBPACK_IMPORTED_MODULE_1__loaders_js__["b" /* loadImage */])('../images/sprites.png')
	// return loadImage('../images/minSprites.png')
	.then(image => {
		const sprites = new __WEBPACK_IMPORTED_MODULE_0__SourceSprites_js__["a" /* default */](image);
		return sprites;
	}).then(sprites => {
		return Object(__WEBPACK_IMPORTED_MODULE_1__loaders_js__["a" /* loadDataFromJSON */])('sprites')
		// return loadDataFromJSON('minSprites')
		.then(spritesDataFromJSON => {
			sprites.defineTilePerJSON(spritesDataFromJSON, 'boy4.png');
			return sprites;
		});
	});
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
__webpack_require__(14);
module.exports = __webpack_require__(15);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SourceSprites_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Compositor_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mathematics_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TimeHandler_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loaders_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sprites_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__layers_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__entities_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__KeyboardListener_js__ = __webpack_require__(13);













const canvas = document.getElementById('canvas');
canvas.setAttribute('width', 960);
canvas.setAttribute('height', 640);
const context = canvas.getContext('2d');

Promise.all([Object(__WEBPACK_IMPORTED_MODULE_8__entities_js__["a" /* createHero */])(), Object(__WEBPACK_IMPORTED_MODULE_6__sprites_js__["a" /* loadBacgroundSprites */])(), Object(__WEBPACK_IMPORTED_MODULE_5__loaders_js__["a" /* loadDataFromJSON */])('level-1')]).then(([hero, bacgroundSprites, levelDataFromJSON]) => {

	let compos = new __WEBPACK_IMPORTED_MODULE_1__Compositor_js__["a" /* default */]();

	let backgroundLayer = Object(__WEBPACK_IMPORTED_MODULE_7__layers_js__["a" /* createBackgroundLayer */])(levelDataFromJSON.backgrounds, bacgroundSprites);
	compos.layers.push(backgroundLayer);

	const gravity = 1000; // for example
	hero.position.set(60, 320);
	// hero.position.set(60, 520);
	// hero.velocity.set(300, -1000);

	const SPACE = 32;
	let keyInput = new __WEBPACK_IMPORTED_MODULE_9__KeyboardListener_js__["a" /* default */]();
	keyInput.addMapping(SPACE, keyState => {
		if (keyState) {
			hero.jump.start();
		} else {
			hero.jump.cancel();
		}
	});

	keyInput.listenTo(window);

	let heroLayer = Object(__WEBPACK_IMPORTED_MODULE_7__layers_js__["b" /* createSpriteLayer */])(hero);
	compos.layers.push(heroLayer);

	/* for normalize and unification time flying */
	let timer = new __WEBPACK_IMPORTED_MODULE_4__TimeHandler_js__["a" /* default */](1 / 60);
	timer.update = function update(deltaTime) {

		hero.update(deltaTime);
		compos.drawLayerWithContext(context);
		hero.velocity.y += gravity * deltaTime;
	};

	timer.start();
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Compositor {
	constructor() {
		this.layers = [];
	}

	drawLayerWithContext(context) {
		this.layers.forEach(layer => {
			layer(context);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Compositor;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TimeHandler {
	constructor(deltaTime = 1 / 60) {
		let overalTime = 0;
		let lastTime = 0;

		this.updateHelper = time => {
			overalTime += (time - lastTime) / 1000;

			while (overalTime > deltaTime) {
				this.update(deltaTime);
				overalTime -= deltaTime;
			}

			lastTime = time;

			this.queueOfProces();
		};
	}

	queueOfProces() {
		requestAnimationFrame(this.updateHelper);
	}

	start() {
		this.queueOfProces();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TimeHandler;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createBackgroundLayer;
/* harmony export (immutable) */ __webpack_exports__["b"] = createSpriteLayer;


function createBackgroundLayer(backgrounds, sprites) {
	let bgcBuffer = document.createElement('canvas');
	bgcBuffer.width = 960;
	bgcBuffer.height = 640;

	backgrounds.forEach(background => {
		drawBackground(background, bgcBuffer.getContext('2d'), sprites);
	});

	return function drawBgcLayer(context) {
		context.drawImage(bgcBuffer, 0, 0);
	};
}

function drawBackground(backgrounOf, context, sprites) {
	backgrounOf.ranges.forEach(([x1, x2, y1, y2]) => {
		for (let x = x1; x < x2; x = x + 37) {
			for (let y = y1; y < y2; y = y + 37) {
				sprites.drawTile(backgrounOf.tile, context, x, y);
			}
		}
	});
}

function createSpriteLayer(entity) {
	return function drawSpriteLayer(context) {
		entity.draw(context);
	};
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createHero;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprites_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features_Velocity_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__features_Jump_js__ = __webpack_require__(12);





function createHero() {

	return Object(__WEBPACK_IMPORTED_MODULE_1__sprites_js__["b" /* loadHeroSprites */])().then(sprite => {
		const hero = new __WEBPACK_IMPORTED_MODULE_0__Entity_js__["b" /* default */]();

		hero.addFeature(new __WEBPACK_IMPORTED_MODULE_2__features_Velocity_js__["a" /* default */]());
		hero.addFeature(new __WEBPACK_IMPORTED_MODULE_3__features_Jump_js__["a" /* default */]());

		hero.draw = function drawHero(context) {
			sprite.drawTile('boy3.png', context, this.position.x, this.position.y);
			// sprite.drawTile('bo4.png', context, this.position.x, this.position.y);
		};
		return hero;
	});
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_js__ = __webpack_require__(0);


class Velocity extends __WEBPACK_IMPORTED_MODULE_0__Entity_js__["a" /* Feature */] {
	constructor() {
		super('velocityFeature');
	}

	update(entity, dT) {
		entity.position.x += entity.velocity.x * dT;
		entity.position.y += entity.velocity.y * dT;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Velocity;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_js__ = __webpack_require__(0);


class Jump extends __WEBPACK_IMPORTED_MODULE_0__Entity_js__["a" /* Feature */] {
	constructor() {
		super('jump');

		this.duration = 0.5;
		this.velocity = 200;
		this.engageTime = 0;
	}

	start() {
		this.engageTime = this.duration;
	}

	cancel() {}

	update(entity, dT) {
		if (this.engageTime > 0) {
			entity.velocity.y = -this.velocity;
			this.engageTime = -dT;
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Jump;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const PRESSED = true;
const RELEASED = false;

class KeyboardListener {
	constructor() {
		this.currentKeyStates = new Map();
		this.funsForKeyMap = new Map();
	}

	addMapping(keyCode, callback) {
		this.funsForKeyMap.set(keyCode, callback);
	}

	handleEvent(event) {
		const { keyCode } = event;

		if (!this.funsForKeyMap.has(keyCode)) {
			return;
		}

		event.preventDefault();

		const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

		if (this.currentKeyStates.get(keyCode) === keyState) {
			return;
		}

		this.currentKeyStates.set(keyCode, keyState);

		this.funsForKeyMap.get(keyCode)(keyState);
	}

	listenTo(window) {
		['keydown', 'keyup'].forEach(eventType => {
			window.addEventListener(eventType, e => {
				this.handleEvent(e);
			});
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardListener;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map