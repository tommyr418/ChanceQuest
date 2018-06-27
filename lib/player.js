class Player {
  constructor(id, color, base, x, y) {
    this.id = id;
    this.color = color;
    this.base = base;
    this.territories = 1;
    this.x = x;
    this.y = y;
    this.forts = {};
  }

  recruit() {
    this.base.units += (1 + (Math.floor(this.territories / 3) + Object.keys(this.forts).length));
    this.base.text.text = this.base.units.toString();
    Object.values(this.forts).forEach((fort) => {
      fort.units += 1;
      fort.text.text = fort.units.toString();
    });
  }

  addFort(territory) {
    this.forts = Object.assign(
      this.forts,
      {
        [territory.id]: territory,
      }
    );
  }
}

module.exports = Player;
