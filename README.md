# Chance Quest

A game loosely based on the [Risk](https://en.wikipedia.org/wiki/Risk_(game)) board game in which a player tries to take over all territories on a game map. Players have limited troops that are distributed throughout the territories that they control. Players can attack adjacent territories as long as they have the troops. Battle outcomes are determined by dice roll.

## Rules

1. Players start with a base that is marked with a Star and some starting troops(3 for blue going first, 4 for red going second).

2. Players can move all but one of their units to an adjacent territory attempting to take it over. Most territories are empty by default. Players must fight for territories that are already controlled.

3. Battle is determined by dice roll. Both sides get to roll dice equal to the amount of units that are taking part of the battle(up to 3 for attacker up to 2 for defender). Dice rolls are compared from highest to lowest. Each time the dice is compared the side with the lower side loses an unit. Ties result int the attacker losing an unit.

Examples:

Attacker|Defender|Result
-|-|-
6,4,2|3,2|defender loses 2 units
1,1,1|2,2|attacker loses 2 units
4,3,1|4,3|attacker loses 2 units
6,2,1|5,2|each lose 1 unit

4. A player wins if he or she takes over the enemy base

## Wireframes

The game will consist of a primary game board with a panels on the side displaying the amount of troops each player has.

## Technologies

This project will be implemented with the following technologies:

1. JavaScript
2. Canvas

## Implementation Timeline

Day 1: Setup the node modules and webpack. Work on getting the entry file ready. Work on game board territories game logic.

Day 2: Finish up any game board logic. Begin rendering.

Day 3: Finish up game rendering and integrate with the logic.
