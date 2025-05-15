# 7D Mad Rogue Kart
7D Mad Rogue Kart is a rogue-like, turn-based kart racing game, build in one week during the 7DRL 2023. Your goal is to finish first, while racing against characters you might be familiar with. ;)

You can also throw some obstacles in their way - but be aware: You are not the only one with this ability...

7D Mad Rogue Kart uses a custom engine, based on SFML. :)

## Key Mapping
| Key | Alternative | Action |
|---|---|---|
| W | Arrow Up | Move Cursor Up |
| A | Arrow Left | Move Cursor Left |
| S | Arrow Down | Move Cursor Down |
| D | Arrow Right | Move Cursor Right |
| B | - | Enter Placement Mode* |
| N | - | Exit Placement Mode* |
| Return | Spacebar | Confirm Action |
| Numpad + | F2 | Zoom In |
| Numpad - | F3 | Zoom Out |

\* (only valid if an item is available)

## Start
After starting the game, you are thrown into the player selection mode, where you should pick your player. Confirm your selection, and you are ready to go!

## Config
The root folder inclues a `config.ini`, where some settings can be changed:

Setting | Default Value | Comment
---|---|---
ResolutionWidth | 1280 | -
ResolutionHeight | 720 | -
EnableVSync | true | -
Mod | default | -
Seed | -1 | When set to -1, the total amount of seconds that have been passed since midnight are being used as the seed.
MapSize | 128 | I would rather not recommend messing with that setting... But I won't stop you, either.