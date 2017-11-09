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
const Game = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", () => {
  const mapStage = new createjs.Stage("map-canvas");
  const gameStage = new createjs.Stage("game-canvas");
  const map = new Map(mapStage);
  const game = new Game(map, gameStage);
  mapStage.update();
  gameStage.update();
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
    this.currentPlayer = "Blue";
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      this.board[this.selected].move(this.board[e.currentTarget.id]);
      this.stage.update();
      this.selected = 0;
    } else {
      if (this.currentPlayer !== this.board[e.currentTarget.id].color) {
        alert("Please select your own units to move");
        return;
      }
      this.selected = e.currentTarget.id;
    }
  }

  swapPlayer() {
    this.currentPlayer = (this.currentPlayer === "Blue") ? "Red" : "Blue";
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

  moveOut() {
    this.units = 1;
    this.text.text = this.units.toString();
  }

  moveIn(color, units) {
    this.setColor(color);
    this.hexagon.graphics.clear()
      .beginStroke("black")
      .beginFill(this.background)
      .drawPolyStar(this.x, this.y, 50, 6, 0, 0);
    this.units = units;
    this.text.text = this.units.toString();
    this.text.color = this.color;
  }

  moveThrough(units) {
    this.units = units;
    this.text.text = this.units.toString();
  }

  battle(territory) {
    const result = {
      log: [],
      winner: "",
      survivors: 0,
    };

    while(this.units > 0 && territory.units > 0) {
      const battle = {};
      battle.attackerRolls = this.roll(this.units, true);
      battle.defenderRolls = territory.roll(territory.units, false);

      let compares = (
        battle.attackerRolls.length > battle.defenderRolls.length
        ?
        battle.defenderRolls.length
        :
        battle.attackerRolls.length
      );

      for (var i = 0; i < compares; i++) {
        if (battle.defenderRolls[i] < battle.attackerRolls[i]) {
          territory.units--;
        } else {
          this.units--;
        }
      }

      battle.attackerUnits = this.units;
      battle.defenderUnits = territory.units;
      result.log.push(battle);
    }

    if (this.units) {
      result.winner = this.color;
      result.survivors = this.units;
      return result;
    } else {
      result.winner = territory.color;
      result.survivors = territory.units;
      return result;
    }
  }

  roll(units, attacking) {
    const rolls = [];
    let times;
    if (attacking && units > 2) {
      times = 3;
    } else if (units > 1) {
      times = 2;
    } else {
      times = 1;
    }

    for (var i = 0; i < times; i++) {
      rolls.push(1 + Math.floor(Math.random() * 6));
    }

    if (rolls.length === 1) {
      return rolls;
    }

    return rolls.sort((a, b) => (b - a));
  }

  move(territory) {
    if (this.id === territory.id) {
      alert("Can't move to own square");
      return;
    }
    if (!this.isAdjacent(territory)) {
      alert("You can only move to adjacent squares");
      return;
    }
    if (this.units <= 1) {
      alert("You need more than one unit to move");
      return;
    }
    if (territory.color === "Bisque") {
      territory.moveIn(this.color, this.units - 1);
      this.moveOut();
    } else if (territory.color === this.color) {
      territory.moveThrough(this.units);
      this.moveOut();
    } else {
      this.units--;
      const outcome = this.battle(territory);
      console.log(outcome);
      if (outcome.winner === this.color) {
        territory.moveIn(this.color, outcome.survivors);
      } else {
        territory.moveThrough(outcome.survivors);
      }
      this.moveOut();
    }
  }
}

module.exports = Territory;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Game {
  constructor(map, stage) {
    this.map = map;
    this.stage = stage;
    this.endTurn = this.endTurn.bind(this);
    this.mountTurnLabel();
    this.mountEndButton();
  }

  mountTurnLabel() {
    const text = new createjs.Text(
      "Blue's Turn",
      "32px Arial",
      "DarkSlateGray");
    text.x = 100;
    text.y = 50;
    text.textAlign = "center";
    text.textBaseline = "middle";
    this.turnLabel = text;
    this.stage.addChild(text);
  }

  endTurn() {
    this.map.swapPlayer();
    this.turnLabel.text = (this.turnLabel.text === "Blue's Turn") ?
      "Red's Turn" : "Blue's Turn";
    this.stage.update();
  }

  mountEndButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("Green")
      .drawRoundRect(100, 300, 75, 25, 5);
    button.addEventListener("click", this.endTurn);
    this.stage.addChild(button);
  }
}

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map