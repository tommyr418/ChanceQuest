const Territory = require("./territory");
const Player = require("./player");

const MAP = {
  1: new Territory(1, [2,14,15], 425, 173.2, 10, "Red", "Base"),
  2: new Territory(2, [1,3,15], 350, 216.5, 0, "Bisque"),
  3: new Territory(3, [2,4,22], 350, 303.1, 0, "Bisque"),
  4: new Territory(4, [3,5,7], 425, 346.4, 0, "Bisque"),
  5: new Territory(5, [4,6], 425, 433, 0, "Bisque"),
  6: new Territory(6, [5,28], 425, 519.6, 10, "Blue", "Base"),
  7: new Territory(7, [4,8,9], 500, 303.1, 0, "Bisque"),
  8: new Territory(8, [7,9,10,11], 575, 259.8, 0, "Bisque"),
  9: new Territory(9, [7,8,10], 575, 346.4, 0, "Bisque"),
  10: new Territory(10, [8,9,11], 650, 303.1, 0, "Bisque"),
  11: new Territory(11, [8,10,12], 650, 216.5, 0, "Bisque"),
  12: new Territory(12, [11,13], 650, 129.9, 0, "Bisque"),
  13: new Territory(13, [12,14], 575, 86.6, 0, "Bisque"),
  14: new Territory(14, [1,13], 500, 129.9, 0, "Bisque"),
  15: new Territory(15, [1,2,16], 350, 129.9, 0, "Bisque"),
  16: new Territory(16, [15,17], 275, 86.6, 0, "Bisque"),
  17: new Territory(17, [16,18,19], 200, 129.9, 0, "Bisque"),
  18: new Territory(18, [17,19], 125, 86.6, 0, "Bisque"),
  19: new Territory(19, [17,18,20], 125, 173.2, 0, "Bisque"),
  20: new Territory(20, [19,21,23], 125, 259.8, 0, "Bisque"),
  21: new Territory(21, [20,22,23], 200, 303.1, 0, "Bisque"),
  22: new Territory(22, [3,21], 275, 346.4, 0, "Bisque"),
  23: new Territory(23, [20,21,24], 125, 346.4, 0, "Bisque"),
  24: new Territory(24, [23,25], 125, 433, 0, "Bisque"),
  25: new Territory(25, [24,26], 125, 519.6, 0, "Bisque"),
  26: new Territory(26, [25,27], 200, 562.9, 0, "Bisque"),
  27: new Territory(27, [26,28], 275, 519.6, 0, "Bisque"),
  28: new Territory(28, [6,27], 350, 562.9, 0, "Bisque"),
};

class Map {
  constructor(stage) {
    this.board = MAP
    this.players = {
      "Blue": new Player(1, "Blue", this.board[6], 100, 400),
      "Red": new Player(2, "Red", this.board[1], 100, 500),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
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
      this.board[this.selected].hexagon.alpha = 0.3;
      this.stage.update();
      this.selected = 0;
    } else {
      if (this.currentPlayer.color !== this.board[e.currentTarget.id].color) {
        alert("Please select your own units to move");
        return;
      }
      if (this.board[e.currentTarget.id].units === 1) {
        alert("You need more than one unit to move");
        return;
      }
      this.selected = e.currentTarget.id;
    }
  }

  handleMouseOver(e) {
    if(e.currentTarget.alpha !== 0.7) {
      e.currentTarget.alpha = 0.7;
      this.stage.update();
    }
  }

  handleMouseOut(e) {
    if(this.selected !== e.currentTarget.id && e.currentTarget.alpha !== 0.3) {
      e.currentTarget.alpha = 0.3;
      this.stage.update();
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
      hexagon.graphics.beginStroke("Black")
      .beginFill(territory.background)
      .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);

      if (territory.base === "Base") {
        hexagon.graphics.endFill()
        .beginStroke("Black")
        .drawPolyStar(territory.x, territory.y, 50, 6, 0.5, 0);
      }

      hexagon.alpha = 0.3;
      hexagon.id = territory.id;
      hexagon.on("click", this.handleClick);
      hexagon.on("mouseover", this.handleMouseOver);
      hexagon.on("mouseout", this.handleMouseOut);
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
      if(text.text === "0") {
        text.visible = false;
      }

      this.stage.addChild(text);
    });
  }
}

module.exports = Map;
