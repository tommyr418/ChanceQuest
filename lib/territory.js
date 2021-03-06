// Color map is used to map tile color to unit color
const COLOR_MAP = {
  "Blue": "DeepSkyBlue",
  "Red": "LightCoral",
  "Bisque": "Bisque",
  "Black": "DimGray",
};

//Territory serves as the basic unit object of Chance Quest.
//It will hold all the data for the game to run properly.
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

//moveOut, moveIn, and moveThrough are provide the main interactions
//between territories

  //empties the territory except 1 unit;
  moveOut() {
    this.units = 1;
    this.text.text = this.units.toString();
  }

  //will redraw graphic based on the outcome of a battle
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

  //rallying units of the same color
  moveThrough(units) {
    this.units = units;
    this.text.text = this.units.toString();
  }

  battle(territory) {
    //the result object is returned with all battle data
    const result = {
      attacker: this.color,
      defender: territory.color,
      initialAttackers: this.units,
      initialDefenders: territory.units,
      log: [],
      winner: "",
      survivors: 0,
    };

    //calls the roll function and copares each roll
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

    //record winner, units remaining and return the result
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

  //simulate dice rolls
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
      times += 1;
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

  move(territory, players, sandbox, skipAnimation) {
    if (territory.color === "Bisque") {
      if(territory.base === "Fort") {
        players[this.color].addFort(territory);
      }

      createjs.Sound.play("March");
      players[this.color].territories++;
      territory.moveIn(this.color, this.units - 1);
      this.moveOut();
      this.moveSprites(territory);
    } else if (territory.color === this.color) {
      createjs.Sound.play("March");
      territory.moveThrough((this.units - 1 + territory.units));
      this.moveOut();
      this.moveSprites(territory);
    } else {
      this.units--;
      createjs.Sound.play("Combat");
      const outcome = this.battle(territory);

      if(!skipAnimation) {
        sandbox.animateBattle(outcome);
      }

      let victory;
      if (outcome.winner === this.color) {
        if(territory.base === "Fort") {
          players[this.color].addFort(territory);
        }

        if(players[territory.color]) {
          if(players[territory.color].base.id === territory.id) {
            victory = `${this.color} Wins!`;
          }

          if(territory.base === "Fort"){
            delete players[territory.color].forts[territory.id];
          }

          players[territory.color].territories--;
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
      return victory;
    }
  }
}

module.exports = Territory;
