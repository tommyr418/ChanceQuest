class Territory {
  constructor(id, adjacent = [], color = "white", units = 0) {
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

  isEnemy(territory) {
    return this.color === territory.color;
  }
}

module.exports = Territory;
