const Territory = require("./territory");
const Player = require("./player");

const SPRITE_DATA = {
  "Blue": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      stand:8,
      run:[1,3, "run"],
    }
  },
  "Red": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      stand:22,
      run:[15,17, "run"],
    }
  },
  "Black": {
    images: ["./assets/images/soldier.png"],
    frames: {width:24.57, height:40},
    animations: {
      stand:358,
      run:[351,353, "run"],
    }
  },
};

const BASIC_MAP = {
  1: new Territory(1, [2,7], 425, 173.2, 4, "Red", "Base"),
  2: new Territory(2, [1,3,7], 350, 216.5, 0, "Bisque"),
  3: new Territory(3, [2,4], 350, 303.1, 0, "Bisque"),
  4: new Territory(4, [3,5], 425, 346.4, 0, "Bisque"),
  5: new Territory(5, [4,6], 425, 433, 0, "Bisque"),
  6: new Territory(6, [5,10], 425, 519.6, 3, "Blue", "Base"),
  7: new Territory(7, [1,2,8], 350, 129.9, 0, "Bisque"),
  8: new Territory(8, [7,9], 275, 86.6, 0, "Bisque"),
  9: new Territory(9, [8], 200, 129.9, 0, "Bisque", "Fort"),
  10: new Territory(10, [6,11], 350, 562.9, 0, "Bisque"),
  11: new Territory(11, [10,12], 275, 519.6, 0, "Bisque"),
  12: new Territory(12, [11], 200, 476.3, 0, "Bisque", "Fort"),
};

const MAP = {
  1: new Territory(1, [2,14,15], 425, 173.2, 4, "Red", "Base"),
  2: new Territory(2, [1,3,15], 350, 216.5, 0, "Bisque"),
  3: new Territory(3, [2,4,22], 350, 303.1, 0, "Bisque"),
  4: new Territory(4, [3,5,7], 425, 346.4, 0, "Bisque"),
  5: new Territory(5, [4,6], 425, 433, 0, "Bisque"),
  6: new Territory(6, [5,28], 425, 519.6, 3, "Blue", "Base"),
  7: new Territory(7, [4,8,9], 500, 303.1, 0, "Bisque"),
  8: new Territory(8, [7,9,10,11], 575, 259.8, 0, "Bisque"),
  9: new Territory(9, [7,8,10], 575, 346.4, 0, "Bisque"),
  10: new Territory(10, [8,9,11,30], 650, 303.1, 3, "Black", "Fort"),
  11: new Territory(11, [8,10,12], 650, 216.5, 0, "Bisque"),
  12: new Territory(12, [11,13], 650, 129.9, 3, "Black"),
  13: new Territory(13, [12,14], 575, 86.6, 0, "Bisque"),
  14: new Territory(14, [1,13], 500, 129.9, 0, "Bisque"),
  15: new Territory(15, [1,2,16], 350, 129.9, 0, "Bisque"),
  16: new Territory(16, [15,17], 275, 86.6, 0, "Bisque"),
  17: new Territory(17, [16,18,19], 200, 129.9, 0, "Bisque", "Fort"),
  18: new Territory(18, [17,19], 125, 86.6, 0, "Bisque"),
  19: new Territory(19, [17,18,20], 125, 173.2, 0, "Bisque"),
  20: new Territory(20, [19,21,23], 125, 259.8, 0, "Bisque"),
  21: new Territory(21, [20,22,23], 200, 303.1, 0, "Bisque"),
  22: new Territory(22, [3,21], 275, 346.4, 0, "Bisque"),
  23: new Territory(23, [20,21,24], 125, 346.4, 0, "Bisque"),
  24: new Territory(24, [23,25,29], 125, 433, 0, "Bisque"),
  25: new Territory(25, [24,26,29], 125, 519.6, 0, "Bisque"),
  26: new Territory(26, [25,27,29], 200, 562.9, 0, "Bisque"),
  27: new Territory(27, [26,28,29], 275, 519.6, 0, "Bisque"),
  28: new Territory(28, [6,27], 350, 562.9, 0, "Bisque"),
  29: new Territory(29, [24,25,26,27], 200, 476.3, 0, "Bisque", "Fort"),
  30: new Territory(30, [10,31], 725, 346.4, 0, "Bisque"),
  31: new Territory(31, [30], 725, 433, 0, "Bisque", "Stronghold"),
};

