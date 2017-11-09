class Game {
  constructor(map, stage) {
    this.map = map;
    this.stage = stage;
    this.mountTurnLabel();
  }

  mountTurnLabel() {
    const text = new createjs.Text(
      "Blue's Turn",
      "20px Arial",
      "DarkSlateGray");
    text.x = 0;
    text.y = 0;
    text.textAlign = "left";
    text.textBaseline = "top";

    this.stage.addChild(text);
  }

  mountEndButton() {

  }
}

module.exports = Game;
