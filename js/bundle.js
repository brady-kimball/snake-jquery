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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(3);

$( () => {
  const rootEl = $('.snake');
  new View(rootEl);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(2);

class Snake {
  constructor() {
    this.direction = "E"; // ["N", "E", "S", "W"]
    this.segments = [this.toCoord("E")]; // array of coordinates
    this.length = 1;
  }

  move() {
    this.segments.unshift(this.segments[0].plus(this.toCoord(this.direction)));
    this.segments = this.segments.slice(0,this.length);
  }

  turn(newDirection) {
    this.direction = newDirection;
  }

  toCoord(direction) {
    let pos;
    switch(direction) {
      case "N":
        return new Coord(-1, 0);
      case "E":
        return new Coord(0, 1);
      case "S":
        return new Coord(1, 0);
      case "W":
        return new Coord(0, -1);
    }
  }
}

// let snake = new Snake();
// snake.move();
// snake.move();
// snake.turn("S");
// snake.move();
// console.log(snake.segments)



module.exports = Snake;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Coord {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  plus(coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  }

  equals(coord2) {
    return (this.i === coord2.i && this.j === coord2.j);
  }

  isOpposite(coord2) {
    return ((this.i === (coord2.i * -1)) && (this.j === (coord2.j * -1)));
  }
}

module.exports = Coord;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(4);

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    // this.apple = new Apple();
    this.setupBoard();
    $(window).on("keydown", this.keyHandler.bind(this));
    window.setInterval(this.step.bind(this), 500);
  }

  keyHandler(event) {
    let dir = View.KEYS[event.originalEvent.key];
    if (dir) {
      this.board.snake.turn(dir);
    }
  }

  step() {
    this.board.snake.move();
    this.render();
  }

  render() {
    let $li = $('li');
    $li.removeClass();
    this.board.snake.segments.forEach((coord) => {
      const flatCoord = (coord.i * this.board.dim + coord.j);
      $li.eq(flatCoord).addClass("snakeSeg");
    });

  }

  setupBoard() {
    this.$el.addClass("group")
    for (let i = 0; i < this.board.dim; i++) {
      let $row = $("<ul>");
      $row.addClass("group")
      for (let j = 0; j < this.board.dim; j++) {
        let $cell = $("<li>");
        $row.append($cell);
      }
      this.$el.append($row);
    }
  }
}

View.KEYS = {
  "ArrowLeft": "W",
  "ArrowUp": "N",
  "ArrowRight": "E",
  "ArrowDown": "S",
  "w": "N",
  "a": "W",
  "s": "S",
  "d": "E"
};

module.exports = View;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(1);

class Board {
  constructor(dim) {
    this.snake = new Snake();
    this.dim = dim;
  }

  static emptyGrid(dim) {
    const grid = [];

    for (let i = 0; i < dim; i++) {
      let row = [];
      for (let j = 0; j < dim; i++) {
        row.push(Board.EMPTY);
      }
      grid.push(row);
    }

    return grid;
  }
}

Board.EMPTY = ".";

module.exports = Board;


/***/ })
/******/ ]);