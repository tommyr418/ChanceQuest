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
    this.loadSounds();
    this.bindStart();
    this.bindTutorial();
    this.bindResume();
    this.bindEnd();
    this.bindMute();
  }

  bindStart() {
    const start1 = document.getElementById("start-1");
    start1.addEventListener("click", () => {
      createjs.Sound.stop();
      this.startGame(false, true);
      document.getElementById("main-menu").classList.add("close");
    });

    const start2 = document.getElementById("start-2");
    start2.addEventListener("click", () => {
      createjs.Sound.stop();
      this.startGame();
      document.getElementById("main-menu").classList.add("close");
    });
  }

  bindTutorial() {
    const tutorial = document.getElementById("tutorial");
    tutorial.addEventListener("click", () => {
      this.startGame(1);
      document.getElementById("main-menu").classList.add("close");
    });

    const video = document.getElementById("video-tutorial");
    video.addEventListener("click", () => {
      createjs.Sound.stop();
      document.getElementById("video-menu").classList.remove("close");
      document.getElementById("main-menu").classList.add("close");
    });

    const back = document.getElementById("return");
    back.addEventListener("click", () => {
      createjs.Sound.play("Menu");
      document.getElementById("video-menu").classList.add("close");
      document.getElementById("main-menu").classList.remove("close");
    });
  }

  bindResume() {
    const resume = document.getElementById("resume-game");
    resume.addEventListener("click", () => {
      document.getElementById("pause-menu").classList.add("close");
    });
  }

  bindEnd() {
    const end = document.getElementById("end-game");
    end.addEventListener("click", () => {
      this.endGame();
      createjs.Sound.play("Menu");
      document.getElementById("main-menu").classList.remove("close");
      document.getElementById("pause-menu").classList.add("close");
    });
  }

  bindMute() {
    const muteButtons = document.getElementsByClassName("mute");
    for (var i = 0; i < muteButtons.length; i++) {
      muteButtons[i].addEventListener("click", () => {
        createjs.Sound.muted = !createjs.Sound.muted;
      });
    }
  }

  endGame() {
    this.sandboxStage.removeAllChildren();
    this.mapStage.removeAllChildren();
    this.gameStage.removeAllChildren();
  }

  startGame(tutorialMode, computerOn) {
    this.sandboxStage = new createjs.Stage("sandbox-canvas");
    this.mapStage = new createjs.Stage("map-canvas");
    this.gameStage = new createjs.Stage("game-canvas");

    this.sandboxStage.enableMouseOver(20);
    this.mapStage.enableMouseOver(20);
    this.gameStage.enableMouseOver(20);

    this.sandbox = new Sandbox(this.sandboxStage);
    this.map = new Map(this.sandbox, this.mapStage, tutorialMode, computerOn);
    this.game = new Game(this.map, this.gameStage, tutorialMode, computerOn);

    createjs.Ticker.addEventListener("tick", this.game.handleTick);
    createjs.Ticker.addEventListener("tick", this.map.handleTick);
    createjs.Ticker.addEventListener("tick", this.sandbox.handleTick);

    createjs.Ticker.framerate = 5;
  }

  loadSounds() {
    const audioPath = "assets/sounds/";
    const sounds = [{id:"Menu", src:"menu.mp3"},
                    {id:"March", src:"march.mp3"},
                    {id:"Combat", src:"combat.mp3"}];
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", this.playMenuMusic);
    createjs.Sound.registerSounds(sounds, audioPath);
  }

  playMenuMusic() {
    createjs.Sound.play("Menu");
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Territory = __webpack_require__(2);
const Player = __webpack_require__(3);

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

const TUTORIAL_DIALOG = {
  1: "Hi, Welcome to Chance Quest. You are in control of BLUE kingdom." +
     " Lets begin by selecting a tile containing your units.",
  2: "Very good! As you can see your units are on the march. You can" +
     " now select a tile adjacent to the current tile. For now choose the" +
     " lower left adjacent tile.",
  3: "Nice Job! As you can see you will automatically move all but one of" +
     " your units to the new tile. For that reason you can only choose tiles" +
     " that contain more than one unit when moving. Go ahead and make another move.",
  4: "Good! As per usual pick an adjacent tile",
  5: "Now you have run out of valid moves. Only thing to do left is to end your" +
     " turn. Click the End turn button to the right.",
  6: "When you end your turn, you will automatically recruit units for your main base." +
     " You will always get at least one unit." +
     " You will also get one more for every three of your territories. Click" +
     " OK then any tile to continue.",
  7: "It is now red's turn. Wait until he finishes his moves.",
  8: "All done! Red has taken over a territory with a circle in it. These special" +
     " tiles represent forts. In addtion to adding to your territory count," +
     " forts will recruit an additional unit at the location upon ending the turn." +
     " Click End Turn again to continue.",
  9: "It's probably a good idea for you to take a fort also. Lets start by selecting" +
     " a tile.",
  10: "It is possible to move units from one of your territories to another. Remember" +
      " that you always leave one unit behind when you do this. However, our goal is" +
      " to take a fort. Go ahead and click the tile with the circle.",
  11: "You were able to move directly from your base to the fort because there is a" +
      " direct path of controlled territories to and from the two locations. Let's see" +
      " it in action again. Make another move.",
  12: "Use the direct pathing to move to the tile above your base",
  13: "Once again you are out of moves. Click end turn just like before.",
  14: "This time red has enough units to attack you. Be prepared. Click any tile when you are ready",
  15: "Red is making his move...",
  16: "Red has attacked your territory. When battle is initiated, both teams roll dice " +
      "based on how many units are in the battle. Higher roll win with tie going to " +
      "defender.",
  101: "Not quite. Remember you are controling BLUE.",
  102: "No! You need to choose an ADJACENT tile.",
  103: "Nice Try! Normally this would be a valid move; but for this case," +
       " please pick the OTHER ADJACENT tile.",
  104: "Please choose a BLUE tile with MORE THAN ONE unit.",
  105: "We are looking for a empty fort, a BEIGE tile with a CIRCLE in it.",
  106: "Click the tile above your base.",
};

const AI_MOVES = [
  [1,15,16,17,1],
  [1,2,3,4,5,6],
  [1,14,13,12,11,10,1],
  [1,2,3,4,7,8,9,10,1],
  [1,2,3,22,21,23,24,29,1],
  [1,15,16,17,18,19,20,23,24,25,29,26,27,28,6]
];

class Map {
  constructor(sandbox, mapStage, tutorialMode, computerOn) {
    this.sandbox = sandbox;
    this.mapStage = mapStage;
    this.tutorialMode = tutorialMode;
    this.computerOn = computerOn;

    if(computerOn) {
      this.aIIndex = 0;
    }

    this.board = this.generateMap(this.tutorialMode);

    if(this.tutorialMode) {
      this.showTutorialDialog(this.tutorialMode);
      const cloud = document.getElementById("cloud");
      cloud.classList.remove("close");
    }

    this.players = {
      "Blue": new Player(1, "Blue", this.board[6], 100, 175),
      "Red": new Player(2, "Red", this.board[1], 100, 225),
    };
    this.currentPlayer = this.players["Blue"];


    this.handleClick = this.handleClick.bind(this);
    this.handleClickTutorial = this.handleClickTutorial.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleTick = this.handleTick.bind(this);

    this.selected = 0;
    this.mapTerritories();
    this.generateBattleButton();
  }

  generateMap(tutorialMode) {
    let map;
    if (tutorialMode) {
      map = {
        1: new Territory(1, [2,7], 425, 173.2, 4, "Red", "Base"),
        2: new Territory(2, [1,3,7], 350, 216.5, 0, "Bisque"),
        3: new Territory(3, [2,4], 350, 303.1, 0, "Bisque"),
        4: new Territory(4, [3,5], 425, 346.4, 0, "Bisque"),
        5: new Territory(5, [4,6], 425, 433, 0, "Bisque"),
        6: new Territory(6, [5,10], 425, 519.6, 3, "Blue", "Base"),
        7: new Territory(7, [1,2,8], 350, 129.9, 0, "Bisque"),
        8: new Territory(8, [7,9], 275, 86.6, 0, "Bisque"),
        9: new Territory(9, [8], 200, 129.9, 0, "Bisque", "Fort"),
        10: new Territory(10, [6,11], 350, 562.9, 0, "Bisque"),
        11: new Territory(11, [10,12], 275, 519.6, 0, "Bisque"),
        12: new Territory(12, [11], 200, 476.3, 0, "Bisque", "Fort"),
      };
    } else {
      map = {
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
    }
    return map;
  }

  alert(string, callback) {
    const close = document.getElementById("dialog-close");
    const newClose = close.cloneNode(true);
    close.parentNode.replaceChild(newClose, close);

    newClose.addEventListener("click", () => {
      const alert = document.getElementById("alert");
      alert.classList.add("close");

      if(callback) {
        callback();
      }
    });

    const contentDiv = document.getElementById("dialog-content");
    contentDiv.textContent = string;
    const alert = document.getElementById("alert");
    alert.classList.remove("close");

  }

  handleClick(e) {
    if (this.computerOn && this.currentPlayer === this.players["Red"]) {
      return;
    }

    if(this.selected) {
      if (this.selected === e.currentTarget.id) {
        this.deSelect();
        return;
      }

      if (!this.hasPath(
        this.board[this.selected],
        this.board[e.currentTarget.id]
      )) {
        this.alert("Please choose a tile that's adjacent or you have a direct path to.");
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

  handleClickTutorial(e) {
    console.log(e.currentTarget.id);
    if (this.tutorialMode === 1) {
      if (e.currentTarget.id === 6) {
        this.selected = e.currentTarget.id;
        this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
          sprite.gotoAndPlay("run");
        });
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(101);
      }
    } else if (this.tutorialMode === 2) {
      if (e.currentTarget.id === 10) {
        this.board[this.selected].move(
          this.board[e.currentTarget.id],
          this.players, this.sandbox
        );
        this.deSelect();
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else if (e.currentTarget.id === 5) {
        this.showTutorialDialog(103);
      } else {
        this.showTutorialDialog(102);
      }
    } else if (this.tutorialMode === 3) {
      if (e.currentTarget.id === 10) {
        this.selected = e.currentTarget.id;
        this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
          sprite.gotoAndPlay("run");
        });
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(104);
      }
    } else if (this.tutorialMode === 4) {
      if (e.currentTarget.id === 11) {
        this.board[this.selected].move(
          this.board[e.currentTarget.id],
          this.players, this.sandbox
        );
        this.deSelect();
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(102);
      }
    } else if (this.tutorialMode === 6) {
      this.tutorialMode++;
      this.showTutorialDialog(this.tutorialMode);
      setTimeout(() => {
        this.board[1].move(
          this.board[7],
          this.players, this.sandbox
        );
      }, 500);
      setTimeout(() => {
        this.board[7].move(
          this.board[8],
          this.players, this.sandbox
        );
      }, 1000);
      setTimeout(() => {
        this.board[8].move(
          this.board[9],
          this.players, this.sandbox
        );
      }, 1500);
      setTimeout(() => {
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      }, 2000);
    } else if (this.tutorialMode === 9) {
      if (e.currentTarget.id === 6) {
        this.selected = e.currentTarget.id;
        this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
        sprite.gotoAndPlay("run");
      });
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(104);
      }
    } else if (this.tutorialMode === 10) {
      if (e.currentTarget.id === 12) {
        this.board[this.selected].move(
          this.board[e.currentTarget.id],
          this.players, this.sandbox
        );
      this.deSelect();
      this.tutorialMode++;
      this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(105);
      }
    } else if (this.tutorialMode === 11) {
      if (e.currentTarget.id === 12) {
        this.selected = e.currentTarget.id;
        this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
        sprite.gotoAndPlay("run");
      });
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(104);
      }
    } else if (this.tutorialMode === 12) {
      if (e.currentTarget.id === 5) {
        this.board[this.selected].move(
          this.board[e.currentTarget.id],
          this.players, this.sandbox
        );
      this.deSelect();
      this.tutorialMode++;
      this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(106);
      }
    } else if (this.tutorialMode === 14) {
      this.tutorialMode++;
      this.showTutorialDialog(this.tutorialMode);
      setTimeout(() => {
        this.board[9].move(
          this.board[1],
          this.players, this.sandbox
        );
      }, 500);
      setTimeout(() => {
        this.board[1].move(
          this.board[2],
          this.players, this.sandbox
        );
      }, 1000);
      setTimeout(() => {
        this.board[2].move(
          this.board[3],
          this.players, this.sandbox
        );
      }, 1500);
      setTimeout(() => {
        this.board[3].move(
          this.board[4],
          this.players, this.sandbox
        );
      }, 2000);
      setTimeout(() => {
        this.board[4].move(
          this.board[5],
          this.players, this.sandbox
        );
      }, 2500);
      setTimeout(() => {
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      }, 3000);
    }
  }

  showTutorialDialog(step) {
    const contentDiv = document.getElementById("tutorial-dialog-content");
    contentDiv.textContent = TUTORIAL_DIALOG[step];
  }

  playComputerTurn() {
    const moveArray = AI_MOVES[this.aIIndex];
    let delay = 1000;

    for (var i = 0; i < (moveArray.length - 1); i++) {
      const from = moveArray[i];
      const to = moveArray[i+1];

      setTimeout(() => {
        if(this.board[from].color === "Red" && this.board[from].units > 1) {
          const victory = this.board[from].move(
            this.board[to],
            this.players, this.sandbox, true
          );

          if(victory) {
            this.alert(victory);
          }
        }
      }, delay);

      delay += 500;
    }

    this.aIIndex = Math.floor(Math.random() * AI_MOVES.length);

    return delay;
  }

  //mapTerritories takes the data from board and creates the graphical elements
  mapTerritories() {
    const allTerritories = Object.values(this.board);

    allTerritories.forEach((territory) => {

      //draws the hexagon for each tile
      const hexagon = this.generateHexagon(territory);
      territory.setHexagon(hexagon);
      this.mapStage.addChild(hexagon);

      //draws the number representing the unit count
      const text = this.generateText(territory);
      this.mapStage.addChild(text);

      //draws all the starting sprites on the tiles
      const spriteArr = [];
      let i = territory.units;
      while (i > 0) {
        const sprite = this.generateSprite(territory);

        spriteArr.push(sprite);
        this.mapStage.addChild(sprite);
        i--;
      }

      territory.spriteArr = spriteArr;
    });
  }

  generateHexagon(territory) {
    const hexagon = new createjs.Shape();
    hexagon.graphics.beginStroke("Black")
    .beginFill(territory.background)
    .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);

    //draws the circle or star for forts and bases
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
    hexagon.on("mouseover", this.handleMouseOver);
    hexagon.on("mouseout", this.handleMouseOut);

    if(this.tutorialMode) {
      hexagon.on("click", this.handleClickTutorial);
    } else {
      hexagon.on("click", this.handleClick);
    }
    return hexagon;
  }

  generateText(territory) {
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

    return text;
  }

  generateSprite(territory) {
    const data = SPRITE_DATA[territory.color];
    const spriteSheet = new createjs.SpriteSheet(data);
    const sprite = new createjs.Sprite(spriteSheet, "stand");
    sprite.x = (Math.random() * -30) + territory.x;
    sprite.y = (Math.random() * -60) + territory.y;

    return sprite;
  }

  generateBattleButton() {
    const square = new createjs.Shape();
    square.graphics.beginStroke("Black")
    .beginFill("Bisque")
    .drawRoundRect(675, 25, 100, 50, 5);

    square.cursor = "pointer";
    square.alpha = 0.3;
    square.on("mouseover", this.handleMouseOver);
    square.on("mouseout", this.handleMouseOut);

    const text = new createjs.Text(
      "Battle Log",
      "18px cursive",
      "Black");
    text.x = 725;
    text.y = 50;
    text.textAlign = "center";
    text.textBaseline = "middle";

    this.mapStage.addChild(square);
    this.mapStage.addChild(text);

    this.sandbox.square = square;
  }

  //Sorts the elements so that sprites appear on top in order of y coord before rendering
  handleTick() {
    this.mapStage.sortChildren((child1, child2) => {
      if (child1.y > child2.y) { return 1; }
      if (child1.y < child2.y) { return -1; }
      return 0;
    });
    this.mapStage.update();
  }

  // This method will add sprites to existing tiles when units are recruited
  addSprites() {
    const base = this.currentPlayer.base;
    const color = this.currentPlayer.color;

    while (base.spriteArr.length < base.units) {
      const sprite = this.generateSprite(base);

      base.spriteArr.push(sprite);
      this.mapStage.addChild(sprite);
    }

    Object.values(this.currentPlayer.forts).forEach((fort) => {
      const sprite = this.generateSprite(fort);

      fort.spriteArr.push(sprite);
      this.mapStage.addChild(sprite);
    });
  }
}

