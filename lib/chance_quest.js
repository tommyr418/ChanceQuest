const Map = require("./map.js");
const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {0
  const chanceQuest = new ChanceQuest();

  const mapStage = new createjs.Stage("map-canvas");
  mapStage.enableMouseOver(20);
  const gameStage = new createjs.Stage("game-canvas");
  const map = new Map(mapStage);
  const game = new Game(map, gameStage);

  createjs.Ticker.addEventListener("tick", game.handleTick);
  createjs.Ticker.addEventListener("tick", map.handleTick);
  createjs.Ticker.framerate = 5;
});

class ChanceQuest {
  constructor() {
    this.bindStart();
    this.bindDirections();
    this.bindMainMenu();
  }

  bindStart() {
    const start = document.getElementById("start");
    start.addEventListener("click", () => {
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
}