const TUTORIAL_DIALOG = {
  1: "Hi, Welcome to Chance Quest. You are in control of BLUE kingdom." +
     " Lets begin by selecting a tile containing your units.",
  2: "Very good! As you can see your units are on the march. You can" +
     " now select a tile adjacent to the current tile. For now choose the" +
     " lower left adjacent tile.",
  3: "Nice Job! As you can see you will automatically move all but one of" +
     " your units to the new tile. For that reason you can only choose tiles" +
     " that contain more than one unit when moving. Go ahead and make another move.",
  4: "Good! As per usual pick an adjacent tile",
  5: "Now you have run out of valid moves. Only thing to do left is to end your" +
     " turn. Click the End turn button to the right.",
  6: "When you end your turn, you will automatically recruit units for your main base." +
     " You will always get at least one unit." +
     " You will also get one more for every three of your territories. Click" +
     " OK then any tile to continue.",
  7: "It is now red's turn. Wait until he finishes his moves.",
  8: "All done! Red has taken over a territory with a circle in it. These special" +
     " tiles represent forts. In addtion to adding to your territory count," +
     " forts will recruit an additional unit at the location upon ending the turn." +
     " Click End Turn again to continue.",
  9: "It's probably a good idea for you to take a fort also. Lets start by selecting" +
     " a tile.",
  10: "It is possible to move units from one of your territories to another. Remember" +
      " that you always leave one unit behind when you do this. However, our goal is" +
      " to take a fort. Go ahead and click the tile with the circle.",
  11: "You were able to move directly from your base to the fort because there is a" +
      " direct path of controlled territories to and from the two locations. Let's see" +
      " it in action again. Make another move.",
  12: "Use the direct pathing to move to the tile above your base",
  13: "Once again you are out of moves. Click end turn just like before.",
  14: "This time red has enough units to attack you. Be prepared. Click any tile when you are ready",
  101: "Not quite. Remember you are controling BLUE.",
  102: "No! You need to choose an ADJACENT tile.",
  103: "Nice Try! Normally this would be a valid move; but for this case," +
       " please pick the OTHER ADJACENT tile.",
  104: "Please choose a BLUE tile with MORE THAN ONE unit.",
  105: "We are looking for a empty fort, a BEIGE tile with a CIRCLE in it.",
  106: "Click the tile above your base.",
};

class Map {
  constructor(sandbox, mapStage, tutorialMode) {
    this.sandbox = sandbox;
    this.mapStage = mapStage;
    this.tutorialMode = tutorialMode;

    if(this.tutorialMode) {
      this.board = BASIC_MAP;
      this.showTutorialDialog(this.tutorialMode);
      const cloud = document.getElementById("cloud");
      cloud.classList.remove("close");
    } else {
      this.board = MAP;
    }

    this.players = {
      "Blue": new Player(1, "Blue", this.board[6], 100, 175),
      "Red": new Player(2, "Red", this.board[1], 100, 225),
    };
    this.currentPlayer = this.players["Blue"];


    this.handleClick = this.handleClick.bind(this);
    this.handleClickTutorial = this.handleClickTutorial.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleTick = this.handleTick.bind(this);

    this.selected = 0;
    this.mapTerritories();
  }

  alert(string) {
    const contentDiv = document.getElementById("dialog-content");
    contentDiv.textContent = string;
    const alert = document.getElementById("alert");
    alert.classList.remove("close");
  }

