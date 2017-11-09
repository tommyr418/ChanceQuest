class Game {
  constructor(map, stage) {
    this.map = map;
    this.stage = stage;
    this.mountTurnLabel();
    this.mountEndButton();
    this.endTurn = this.endTurn.bind(this);
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
    this.turnLabel.text = "Blue's Turn" ? "Red's Turn" : "Blue's Turn"
    this.stage.update();
  }

  mountEndButton() {
    var bitmap = new createjs.Bitmap("./assets/thumbs_up.png");
    bitmap.image.onload = () =>{
      this.stage.update();
    };
    bitmap.x = 50;
    bitmap.y = 200;
    bitmap.addEventListener("click", this.endTurn);
    this.stage.addChild(bitmap);
  }
}

module.exports = Game;
