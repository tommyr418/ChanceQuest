const UNIT_SPRITE_DATA = {
  "Blue": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      defdead:215,
      attdead:214,
      attfight:252,
      deffight:256,
    }
  },
  "Red": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      defdead:229,
      attdead:228,
      attfight:266,
      deffight:270,
    }
  },
  "Black": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      defdead:565,
      attdead:564,
      attfight:602,
      deffight:606,
    }
  },
};

const DICE_SPRITE_DATA = {
  "Blue": {
    images: ["./assets/images/dice.jpg"],
    frames: {width:62.83, height:62.83},
    animations: {
      one: 18,
      two: 19,
      three: 20,
      four: 21,
      five: 22,
      six: 23,
      rolling: [18,23,"rolling"],
    }
  },
  "Red": {
    images: ["./assets/images/dice.jpg"],
    frames: {width:62.83, height:62.83},
    animations: {
      one: 0,
      two: 1,
      three: 2,
      four: 3,
      five: 4,
      six: 5,
      rolling: [0,5,"rolling"],
    }
  },
  "Black": {
    images: ["./assets/images/dice.jpg"],
    frames: {width:62.83, height:62.83},
    animations: {
      one: 24,
      two: 25,
      three: 26,
      four: 27,
      five: 28,
      six: 29,
      rolling: [24,29,"rolling"],
    }
  },
};

const NUMBER_TO_STRING = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

class Sandbox {
  constructor(sandboxStage) {
    this.sandboxStage = sandboxStage;
    this.bindNext();
    this.handleTick = this.handleTick.bind(this);
    this.next = this.next.bind(this);
  }

  handleTick() {
    this.sandboxStage.sortChildren((child1, child2) => {
      if (child1.y > child2.y) { return 1; }
      if (child1.y < child2.y) { return -1; }
      return 0;
    })
    this.sandboxStage.update();
  }

  bindNext() {
    const next = document.getElementById("sandbox-next");
    next.addEventListener("click", () => {
      this.next();
    });
  }

  next() {
    if(this.index >= this.battle.log.length) {
      const close = document.getElementById("sandbox");
      close.classList.add("close");
      return;
    }

    this.index++;
    this.displayBattle(this.battle, this.index);
  }

  logBattle(battle, index) {
    const text = document.getElementById("sandbox-text");
    text.innerHTML = "";

    if (index >= battle.log.length) {
      text.append(`${battle.winner} wins with ${battle.survivors}
        ${battle.survivors === 1 ? 'unit' : 'units'} remaining`);

      return;
    }

    const roll = battle.log[index];

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
  }

  mountDice(battle, index) {
    this.sandboxStage.removeAllChildren();

    if(index >= battle.log.length) {
      return;
    }

    battle.log[index].attackerRolls.forEach((roll, idx) => {
      const data = DICE_SPRITE_DATA[battle.attacker];
      const spriteSheet = new createjs.SpriteSheet(data);
      const animation = new createjs.Sprite(spriteSheet, NUMBER_TO_STRING[roll]);
      animation.x = 63 * (idx);
      animation.y = 0;
      this.sandboxStage.addChild(animation);
    });

    battle.log[index].defenderRolls.forEach((roll, idx) => {
      const data = DICE_SPRITE_DATA[battle.defender];
      const spriteSheet = new createjs.SpriteSheet(data);
      const animation = new createjs.Sprite(spriteSheet, NUMBER_TO_STRING[roll]);
      animation.x = 63 * (idx);
      animation.y = 287;
      this.sandboxStage.addChild(animation);
    });
  }

  mountSprites(battle, index) {
    if(index >= battle.log.length) {
      for (var i = 0; i < battle.survivors; i++) {
        let side, animation;
        if(battle.winner === battle.attacker) {
          side = "attack";
          animation = "attfight";
        } else {
          side = "defend"
          animation = "deffight";
        }
        this.generateSprite(battle.winner, side, animation)
      }
      return;
    }

    let attackerDead, defenderDead;
    if (index === 0) {
      attackerDead = battle.initialAttackers - battle.log[index].attackerUnits;
      defenderDead = battle.initialDefenders - battle.log[index].defenderUnits;
    } else {
      attackerDead = battle.log[index -1].attackerUnits - battle.log[index].attackerUnits;
      defenderDead = battle.log[index -1].defenderUnits - battle.log[index].defenderUnits;
    }

    let attackerAlive = battle.log[index].attackerUnits;
    let defenderAlive = battle.log[index].defenderUnits;

    while (attackerDead > 0) {
      this.generateSprite(battle.attacker, "attack", "attdead");
      attackerDead--;
    }
    while (defenderDead > 0) {
      this.generateSprite(battle.defender, "defend", "defdead");
      defenderDead--;
    }
    while (attackerAlive > 0) {
      this.generateSprite(battle.attacker, "attack", "attfight");
      attackerAlive--;
    }
    while (defenderAlive > 0) {
      this.generateSprite(battle.defender, "defend", "deffight");
      defenderAlive--;
    }
  }

  generateSprite(color, side, animation) {
    const data = UNIT_SPRITE_DATA[color];
    const spriteSheet = new createjs.SpriteSheet(data);
    const sprite = new createjs.Sprite(spriteSheet, animation);

    if (side === "attack") {
      sprite.scaleX = -1;
      sprite.x = Math.random() * 100 + 125;
      sprite.y = Math.random() * 25 + 125;
    } else {
      sprite.x = Math.random() * 100 + 200;
      sprite.y = Math.random() * 25 + 175;
    }

    this.sandboxStage.addChild(sprite);
  }

  animateBattle(battle, callback) {
    this.battle = battle;
    this.index = 0;
    this.displayBattle(battle, 0);
    this.square.removeAllEventListeners();
    this.square.on("click", () => {
      const sandbox = document.getElementById("sandbox");
      sandbox.classList.remove("close");
    });

    const close = document.getElementById("sandbox-close");
    close.addEventListener("click", () => {
      const alert = document.getElementById("sandbox");
      alert.classList.add("close");

      if(callback) {
        callback();
      }
    });
  }

  displayBattle(battle, index) {
    this.mountDice(battle, index);
    this.logBattle(battle, index);
    this.mountSprites(battle, index);
  }
}

module.exports = Sandbox;
