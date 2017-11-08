const Territory = require("./territory");

class Map {
  constructor() {
    this.board = {
      1: new Territory(1),
      2: new Territory(2),
      3: new Territory(3),
      4: new Territory(4),
      5: new Territory(5),
    };
  }
}

module.exports = Map;
