class Player {
  constructor(id, color, base) {
    this.id = id;
    this.color = color;
    this.base = base;
    this.territories = 1;
  }

  recruit() {
    this.base.units = this.base.units + 3;
    this.base.text.text = this.base.units.toString();
  }
}

module.exports = Player;
