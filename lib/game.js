class Game {
  constructor(map, stage) {
    this.map = map;
    this.stage = stage;
    this.endTurn = this.endTurn.bind(this);
    this.mountTurnLabel();
    this.mountEndButton();
    this.mountTerritoriesCount();
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
    this.map.currentPlayer.recruit();
    this.map.stage.update();
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

  mountTerritoriesCount() {
    Object.values(this.map.players).forEach((player) => {
      const text = new createjs.Text(
        player.territories.toString(),
        "32px Arial",
        "DarkSlateGray");
      text.x = player.x;
      text.y = player.y;
      text.textAlign = "center";
      text.textBaseline = "middle";
      this.stage.addChild(text);
    });
  }
}

module.exports = Game;