module.exports = Map;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// Color map is used to map tile color to unit color
const COLOR_MAP = {
  "Blue": "DeepSkyBlue",
  "Red": "LightCoral",
  "Bisque": "Bisque",
  "Black": "DimGray",
};

//Territory serves as the basic unit object of Chance Quest.
//It will hold all the data for the game to run properly.
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

//moveOut, moveIn, and moveThrough are provide the main interactions
//between territories

  //empties the territory except 1 unit;
  moveOut() {
    this.units = 1;
    this.text.text = this.units.toString();
  }

  //will redraw graphic based on the outcome of a battle
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

  //rallying units of the same color
  moveThrough(units) {
    this.units = units;
    this.text.text = this.units.toString();
  }

  battle(territory) {
    //the result object is returned with all battle data
    const result = {
      attacker: this.color,
      defender: territory.color,
      initialAttackers: this.units,
      initialDefenders: territory.units,
      log: [],
      winner: "",
      survivors: 0,
    };

    //calls the roll function and copares each roll
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

    //record winner, units remaining and return the result
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

  //simulate dice rolls
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
      times += 1;
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

  move(territory, players, sandbox, skipAnimation) {
    if (territory.color === "Bisque") {
      if(territory.base === "Fort") {
        players[this.color].addFort(territory);
      }

      createjs.Sound.play("March");
      players[this.color].territories++;
      territory.moveIn(this.color, this.units - 1);
      this.moveOut();
      this.moveSprites(territory);
    } else if (territory.color === this.color) {
      createjs.Sound.play("March");
      territory.moveThrough((this.units - 1 + territory.units));
      this.moveOut();
      this.moveSprites(territory);
    } else {
      this.units--;
      createjs.Sound.play("Combat");
      const outcome = this.battle(territory);

      if(!skipAnimation) {
        sandbox.animateBattle(outcome);
      }

      let victory;
      if (outcome.winner === this.color) {
        if(territory.base === "Fort") {
          players[this.color].addFort(territory);
        }

        if(players[territory.color]) {
          if(players[territory.color].base.id === territory.id) {
            victory = `${this.color} Wins!`;
          }

          if(territory.base === "Fort"){
            delete players[territory.color].forts[territory.id];
          }

          players[territory.color].territories--;
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

  addFort(territory) {
    this.forts = Object.assign(
      this.forts,
      {
        [territory.id]: territory,
      }
    );
  }
}

module.exports = Player;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Game {
  constructor(map, stage, tutorialMode, computerOn) {
    this.map = map;
    this.stage = stage;
    this.tutorialMode = tutorialMode;
    this.computerOn = computerOn;
    this.endTurn = this.endTurn.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.handleTutorialClick = this.handleTutorialClick.bind(this);
    this.mountTurnLabel();
    this.mountEndButton();
    this.mountMenuButton();
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

    if(this.tutorialMode) {
      button.on("click", this.handleTutorialClick)
    } else {
      button.on("click", () => {
        if(this.computerOn && this.map.currentPlayer === this.map.players["Red"]) {
          return;
        }

        this.endTurn();
      });
    }
    this.stage.addChild(text);
  }

  mountMenuButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("beige")
      .drawRoundRect(25, 350, 150, 50, 5);
    button.cursor = "pointer";
    this.stage.addChild(button);
    const text = new createjs.Text(
      "Menu",
      "32px cursive",
      "Black");
    text.x = 100;
    text.y = 375;
    text.textAlign = "center";
    text.textBaseline = "middle";

    button.on("click", () => {
      document.getElementById('pause-menu').classList.remove('close');
      document.getElementById("cloud").classList.add("close");
      document.getElementById("alert").classList.add("close");
    })

    this.stage.addChild(text);
  }

  endTurn(computerTurn) {
    this.map.currentPlayer.recruit();
    const fortNum = Object.keys(this.map.currentPlayer.forts).length;
    const recruitNum = (1 + (Math.floor(this.map.currentPlayer.territories / 3)) + fortNum);

    if(!computerTurn) {
      this.map.alert(`Congratulations, ${this.map.currentPlayer.color}.
        You have recruited ${recruitNum} ${recruitNum === 1 ? 'unit' : 'units'}
        for your base${fortNum ? ` and ${fortNum} ${fortNum === 1 ? 'unit'
        : 'units'} for your forts` : ''}.`,
        () => {
          if (this.computerOn) {
            this.playComputerTurn();
          }
        });
    } else {
      this.map.alert('The computer has completed its turn. Your move!');
    }

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

  handleTutorialClick(e) {
    if(this.map.tutorialMode === 5 || this.map.tutorialMode === 13) {
      this.endTurn();
      this.map.tutorialMode++;
      this.map.showTutorialDialog(this.map.tutorialMode);
    } else if (this.map.tutorialMode === 8) {
      this.endTurn(true);
      this.map.tutorialMode++;
      this.map.showTutorialDialog(this.map.tutorialMode);
    }
  }

  handleTick(e) {
    Object.values(this.map.players).forEach((player) => {
      player.text.text = `${player.color}: ${player.territories} territories`;
    });
    this.stage.update();
  }

  playComputerTurn() {
    const delay = this.map.playComputerTurn();
    setTimeout(() => {
      this.endTurn(true);
    }, delay + 500);
  }
}

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const UNIT_SPRITE_DATA = {
  "Blue": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      defdead:215,
      attdead:214,
      attfight:252,
      deffight:256,
    }
  },
  "Red": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      defdead:229,
      attdead:228,
      attfight:266,
      deffight:270,
    }
  },
  "Black": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      defdead:565,
      attdead:564,
      attfight:602,
      deffight:606,
    }
  },
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
  "Black": {
    images: ["./assets/images/dice.jpg"],
    frames: {width:62.83, height:62.83},
    animations: {
      one: 24,
      two: 25,
      three: 26,
      four: 27,
      five: 28,
      six: 29,
      rolling: [24,29,"rolling"],
    }
  },
};

