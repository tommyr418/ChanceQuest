const Map = require("./map.js");

const map = new Map();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("canvas");
  const stage = new createjs.Stage("game-canvas");

  const allTerritories = Object.values(map.board).map((territory) => {
    const circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100 * territory.id;
    circle.y = 100;
    return circle;
  });

  allTerritories.forEach((circle) => {
    stage.addChild(circle);
  })

  stage.update();
});
