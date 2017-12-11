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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(1);


class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {}

    update() {
        console.log('Update method is not provided');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Trait;


class Entity {
    constructor() {
        this.pos = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);
        this.vel = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);
        this.size = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Entity;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Matrix {
    constructor() {
        this.grid = [];
    }

    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Matrix;


class Vect {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Vect;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(18);
module.exports = __webpack_require__(19);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_field__ = __webpack_require__(4);


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// canvas.setAttribute('width', `${window.devicePixelRatio}` * 960);
// canvas.setAttribute('height', `${window.devicePixelRatio}` * 640);
// canvas.style.width = `960px`;
// canvas.style.height = `640px`;

canvas.setAttribute('width', 960);
canvas.setAttribute('height', 629);

Object(__WEBPACK_IMPORTED_MODULE_0__game_field__["a" /* default */])(context, canvas);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = drawField;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spritesheet__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loaders__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entities__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layers__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__debug__ = __webpack_require__(17);













function drawField(context, canvas) {
        Promise.all([Object(__WEBPACK_IMPORTED_MODULE_1__loaders__["a" /* loadImage */])('./images/sprites.png'), Object(__WEBPACK_IMPORTED_MODULE_1__loaders__["b" /* loadJSON */])('./sprites'), Object(__WEBPACK_IMPORTED_MODULE_1__loaders__["b" /* loadJSON */])('./levels/1-1')]).then(([image, data, layout]) => {

                const sprites = new __WEBPACK_IMPORTED_MODULE_0__spritesheet__["a" /* default */](image, data, canvas);

                for (let sprite in data) {
                        sprites.define(sprite);
                }

                const drawBackgroundLayer = Object(__WEBPACK_IMPORTED_MODULE_5__layers__["c" /* drawBackground */])(sprites, layout);
                const cosmo = Object(__WEBPACK_IMPORTED_MODULE_3__entities__["a" /* createCosmo */])(sprites);

                const drawCollisions = Object(__WEBPACK_IMPORTED_MODULE_5__layers__["b" /* createCollisionLayer */])(sprites);
                const drawCameraView = Object(__WEBPACK_IMPORTED_MODULE_5__layers__["a" /* createCameraLayer */])(sprites.camera);

                const input = Object(__WEBPACK_IMPORTED_MODULE_6__input__["a" /* default */])(cosmo);
                Object(__WEBPACK_IMPORTED_MODULE_7__debug__["a" /* setupMouseControl */])(canvas, cosmo, sprites.camera);
                input.listenTo(window);

                const timer = new __WEBPACK_IMPORTED_MODULE_4__timer__["a" /* default */](1 / 60);
                timer.update = function update(deltaTime) {
                        sprites.update(deltaTime);

                        drawBackgroundLayer(context);
                        sprites.drawCosmo(cosmo, context);

                        if (cosmo.pos.x > 300) {
                                sprites.camera.pos.x = cosmo.pos.x - 300;
                        }

                        drawCollisions(context, sprites.camera);
                        drawCameraView(context, sprites.camera);
                };
                timer.start();

                window.sprites = sprites;
        });
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TileCollider__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Camera__ = __webpack_require__(8);




class Spritesheet {
    constructor(image, data, canvas) {
        this.canvas = canvas;
        this.image = image;
        this.data = data;
        this.tiles = new Map();

        this.entities = new Set();
        this.tilesMatrix = new __WEBPACK_IMPORTED_MODULE_0__math__["a" /* Matrix */]();

        this.tileCollider = new __WEBPACK_IMPORTED_MODULE_1__TileCollider__["a" /* default */](this.tilesMatrix);

        this.gravity = 2000;
        this.camera = new __WEBPACK_IMPORTED_MODULE_2__Camera__["a" /* default */]();
    }

    define(name) {
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement('canvas');
            const context = buffer.getContext('2d');

            const png = this.data[`${name}`].frame;
            buffer.width = png['w'];
            buffer.height = png['h'];

            if (flip) {
                context.scale(-1, 1);
                context.translate(-buffer.width, 0);
            }

            context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'], 0, 0, png['w'], png['h']);
            return buffer;
        });
        this.tiles.set(name, buffers);
    }

    draw(name, context, x, y, type, flip) {
        const buffer = this.tiles.get(`${name}.png`)[flip ? 1 : 0];

        if (type) {
            if (type === 'tile' || 'dec-tile') {
                this.tilesMatrix.set(x, y, {
                    'name': name,
                    'type': type
                });
            }

            x = x * buffer.width;
            y = y * buffer.width;
        }

        context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    }

    drawTiles(name, context, type, x1, x2, y1, y2) {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                this.draw(name, context, x, y, type);
            }
        }
    }

    drawCosmo(cosmo, context) {
        let buffer;

        if (cosmo.go.dir) {
            if (cosmo.jump.ready < 0) {
                buffer = this.tiles.get(`boy3.png`)[cosmo.go.dir > 0 ? 0 : 1];
            } else {
                buffer = this.tiles.get(`boy2.png`)[cosmo.go.dir > 0 ? 0 : 1];
            }
        } else {
            buffer = this.tiles.get(`boy1.png`)[0];
        }

        context.drawImage(buffer, cosmo.pos.x - this.camera.pos.x, cosmo.pos.y - this.camera.pos.y);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity, this.camera);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity, this.camera);

            entity.vel.y += this.gravity * deltaTime;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Spritesheet;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileResolver__ = __webpack_require__(7);


