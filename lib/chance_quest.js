const Map = require("./map.js");
const Game = require("./game.js");
const Sandbox = require("./sandbox.js");

document.addEventListener("DOMContentLoaded", () => {
  const chanceQuest = new ChanceQuest();
});

class ChanceQuest {
  constructor() {
    this.bindStart();
    this.bindTutorial();
    this.bindResume();
  }

  bindStart() {
    const start1 = document.getElementById("start-1");
    start1.addEventListener("click", () => {
      this.startGame(false, true);
      document.getElementById("main-menu").classList.add("close");
    });

    const start2 = document.getElementById("start-2");
    start2.addEventListener("click", () => {
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
  }

  bindResume() {
    const resume = document.getElementById("resume-game");
    resume.addEventListener("click", () => {
      document.getElementById("pause-menu").classList.add("close");
    });
  }

  bindEnd() {

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
}
