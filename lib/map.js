const Territory = require("./territory");
const Player = require("./player");

class Map {
  constructor(stage) {
    this.board = {
      1: new Territory(1, [2], 50, 43.3, 10, "Red", "Base"),
      2: new Territory(2, [1,3], 125, 86.6, 0, "Bisque"),
      3: new Territory(3, [2,4], 200, 129.9, 0, "Bisque"),
      4: new Territory(4, [3,5], 275, 173.2, 0, "Bisque"),
      5: new Territory(5, [4], 350, 216.5, 10, "Blue", "Base"),
    };
    this.players = {
      "Blue": new Player(1, "Blue", this.board[5], 100, 400),
      "Red": new Player(2, "Red", this.board[1], 100, 500),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.mapTerritory();
    this.selected = 0;
    this.currentPlayer = this.players["Blue"];
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      this.board[this.selected].move(
        this.board[e.currentTarget.id],
        this.players,
      );
      this.stage.update();
      this.selected = 0;
    } else {
      if (this.currentPlayer.color !== this.board[e.currentTarget.id].color) {
        alert("Please select your own units to move");
        return;
      }
      this.selected = e.currentTarget.id;
    }
  }

  swapPlayer() {
    this.currentPlayer = (this.currentPlayer.color === "Blue")
    ?
    this.players["Red"]
    :
    this.players["Blue"];
  }

  mapTerritory() {
    const allTerritories = Object.values(this.board);

    allTerritories.forEach((territory) => {
      const hexagon = new createjs.Shape();
      if (territory.base === "Base") {
        hexagon.graphics.beginStroke("Black")
        .beginFill(territory.background)
        .drawPolyStar(territory.x, territory.y, 50, 6, 0.5, 0);
      } else {
        hexagon.graphics.beginStroke("Black")
        .beginFill(territory.background)
        .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);
      }
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
