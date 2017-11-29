const COLOR_MAP = {
  "Blue": "DeepSkyBlue",
  "Red": "LightCoral",
  "Bisque": "Bisque",
  "Black": "DimGray",
};

const UNIT_SPRITE_DATA = {

};

const DICE_SPRITE_DATA = {
  "Blue": {
    images: ["./assets/images/dice.jpg"],
    frames: {width:62.83, height:62.83},
    animations: {
      one: 18,
      rolling:[18, 19, 20, 21, 22, 23],
    }
  },
};

class Territory {
  constructor(id, adjacent, x, y, units, color, base = "") {
    this.id = id;
    this.adjacent = adjacent;
    this.x = x;
    this.y = y;
    this.units = units;
    this.base = base;
    this.setColor(color);
  }


  isAdjacent(territory) {
    return this.adjacent.includes(territory.id);
  }

  isFriendly(territory) {
    return this.color === territory.color;
  }

  setHexagon(hexagon) {
    this.hexagon = hexagon;
  }

  setColor(color) {
    this.color = color;
    this.background = COLOR_MAP[color];
  }

  setText(text) {
    this.text = text;
  }

  moveOut() {
    this.units = 1;
    this.text.text = this.units.toString();
  }

  moveIn(color, units) {
    this.setColor(color);
    this.hexagon.graphics.clear()
      .beginStroke("Black")
      .beginFill(this.background)
      .drawPolyStar(this.x, this.y, 50, 6, 0, 0);

    if(this.base === "Base") {
      this.hexagon.graphics.endFill()
        .beginStroke("Black")
        .drawPolyStar(this.x, this.y, 50, 6, 0.5, 0);
    } else if (this.base === "Fort") {
      this.hexagon.graphics.endFill()
      .beginStroke("Black")
      .drawCircle(this.x, this.y, 25);
    }

    this.units = units;
    if(!this.text.visible) {
      this.text.visible = true;
    }
    this.text.text = this.units.toString();
    this.text.color = this.color;
  }

  moveThrough(units) {
    this.units = units;
    this.text.text = this.units.toString();
  }

  battle(territory) {
    const result = {
      attacker: this.color,
      defender: territory.color,
      log: [],
      winner: "",
      survivors: 0,
    };

    while(this.units > 0 && territory.units > 0) {
      const battle = {};
      battle.attackerRolls = this.roll(this.units, true, this.base);
      battle.defenderRolls = territory.roll(territory.units, false, territory.base);

      let compares = (
        battle.attackerRolls.length > battle.defenderRolls.length
        ?
        battle.defenderRolls.length
        :
        battle.attackerRolls.length
      );

      for (var i = 0; i < compares; i++) {
        if (battle.defenderRolls[i] < battle.attackerRolls[i]) {
          territory.units--;
        } else {
          this.units--;
        }
      }

      battle.attackerUnits = this.units;
      battle.defenderUnits = territory.units;
      result.log.push(battle);
    }

    if (this.units) {
      result.winner = this.color;
      result.survivors = this.units;
      return result;
    } else {
      result.winner = territory.color;
      result.survivors = territory.units;
      return result;
    }
  }

  roll(units, attacking, base) {
    const rolls = [];
    let times;
    if (attacking && units > 2) {
      times = 3;
    } else if (units > 1) {
      times = 2;
    } else {
      times = 1;
    }

    let boostHelper = times;
    if(!attacking && base === "Base") {
      times += 2;
    }

    for (var i = 0; i < times; i++) {
      rolls.push(1 + Math.floor(Math.random() * 6));
    }

    if (rolls.length === 1) {
      return rolls;
    }

    return rolls.sort((a, b) => (b - a)).slice(0, boostHelper);
  }

  moveSprites(territory) {
    while(this.spriteArr.length > 1) {
      const sprite = this.spriteArr.pop();

      sprite.x = (Math.random() * -30) + territory.x;
      sprite.y = (Math.random() * -60) + territory.y;
      sprite.gotoAndStop("stand");

      territory.spriteArr.push(sprite);
    }
  }

  updateSprites() {
    while(this.spriteArr.length > this.units) {
      const sprite = this.spriteArr.pop();
      sprite.stage.removeChild(sprite);
    }
  }

  removeSprites() {
    while(this.spriteArr.length > 0) {
      const sprite = this.spriteArr.pop();
      sprite.stage.removeChild(sprite);
    }
  }

  move(territory, players) {
    if (territory.color === "Bisque") {
      if(territory.base === "Fort") {
        players[this.color].forts = Object.assign(
          players[this.color].forts,
          {
            [territory.id]: territory,
          }
        );
      }

      players[this.color].territories++;
      territory.moveIn(this.color, this.units - 1);
      this.moveOut();
      this.moveSprites(territory);
    } else if (territory.color === this.color) {
      territory.moveThrough((this.units - 1 + territory.units));
      this.moveOut();
      this.moveSprites(territory);
    } else if (territory.color === "Black") {
      this.units--;
      const outcome = this.battle(territory);
      this.logBattle(outcome);
      this.animateBattle(outcome);
      console.log(outcome);
      if (outcome.winner === this.color) {
        if(territory.base === "Fort") {
          players[this.color].forts = Object.assign(
            players[this.color].forts,
            {
              [territory.id]: territory,
            }
          );
        }

        players[this.color].territories++;
        territory.moveIn(this.color, outcome.survivors);
        territory.removeSprites();
        this.moveSprites(territory);
        territory.updateSprites();
      } else {
        territory.moveThrough(outcome.survivors);
        territory.updateSprites();
      }
      this.moveOut();
      this.updateSprites();
    } else {
      this.units--;
      const outcome = this.battle(territory);
      this.logBattle(outcome);
      this.animateBattle(outcome);
      console.log(outcome);
      let victory;
      if (outcome.winner === this.color) {
        if(players[territory.color].base.id === territory.id) {
          victory = `${this.color} Wins!`;
        }

        if(territory.base === "Fort") {
          players[this.color].forts = Object.assign(
            players[this.color].forts,
            {
              [territory.id]: territory,
            }
          );
          delete players[territory.color].forts[territory.id];
        }

        players[this.color].territories++;
        players[territory.color].territories--;
        territory.moveIn(this.color, outcome.survivors);
        territory.removeSprites();
        this.moveSprites(territory);
        territory.updateSprites();
      } else {
        territory.moveThrough(outcome.survivors);
        territory.updateSprites();
      }
      this.moveOut();
      this.updateSprites();
      return victory;
    }
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

  animateBattle(battle) {
    this.sandboxStage = new createjs.Stage("sandbox-canvas");
    const data = DICE_SPRITE_DATA["Blue"];
    const spriteSheet = new createjs.SpriteSheet(data);
    const animation = new createjs.Sprite(spriteSheet, "one");
    animation.x = 0;
    animation.y = 0;

    this.sandboxStage.addChild(animation);
  }
}

module.exports = Territory;
