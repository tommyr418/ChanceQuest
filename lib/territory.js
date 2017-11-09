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

  move(territory) {
    if (this.id === territory.id) {
      alert("Invalid move");
    }
    if (this.units <= 1) {
      alert("You need more than one unit to move")
    }
    if (territory.color === "Bisque") {
      territory.setColor(this.color);
      territory.hexagon.graphics.clear()
        .beginStroke("black")
        .beginFill(territory.background)
        .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);
      territory.units = this.units - 1;
      territory.text.text = territory.units.toString();
      territory.text.color = territory.color;
      this.units = 1;
      this.text.text = this.units.toString();
    }
  }
}

module.exports = Territory;
