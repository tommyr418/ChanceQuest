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
      this.startGame(1);
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