const NUMBER_TO_STRING = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

class Sandbox {
  constructor(sandboxStage) {
    this.sandboxStage = sandboxStage;
    this.bindNext();
    this.handleTick = this.handleTick.bind(this);
    this.next = this.next.bind(this);
  }

  handleTick() {
    this.sandboxStage.sortChildren((child1, child2) => {
      if (child1.y > child2.y) { return 1; }
      if (child1.y < child2.y) { return -1; }
      return 0;
    });
    this.sandboxStage.update();
  }

  bindNext() {
    const next = document.getElementById("sandbox-next");
    next.addEventListener("click", () => {
      this.next();
    });
  }

  next() {
    if(this.index >= this.battle.log.length) {
      const close = document.getElementById("sandbox");
      close.classList.add("close");
      return;
    }

    this.index++;
    this.displayBattle(this.battle, this.index);
  }

  logBattle(battle, index) {
    const text = document.getElementById("sandbox-text");
    text.innerHTML = "";

    if (index >= battle.log.length) {
      text.append(`${battle.winner} wins with ${battle.survivors}
        ${battle.survivors === 1 ? 'unit' : 'units'} remaining`);

      return;
    }

    const roll = battle.log[index];

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
  }

  mountDice(battle, index) {
    this.sandboxStage.removeAllChildren();

    if(index >= battle.log.length) {
      return;
    }

    battle.log[index].attackerRolls.forEach((roll, idx) => {
      const data = DICE_SPRITE_DATA[battle.attacker];
      const spriteSheet = new createjs.SpriteSheet(data);
      const animation = new createjs.Sprite(spriteSheet, NUMBER_TO_STRING[roll]);
      animation.x = 63 * (idx);
      animation.y = 0;
      this.sandboxStage.addChild(animation);
    });

    battle.log[index].defenderRolls.forEach((roll, idx) => {
      const data = DICE_SPRITE_DATA[battle.defender];
      const spriteSheet = new createjs.SpriteSheet(data);
      const animation = new createjs.Sprite(spriteSheet, NUMBER_TO_STRING[roll]);
      animation.x = 63 * (idx);
      animation.y = 287;
      this.sandboxStage.addChild(animation);
    });
  }

