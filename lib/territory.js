const COLOR_MAP = {
  "Blue": "DeepSkyBlue",
  "Red": "LightCoral",
  "Bisque": "Bisque"
};

class Territory {
  constructor(id, adjacent, x, y, units, color) {
    this.id = id;
    this.adjacent = adjacent;
    this.x = x;
    this.y = y;
    this.units = units;
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
      .beginStroke("black")
      .beginFill(this.background)
      .drawPolyStar(this.x, this.y, 50, 6, 0, 0);
    this.units = units;
    this.text.text = this.units.toString();
    this.text.color = this.color;
  }

  moveThrough(units) {
    this.units = units;
    this.text.text = this.units.toString();
  }

  battle(territory) {
    const result = {
      log: [],
      winner: "",
      survivors: 0,
    };

    while(this.units && territory.units) {
      const battle = {

      };
    }
  }

  roll(units) {
    const rolls = [];
    let times;
    if (units > 2) {
      times = 3;
    } else if (units > 1) {
      times = 2;
    } else {
      times = 1;
    }

    for (var i = 0; i < times; i++) {
      rolls.push(1 + Math.floor(Math.random() * 6));
    }

    return rolls.sort((a, b) => (b - a));
  }

  move(territory) {
    if (this.id === territory.id) {
      alert("Can't move to own square");
      return;
    }
    if (!this.isAdjacent(territory)) {
      alert("You can only move to adjacent squares");
      return;
    }
    if (this.units <= 1) {
      alert("You need more than one unit to move");
      return;
    }
    if (territory.color === "Bisque") {
      territory.moveIn(this.color, this.units - 1);
      this.moveOut();
    } else if (territory.color === this.color) {
      territory.moveThrough(this.units);
      this.moveOut();
    }
  }
}

module.exports = Territory;
