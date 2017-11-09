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
    this.changeColor(color);
  }

  changeColor(color) {
    this.color = color;
    this.background = COLOR_MAP[color];
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

  invade(territory) {
    if (this.units <= 1 || this.isFriendly(territory)
      || !this.isAdjacent(territory)) {
      alert("invalid move");
    }
  }
}

module.exports = Territory;
