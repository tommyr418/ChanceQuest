const Map = require("./map.js");
const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {
  const mapStage = new createjs.Stage("map-canvas");
  mapStage.enableMouseOver(20);
  const gameStage = new createjs.Stage("game-canvas");
  const map = new Map(mapStage);
  const game = new Game(map, gameStage);
  mapStage.update();
  gameStage.update();
});