  handleClick(e) {
    console.log(e.currentTarget.id);
    if(this.selected) {
      if (this.selected === e.currentTarget.id) {
        this.deSelect();
        return;
      }

      if (!this.hasPath(
        this.board[this.selected],
        this.board[e.currentTarget.id]
      )) {
        this.alert("Please choose a tile that's adjacent or you have a direct path to.");
        return;
      }

      const victory = this.board[this.selected].move(
        this.board[e.currentTarget.id],
        this.players, this.sandbox
      );

      if(victory) {
        this.alert(victory);
      }

      this.deSelect();
    } else {
      if (this.currentPlayer.color !== this.board[e.currentTarget.id].color) {
        this.alert("Please select your own units to move");
        return;
      }
      if (this.board[e.currentTarget.id].units === 1) {
        this.alert("You need more than one unit to move");
        return;
      }
      this.selected = e.currentTarget.id;
      this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
        sprite.gotoAndPlay("run");
      });
    }
  }

  handleMouseOver(e) {
    if(e.currentTarget.alpha !== 0.7) {
      e.currentTarget.alpha = 0.7;
    }
  }

  handleMouseOut(e) {
    if(this.selected !== e.currentTarget.id && e.currentTarget.alpha !== 0.3) {
      e.currentTarget.alpha = 0.3;
    }
  }

  swapPlayer() {
    this.currentPlayer = (this.currentPlayer.color === "Blue")
    ?
    this.players["Red"]
    :
    this.players["Blue"];
  }

  deSelect() {
    if(this.selected) {
      this.board[this.selected].hexagon.alpha = 0.3;
      this.board[this.selected].spriteArr.forEach((sprite) => {
        sprite.gotoAndStop("stand");
      });
      this.selected = 0;
    }
  }

  hasPath(from, to, visited = []) {
    if(from.isAdjacent(to)) {
      return true;
    }
    const possiblePath = [];
    from.adjacent.forEach((adjacentId) => {
      if(!visited.includes(adjacentId) &&
        from.isFriendly(this.board[adjacentId])) {
        possiblePath.push(this.board[adjacentId]);
      }
    });

    visited.push(from.id);

    if (possiblePath.length === 0) {
      return false;
    }

    for (var i = 0; i < possiblePath.length; i++) {
      if (this.hasPath(possiblePath[i], to, visited)) {
        return true;
      }
    }

    return false;
  }

  handleClickTutorial(e) {
    console.log(e.currentTarget.id);
    if (this.tutorialMode === 1) {
      if (e.currentTarget.id === 6) {
        this.selected = e.currentTarget.id;
        this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
          sprite.gotoAndPlay("run");
        });
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(101);
      }
    } else if (this.tutorialMode === 2) {
      if (e.currentTarget.id === 10) {
        this.board[this.selected].move(
          this.board[e.currentTarget.id],
          this.players, this.sandbox
        );
        this.deSelect();
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else if (e.currentTarget.id === 5) {
        this.showTutorialDialog(103)
      } else {
        this.showTutorialDialog(102);
      }
    } else if (this.tutorialMode === 3) {
      if (e.currentTarget.id === 10) {
        this.selected = e.currentTarget.id;
        this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
          sprite.gotoAndPlay("run");
        });
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(104);
      }
    } else if (this.tutorialMode === 4) {
      if (e.currentTarget.id === 11) {
        this.board[this.selected].move(
          this.board[e.currentTarget.id],
          this.players, this.sandbox
        );
        this.deSelect();
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(102);
      }
    } else if (this.tutorialMode === 6) {
      this.tutorialMode++;
      this.showTutorialDialog(this.tutorialMode);
      setTimeout(() => {
        this.board[1].move(
          this.board[7],
          this.players, this.sandbox
        );
      }, 500);
      setTimeout(() => {
        this.board[7].move(
          this.board[8],
          this.players, this.sandbox
        );
      }, 1000);
      setTimeout(() => {
        this.board[8].move(
          this.board[9],
          this.players, this.sandbox
        );
      }, 1500);
      setTimeout(() => {
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      }, 2000);
    } else if (this.tutorialMode === 9) {
      if (e.currentTarget.id === 6) {
        this.selected = e.currentTarget.id;
        this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
        sprite.gotoAndPlay("run");
      });
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(104);
      }
    } else if (this.tutorialMode === 10) {
      if (e.currentTarget.id === 12) {
        this.board[this.selected].move(
          this.board[e.currentTarget.id],
          this.players, this.sandbox
        );
      this.deSelect();
      this.tutorialMode++;
      this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(105);
      }
    } else if (this.tutorialMode === 11) {
      if (e.currentTarget.id === 12) {
        this.selected = e.currentTarget.id;
        this.board[e.currentTarget.id].spriteArr.forEach((sprite) => {
        sprite.gotoAndPlay("run");
      });
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(104);
      }
    } else if (this.tutorialMode === 12) {
      if (e.currentTarget.id === 5) {
        this.board[this.selected].move(
          this.board[e.currentTarget.id],
          this.players, this.sandbox
        );
      this.deSelect();
      this.tutorialMode++;
      this.showTutorialDialog(this.tutorialMode);
      } else {
        this.showTutorialDialog(106);
      }
    } else if (this.tutorialMode === 14) {
      this.tutorialMode++;
      this.showTutorialDialog(this.tutorialMode);
      setTimeout(() => {
        this.board[9].move(
          this.board[1],
          this.players, this.sandbox
        );
      }, 500);
      setTimeout(() => {
        this.board[1].move(
          this.board[2],
          this.players, this.sandbox
        );
      }, 1000);
      setTimeout(() => {
        this.board[2].move(
          this.board[3],
          this.players, this.sandbox
        );
      }, 1500);
      setTimeout(() => {
        this.board[3].move(
          this.board[4],
          this.players, this.sandbox
        );
      }, 2000);
      setTimeout(() => {
        this.board[4].move(
          this.board[5],
          this.players, this.sandbox
        );
      }, 2500);
      setTimeout(() => {
        this.tutorialMode++;
        this.showTutorialDialog(this.tutorialMode);
      }, 3000);
    }
  }

  showTutorialDialog(step) {
    const contentDiv = document.getElementById("tutorial-dialog-content");
    contentDiv.textContent = TUTORIAL_DIALOG[step];
  }

  //mapTerritories takes the data from board and creates the graphical elements
  mapTerritories() {
    const allTerritories = Object.values(this.board);

    allTerritories.forEach((territory) => {

      //draws the hexagon for each tile
      const hexagon = this.generateHexagon(territory);
      territory.setHexagon(hexagon);
      this.mapStage.addChild(hexagon);

      //draws the number reber representing the unit count
      const text = this.generateText(territory);
      this.mapStage.addChild(text);

      //draws all the staring sprites on the tiles
      const spriteArr = [];
      let i = territory.units;
      while (i > 0) {
        const sprite = this.generateSprite(territory);

        spriteArr.push(sprite);
        this.mapStage.addChild(sprite)
        i--;
      }

      territory.spriteArr = spriteArr;
    });
  }

  generateHexagon(territory) {
    const hexagon = new createjs.Shape();
    hexagon.graphics.beginStroke("Black")
    .beginFill(territory.background)
    .drawPolyStar(territory.x, territory.y, 50, 6, 0, 0);

    //draws the circle or star for forts and bases
    if (territory.base === "Base") {
      hexagon.graphics.endFill()
      .beginStroke("Black")
      .drawPolyStar(territory.x, territory.y, 50, 6, 0.5, 0);
    } else if (territory.base === "Fort") {
      hexagon.graphics.endFill()
      .beginStroke("Black")
      .drawCircle(territory.x, territory.y, 25);
    }

    hexagon.cursor = "pointer";
    hexagon.alpha = 0.3;
    hexagon.id = territory.id;
    hexagon.on("mouseover", this.handleMouseOver);
    hexagon.on("mouseout", this.handleMouseOut);

    if(this.tutorialMode) {
      hexagon.on("click", this.handleClickTutorial);
    } else {
      hexagon.on("click", this.handleClick);
    }
    return hexagon;
  }

  generateText(territory) {
    const text = new createjs.Text(
      territory.units.toString(),
      "20px Arial",
      territory.color);
    text.x = territory.x;
    text.y = territory.y;
    text.textAlign = "center";
    text.textBaseline = "middle";
    territory.setText(text);
    if(text.text === "0") {
      text.visible = false;
    }

    return text;
  }

  generateSprite(territory) {
    const data = SPRITE_DATA[territory.color];
    const spriteSheet = new createjs.SpriteSheet(data);
    const sprite = new createjs.Sprite(spriteSheet, "stand");
    sprite.x = (Math.random() * -30) + territory.x;
    sprite.y = (Math.random() * -60) + territory.y;

    return sprite;
  }

  //Sorts the elements so that sprites appear on top in order of y coord before rendering
  handleTick() {
    this.mapStage.sortChildren((child1, child2) => {
      if (child1.y > child2.y) { return 1; }
      if (child1.y < child2.y) { return -1; }
      return 0;
    })
    this.mapStage.update();
  }

  // This method will add sprites to existing tiles when units are recruited
  addSprites() {
    const base = this.currentPlayer.base;
    const color = this.currentPlayer.color;

    while (base.spriteArr.length < base.units) {
      const sprite = this.generateSprite(base)

      base.spriteArr.push(sprite);
      this.mapStage.addChild(sprite);
    }

    Object.values(this.currentPlayer.forts).forEach((fort) => {
      const sprite = this.generateSprite(fort);

      fort.spriteArr.push(sprite);
      this.mapStage.addChild(sprite);
    });
  }
}

module.exports = Map;
