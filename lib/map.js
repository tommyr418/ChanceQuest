const Territory = require("./territory");

class Map {
  constructor(stage) {
    this.board = {
      1: new Territory(1, [2], 50, 43.3, 10, "Red"),
      2: new Territory(2, [1,3], 125, 86.6, 0, "Bisque"),
      3: new Territory(3, [2,4], 200, 129.9, 0, "Bisque"),
      4: new Territory(4, [3,5], 275, 173.2, 0, "Bisque"),
      5: new Territory(5, [4], 350, 216.5, 10, "Blue"),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.mapTerritory();
    this.selected = 0;
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      this.board[this.selected].move(this.board[e.currentTarget.id]);
      this.stage.update();
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

      const text = new createjs.Text(
        territory.units.toString(),
        "20px Arial",
        territory.color);
      text.x = territory.x;
      text.y = territory.y;
      text.textAlign = "center"
      text.textBaseline = "middle";
      territory.setText(text);

      this.stage.addChild(text);
    });
  }
}

module.exports = Map;
