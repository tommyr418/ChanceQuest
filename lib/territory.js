class Territory {
  constructor(id, adjacent, color, units) {
    this.id = id;
    this.adjacent = adjacent;
    this.color = color;
    this.units = units;
  }

  changeControl(color) {
    this.color = color;
  }

  isAdjacent(territory) {
    return this.adjacent.includes(territory.id);
  }

  isFriendly(territory) {
    return this.color === territory.color;
  }

  invade(territory) {
    if (this.units <= 1 || this.isFriendly(territory)
      || !this.isAdjacent(territory)) {
      alert("invalid move");
    }
  }
}

module.exports = Territory;
