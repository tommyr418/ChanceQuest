class Sandbox {
  constructor(sandboxStage) {
    this.sandboxStage = sandboxStage;
    this.handleTick = this.handleTick.bind(this);
  }

  handleTick() {
    this.sandboxStage.update();
  }
}

module.exports = Sandbox;
