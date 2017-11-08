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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Map = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("canvas");
  const stage = new createjs.Stage("game-canvas");
  const map = new Map(stage);

  stage.update();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Territory = __webpack_require__(3);

class Map {
  constructor(stage) {
    this.board = {
      1: new Territory(1, [2], "white", 2),
      2: new Territory(2, [1,3], "white", 2),
      3: new Territory(3, [2,4], "white", 2),
      4: new Territory(4, [3,5], "white", 2),
      5: new Territory(5, [4], "white", 2),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.setup();
    this.selected = 0;
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      this.board[this.selected].invade(this.board[e.currentTarget.id]);
      this.selected = 0;
    } else {
      this.selected = e.currentTarget.id;
    }
  }

  setup() {
    const allTerritories = Object.values(this.board).map((territory) => {
      const circle = new createjs.Shape();
      circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
      circle.x = 100 * territory.id;
      circle.y = 100;
      circle.id = territory.id;
      circle.addEventListener("click", this.handleClick);
      return circle;
    });

    allTerritories.forEach((circle) => {
      this.stage.addChild(circle);
    });
  }
}

module.exports = Map;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

class Territory {
  constructor(id, adjacent, color, units) {
    this.id = id;
    this.adjacent = adjacent;
    this.color = color;
    this.units = units;
  }

  changeControl(color) {
    this.color = color;
  }

  isAdjacent(territory) {
    return this.adjacent.includes(territory.id);
  }

  isFriendly(territory) {
    return this.color === territory.color;
  }

  invade(territory) {
    if (this.units <= 1 || this.isFriendly(territory)) {
      alert("invalid move");
    }
  }
}

module.exports = Territory;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map