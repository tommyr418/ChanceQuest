class Player {
  constructor(id, color, base, x, y) {
    this.id = id;
    this.color = color;
    this.base = base;
    this.territories = 1;
    this.x = x;
    this.y = y;
  }

  recruit() {
    this.base.units = this.base.units + 3;
    this.base.text.text = this.base.units.toString();
  }
}

module.exports = Player;
