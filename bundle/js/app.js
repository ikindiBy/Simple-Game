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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BoundingBox_js__ = __webpack_require__(17);



const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Sides;


class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {}

    collides(us, them) {}

    update() {}
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Trait;


class Entity {
    constructor(name) {
        this.name = name;
        this.pos = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);
        this.vel = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);
        this.size = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);
        this.offset = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);
        this.startPosition = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);

        this.lifetime = 0;
        this.bounds = new __WEBPACK_IMPORTED_MODULE_1__BoundingBox_js__["a" /* default */](this.pos, this.size, this.offset);

        this.traits = [];

        this.player = false;

        this.sounds;
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

    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }

    update(deltaTime, sprites, context) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, sprites, context);
        });

        this.lifetime += deltaTime;

        this.sounds = sprites.sounds;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Entity;


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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);


class Killable extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }

    kill() {
        this.dead = true;
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity, deltaTime, sprites) {
        if (this.dead) {
            if (!entity.player) {
                entity.pictures = entity.deadPic;
            } else {
                sprites.entities.delete(entity);
            }

            if (entity.name === 'purple') {
                entity.offset.y = -180;
            } else if (entity.name === 'green') {
                entity.offset.y = -62;
            }

            this.deadTime += deltaTime;

            if (this.deadTime > this.removeAfter) {
                sprites.entities.delete(entity);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Killable;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = showGameOver;
/* harmony export (immutable) */ __webpack_exports__["c"] = showCongratulations;
/* harmony export (immutable) */ __webpack_exports__["b"] = drawStartMenu;
/* harmony export (immutable) */ __webpack_exports__["a"] = drawPauseScreen;

function showGameOver(sprites) {
    const buffer = sprites.tiles.get(`bg.png`)[0];

    return function (context) {
        context.drawImage(buffer, 0, 0, 960, 629);

        context.font = "50px Verdana";
        context.strokeStyle = "red";
        context.strokeText(`GAME OVER`, 320, 210);
        context.strokeText(`PRESS RESTART BUTTON`, 170, 310);
        context.strokeText(`Key "R"`, 380, 410);
    };
}

function showCongratulations(sprites) {
    const buffer = sprites.tiles.get(`bg.png`)[0];

    return function (context) {
        context.drawImage(buffer, 0, 0, 960, 629);

        context.font = "50px Verdana";
        context.strokeStyle = "lightblue";
        context.strokeText(`CONGRATULATIONS`, 250, 320);

        context.font = "italic 25px Helvetica";
        context.fillStyle = "darkSlateBlue";
        context.fillText(`no more levels`, 10, 570);
        context.fillText(`key "R" to restart`, 10, 600);
    };
}

function drawStartMenu(context, sprites, font) {

    sprites.draw('bg', context, 0, 0);
    font.print('PRESS', context, 150, 50, 60, 60);
    sprites.draw('boy1', context, 80, 210);
    sprites.draw('boy2', context, 120, 210);
    sprites.draw('boy3', context, 160, 210);
    sprites.draw('boy2', context, 200, 210);
    font.print('ENTER', context, 340, 208, 60, 60);
    sprites.draw('boy4', context, 780, 210);
    font.print('TO', context, 150, 350, 60, 60);
    font.print('START', context, 350, 450, 60, 60);
}

function drawPauseScreen() {
    const buffer = document.createElement('canvas');
    const context = buffer.getContext('2d');
    buffer.setAttribute('width', 960);
    buffer.setAttribute('height', 629);

    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, 960, 629);

    context.lineWidth = 40;
    context.strokeStyle = "red";

    context.strokeStyle = "rgba(222, 22, 220, 0.5)";

    context.beginPath();
    context.moveTo(420, 250);
    context.lineTo(420, 370);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(500, 250);
    context.lineTo(500, 370);
    context.stroke();

    context.font = "40px Verdana";
    context.fillStyle = "rgba(222, 22, 220, 0.4)";
    context.fillText(`press "P" to play`, 20, 600);

    return function showPause(context) {
        context.drawImage(buffer, 0, 0);
    };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_Cosmo__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Traits_PlayerController__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__debug__ = __webpack_require__(25);





/* harmony default export */ __webpack_exports__["a"] = (function (sprites) {
    const createCosmo = Object(__WEBPACK_IMPORTED_MODULE_0__Entities_Cosmo__["a" /* createCosmoFactory */])(sprites);
    const cosmo = createCosmo();

    createPlayerEnv(cosmo);

    const input = Object(__WEBPACK_IMPORTED_MODULE_2__input__["a" /* default */])(cosmo);
    // setupMouseControl(canvas, cosmo, sprites.camera);
    input.listenTo(window);
});

function createPlayerEnv(playerEntity) {
    const playerControl = new __WEBPACK_IMPORTED_MODULE_1__Traits_PlayerController__["a" /* default */](playerEntity);
    playerControl.checkPoint.set(42, 42);
    playerEntity.addTrait(playerControl);
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);



class Jump extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
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
        if (side === __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* Sides */].BOTTOM) {
            this.ready = 1;
        } else if (side === __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* Sides */].TOP) {
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);


class Go extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 12000;

        this.acceleration = 500;
        this.deceleration = 350;
        this.dragFactor = 1 / 5000;

        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {
        const maxSpeed = this.speed * deltaTime * this.dir;
        const absX = Math.abs(entity.vel.x);

        if (this.dir !== 0) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;
            this.heading = this.dir;
        } else if (entity.vel.x !== 0) {
            let decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;

        this.distance += absX * deltaTime;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Go;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_js__ = __webpack_require__(0);


class Physics extends __WEBPACK_IMPORTED_MODULE_0__Entity_js__["b" /* Trait */] {
    constructor() {
        super('physics');

        this.countPatrol = 0;
    }

    update(entity, deltaTime, sprites) {

        if (entity.name.includes('black')) {

            let distanceAll = Math.abs(entity.pendulumWalk.speed) * entity.lifetime;
            let deltaDistance = distanceAll - this.countPatrol * entity.pendulumWalk.amplitudePatrol;
            let positionBySinusoid = 1 - Math.sin(Math.PI * entity.lifetime) / 15;

            if (deltaDistance > entity.pendulumWalk.amplitudePatrol) {

                this.countPatrol++;
                entity.pendulumWalk.speed = -entity.pendulumWalk.speed;
            }

            if (!entity.killable.dead) {
                entity.vel.y = 0;
                entity.pos.y = entity.startPosition.y * positionBySinusoid;
            }
        }

        entity.pos.x += entity.vel.x * deltaTime;
        sprites.tileCollider.checkX(entity, sprites.camera);

        entity.pos.y += entity.vel.y * deltaTime;
        sprites.tileCollider.checkY(entity, sprites.camera);

        entity.vel.y += sprites.gravity * deltaTime;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Physics;


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Camera__ = __webpack_require__(31);


class Spritesheet {
    constructor(image, data) {
        this.image = image;
        this.data = data;
        this.tiles = new Map();

        this.camera = new __WEBPACK_IMPORTED_MODULE_0__Camera__["a" /* default */]();
        this.TILE_SIZE = 37;
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

            if (png['w'] < this.TILE_SIZE && png['h'] < this.TILE_SIZE && !name.includes('enemy')) {
                buffer.width = this.TILE_SIZE;
                buffer.height = this.TILE_SIZE;
                let deltaX = (this.TILE_SIZE - png['w']) / 2;
                let deltaY = (this.TILE_SIZE - png['h']) / 2;
                context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'], deltaX, deltaY, png['w'], png['h']);
            } else {
                context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'], 0, 0, png['w'], png['h']);
            }
            return buffer;
        });
        this.tiles.set(name, buffers);
    }

    // draw(name, context, x, y, type, flip) {
    //     const buffer = this.tiles.get(`${name}.png`)[flip ? 1 : 0];
    //     context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    // }

    drawTiles(name, context, type, x1, x2, y1, y2) {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                this.draw(name, context, x, y, type);
            }
        }
    }

    getEntitiesByName(name) {
        let entities = [];
        this.entities.forEach(value => {
            if (value.name == name) {
                entities.push(value);
            }
        });
        return entities;
    }

    update(deltaTime, context) {}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Spritesheet;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
__webpack_require__(39);
module.exports = __webpack_require__(40);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_field__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loaders__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sprite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Font__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawInfo__ = __webpack_require__(3);






const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.setAttribute('width', 960);
canvas.setAttribute('height', 629);

const game = Promise.all([Object(__WEBPACK_IMPORTED_MODULE_1__loaders__["a" /* loadImage */])('./images/sprites.png'), Object(__WEBPACK_IMPORTED_MODULE_1__loaders__["b" /* loadJSON */])('./sprites'), Object(__WEBPACK_IMPORTED_MODULE_1__loaders__["b" /* loadJSON */])('./alphabet'), Object(__WEBPACK_IMPORTED_MODULE_1__loaders__["a" /* loadImage */])('./images/alphabet.png')]).then(async ([tileImage, tileData, fontData, fontImage]) => {

    const sprites = new __WEBPACK_IMPORTED_MODULE_2__Sprite__["a" /* default */](tileImage, tileData);
    for (let sprite in tileData) {
        sprites.define(sprite);
    }
    await sprites.createLevelCompositor();

    const font = new __WEBPACK_IMPORTED_MODULE_3__Font__["a" /* default */](fontImage, fontData);
    for (let letter in fontData) {
        font.define(letter);
    }

    Object(__WEBPACK_IMPORTED_MODULE_4__drawInfo__["b" /* drawStartMenu */])(context, sprites, font);
    window.addEventListener('keypress', start);

    return [sprites, font];
});

const start = event => {
    if (event.code === 'Enter') {
        window.removeEventListener('keypress', start);

        game.then(([sprites, font]) => {
            Object(__WEBPACK_IMPORTED_MODULE_0__game_field__["a" /* default */])(context, sprites);
        });
    }
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = drawField;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layers_collision__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layers_camera__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createPlayerEnvironment__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawInfo__ = __webpack_require__(3);






function drawField(context, sprites) {

    // const drawCollisions = createCollisionLayer(sprites);
    // const drawCameraView = createCameraLayer(sprites.camera);

    const timer = new __WEBPACK_IMPORTED_MODULE_0__timer__["a" /* default */](1 / 60);
    timer.update = function update(deltaTime) {
        sprites.update(deltaTime, context);
        // drawCollisions(context, sprites.camera);
        // drawCameraView(context, sprites.camera);
    };
    timer.start();

    window.addEventListener('keypress', restart.bind(this, sprites));
    window.addEventListener('keypress', stopTimer.bind(this, timer, context));
}

const restart = async (sprites, e) => {
    if (e.code === 'KeyR') {
        sprites.level = 1;
        await sprites.createLevelCompositor();
    }
};

const stopTimer = (timer, context, e) => {
    if (e.code === 'KeyP') {
        if (timer._stop) {
            timer.start();
        } else {
            timer.stop();
            showPause(context);
        }
    }
};

const showPause = Object(__WEBPACK_IMPORTED_MODULE_4__drawInfo__["a" /* drawPauseScreen */])();

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Timer {
    constructor(deltaTime = 1 / 60) {
        this._start = true;
        this._stop = false;

        let lastTime = 0;
        let accumulatedTime = 0;

        this.updateProxy = time => {
            if (!this._stop) {
                if (this._start || time - lastTime > 3000) {
                    lastTime = time;
                    this._start = false;
                }

                accumulatedTime += (time - lastTime) / 1000;
                while (accumulatedTime > deltaTime) {
                    this.update(deltaTime);
                    accumulatedTime -= deltaTime;
                }

                lastTime = time;
                this.enqueue();
            }
        };
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
        this._stop = false;
    }

    stop() {
        this._start = true;
        this._stop = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function drawEntityBox(entities) {
    return function drawBoundingBoxes(context, camera) {
        context.strokeStyle = 'red';
        entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.bounds.left - camera.pos.x, entity.bounds.top - camera.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        });
    };
}

function createTileCandidateLayer(tileCollider) {
    const resolvedTiles = [];

    const tileResolver = tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    };

    return function drawTileCandidates(context, camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
}

function createCollisionLayer(sprites) {

    const drawTileCandidates = createTileCandidateLayer(sprites.tileCollider);
    const drawBoundingBoxes = drawEntityBox(sprites.entities);

    return function drawCollisions(context, camera) {
        drawTileCandidates(context, camera);
        drawBoundingBoxes(context, camera);
    };
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(cameraToDraw.pos.x - fromCamera.pos.x, cameraToDraw.pos.y - fromCamera.pos.y, cameraToDraw.size.x, cameraToDraw.size.y);
        context.stroke();
    };
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createCosmoFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Traits_Jump__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Traits_Go__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Traits_Stomper__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Traits_Physics__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Traits_Killable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Traits_Falling__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Traits_StateCosmo__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Traits_Dashboard__ = __webpack_require__(21);











const SLOW_DRAG = 1 / 2000;
const FAST_DRAG = 1 / 5000;

function createCosmoFactory(sprites) {

    function setTurboState(turtleOn) {
        this.go.dragFactor = turtleOn ? SLOW_DRAG : FAST_DRAG;
    }

    function setTurtleState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    return function createCosmo() {
        const cosmo = new __WEBPACK_IMPORTED_MODULE_0__Entity__["c" /* default */]('cosmo');

        cosmo.player = true;

        cosmo.size.set(20, 50);

        cosmo.pos.set(185, 420);
        cosmo.vel.set(0, -600);
        cosmo.offset.set(9, 0);

        sprites.entities.add(cosmo);

        cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_4__Traits_Physics__["a" /* default */]());
        cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_1__Traits_Jump__["a" /* default */]());
        cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_2__Traits_Go__["a" /* default */]());
        cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_3__Traits_Stomper__["a" /* default */]());
        cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_5__Traits_Killable__["a" /* default */]());
        cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_6__Traits_Falling__["a" /* default */]());
        cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_7__Traits_StateCosmo__["a" /* default */]());
        cosmo.addTrait(new __WEBPACK_IMPORTED_MODULE_8__Traits_Dashboard__["a" /* default */]());

        cosmo.turboAndSlow = setTurboState;
        cosmo.slowAndTurbo = setTurtleState;

        return cosmo;
    };
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BoundingBox {
    constructor(pos, size, offset) {
        this.pos = pos;
        this.size = size;
        this.offset = offset;
    }

    overlaps(box) {
        return this.bottom > box.top && this.top < box.bottom && this.left < box.right && this.right > box.left;
    }

    get bottom() {
        return this.pos.y + this.size.y + this.offset.y;
    }

    set bottom(y) {
        this.pos.y = y - (this.size.y + this.offset.y);
    }

    get top() {
        return this.pos.y + this.offset.y;
    }

    set top(y) {
        this.pos.y = y - this.offset.y;
    }

    get left() {
        return this.pos.x + this.offset.x;
    }

    set left(x) {
        this.pos.x = x - this.offset.x;
    }

    get right() {
        return this.pos.x + this.size.x + this.offset.x;
    }

    set right(x) {
        this.pos.x = x - (this.size.x + this.offset.x);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoundingBox;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_js__ = __webpack_require__(0);


class Stomper extends __WEBPACK_IMPORTED_MODULE_0__Entity_js__["b" /* Trait */] {
    constructor() {
        super('stomper');
        this.queueBounce = false;
        this.bounceSpeed = 400;
    }

    bounce() {
        this.queueBounce = true;
    }

    update(entity) {
        if (this.queueBounce) {
            entity.vel.y = -this.bounceSpeed;
            this.queueBounce = false;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stomper;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);


class Falling extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
    constructor() {
        super('falling');
    }

    update(entity, deltaTime, sprites) {
        if (entity.pos.y > 800 && entity.stateCosmo.alive) {
            entity.playerController.death(entity, sprites);
            entity.sounds.playSound('fallInAbyss');
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Falling;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);


class StateCosmo extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
    constructor() {
        super('stateCosmo');
        this.lives = 3;
        this.coins = 0;
        this.keys = 0;
        this.locks = 0;
        this.alive = true;
    }

    update(entity, deltaTime, sprites) {

        if (this.coins > 50) {
            this.coins = 0;
            this.lives++;
        }

        if (this.locks === 1) {
            this.locks = 0;
            sprites.level++;
            sprites.createLevelCompositor('won');
            entity.playerController.updateTimer();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StateCosmo;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);


class Dashboard extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
    constructor() {
        super('dashboard');
    }

    update(entity, deltaTime, sprites, context) {
        const time = Math.round(entity.playerController.time);

        context.font = "22px Verdana";

        context.fillStyle = "darkViolet";
        context.fillText(`LEVEL : 1`, 20, 22);
        context.fillText(`COINS : ${entity.stateCosmo.coins}`, 160, 22);
        context.fillText(`LIVES : ${entity.stateCosmo.lives}`, 300, 22);

        context.fillText(`KEYS : ${entity.stateCosmo.keys}`, 460, 22);

        context.fillText(`TIME : ${time}`, 840, 22);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dashboard;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math__ = __webpack_require__(1);



const TIME_LIMIT = 60;
/* unused harmony export TIME_LIMIT */


class PlayerController extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
    constructor(entity) {
        super('playerController');

        this.player = entity;
        this.checkPoint = new __WEBPACK_IMPORTED_MODULE_1__math__["b" /* Vect */](0, 0);

        this.time = TIME_LIMIT;
        this.stopTime = false;
    }

    death(entity, sprites) {
        this.player.stateCosmo.lives--;

        if (this.player.stateCosmo.alive) {
            this.player.killable.kill();
        }

        if (this.player.stateCosmo.lives > 0) {
            this.player.killable.revive();
            this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
            sprites.entities.add(this.player);
        } else {
            entity.stateCosmo.alive = false;
            entity.sounds.playSound('gameOver');
            sprites.gameOver();
        }

        this.updateTimer();
    }

    updateTimer() {
        this.time = TIME_LIMIT;
    }

    update(entity, deltaTime, sprites, context) {
        if (!sprites.entities.has(entity) && entity.stateCosmo.alive) {

            this.death(entity, sprites);
        } else if (!this.stopTime) {

            this.time -= deltaTime * sprites.level;
        }

        if (this.time <= 0) {
            this.death(entity, sprites);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerController;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setupKeyboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboardState__ = __webpack_require__(24);


function setupKeyboard(cosmo) {
    const input = new __WEBPACK_IMPORTED_MODULE_0__keyboardState__["a" /* default */]();

    input.addMapping('Space', keyState => {
        if (keyState) {
            cosmo.jump.start();
        } else {
            cosmo.jump.cancel();
        }
    });

    input.addMapping('ShiftLeft', keyState => {
        cosmo.slowAndTurbo(keyState);
    });

    input.addMapping('ControlLeft', keyState => {
        cosmo.turboAndSlow(keyState);
    });

    input.addMapping('ArrowRight', keyState => {
        cosmo.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        cosmo.go.dir += keyState ? -1 : 1;
    });

    input.addMapping('ArrowDown', keyState => {
        cosmo.vel.y += 150;
    });

    input.addMapping('ArrowUp', keyState => {
        if (keyState) {
            cosmo.jump.start();
        } else {
            cosmo.jump.cancel();
        }
    });

    return input;
}

/***/ }),
/* 24 */
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setupMouseControl */
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TileCollider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EntityCollider__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animations__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__spritesheet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Sounds__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__layers_background__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__loaders__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__createEntities__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__createPlayerEnvironment__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__drawInfo__ = __webpack_require__(3);














class Sprite extends __WEBPACK_IMPORTED_MODULE_4__spritesheet__["a" /* default */] {
    constructor(image, data) {
        super(image, data);

        this.entities = new Set();
        this.tilesMatrix = new __WEBPACK_IMPORTED_MODULE_0__math__["a" /* Matrix */]();
        this.sounds = new __WEBPACK_IMPORTED_MODULE_5__Sounds__["a" /* default */]();

        this.tileCollider = new __WEBPACK_IMPORTED_MODULE_1__TileCollider__["a" /* default */](this.tilesMatrix);
        this.entityCollider = new __WEBPACK_IMPORTED_MODULE_2__EntityCollider__["a" /* default */](this.entities);

        this.gravity = 2000;
        this.level = 1;
    }

    draw(name, context, x, y, type, flip) {
        const buffer = this.tiles.get(`${name}.png`)[flip ? 1 : 0];

        if (type) {
            if (type !== 'decor') {
                this.tilesMatrix.set(x, y, {
                    'name': name,
                    'type': type
                });
            }
            if (name.includes('coin') || name.includes('key')) {
                x = x * this.TILE_SIZE;
                y = y * this.TILE_SIZE;
            } else {
                x = x * buffer.width;
                y = y * buffer.height;
            }
        }

        context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    }

    drawEntity(name, context, x, y, flip = false) {
        const buffer = this.tiles.get(`${name}.png`)[flip ? 0 : 1];
        context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    }

    drawCosmo(cosmo, context) {
        let buffer;

        let frames = ['boy4.png', 'boy3.png', 'boy2.png', 'boy1.png'];

        let runAnim = Object(__WEBPACK_IMPORTED_MODULE_3__animations__["a" /* createAnimation */])(frames, 5);

        function routeFrame(cosmo) {
            if (cosmo.jump.ready < 0) {
                return 'boy3.png';
            }
            if (cosmo.go.distance > 0) {
                return runAnim(cosmo.go.distance);
            }
            return 'boy1.png';
        }

        buffer = this.tiles.get(routeFrame(cosmo))[cosmo.go.heading > 0 ? 0 : 1];

        context.drawImage(buffer, cosmo.pos.x - this.camera.pos.x, cosmo.pos.y - this.camera.pos.y);
    }

    createLevelCompositor(result) {
        return Object(__WEBPACK_IMPORTED_MODULE_7__loaders__["b" /* loadJSON */])(`./levels/1-${this.level}`).then(layout => {
            this.entities.forEach(entity => {
                if (!result) {
                    this.entities.delete(entity);
                } else {
                    if (!entity.player) {
                        this.entities.delete(entity);
                    } else {
                        entity.pos.set(100, 100);
                    }
                }
            });
            this.tilesMatrix.grid = [];
            this.camera.pos.x = 0;

            Object(__WEBPACK_IMPORTED_MODULE_8__createEntities__["a" /* createEntities */])(this, layout);
            if (!result) {
                Object(__WEBPACK_IMPORTED_MODULE_9__createPlayerEnvironment__["a" /* default */])(this);
            }

            this.drawLevel = Object(__WEBPACK_IMPORTED_MODULE_6__layers_background__["a" /* default */])(this, layout);
        }).catch(e => {
            console.log('Congratulations, no more levels');
            console.log(e);
            this.gameOver('done');
        });
    }

    gameOver(result) {
        this.entities.forEach(entity => {
            this.entities.delete(entity);
        });
        this.tilesMatrix.grid = [];
        this.camera.pos.x = 0;

        if (!result) {
            this.drawLevel = Object(__WEBPACK_IMPORTED_MODULE_10__drawInfo__["d" /* showGameOver */])(this);
        } else {
            this.drawLevel = Object(__WEBPACK_IMPORTED_MODULE_10__drawInfo__["c" /* showCongratulations */])(this);
        }
    }

    update(deltaTime, context) {
        this.drawLevel(context);
        this.entities.forEach(entity => {
            entity.update(deltaTime, this, context);

            if (entity.name === 'cosmo') {
                this.drawCosmo(entity, context);
                this.camera.pos.x = entity.pos.x > 3040 ? 2740 : Math.max(0, entity.pos.x - 300);
            } else if (entity.name.includes('key') || entity.name.includes('coin') || entity.name.includes('lock')) {
                this.draw(entity.name, context, entity.pos.x, entity.pos.y);
            } else if (entity.name !== 'cosmo') {
                this.drawEntity(entity.picture, context, entity.pos.x, entity.pos.y, entity.pendulumWalk.speed > 0 ? 0 : 1);
            }
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileResolver__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity__ = __webpack_require__(0);



class TileCollider {
    constructor(tileLayout) {
        this.tiles = new __WEBPACK_IMPORTED_MODULE_0__TileResolver__["a" /* default */](tileLayout);
    }

    checkX(entity, camera) {
        if (entity.pos.x < 0) {
            entity.pos.x = 0;
        }
        if (entity.bounds.right > this.tiles.tileSize * this.tiles.matrix.grid.length) {
            entity.pos.x = this.tiles.tileSize * this.tiles.matrix.grid.length - entity.size.x - entity.offset.x;
            console.log(entity.pos.x);
        }

        let x;
        if (entity.vel.x > 0) {
            x = entity.bounds.right;
        } else if (entity.vel.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(x, x, entity.bounds.top, entity.bounds.bottom);

        matches.forEach(match => {
            if (entity.vel.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.bounds.right = match.x1;
                    entity.vel.x = 0;

                    entity.obstruct(__WEBPACK_IMPORTED_MODULE_1__Entity__["a" /* Sides */].RIGHT);
                }
            } else if (entity.vel.x < 0) {
                if (entity.bounds.left < match.x2) {
                    entity.bounds.left = match.x2;
                    entity.vel.x = 0;

                    entity.obstruct(__WEBPACK_IMPORTED_MODULE_1__Entity__["a" /* Sides */].LEFT);
                }
            }
        });
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.vel.y < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(entity.bounds.left, entity.bounds.right, y, y);

        matches.forEach(match => {
            if (entity.vel.y > 0) {
                if (entity.bounds.bottom > match.y1) {

                    entity.bounds.bottom = match.y1;
                    entity.vel.y = 0;

                    this.reachEdge(entity, y);

                    entity.obstruct(__WEBPACK_IMPORTED_MODULE_1__Entity__["a" /* Sides */].BOTTOM);
                }
            } else if (entity.vel.y < 0) {
                if (entity.bounds.top < match.y2) {
                    entity.bounds.top = match.y2;
                    entity.vel.y = 0;
                    entity.obstruct(__WEBPACK_IMPORTED_MODULE_1__Entity__["a" /* Sides */].TOP);
                }
            }
        });
    }

    reachEdge(entity, y) {
        if (!entity.player) {

            let stepToEdge = entity.size.x * Math.abs(entity.vel.x) / entity.vel.x;
            stepToEdge = stepToEdge ? stepToEdge : 0;
            let nextTile = this.tiles.searchByRange(entity.bounds.left + stepToEdge, entity.bounds.right + stepToEdge, y, y)[0];
            if (!nextTile) {
                entity.pendulumWalk.speed = -entity.pendulumWalk.speed;
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileCollider;


/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }

    check(entity) {
        this.entities.forEach(candidate => {
            if (entity === candidate) {
                return;
            }

            if (entity.bounds.overlaps(candidate.bounds)) {
                entity.collides(candidate);
                candidate.collides(entity);
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EntityCollider;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAnimation;
function createAnimation(frames, frameLen) {
	return function resolveFrame(distance) {
		let frameIndex = Math.floor(distance / frameLen % frames.length);
		let frameName = frames[frameIndex];
		return frameName;
	};
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(1);


class Camera {
    constructor() {
        this.pos = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](0, 0);
        this.size = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vect */](960, 629);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Sounds {
	constructor() {
		this.loadedSounds = new Map();
		this.loas = [];
	}

	playSound(name) {

		if (this.loadedSounds.has(name)) {

			this.loadedSounds.get(name).play();
		} else {

			let sound = new Audio(`sounds/${name}.mp3`);
			sound.load();
			sound.play();

			this.loadedSounds.set(name, sound);
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sounds;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = drawBackground;
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
        context.drawImage(buffer, 0 - sprites.camera.pos.x, 0 - sprites.camera.pos.y);
    };
}

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createEntities;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_Enemies__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_Artefacts__ = __webpack_require__(37);



function createEntities(sprites, layout) {

    const createEnemy = Object(__WEBPACK_IMPORTED_MODULE_0__Entities_Enemies__["a" /* createEnemiesFactory */])(sprites);
    const createArtefact = Object(__WEBPACK_IMPORTED_MODULE_1__Entities_Artefacts__["a" /* createArtefactsFactory */])(sprites);

    layout.entities.forEach(species => {
        const name = species.name;
        const [sizeX, sizeY] = species.data.size;
        const pictures = species.data.pictures;
        const deadPic = species.data.deadPic;
        const [velX, velY] = species.data.velocity;

        species.positions.forEach(entity => {
            const [posX, posY, reverse] = entity.pos;
            const [offsetX, offsetY] = entity.offset;

            createEnemy(name, posX, posY, offsetX, offsetY, sizeX, sizeY, velX, velY, reverse, pictures, deadPic);
        });
    });

    layout.artefacts.forEach(artef => {
        const name = artef.name;

        artef.positions.forEach(arrPositions => {
            const [posX, posY] = arrPositions;

            createArtefact(name, posX, posY);
        });
    });
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createEnemiesFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Traits_Jump__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Traits_Go__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Traits_Killable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Traits_PendulumWalk__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Traits_Physics__ = __webpack_require__(7);







class Behavior extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
    constructor() {
        super('behavior');
    }

    reachEdge(enemy) {}

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.pendulumWalk.speed = 0;
                us.killable.kill();
                them.stomper.bounce();
                us.sounds.playSound('killEnemy');
            } else {
                them.killable.kill();
                them.sounds.playSound('killHero');
            }
        }
    }

    update(entity, deltaTime, sprites) {
        const sequence = Math.floor(entity.lifetime % entity.pictures.length);
        entity.picture = entity.pictures[sequence];
    }
}

function createEnemiesFactory(sprites) {

    return function createEnemy(name, posX, posY, offsetX, offsetY, sizeX, sizeY, velX, velY, reverse, pictures, deadPic) {

        const enemy = new __WEBPACK_IMPORTED_MODULE_0__Entity__["c" /* default */](name);
        enemy.size.set(sizeX, sizeY);
        enemy.pos.set(posX * 37, posY * 37);
        enemy.startPosition.set(posX * 37, posY * 37);
        enemy.vel.set(velX, velY);
        enemy.offset.set(offsetX, offsetY);
        enemy.pictures = reverse ? Array.from(pictures).reverse() : pictures;
        enemy.picture = null;
        enemy.deadPic = deadPic;

        enemy.addTrait(new __WEBPACK_IMPORTED_MODULE_5__Traits_Physics__["a" /* default */]());
        enemy.addTrait(new __WEBPACK_IMPORTED_MODULE_4__Traits_PendulumWalk__["a" /* default */](reverse));
        enemy.addTrait(new Behavior());
        enemy.addTrait(new __WEBPACK_IMPORTED_MODULE_3__Traits_Killable__["a" /* default */]());

        sprites.entities.add(enemy);
    };
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_js__ = __webpack_require__(0);


class PendulumWalk extends __WEBPACK_IMPORTED_MODULE_0__Entity_js__["b" /* Trait */] {
    constructor(reverse) {
        super('pendulumWalk');
        this.speed = reverse ? 30 : -30;
        let randomForPatrol = Math.random() < 0.5 ? 0.5 : Math.random();
        this.amplitudePatrol = randomForPatrol * 1000;
    }

    obstruct(entity, side) {
        if (side === __WEBPACK_IMPORTED_MODULE_0__Entity_js__["a" /* Sides */].LEFT || side === __WEBPACK_IMPORTED_MODULE_0__Entity_js__["a" /* Sides */].RIGHT) {
            this.speed = -this.speed;
        }
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PendulumWalk;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createArtefactsFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Traits_Killable__ = __webpack_require__(2);



class Behavior extends __WEBPACK_IMPORTED_MODULE_0__Entity__["b" /* Trait */] {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            us.killable.removeAfter = 0;

            if (us.name.includes('coin')) {
                us.killable.kill();
                them.stateCosmo.coins++;
                them.sounds.playSound('getCoin');
                them.playerController.time++;
            } else if (us.name.includes('key')) {
                us.killable.kill();
                them.stateCosmo.keys++;
                them.sounds.playSound('getCoin');
            } else if (us.name.includes('lock')) {
                if (them.stateCosmo.keys) {
                    us.killable.kill();
                    them.sounds.playSound('openLocks');
                    them.stateCosmo.locks++;
                    them.stateCosmo.keys--;
                    console.log('congratulation - next level');
                } else {
                    console.log('take a key');
                }
            }
        }
    }
}

function createArtefactsFactory(sprites) {

    return function createArtefact(name, posX, posY) {

        const artefact = new __WEBPACK_IMPORTED_MODULE_0__Entity__["c" /* default */](name);
        artefact.size.set(23, 23); //!!! resolve
        artefact.pos.set(posX * 37, posY * 37); //!!! resolve
        artefact.offset.set(7, 7);
        artefact.picture = name;

        artefact.addTrait(new __WEBPACK_IMPORTED_MODULE_1__Traits_Killable__["a" /* default */]());
        artefact.addTrait(new Behavior());
        sprites.entities.add(artefact);
    };
}

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spritesheet__ = __webpack_require__(9);


class Font extends __WEBPACK_IMPORTED_MODULE_0__spritesheet__["a" /* default */] {
    constructor(image, data) {
        super(image, data);
    }

    print(text, context, x, y, sizeX, sizeY, flip) {
        [...text].forEach((letter, index) => {
            const buffer = this.tiles.get(`${letter}.png`)[flip ? 1 : 0];

            context.drawImage(buffer, x + index * sizeX, y, sizeX, sizeY);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Font;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map