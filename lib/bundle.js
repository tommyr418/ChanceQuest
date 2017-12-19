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
const Sandbox = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", () => {
  const chanceQuest = new ChanceQuest();
});

class ChanceQuest {
  constructor() {
    this.bindStart();
    this.bindTutorial();
    this.bindCloseAlert();
    this.bindCloseSandBox();
  }

  bindStart() {
    const start = document.getElementById("start");
    start.addEventListener("click", () => {
      this.startGame();
      document.getElementById("main-menu").classList.add("close");
    });
  }

  bindTutorial() {
    const tutorial = document.getElementById("tutorial");
    tutorial.addEventListener("click", () => {
      this.startGame(true);
      document.getElementById("main-menu").classList.add("close");
    });
  }

  bindCloseAlert() {
    const close = document.getElementById("dialog-close");
    close.addEventListener("click", () => {
      const alert = document.getElementById("alert");
      alert.classList.add("close");
    });
  }

  bindCloseSandBox() {
    const close = document.getElementById("sandbox-close");
    close.addEventListener("click", () => {
      const alert = document.getElementById("sandbox");
      alert.classList.add("close");
    });
  }

  startGame(tutorialMode) {
    this.sandboxStage = new createjs.Stage("sandbox-canvas");
    this.mapStage = new createjs.Stage("map-canvas");
    this.gameStage = new createjs.Stage("game-canvas");
    this.sandboxStage.enableMouseOver(20);
    this.mapStage.enableMouseOver(20);
    this.gameStage.enableMouseOver(20);
    this.sandbox = new Sandbox(this.sandboxStage);
    this.map = new Map(this.sandbox, this.mapStage, tutorialMode);
    this.game = new Game(this.map, this.gameStage);

    createjs.Ticker.addEventListener("tick", this.game.handleTick);
    createjs.Ticker.addEventListener("tick", this.map.handleTick);
    createjs.Ticker.addEventListener("tick", this.sandbox.handleTick);
    createjs.Ticker.framerate = 5;
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Territory = __webpack_require__(2);
const Player = __webpack_require__(3);

const BASIC_MAP = {
  1: new Territory(1, [2,14,15], 425, 173.2, 4, "Red", "Base"),
  2: new Territory(2, [1,3,15], 350, 216.5, 0, "Bisque"),
  3: new Territory(3, [2,4,22], 350, 303.1, 0, "Bisque"),
  4: new Territory(4, [3,5,7], 425, 346.4, 0, "Bisque"),
  5: new Territory(5, [4,6], 425, 433, 0, "Bisque"),
  6: new Territory(6, [5,28], 425, 519.6, 3, "Blue", "Base"),
};

const MAP = {
  1: new Territory(1, [2,14,15], 425, 173.2, 4, "Red", "Base"),
  2: new Territory(2, [1,3,15], 350, 216.5, 0, "Bisque"),
  3: new Territory(3, [2,4,22], 350, 303.1, 0, "Bisque"),
  4: new Territory(4, [3,5,7], 425, 346.4, 0, "Bisque"),
  5: new Territory(5, [4,6], 425, 433, 0, "Bisque"),
  6: new Territory(6, [5,28], 425, 519.6, 3, "Blue", "Base"),
  7: new Territory(7, [4,8,9], 500, 303.1, 0, "Bisque"),
  8: new Territory(8, [7,9,10,11], 575, 259.8, 0, "Bisque"),
  9: new Territory(9, [7,8,10], 575, 346.4, 0, "Bisque"),
  10: new Territory(10, [8,9,11,30], 650, 303.1, 3, "Black", "Fort"),
  11: new Territory(11, [8,10,12], 650, 216.5, 0, "Bisque"),
  12: new Territory(12, [11,13], 650, 129.9, 3, "Black"),
  13: new Territory(13, [12,14], 575, 86.6, 0, "Bisque"),
  14: new Territory(14, [1,13], 500, 129.9, 0, "Bisque"),
  15: new Territory(15, [1,2,16], 350, 129.9, 0, "Bisque"),
  16: new Territory(16, [15,17], 275, 86.6, 0, "Bisque"),
  17: new Territory(17, [16,18,19], 200, 129.9, 0, "Bisque", "Fort"),
  18: new Territory(18, [17,19], 125, 86.6, 0, "Bisque"),
  19: new Territory(19, [17,18,20], 125, 173.2, 0, "Bisque"),
  20: new Territory(20, [19,21,23], 125, 259.8, 0, "Bisque"),
  21: new Territory(21, [20,22,23], 200, 303.1, 0, "Bisque"),
  22: new Territory(22, [3,21], 275, 346.4, 0, "Bisque"),
  23: new Territory(23, [20,21,24], 125, 346.4, 0, "Bisque"),
  24: new Territory(24, [23,25,29], 125, 433, 0, "Bisque"),
  25: new Territory(25, [24,26,29], 125, 519.6, 0, "Bisque"),
  26: new Territory(26, [25,27,29], 200, 562.9, 0, "Bisque"),
  27: new Territory(27, [26,28,29], 275, 519.6, 0, "Bisque"),
  28: new Territory(28, [6,27], 350, 562.9, 0, "Bisque"),
  29: new Territory(29, [24,25,26,27], 200, 476.3, 0, "Bisque", "Fort"),
  30: new Territory(30, [10,31], 725, 346.4, 0, "Bisque"),
  31: new Territory(31, [30], 725, 433, 0, "Bisque", "Stronghold"),
};

const SPRITE_DATA = {
  "Blue": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      stand:8,
      run:[1,3, "run"],
    }
  },
  "Red": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      stand:22,
      run:[15,17, "run"],
    }
  },
  "Black": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      stand:358,
      run:[351,353, "run"],
    }
  },
};

