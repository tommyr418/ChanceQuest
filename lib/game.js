class Game {
  constructor(map, stage) {
    this.map = map;
    this.stage = stage;
    this.endTurn = this.endTurn.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.mountTurnLabel();
    this.mountEndButton();
    this.mountTerritoriesCount();
  }

  mountTurnLabel() {
    const text = new createjs.Text(
      "Blue's Turn",
      "32px cursive",
      "Blue");
    text.x = 100;
    text.y = 100;
    text.textAlign = "center";
    text.textBaseline = "middle";
    this.turnLabel = text;
    this.stage.addChild(text);
  }

  endTurn() {
    this.map.currentPlayer.recruit();
    this.map.addSprites();
    this.map.deSelect();
    this.map.swapPlayer();
    this.turnLabel.text = this.map.currentPlayer.color + "'s Turn";
    this.turnLabel.color = this.map.currentPlayer.color;
  }

  mountEndButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("beige")
      .drawRoundRect(25, 275, 150, 50, 5);
    button.addEventListener("click", this.endTurn);
    this.stage.addChild(button);
    const text = new createjs.Text(
      "End Turn",
      "32px cursive",
      "Black");
    text.x = 100;
    text.y = 300;
    text.textAlign = "center";
    text.textBaseline = "middle";
    this.stage.addChild(text);
  }

  mountTerritoriesCount() {
    Object.values(this.map.players).forEach((player) => {
      const text = new createjs.Text(
        `${player.color}: ${player.territories} territories`,
        "20px cursive",
        "black");
      text.x = player.x;
      text.y = player.y;
      text.textAlign = "center";
      text.textBaseline = "middle";
      player.text = text;
      this.stage.addChild(text);
    });
  }

  handleTick(e) {
    Object.values(this.map.players).forEach((player) => {
      player.text.text = `${player.color}: ${player.territories} territories`;
    });
    this.stage.update();
  }
}

module.exports = Game;
