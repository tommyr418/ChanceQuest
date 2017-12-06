const UNIT_SPRITE_DATA = {

};

const DICE_SPRITE_DATA = {
  "Blue": {
    images: ["./assets/images/dice.jpg"],
    frames: {width:62.83, height:62.83},
    animations: {
      one: 18,
      rolling: [18,23,"rolling"],
    }
  },
};

class Sandbox {
  constructor(sandboxStage) {
    this.sandboxStage = sandboxStage;
    this.mountRollButton();
    this.handleTick = this.handleTick.bind(this);
  }

  handleTick() {
    this.sandboxStage.update();
  }

  mountRollButton() {
    const button = new createjs.Shape();
    button.graphics.beginStroke("Black")
      .beginFill("white")
      .drawRoundRect(410, 10, 80, 40, 5);
    button.cursor = "pointer";
    button.addEventListener("click", this.roll);
    this.sandboxStage.addChild(button);
    const text = new createjs.Text(
      "Roll",
      "24px cursive",
      "Black");
    text.x = 450;
    text.y = 30;
    text.textAlign = "center";
    text.textBaseline = "middle";
    this.sandboxStage.addChild(text);
  }

  roll() {
    console.log("clicked");
  }

  logBattle(battle) {
    const text = document.getElementById("sandbox-text");
    text.innerHTML = "";
    battle.log.forEach((roll) => {
      let br = document.createElement('br');
      text.append(`${battle.attacker} rolls ${roll.attackerRolls.join(', ')}`, br);
      br = document.createElement('br');
      text.append(`${battle.defender} rolls ${roll.defenderRolls.join(', ')}`, br);

      let attackerLoss = 0;
      let defenderLoss = 0;

      for (var i = 0; i < 2; i++) {
        if (!roll.attackerRolls[i] || !roll.defenderRolls[i]) {
          break;
        }

        if (roll.attackerRolls[i] > roll.defenderRolls[i]) {
          defenderLoss++;
        } else {
          attackerLoss++;
        }
      }

      if(attackerLoss) {
        br = document.createElement('br');
        text.append(`${battle.attacker} loses ${attackerLoss}
          ${attackerLoss === 1 ? 'unit' : 'units'}`, br);
      }

      if(defenderLoss) {
        br = document.createElement('br');
        text.append(`${battle.defender} loses ${defenderLoss}
          ${defenderLoss === 1 ? 'unit' : 'units'}`, br);
      }
    });

    let br = document.createElement('br');
    text.append(`${battle.winner} wins with ${battle.survivors}
      ${battle.survivors === 1 ? 'unit' : 'units'} remaining`, br);

    const sandbox = document.getElementById("sandbox");
    sandbox.classList.remove("close");
  }

  animateBattle(battle, index = 0) {
    let numberDice = battle.log[index].attackerRolls.length;
    debugger // eslint-disable-line
    while (numberDice > 0) {
      const data = DICE_SPRITE_DATA["Blue"];
      const spriteSheet = new createjs.SpriteSheet(data);
      const animation = new createjs.Sprite(spriteSheet, "one");
      animation.x = 63 * (numberDice-1);
      animation.y = 0;
      this.sandboxStage.addChild(animation);
      numberDice--;
    }

  }
}

module.exports = Sandbox;