class Map {
  constructor(sandbox, mapStage, tutorialMode) {
    this.sandbox = sandbox;
    if(!tutorialMode) {
      this.board = MAP;
    } else {
      this.board = BASIC_MAP;
    }
    this.mapStage = mapStage;
    this.players = {
      "Blue": new Player(1, "Blue", this.board[6], 100, 175),
      "Red": new Player(2, "Red", this.board[1], 100, 225),
    };
    this.currentPlayer = this.players["Blue"];


    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleTick = this.handleTick.bind(this);

    this.selected = 0;
    this.mapTerritories();
  }

  alert(string) {
    const contentDiv = document.getElementById("dialog-content");
    contentDiv.textContent = string;
    const alert = document.getElementById("alert");
    alert.classList.remove("close");
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      if (this.selected === e.currentTarget.id) {
        this.deSelect();
        return;
      }

      if (!this.hasPath(
        this.board[this.selected],
        this.board[e.currentTarget.id]
      )) {
        this.alert("Please choose a tile that's adjacent or you have a direct path to");
        return;
      }

      const victory = this.board[this.selected].move(
        this.board[e.currentTarget.id],
        this.players, this.sandbox
      );

      if(victory) {
        this.alert(victory);
      }

      this.deSelect();
    } else {
      if (this.currentPlayer.color !== this.board[e.currentTarget.id].color) {
        this.alert("Please select your own units to move");
        return;
      }
      if (this.board[e.currentTarget.id].units === 1) {
        this.alert("You need more than one unit to move");
        return;
      }
      this.selected = e.currentTarget.id;
      this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
        sprite.gotoAndPlay("run");
      });
    }
  }

  handleMouseOver(e) {
    if(e.currentTarget.alpha !== 0.7) {
      e.currentTarget.alpha = 0.7;
    }
  }

  handleMouseOut(e) {
    if(this.selected !== e.currentTarget.id && e.currentTarget.alpha !== 0.3) {
      e.currentTarget.alpha = 0.3;
    }
  }

  swapPlayer() {
    this.currentPlayer = (this.currentPlayer.color === "Blue")
    ?
    this.players["Red"]
    :
    this.players["Blue"];
  }

  deSelect() {
    if(this.selected) {
      this.board[this.selected].hexagon.alpha = 0.3;
      this.board[this.selected].spriteArr.forEach((sprite) => {
        sprite.gotoAndStop("stand");
      });
      this.selected = 0;
    }
  }

  hasPath(from, to, visited = []) {
    if(from.isAdjacent(to)) {
      return true;
    }
    const possiblePath = [];
    from.adjacent.forEach((adjacentId) => {
      if(!visited.includes(adjacentId) &&
        from.isFriendly(this.board[adjacentId])) {
        possiblePath.push(this.board[adjacentId]);
      }
    });

    visited.push(from.id);

    if (possiblePath.length === 0) {
      return false;
    }

    for (var i = 0; i < possiblePath.length; i++) {
      if (this.hasPath(possiblePath[i], to, visited)) {
        return true;
      }
    }

    return false;
  }

  mapTerritories() {
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
      } else if (territory.base === "Fort") {
        hexagon.graphics.endFill()
        .beginStroke("Black")
        .drawCircle(territory.x, territory.y, 25);
      }

      hexagon.cursor = "pointer";
      hexagon.alpha = 0.3;
      hexagon.id = territory.id;
      hexagon.on("click", this.handleClick);
      hexagon.on("mouseover", this.handleMouseOver);
      hexagon.on("mouseout", this.handleMouseOut);
      territory.setHexagon(hexagon);
      this.mapStage.addChild(hexagon);

      const text = new createjs.Text(
        territory.units.toString(),
        "20px Arial",
        territory.color);
      text.x = territory.x;
      text.y = territory.y;
      text.textAlign = "center";
      text.textBaseline = "middle";
      territory.setText(text);
      if(text.text === "0") {
        text.visible = false;
      }

      this.mapStage.addChild(text);

      const spriteArr = [];
      let i = territory.units;
      while (i > 0) {
        const data = SPRITE_DATA[territory.color];
        const spriteSheet = new createjs.SpriteSheet(data);
        const animation = new createjs.Sprite(spriteSheet, "stand");
        animation.x = (Math.random() * -30) + territory.x;
        animation.y = (Math.random() * -60) + territory.y;

        spriteArr.push(animation);
        this.mapStage.addChild(animation)
        i--;
      }

      territory.spriteArr = spriteArr;
    });
  }

  handleTick() {
    this.mapStage.sortChildren((child1, child2) => {
      if (child1.y > child2.y) { return 1; }
      if (child1.y < child2.y) { return -1; }
      return 0;
    })
    this.mapStage.update();
  }

  addSprites() {
    const base = this.currentPlayer.base;
    const color = this.currentPlayer.color;

    while (base.spriteArr.length < base.units) {
      const data = SPRITE_DATA[color];
      const spriteSheet = new createjs.SpriteSheet(data);
      const animation = new createjs.Sprite(spriteSheet, "stand");
      animation.x = (Math.random() * -30) + base.x;
      animation.y = (Math.random() * -60) + base.y;

      base.spriteArr.push(animation);
      this.mapStage.addChild(animation);
    }

    Object.values(this.currentPlayer.forts).forEach((fort) => {
      const data = SPRITE_DATA[color];
      const spriteSheet = new createjs.SpriteSheet(data);
      const animation = new createjs.Sprite(spriteSheet, "stand");
      animation.x = (Math.random() * -30) + fort.x;
      animation.y = (Math.random() * -60) + fort.y;

      fort.spriteArr.push(animation);
      this.mapStage.addChild(animation);
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
  "Bisque": "Bisque",
  "Black": "DimGray",
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
    } else if (this.base === "Fort") {
      this.hexagon.graphics.endFill()
      .beginStroke("Black")
      .drawCircle(this.x, this.y, 25);
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
      attacker: this.color,
      defender: territory.color,
      log: [],
      winner: "",
      survivors: 0,
    };

    while(this.units > 0 && territory.units > 0) {
      const battle = {};
      battle.attackerRolls = this.roll(this.units, true, this.base);
      battle.defenderRolls = territory.roll(territory.units, false, territory.base);

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

  roll(units, attacking, base) {
    const rolls = [];
    let times;
    if (attacking && units > 2) {
      times = 3;
    } else if (units > 1) {
      times = 2;
    } else {
      times = 1;
    }

    let boostHelper = times;
    if(!attacking && base === "Base") {
      times += 2;
    }

    for (var i = 0; i < times; i++) {
      rolls.push(1 + Math.floor(Math.random() * 6));
    }

    if (rolls.length === 1) {
      return rolls;
    }

    return rolls.sort((a, b) => (b - a)).slice(0, boostHelper);
  }

  moveSprites(territory) {
    while(this.spriteArr.length > 1) {
      const sprite = this.spriteArr.pop();

      sprite.x = (Math.random() * -30) + territory.x;
      sprite.y = (Math.random() * -60) + territory.y;
      sprite.gotoAndStop("stand");

      territory.spriteArr.push(sprite);
    }
  }

  updateSprites() {
    while(this.spriteArr.length > this.units) {
      const sprite = this.spriteArr.pop();
      sprite.stage.removeChild(sprite);
    }
  }

  removeSprites() {
    while(this.spriteArr.length > 0) {
      const sprite = this.spriteArr.pop();
      sprite.stage.removeChild(sprite);
    }
  }

  move(territory, players, sandbox) {
    if (territory.color === "Bisque") {
      if(territory.base === "Fort") {
        players[this.color].forts = Object.assign(
          players[this.color].forts,
          {
            [territory.id]: territory,
          }
        );
      }

      players[this.color].territories++;
      territory.moveIn(this.color, this.units - 1);
      this.moveOut();
      this.moveSprites(territory);
    } else if (territory.color === this.color) {
      territory.moveThrough((this.units - 1 + territory.units));
      this.moveOut();
      this.moveSprites(territory);
    } else if (territory.color === "Black") {
      this.units--;
      const outcome = this.battle(territory);
      sandbox.logBattle(outcome);
      sandbox.animateBattle(outcome);
      console.log(outcome);
      if (outcome.winner === this.color) {
        if(territory.base === "Fort") {
          players[this.color].forts = Object.assign(
            players[this.color].forts,
            {
              [territory.id]: territory,
            }
          );
        }

        players[this.color].territories++;
        territory.moveIn(this.color, outcome.survivors);
        territory.removeSprites();
        this.moveSprites(territory);
        territory.updateSprites();
      } else {
        territory.moveThrough(outcome.survivors);
        territory.updateSprites();
      }
      this.moveOut();
      this.updateSprites();
    } else {
      this.units--;
      const outcome = this.battle(territory);
      sandbox.logBattle(outcome);
      sandbox.animateBattle(outcome);
      console.log(outcome);
      let victory;
      if (outcome.winner === this.color) {
        if(players[territory.color].base.id === territory.id) {
          victory = `${this.color} Wins!`;
        }

        if(territory.base === "Fort") {
          players[this.color].forts = Object.assign(
            players[this.color].forts,
            {
              [territory.id]: territory,
            }
          );
          delete players[territory.color].forts[territory.id];
        }

        players[this.color].territories++;
        players[territory.color].territories--;
        territory.moveIn(this.color, outcome.survivors);
        territory.removeSprites();
        this.moveSprites(territory);
        territory.updateSprites();
      } else {
        territory.moveThrough(outcome.survivors);
        territory.updateSprites();
      }
      this.moveOut();
      this.updateSprites();
      return victory;
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
    this.forts = {};
  }

  recruit() {
    this.base.units += (1 + (Math.floor(this.territories / 3) + Object.keys(this.forts).length));
    this.base.text.text = this.base.units.toString();
    Object.values(this.forts).forEach((fort) => {
      fort.units += 1;
      fort.text.text = fort.units.toString();
    });
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
    this.handleTick = this.handleTick.bind(this);
    this.mountTurnLabel();
    this.mountEndButton();
    this.mountTerritoriesCount();
  }

  mountTurnLabel() {
    const text = new createjs.Text(
      "Blue's Turn",
      "32px cursive",
      "Blue");
    text.x = 100;
    text.y = 100;
    text.textAlign = "center";
    text.textBaseline = "middle";
    this.turnLabel = text;
    this.stage.addChild(text);
  }

  mountEndButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("beige")
      .drawRoundRect(25, 275, 150, 50, 5);
    button.addEventListener("click", this.endTurn);
    button.cursor = "pointer";
    this.stage.addChild(button);
    const text = new createjs.Text(
      "End Turn",
      "32px cursive",
      "Black");
    text.x = 100;
    text.y = 300;
    text.textAlign = "center";
    text.textBaseline = "middle";
    this.stage.addChild(text);
  }

  endTurn() {
    this.map.currentPlayer.recruit();
    const fortNum = Object.keys(this.map.currentPlayer.forts).length;
    const recruitNum = (1 + (Math.floor(this.map.currentPlayer.territories / 3)) + fortNum);
    this.map.alert(`Congratulations, ${this.map.currentPlayer.color}.
      You have recruited ${recruitNum} ${recruitNum === 1 ? 'unit' : 'units'}
      for your base${fortNum ? ` and ${fortNum} ${fortNum === 1 ? 'unit'
      : 'units'} for your forts` : ''}.`);
      this.map.addSprites();
      this.map.deSelect();
      this.map.swapPlayer();
      this.turnLabel.text = this.map.currentPlayer.color + "'s Turn";
      this.turnLabel.color = this.map.currentPlayer.color;
    }

  mountTerritoriesCount() {
    Object.values(this.map.players).forEach((player) => {
      const text = new createjs.Text(
        `${player.color}: ${player.territories} territories`,
        "20px cursive",
        "black");
      text.x = player.x;
      text.y = player.y;
      text.textAlign = "center";
      text.textBaseline = "middle";
      player.text = text;
      this.stage.addChild(text);
    });
  }

  handleTick(e) {
    Object.values(this.map.players).forEach((player) => {
      player.text.text = `${player.color}: ${player.territories} territories`;
    });
    this.stage.update();
  }
}

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const UNIT_SPRITE_DATA = {

};

const DICE_SPRITE_DATA = {
  "Blue": {
    images: ["./assets/images/dice.jpg"],
    frames: {width:62.83, height:62.83},
    animations: {
      one: 18,
      two: 19,
      three: 20,
      four: 21,
      five: 22,
      six: 23,
      rolling: [18,23,"rolling"],
    }
  },
  "Red": {
    images: ["./assets/images/dice.jpg"],
    frames: {width:62.83, height:62.83},
    animations: {
      one: 0,
      two: 1,
      three: 2,
      four: 3,
      five: 4,
      six: 5,
      rolling: [0,5,"rolling"],
    }
  },
};

class Sandbox {
  constructor(sandboxStage) {
    this.sandboxStage = sandboxStage;
    this.mountRollButton();
    this.handleTick = this.handleTick.bind(this);
  }

  handleTick() {
    this.sandboxStage.update();
  }

  mountRollButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("white")
      .drawRoundRect(410, 10, 80, 40, 5);
    button.cursor = "pointer";
    button.addEventListener("click", this.roll);
    this.sandboxStage.addChild(button);
    const text = new createjs.Text(
      "Roll",
      "24px cursive",
      "Black");
    text.x = 450;
    text.y = 30;
    text.textAlign = "center";
    text.textBaseline = "middle";
    this.sandboxStage.addChild(text);
  }

  roll() {
    console.log("clicked");
  }

  logBattle(battle) {
    const text = document.getElementById("sandbox-text");
    text.innerHTML = "";
    battle.log.forEach((roll) => {
      let br = document.createElement('br');
      text.append(`${battle.attacker} rolls ${roll.attackerRolls.join(', ')}`, br);
      br = document.createElement('br');
      text.append(`${battle.defender} rolls ${roll.defenderRolls.join(', ')}`, br);

      let attackerLoss = 0;
      let defenderLoss = 0;

      for (var i = 0; i < 2; i++) {
        if (!roll.attackerRolls[i] || !roll.defenderRolls[i]) {
          break;
        }

        if (roll.attackerRolls[i] > roll.defenderRolls[i]) {
          defenderLoss++;
        } else {
          attackerLoss++;
        }
      }

      if(attackerLoss) {
        br = document.createElement('br');
        text.append(`${battle.attacker} loses ${attackerLoss}
          ${attackerLoss === 1 ? 'unit' : 'units'}`, br);
      }

      if(defenderLoss) {
        br = document.createElement('br');
        text.append(`${battle.defender} loses ${defenderLoss}
          ${defenderLoss === 1 ? 'unit' : 'units'}`, br);
      }
    });

    let br = document.createElement('br');
    text.append(`${battle.winner} wins with ${battle.survivors}
      ${battle.survivors === 1 ? 'unit' : 'units'} remaining`, br);

    const sandbox = document.getElementById("sandbox");
    sandbox.classList.remove("close");
  }

  mountAttackerDice(battle, index) {
    let numberDice = battle.log[index].attackerRolls.length;
    while (numberDice > 0) {
      const data = DICE_SPRITE_DATA[battle.attacker];
      const spriteSheet = new createjs.SpriteSheet(data);
      const animation = new createjs.Sprite(spriteSheet, "one");
      animation.x = 63 * (numberDice-1);
      animation.y = 0;
      this.sandboxStage.addChild(animation);
      numberDice--;
    }
  }

  animateBattle(battle, index = 0) {
    this.mountAttackerDice(battle, index);

  }
}

module.exports = Sandbox;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map