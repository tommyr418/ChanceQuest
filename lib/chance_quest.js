const Map = require("./map.js");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("canvas");
  const stage = new createjs.Stage("game-canvas");
  const map = new Map(stage);

  stage.update();
});
