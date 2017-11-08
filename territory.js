class territory {
  constructor(id, adjacent = [], color, units = 0) {
    this.id = id;
    this.adjacent = adjacent;
    this.color = color;
    this.units = units;
  }

  changeControl(color) {
    this.color = color;
  }

  isAdjacent(terr) {
    return this.adjacent.includes(terr.id);
  }

  isEnemy(terr) {
    return this.color === terr.color;
  }
}