class TileCollider {
    constructor(tileLayout) {
        this.tiles = new __WEBPACK_IMPORTED_MODULE_0__TileResolver__["a" /* default */](tileLayout);
    }

    checkX(entity, camera) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.pos.x + entity.size.x;
        } else if (entity.vel.x < 0) {
            x = entity.pos.x;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(x, x, entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {
            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        });
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.pos.y + entity.size.y;
        } else if (entity.vel.y < 0) {
            y = entity.pos.y;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(entity.pos.x, entity.pos.x + entity.size.x, y, y);

        matches.forEach(match => {
            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;

                    entity.obstruct('floor');
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;

                    entity.obstruct('ceiling');
                }
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileCollider;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// World position -> to tile indexes
class TileResolver {
    constructor(matrix, tileSize = 37) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);
        return range;
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;

            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2
            };
        }
    }

    searchByPosition(posX, posY) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }

    searchByRange(x1, x2, y1, y2) {
        const matches = [];

        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(match);
                }
            });
        });

        return matches;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileResolver;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(1);


class Camera {
    constructor() {
        this.pos = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);
        this.size = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](900, 629);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadImage;
/* harmony export (immutable) */ __webpack_exports__["b"] = loadJSON;
function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

function loadJSON(name) {
    return fetch(`./src/database/${name}.json`).then(response => response.json());
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createCosmo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Traits_Jump__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Traits_Go__ = __webpack_require__(12);




const SLOW_DRAG = 1 / 2000;
const FAST_DRAG = 0;

function createCosmo(sprites) {
    const cosmo = new __WEBPACK_IMPORTED_MODULE_0__entity__["b" /* default */]();

    cosmo.size.set(37, 50);

    cosmo.pos.set(185, 420);
    cosmo.vel.set(0, -600);

    sprites.entities.add(cosmo);

    cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_1__Traits_Jump__["a" /* default */]());
    cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_2__Traits_Go__["a" /* default */]());

    cosmo.turboAndSlow = function setTurboState(turtleOn) {
        this.go.dragFactor = turtleOn ? SLOW_DRAG : FAST_DRAG;
    };

    cosmo.slowAndTurbo = function setTurtleState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    };

    return cosmo;
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(0);


class Jump extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* Trait */] {
    constructor() {
        super('jump');

        this.duration = 0.5;
        this.velocity = 200;
        this.engageTime = 0;

        this.ready = 1;
        this.requestTime = 0;
        this.gracePeriod = 0.5;

        this.speedBoost = 0.3;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    obstruct(entity, side) {
        if (side === 'floor') {
            this.ready = 1;
        } else if (side === 'ceiling') {
            this.cancel();
        }
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }
            this.requestTime -= deltaTime;
        }

        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Jump;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(0);


class Go extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* Trait */] {
    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 12000;

