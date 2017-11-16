const Territory = require("./territory");
const Player = require("./player");

const MAP = {
  1: new Territory(1, [2,14,15], 425, 173.2, 4, "Red", "Base"),
  2: new Territory(2, [1,3,15], 350, 216.5, 0, "Bisque"),
  3: new Territory(3, [2,4,22], 350, 303.1, 0, "Bisque"),
  4: new Territory(4, [3,5,7], 425, 346.4, 0, "Bisque"),
  5: new Territory(5, [4,6], 425, 433, 0, "Bisque"),
  6: new Territory(6, [5,28], 425, 519.6, 3, "Blue", "Base"),
  7: new Territory(7, [4,8,9], 500, 303.1, 0, "Bisque"),
  8: new Territory(8, [7,9,10,11], 575, 259.8, 0, "Bisque"),
  9: new Territory(9, [7,8,10], 575, 346.4, 0, "Bisque"),
  10: new Territory(10, [8,9,11,30], 650, 303.1, 3, "Black", "Fort"),
  11: new Territory(11, [8,10,12], 650, 216.5, 0, "Bisque"),
  12: new Territory(12, [11,13], 650, 129.9, 3, "Black"),
  13: new Territory(13, [12,14], 575, 86.6, 0, "Bisque"),
  14: new Territory(14, [1,13], 500, 129.9, 0, "Bisque"),
  15: new Territory(15, [1,2,16], 350, 129.9, 0, "Bisque"),
  16: new Territory(16, [15,17], 275, 86.6, 0, "Bisque"),
  17: new Territory(17, [16,18,19], 200, 129.9, 0, "Bisque", "Fort"),
  18: new Territory(18, [17,19], 125, 86.6, 0, "Bisque"),
  19: new Territory(19, [17,18,20], 125, 173.2, 0, "Bisque"),
  20: new Territory(20, [19,21,23], 125, 259.8, 0, "Bisque"),
  21: new Territory(21, [20,22,23], 200, 303.1, 0, "Bisque"),
  22: new Territory(22, [3,21], 275, 346.4, 0, "Bisque"),
  23: new Territory(23, [20,21,24], 125, 346.4, 0, "Bisque"),
  24: new Territory(24, [23,25,29], 125, 433, 0, "Bisque"),
  25: new Territory(25, [24,26,29], 125, 519.6, 0, "Bisque"),
  26: new Territory(26, [25,27,29], 200, 562.9, 0, "Bisque"),
  27: new Territory(27, [26,28,29], 275, 519.6, 0, "Bisque"),
  28: new Territory(28, [6,27], 350, 562.9, 0, "Bisque"),
  29: new Territory(29, [24,25,26,27], 200, 476.3, 0, "Bisque", "Fort"),
  30: new Territory(30, [10,31], 725, 346.4, 0, "Bisque"),
  31: new Territory(31, [30], 725, 433, 0, "Bisque", "Stronghold"),
};

class Map {
  constructor(stage) {
    this.board = MAP;
    this.players = {
      "Blue": new Player(1, "Blue", this.board[6], 100, 400),
      "Red": new Player(2, "Red", this.board[1], 100, 500),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.mapTerritories();
    this.selected = 0;
    this.currentPlayer = this.players["Blue"];
    this.handleTick = this.handleTick.bind(this);
  }

  handleClick(e) {
    console.log(`${e.currentTarget.id} has been clicked`);
    if(this.selected) {
      if (this.selected === e.currentTarget.id) {
        this.deSelect();
        this.stage.update();
        return;
      }

      if (!this.hasPath(
        this.board[this.selected],
        this.board[e.currentTarget.id]
      )) {
        alert("Please choose a tile that's adjacent or you have a direct path to");
        return;
      }

      this.board[this.selected].move(
        this.board[e.currentTarget.id],
        this.players
      );
      this.deSelect();
      this.stage.update();
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

  deSelect() {
    if(this.selected) {
      this.board[this.selected].hexagon.alpha = 0.3;
      this.selected = 0;
    }
  }

  hasPath(from, to, visited = []) {
    if(from.isAdjacent(to)) {
      return true;
    }
    const possiblePath = [];
    from.adjacent.forEach((adjacentId) => {
      if(!visited.includes(adjacentId) &&
        from.isFriendly(this.board[adjacentId])) {
        possiblePath.push(this.board[adjacentId]);
      }
    });

    visited.push(from.id);

    if (possiblePath.length === 0) {
      return false;
    }

    for (var i = 0; i < possiblePath.length; i++) {
      if (this.hasPath(possiblePath[i], to, visited)) {
        return true;
      }
    }

    return false;
  }

  mapTerritories() {
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
      } else if (territory.base === "Fort") {
        hexagon.graphics.endFill()
        .beginStroke("Black")
        .drawCircle(territory.x, territory.y, 25);
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
      text.textAlign = "center";
      text.textBaseline = "middle";
      territory.setText(text);
      if(text.text === "0") {
        text.visible = false;
      }

      this.stage.addChild(text);

      const spriteArr = [];
      let i = territory.units;
      while (i > 0) {
        const data = {
          images: ["./assets/images/soldier.png"],
          frames: {width:24.57, height:40},
          animations: {
            stand:8,
            run:[1,3, "run"],
          }
        };
        const spriteSheet = new createjs.SpriteSheet(data);
        const animation = new createjs.Sprite(spriteSheet, "stand");
        animation.x = (Math.random() * -30) + territory.x;
        animation.y = (Math.random() * -60) + territory.y;

        spriteArr.push(animation);
        this.stage.addChild(animation)
        i--;
      }

      territory.spriteArr = spriteArr;
    });
  }

  handleTick() {
    this.stage.update();
  }
}

module.exports = Map;
