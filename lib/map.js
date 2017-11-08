const Territory = require("./territory");

class Map {
  constructor(stage) {
    this.board = {
      1: new Territory(1, [2], "white", 2),
      2: new Territory(2, [1,3], "white", 2),
      3: new Territory(3, [2,4], "white", 2),
      4: new Territory(4, [3,5], "white", 2),
      5: new Territory(5, [4], "white", 2),
    };
    this.stage = stage;
    this.handleClick = this.handleClick.bind(this);
    this.setup();
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

  setup() {
    const allTerritories = Object.values(this.board).map((territory) => {
      const circle = new createjs.Shape();
      circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
      circle.x = 100 * territory.id;
      circle.y = 100;
      circle.id = territory.id;
      circle.addEventListener("click", this.handleClick);
      return circle;
    });

    allTerritories.forEach((circle) => {
      this.stage.addChild(circle);
    });
  }
}

module.exports = Map;
