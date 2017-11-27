const Map = require("./map.js");
const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {
  const chanceQuest = new ChanceQuest();
});

class ChanceQuest {
  constructor() {
    this.bindStart();
    this.bindDirections();
    this.bindMainMenu();
    this.bindNextPage();
    this.bindPrevPage();
    this.bindClose();
  }

  bindStart() {
    const start = document.getElementById("start");
    start.addEventListener("click", () => {
      this.startGame();
      document.getElementById("main-menu").classList.add("close");
    });
  }

  bindDirections() {
    const directions = document.getElementById("directions");
    directions.addEventListener("click", () => {
      const element = document.getElementById("directions-page-1");
      element.classList.remove("close");
      element.classList.add("open");
    });
  }

  bindMainMenu() {
    const menu = document.getElementsByClassName("directions-close");
    Object.values(menu).forEach((link, index) => {
      link.addEventListener("click", () => {
        const element = document.getElementById(`directions-page-${index + 1}`);
        element.classList.remove("open");
        element.classList.add("close");
      });
    });
  }

  bindNextPage() {
    const menu = document.getElementsByClassName("directions-next");
    Object.values(menu).forEach((link, index) => {
      link.addEventListener("click", () => {
        const currentElement = document.getElementById(`directions-page-${index +1}`);
        currentElement.classList.remove('open');
        currentElement.classList.add('close');
        const nextElement = document.getElementById(`directions-page-${index + 2}`);
        nextElement.classList.remove("close");
        nextElement.classList.add("open");
      });
    });
  }

  bindPrevPage() {
    const menu = document.getElementsByClassName("directions-back");
    Object.values(menu).forEach((link, index) => {
      link.addEventListener("click", () => {
        const currentElement = document.getElementById(`directions-page-${index + 2}`);
        currentElement.classList.remove('open');
        currentElement.classList.add('close');
        const prevElement = document.getElementById(`directions-page-${index + 1}`);
        prevElement.classList.remove("close");
        prevElement.classList.add("open");
      });
    });
  }

  bindClose() {
    const close = document.getElementById("dialog-close");
    close.addEventListener("click", () => {
      const alert = document.getElementById("alert");
      alert.classList.add("close");
    })
  }

  startGame() {
    this.gameStage = new createjs.Stage("game-canvas");
    this.mapStage = new createjs.Stage("map-canvas");
    this.mapStage.enableMouseOver(20);
    this.map = new Map(this.mapStage);
    this.game = new Game(this.map, this.gameStage);

    createjs.Ticker.addEventListener("tick", this.game.handleTick);
    createjs.Ticker.addEventListener("tick", this.map.handleTick);
    createjs.Ticker.framerate = 5;
  }
}
