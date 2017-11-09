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

const Territory = __webpack_require__(2);

class Map {
  constructor(stage) {
    this.board = {
      1: new Territory(1, [2], 50, 43.3, 10, "Red"),
      2: new Territory(2, [1,3], 125, 86.6, 0, "Bisque"),
      3: new Territory(3, [2,4], 200, 129.9, 0, "Bisque"),
      4: new Territory(4, [3,5], 275, 173.2, 0, "Bisque"),
      5: new Territory(5, [4], 350, 216.5, 10, "Blue"),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.mapTerritory();
    this.selected = 0;
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      this.board[this.selected].move(this.board[e.currentTarget.id]);
      this.stage.update();
      this.selected = 0;
    } else {
      this.selected = e.currentTarget.id;
    }
  }

  mapTerritory() {
    const allTerritories = Object.values(this.board);

    allTerritories.forEach((territory) => {
      const hexagon = new createjs.Shape();
      hexagon.graphics.beginStroke("Black")
        .beginFill(territory.background)
        .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);
      hexagon.id = territory.id;
      hexagon.addEventListener("click", this.handleClick);
      territory.setHexagon(hexagon);
      this.stage.addChild(hexagon);

      const text = new createjs.Text(
        territory.units.toString(),
        "20px Arial",
        territory.color);
      text.x = territory.x;
      text.y = territory.y;
      text.textAlign = "center"
      text.textBaseline = "middle";
      territory.setText(text);

      this.stage.addChild(text);
    });
  }
}

module.exports = Map;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const COLOR_MAP = {
  "Blue": "DeepSkyBlue",
  "Red": "LightCoral",
  "Bisque": "Bisque"
};

class Territory {
  constructor(id, adjacent, x, y, units, color) {
    this.id = id;
    this.adjacent = adjacent;
    this.x = x;
    this.y = y;
    this.units = units;
    this.setColor(color);
  }


  isAdjacent(territory) {
    return this.adjacent.includes(territory.id);
  }

  isFriendly(territory) {
    return this.color === territory.color;
  }

  setHexagon(hexagon) {
    this.hexagon = hexagon;
  }

  setColor(color) {
    this.color = color;
    this.background = COLOR_MAP[color];
  }

  setText(text) {
    this.text = text;
  }

  move(territory) {
    if (this.id === territory.id) {
      alert("Invalid move");
    }
    if (this.units <= 1) {
      alert("You need more than one unit to move")
    }
    if (territory.color === "Bisque") {
      territory.setColor(this.color);
      territory.hexagon.graphics.clear()
        .beginStroke("black")
        .beginFill(territory.background)
        .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);
      territory.units = this.units - 1;
      territory.text.text = territory.units.toString();
      territory.text.color = territory.color;
      this.units = 1;
      this.text.text = this.units.toString();
    }
  }
}

module.exports = Territory;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map