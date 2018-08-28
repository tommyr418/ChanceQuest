const Map = require("./map.js");
const Game = require("./game.js");
const Sandbox = require("./sandbox.js");

document.addEventListener("DOMContentLoaded", () => {
  const chanceQuest = new ChanceQuest();
});

class ChanceQuest {
  constructor() {
    this.loadSounds();
    this.bindStart();
    this.bindTutorial();
    this.bindResume();
    this.bindEnd();
    this.bindMute();
  }

  bindStart() {
    const start1 = document.getElementById("start-1");
    start1.addEventListener("click", () => {
      createjs.Sound.stop();
      this.startGame(false, true);
      document.getElementById("main-menu").classList.add("close");
    });

    const start2 = document.getElementById("start-2");
    start2.addEventListener("click", () => {
      createjs.Sound.stop();
      this.startGame();
      document.getElementById("main-menu").classList.add("close");
    });
  }

  bindTutorial() {
    const tutorial = document.getElementById("tutorial");
    tutorial.addEventListener("click", () => {
      this.startGame(1);
      document.getElementById("main-menu").classList.add("close");
    });

    const video = document.getElementById("video-tutorial");
    video.addEventListener("click", () => {
      createjs.Sound.stop();
      document.getElementById("video-menu").classList.remove("close");
      document.getElementById("main-menu").classList.add("close");
    });

    const back = document.getElementById("return");
    back.addEventListener("click", () => {
      createjs.Sound.play("Menu");
      document.getElementById("video-menu").classList.add("close");
      document.getElementById("main-menu").classList.remove("close");
    });
  }

  bindResume() {
    const resume = document.getElementById("resume-game");
    resume.addEventListener("click", () => {
      document.getElementById("pause-menu").classList.add("close");

      if(this.map && this.map.tutorialMode) {
        document.getElementById("cloud").classList.remove("close");
      }
    });
  }

  bindEnd() {
    const end = document.getElementById("end-game");
    end.addEventListener("click", () => {
      this.endGame();
      createjs.Sound.play("Menu");
      document.getElementById("main-menu").classList.remove("close");
      document.getElementById("pause-menu").classList.add("close");
    });
  }

  bindMute() {
    const mute = document.getElementById("mute");
    mute.addEventListener("click", () => {
      if(!createjs.Sound.muted) {
        createjs.Sound.muted = true;
        mute.innerText = "Sound: OFF"
      } else {
        createjs.Sound.muted = false;
        mute.innerText = "Sound: ON"
      }
    });
  }

  endGame() {
    this.sandboxStage.removeAllChildren();
    this.mapStage.removeAllChildren();
    this.gameStage.removeAllChildren();
  }


  startGame(tutorialMode, computerOn) {
    this.sandboxStage = new createjs.Stage("sandbox-canvas");
    this.mapStage = new createjs.Stage("map-canvas");
    this.gameStage = new createjs.Stage("game-canvas");

    this.sandboxStage.enableMouseOver(20);
    this.mapStage.enableMouseOver(20);
    this.gameStage.enableMouseOver(20);

    this.sandbox = new Sandbox(this.sandboxStage);
    this.map = new Map(this.sandbox, this.mapStage, tutorialMode, computerOn);
    this.game = new Game(this.map, this.gameStage, tutorialMode, computerOn);

    createjs.Ticker.addEventListener("tick", this.game.handleTick);
    createjs.Ticker.addEventListener("tick", this.map.handleTick);
    createjs.Ticker.addEventListener("tick", this.sandbox.handleTick);

    createjs.Ticker.framerate = 5;
  }

  loadSounds() {
    const audioPath = "assets/sounds/";
    const sounds = [{id:"Menu", src:"menu.mp3"},
                    {id:"March", src:"march.mp3"},
                    {id:"Combat", src:"combat.mp3"}];
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", this.playMenuMusic);
    createjs.Sound.registerSounds(sounds, audioPath);
  }

  playMenuMusic() {
    createjs.Sound.play("Menu");
  }
}
