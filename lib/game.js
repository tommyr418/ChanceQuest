class Game {
  constructor(map, stage, tutorialMode, computerOn) {
    this.map = map;
    this.stage = stage;
    this.tutorialMode = tutorialMode;
    this.computerOn = computerOn;
    this.endTurn = this.endTurn.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.handleTutorialClick = this.handleTutorialClick.bind(this);
    this.mountTurnLabel();
    this.mountEndButton();
    this.mountMenuButton();
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

  mountEndButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("beige")
      .drawRoundRect(25, 275, 150, 50, 5);
    button.cursor = "pointer";
    this.stage.addChild(button);
    const text = new createjs.Text(
      "End Turn",
      "32px cursive",
      "Black");
    text.x = 100;
    text.y = 300;
    text.textAlign = "center";
    text.textBaseline = "middle";

    if(this.tutorialMode) {
      button.on("click", this.handleTutorialClick)
    } else {
      button.on("click", () => {
        if(this.computerOn && this.map.currentPlayer === this.map.players["Red"]) {
          return;
        }

        this.endTurn();
      });
    }
    this.stage.addChild(text);
  }

  mountMenuButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("beige")
      .drawRoundRect(25, 350, 150, 50, 5);
    button.cursor = "pointer";
    this.stage.addChild(button);
    const text = new createjs.Text(
      "Menu",
      "32px cursive",
      "Black");
    text.x = 100;
    text.y = 375;
    text.textAlign = "center";
    text.textBaseline = "middle";

    button.on("click", () => {
      document.getElementById('pause-menu').classList.remove('close');
      document.getElementById("cloud").classList.add("close");
      document.getElementById("alert").classList.add("close");
    })

    this.stage.addChild(text);
  }

  endTurn(computerTurn) {
    this.map.currentPlayer.recruit();
    const fortNum = Object.keys(this.map.currentPlayer.forts).length;
    const recruitNum = (1 + (Math.floor(this.map.currentPlayer.territories / 3)) + fortNum);

    if(!computerTurn) {
      this.map.alert(`Congratulations, ${this.map.currentPlayer.color}.
        You have recruited ${recruitNum} ${recruitNum === 1 ? 'unit' : 'units'}
        for your base${fortNum ? ` and ${fortNum} ${fortNum === 1 ? 'unit'
        : 'units'} for your forts` : ''}.`,
        () => {
          if (this.computerOn) {
            this.playComputerTurn();
          }
        });
    } else if (!this.map.victory && this.map.mapStage.children.length > 0) {
      this.map.alert('The computer has completed its turn. Your move!');
    }

    this.map.addSprites();
    this.map.deSelect();
    this.map.swapPlayer();
    this.turnLabel.text = this.map.currentPlayer.color + "'s Turn";
    this.turnLabel.color = this.map.currentPlayer.color;
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

  handleTutorialClick(e) {
    if(this.map.tutorialMode === 5 || this.map.tutorialMode === 13) {
      this.endTurn();
      this.map.tutorialMode++;
      this.map.showTutorialDialog(this.map.tutorialMode);
    } else if (this.map.tutorialMode === 8 || this.map.tutorialMode === 16) {
      this.endTurn(true);
      this.map.tutorialMode++;
      this.map.showTutorialDialog(this.map.tutorialMode);
    }
  }

  handleTick(e) {
    Object.values(this.map.players).forEach((player) => {
      player.text.text = `${player.color}: ${player.territories} territories`;
    });
    this.stage.update();
  }

  playComputerTurn() {
    const delay = this.map.playComputerTurn();

    setTimeout(() => {
      this.endTurn(true);
    }, delay + 500);
  }
}

module.exports = Game;