  mountSprites(battle, index) {
    if(index >= battle.log.length) {
      for (var i = 0; i < battle.survivors; i++) {
        let side, animation;
        if(battle.winner === battle.attacker) {
          side = "attack";
          animation = "attfight";
        } else {
          side = "defend";
          animation = "deffight";
        }
        this.generateSprite(battle.winner, side, animation);
      }
      return;
    }

    let attackerDead, defenderDead;
    if (index === 0) {
      attackerDead = battle.initialAttackers - battle.log[index].attackerUnits;
      defenderDead = battle.initialDefenders - battle.log[index].defenderUnits;
    } else {
      attackerDead = battle.log[index -1].attackerUnits - battle.log[index].attackerUnits;
      defenderDead = battle.log[index -1].defenderUnits - battle.log[index].defenderUnits;
    }

    let attackerAlive = battle.log[index].attackerUnits;
    let defenderAlive = battle.log[index].defenderUnits;

    while (attackerDead > 0) {
      this.generateSprite(battle.attacker, "attack", "attdead");
      attackerDead--;
    }
    while (defenderDead > 0) {
      this.generateSprite(battle.defender, "defend", "defdead");
      defenderDead--;
    }
    while (attackerAlive > 0) {
      this.generateSprite(battle.attacker, "attack", "attfight");
      attackerAlive--;
    }
    while (defenderAlive > 0) {
      this.generateSprite(battle.defender, "defend", "deffight");
      defenderAlive--;
    }
  }

  generateSprite(color, side, animation) {
    const data = UNIT_SPRITE_DATA[color];
    const spriteSheet = new createjs.SpriteSheet(data);
    const sprite = new createjs.Sprite(spriteSheet, animation);

    if (side === "attack") {
      sprite.scaleX = -1;
      sprite.x = Math.random() * 100 + 125;
      sprite.y = Math.random() * 25 + 125;
    } else {
      sprite.x = Math.random() * 100 + 200;
      sprite.y = Math.random() * 25 + 175;
    }

    this.sandboxStage.addChild(sprite);
  }

  animateBattle(battle, callback) {
    this.battle = battle;
    this.index = 0;
    this.displayBattle(battle, 0);
    this.square.removeAllEventListeners();
    this.square.on("click", () => {
      const sandbox = document.getElementById("sandbox");
      sandbox.classList.remove("close");
    });

    const close = document.getElementById("sandbox-close");
    close.addEventListener("click", () => {
      const alert = document.getElementById("sandbox");
      alert.classList.add("close");

      if(callback) {
        callback();
      }
    });
  }

  displayBattle(battle, index) {
    this.mountDice(battle, index);
    this.logBattle(battle, index);
    this.mountSprites(battle, index);
  }
}

module.exports = Sandbox;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map