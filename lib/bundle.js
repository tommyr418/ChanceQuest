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
const Game = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", () => {
  const mapStage = new createjs.Stage("map-canvas");
  mapStage.enableMouseOver(20);
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
const Player = __webpack_require__(3);

const MAP = {
  1: new Territory(1, [2,14,15], 425, 173.2, 10, "Red", "Base"),
  2: new Territory(2, [1,3,15], 350, 216.5, 0, "Bisque"),
  3: new Territory(3, [2,4,22], 350, 303.1, 0, "Bisque"),
  4: new Territory(4, [3,5,7], 425, 346.4, 0, "Bisque"),
  5: new Territory(5, [4,6], 425, 433, 0, "Bisque"),
  6: new Territory(6, [5,28], 425, 519.6, 10, "Blue", "Base"),
  7: new Territory(7, [4,8,9], 500, 303.1, 0, "Bisque"),
  8: new Territory(8, [7,9,10,11], 575, 259.8, 0, "Bisque"),
  9: new Territory(9, [7,8,10], 575, 346.4, 0, "Bisque"),
  10: new Territory(10, [8,9,11], 650, 303.1, 0, "Bisque"),
  11: new Territory(11, [8,10,12], 650, 216.5, 0, "Bisque"),
  12: new Territory(12, [11,13], 650, 129.9, 0, "Bisque"),
  13: new Territory(13, [12,14], 575, 86.6, 0, "Bisque"),
  14: new Territory(14, [1,13], 500, 129.9, 0, "Bisque"),
  15: new Territory(15, [1,2,16], 350, 129.9, 0, "Bisque"),
  16: new Territory(16, [15,17], 275, 86.6, 0, "Bisque"),
  17: new Territory(17, [16,18,19], 200, 129.9, 0, "Bisque"),
  18: new Territory(18, [17,19], 125, 86.6, 0, "Bisque"),
  19: new Territory(19, [17,18,20], 125, 173.2, 0, "Bisque"),
  20: new Territory(20, [19,21,23], 125, 259.8, 0, "Bisque"),
  21: new Territory(21, [20,22,23], 200, 303.1, 0, "Bisque"),
  22: new Territory(22, [3,21], 275, 346.4, 0, "Bisque"),
  23: new Territory(23, [20,21,24], 125, 346.4, 0, "Bisque"),
  24: new Territory(24, [23,25], 125, 433, 0, "Bisque"),
  25: new Territory(25, [24,26], 125, 519.6, 0, "Bisque"),
  26: new Territory(26, [25,27], 200, 562.9, 0, "Bisque"),
  27: new Territory(27, [26,28], 275, 519.6, 0, "Bisque"),
  28: new Territory(28, [6,27], 350, 562.9, 0, "Bisque"),
};

class Map {
  constructor(stage) {
    this.board = MAP
    this.players = {
      "Blue": new Player(1, "Blue", this.board[6], 100, 400),
      "Red": new Player(2, "Red", this.board[1], 100, 500),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.mapTerritory();
    this.selected = 0;
    this.currentPlayer = this.players["Blue"];
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      this.board[this.selected].move(
        this.board[e.currentTarget.id],
        this.players,
      );
      this.board[this.selected].hexagon.alpha = 0.3;
      this.stage.update();
      this.selected = 0;
    } else {
      if (this.currentPlayer.color !== this.board[e.currentTarget.id].color) {
        alert("Please select your own units to move");
        return;
      }
      if (this.board[e.currentTarget.id].units === 1) {
        alert("You need more than one unit to move");
        return;
      }
      this.selected = e.currentTarget.id;
    }
  }

  handleMouseOver(e) {
    if(e.currentTarget.alpha !== 0.7) {
      e.currentTarget.alpha = 0.7;
      this.stage.update();
    }
  }

  handleMouseOut(e) {
    if(this.selected !== e.currentTarget.id && e.currentTarget.alpha !== 0.3) {
      e.currentTarget.alpha = 0.3;
      this.stage.update();
    }
  }

  swapPlayer() {
    this.currentPlayer = (this.currentPlayer.color === "Blue")
    ?
    this.players["Red"]
    :
    this.players["Blue"];
  }

  mapTerritory() {
    const allTerritories = Object.values(this.board);

    allTerritories.forEach((territory) => {
      const hexagon = new createjs.Shape();
      hexagon.graphics.beginStroke("Black")
      .beginFill(territory.background)
      .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);

      if (territory.base === "Base") {
        hexagon.graphics.endFill()
        .beginStroke("Black")
        .drawPolyStar(territory.x, territory.y, 50, 6, 0.5, 0);
      }

      hexagon.alpha = 0.3;
      hexagon.id = territory.id;
      hexagon.on("click", this.handleClick);
      hexagon.on("mouseover", this.handleMouseOver);
      hexagon.on("mouseout", this.handleMouseOut);
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
      if(text.text === "0") {
        text.visible = false;
      }

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
  constructor(id, adjacent, x, y, units, color, base = "") {
    this.id = id;
    this.adjacent = adjacent;
    this.x = x;
    this.y = y;
    this.units = units;
    this.base = base;
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
      .beginStroke("Black")
      .beginFill(this.background)
      .drawPolyStar(this.x, this.y, 50, 6, 0, 0);

    if(this.base === "Base") {
      this.hexagon.graphics.endFill()
        .beginStroke("Black")
        .drawPolyStar(this.x, this.y, 50, 6, 0.5, 0);
    }

    this.units = units;
    if(!this.text.visible) {
      this.text.visible = true;
    }
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

  move(territory, players) {
    if (this.id === territory.id) {
      alert("Can't move to own square");
      return;
    }
    if (!this.isAdjacent(territory)) {
      alert("You can only move to adjacent squares");
      return;
    }
    if (territory.color === "Bisque") {
      players[this.color].territories++;
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
        if(players[territory.color].base.id === territory.id) {
          alert(`${this.color} Wins!`);
        }

        players[this.color].territories++;
        players[territory.color].territories--;
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

class Player {
  constructor(id, color, base, x, y) {
    this.id = id;
    this.color = color;
    this.base = base;
    this.territories = 1;
    this.x = x;
    this.y = y;
  }

  recruit() {
    this.base.units += (1 + (Math.floor(this.territories / 3)));
    this.base.text.text = this.base.units.toString();
  }
}

module.exports = Player;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Game {
  constructor(map, stage) {
    this.map = map;
    this.stage = stage;
    this.endTurn = this.endTurn.bind(this);
    this.mountTurnLabel();
    this.mountEndButton();
    this.mountTerritoriesCount();
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
    this.map.currentPlayer.recruit();
    this.map.stage.update();
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

  mountTerritoriesCount() {
    Object.values(this.map.players).forEach((player) => {
      const text = new createjs.Text(
        player.territories.toString(),
        "32px Arial",
        "DarkSlateGray");
      text.x = player.x;
      text.y = player.y;
      text.textAlign = "center";
      text.textBaseline = "middle";
      this.stage.addChild(text);
    });
  }
}

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map