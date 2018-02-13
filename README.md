# Chance Quest

A game loosely based on the [Risk](https://en.wikipedia.org/wiki/Risk_(game)) board game in which a player tries to take over all territories on a game map. Players have limited troops that are distributed throughout the territories that they control. Players can attack adjacent territories as long as they have the troops. Battle outcomes are determined by dice roll.

[Live link](http://tommyren.me/ChanceQuest/)

## Rules

1. Players start with a base that is marked with a Star and some starting troops(3 for blue going first, 4 for red going second).

2. Players can move all but one of their units to an adjacent territory attempting to take it over. Most territories are empty by default. Players must fight for territories that are already controlled.

3. Battle is determined by dice roll. Both sides get to roll dice equal to the amount of units that are taking part of the battle(up to 3 for attacker up to 2 for defender). Dice rolls are compared from highest to lowest. Each time the dice is compared the side with the lower roll loses an unit. Ties result in the attacker losing an unit.

Examples:

Attacker|Defender|Result
-|-|-
6, 4, 2|3, 2|defender loses 2 units
1, 1, 1|2, 2|attacker loses 2 units
4, 3, 1|4, 3|attacker loses 2 units
6, 2, 1|5, 2|each lose 1 unit

4. Players will recruit new units based on the amount of territories they control at the end of their turn.

Main base(marked with star) | Forts(marked with circle)
-|-
1 unit(always)|1 unit(always)
1 unit for each 3 territories|
1 unit for each fort|

5. A player wins if he or she takes over the enemy base

## Layout

![Layout](/assets/images/layout.png)

Features a simple UI with a board game like feel.

## Technologies

This project was implemented with the following technologies:

1. JavaScript
2. Easel.JS (HTML 5 canvas)
4. CSS

## Features

1. 1 player or 2 player games

```
bindStart() {
  const start1 = document.getElementById("start-1");
  start1.addEventListener("click", () => {
    this.startGame(false, true);
    document.getElementById("main-menu").classList.add("close");
  });

  const start2 = document.getElementById("start-2");
  start2.addEventListener("click", () => {
    this.startGame();
    document.getElementById("main-menu").classList.add("close");
  });
}
```

Using a simple boolean to turn on ai and tutorial mode allows for different gameplay experiences without changing too much of the code. Conditional logic is used where needed to disable click event listeners, popup alerts and battle animations on the computer's turn in 1 player mode.

2. Computer AI

```
const AI_MOVES = [
  [1,15,16,17,1],
  [1,2,3,4,5,6],
  [1,14,13,12,11,10,1],
  [1,2,3,4,7,8,9,10,1],
  [1,2,3,22,21,23,24,29,1],
  [1,15,16,17,18,19,20,23,24,25,29,26,27,28,6]
];

playComputerTurn() {
  const moveArray = AI_MOVES[this.aIIndex];
  let delay = 1000;

  for (var i = 0; i < (moveArray.length - 1); i++) {
    const from = moveArray[i];
    const to = moveArray[i+1];

    setTimeout(() => {
      if(this.board[from].color === "Red" && this.board[from].units > 1) {
        this.board[from].move(
          this.board[to],
          this.players, this.sandbox, true
        );
      }
    }, delay);

    delay += 500;
  }

  this.aIIndex = Math.floor(Math.random() * AI_MOVES.length);

  return delay
}
```

Chance quest is a very objective based game so designing an AI was tough. Using a set of predesigned paths, the AI can select from a few logical moves at random and move units in sequence. The play moves method uses a Javascript closure to keep the variables from each iteration to make it possible.

3. Strong Object Oriented Design

```
generateSprite(territory) {
  const data = SPRITE_DATA[territory.color];
  const spriteSheet = new createjs.SpriteSheet(data);
  const sprite = new createjs.Sprite(spriteSheet, "stand");
  sprite.x = (Math.random() * -30) + territory.x;
  sprite.y = (Math.random() * -60) + territory.y;

  return sprite;
}
```

Everything in this game is made possible by organizing data into objects. In the above example, I created a sprite object to represent the pieces in a game of risk. Treating it as a representation of a physical object allows for pieces to be moved like a real board game.

## Future plans

1. Tutorial mode (in progress).
2. Game music.
3. Options menu to toggle pop-ups.
