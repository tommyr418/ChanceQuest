const Territory = require("./territory");

class Map {
  constructor(stage) {
    this.board = {
      1: new Territory(1, [2], 50, 43.3, 2, "Red"),
      2: new Territory(2, [1,3], 125, 86.6, 2, "Blue"),
      3: new Territory(3, [2,4], 200, 129.9, 2, "Red"),
      4: new Territory(4, [3,5], 275, 173.2, 2, "Blue"),
      5: new Territory(5, [4], 350, 216.5, 2, "Red"),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.mapTerritory();
    this.selected = 0;
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      this.board[this.selected].invade(this.board[e.currentTarget.id]);
      this.selected = 0;
    } else {
      this.selected = e.currentTarget.id;
    }
  }

  mapTerritory() {
    const allTerritories = Object.values(this.board);

    allTerritories.forEach((territory) => {
      const hexagon = new createjs.Shape();
      hexagon.graphics.beginStroke("Black")
        .beginFill(territory.background)
        .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);
      hexagon.id = territory.id;
      hexagon.addEventListener("click", this.handleClick);
      territory.setHexagon(hexagon);
      this.stage.addChild(hexagon);
    });
  }
}

module.exports = Map;
