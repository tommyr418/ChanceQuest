class Game {
  constructor(map, stage) {
    this.map = map;
    this.stage = stage;
    this.endTurn = this.endTurn.bind(this);
    this.mountTurnLabel();
    this.mountEndButton();
  }

  mountTurnLabel() {
    const text = new createjs.Text(
      "Blue's Turn",
      "32px Arial",
      "DarkSlateGray");
    text.x = 100;
    text.y = 50;
    text.textAlign = "center";
    text.textBaseline = "middle";
    this.turnLabel = text;
    this.stage.addChild(text);
  }

  endTurn() {
    this.map.swapPlayer();
    this.turnLabel.text = (this.turnLabel.text === "Blue's Turn") ?
      "Red's Turn" : "Blue's Turn";
    this.stage.update();
  }

  mountEndButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("Green")
      .drawRoundRect(100, 300, 75, 25, 5);
    button.addEventListener("click", this.endTurn);
    this.stage.addChild(button);
  }
}

module.exports = Game;