        this.acceleration = 500;
        this.dragFactor = 0;
    }

    update(entity, deltaTime) {
        const maxSpeed = this.speed * deltaTime * this.dir;

        if (entity.go.dir > 0 && entity.vel.x < maxSpeed) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;
        } else if (entity.go.dir < 0 && entity.vel.x > maxSpeed) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;
        } else {
            entity.vel.x = maxSpeed;
        }

        const drag = this.dragFactor * entity.vel.x * Math.abs(entity.vel.x);
        entity.vel.x -= drag;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Go;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Timer {
    constructor(deltaTime = 1 / 60) {
        let lastTime = 0;
        let accumulatedTime = 0;

        this.updateProxy = time => {
            accumulatedTime += (time - lastTime) / 1000;

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }

            lastTime = time;
            this.enqueue();
        };
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = createCollisionLayer;
/* harmony export (immutable) */ __webpack_exports__["c"] = drawBackground;
/* harmony export (immutable) */ __webpack_exports__["a"] = createCameraLayer;
function createCollisionLayer(sprites) {

    const resolvedTiles = [];

    const tileResolver = sprites.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    };

    return function drawCollisions(context, camera) {

        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        sprites.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
}

function drawBackground(sprites, layout) {
    const buffer = document.createElement('canvas');
    const bufferContext = buffer.getContext('2d');

    const width = 37 * 100;
    const height = 37 * 17;
    buffer.setAttribute('width', width);
    buffer.setAttribute('height', height);

    layout.backgrounds.forEach(tile => {
        const name = tile.name;
        const type = tile.type;

        tile.pos.forEach(range => {
            switch (range.length) {
                case 4:
                    {
                        sprites.drawTiles(name, bufferContext, type, ...range);
                        break;
                    }
                case 3:
                    {
                        let [x, xLen, y] = range;
                        xLen += x;
                        sprites.drawTiles(name, bufferContext, type, x, xLen, y, y + 1);
                        break;
                    }
                case 2:
                    {
                        const [x, y] = range;
                        sprites.drawTiles(name, bufferContext, type, x, x + 1, y, y + 1);
                        break;
                    }
            }
        });
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0 + sprites.camera.pos.x, 0 + sprites.camera.pos.y, 960, 629, 0, 0, 960, 629);
        // context.drawImage(buffer, 0 - sprites.camera.pos.x,
        //                           0 - sprites.camera.pos.y);
    };
}

function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(cameraToDraw.pos.x - fromCamera.pos.x, cameraToDraw.pos.y - fromCamera.pos.y, cameraToDraw.size.x, cameraToDraw.size.y);
        context.stroke();
    };
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setupKeyboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboardState__ = __webpack_require__(16);


function setupKeyboard(cosmo) {
    const input = new __WEBPACK_IMPORTED_MODULE_0__keyboardState__["a" /* default */]();

    input.addMapping('Space', keyState => {
        if (keyState) {
            cosmo.jump.start();
        } else {
            cosmo.jump.cancel();
        }
    });

    input.addMapping('KeyO', keyState => {
        cosmo.slowAndTurbo(keyState);
    });
    input.addMapping('KeyP', keyState => {
        cosmo.turboAndSlow(keyState);
    });

    input.addMapping('ArrowRight', keyState => {
        cosmo.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        cosmo.go.dir += keyState ? -1 : 1;
    });

    return input;
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const PRESSED = 1;
const RELEASED = 0;

class KeyboardState {
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }
    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }
    handleEvent(event) {
        const { code } = event;

        if (!this.keyMap.has(code)) {
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardState;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setupMouseControl;
function setupMouseControl(canvas, entity, camera) {
    let lastEvent;

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(event.offsetX + camera.pos.x, event.offsetY + camera.pos.y);
            }
        });
    });

    window.addEventListener('keydown', event => {
        // console.log(event.code);
        if (event.code === 'KeyD') {
            camera.pos.x += 75;
        }
        if (event.code === 'KeyA') {
            camera.pos.x -= 75;
        }
    });
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map