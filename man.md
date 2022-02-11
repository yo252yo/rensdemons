# Ren's Demons engine manual

- [Ren's Demons engine manual](#ren-s-demons-engine-manual)
  * [ABOUT](#ABOUT)
  * [WINNING](#WINNING)
  * [DOCUMENTATION](#DOCUMENTATION)
  * [MAKING OTHER WORLDS](#MAKING-OTHER-WORLDS)

## ABOUT

Ren's Demons is a game written in a custom js game engine for any computer/phone that runs a web browser. Its engine is accessible to anyone from the js console, or its code on github.

In addition to keeping the code clean, I thought I'd write this little guide for anyone curious. Also, it's probably **necessary to beat the demo** or to get some endings.

## WINNING

In the demo or in the main game, you control children stuck in a neverending cycle of pain and cruelty. In order to beat the game, you need to **break this cycle** and free the characters. It appears that you cannot do that from inside the universe of the game. You're gonna have to think outside the box[^1].

### Removing suffering

You can manipulate the game from the js console. This game engine has a built-in solution to destroy all the demons and the suffering they cause in one go. You can trigger it from any js **console**, including the one in the game, by calling the module **Wipe Internal Negativity** (W.I.N.). In js, it's done by **typing**:

`win();`

### Bricking

You can also prevent the suffering of the characters by **stoppping** the game engine and making sure the game is not able to run anymore. This solution is more **permanent**. The game won't be able to run, and therefore won't create any more suffering children. You can do that with the command:

`DISK.corrupt();`

> WARNING: As the name indicates, it will **corrupt all the content of the disk beyond repair**. The characters will be free, but your save will NOT be recoverable. The only thing you can do after this is `DISK.hard_reset()`;

## DOCUMENTATION

If you feel like creating new universes or adventures, I've done my best to make this code clean. This engine is completely open source. Feel free to download it for yourself (it's also included in the game).

It is organized in modules (global singletons), here are a few example commands:

|                                               |                                   |
|-----------------------------------------------|-----------------------------------|
|                                               |                                   |
| `win();`                                      | Wipe Internal Negativity          |
| `man();`                                      | Opens this page                   |
|                                               |                                   |
| **INVENTORY**                                 |                                   |
| `INVENTORY.increase(ITEM.Coin, 100);`         | Give yourself items               |
|                                               |                                   |
|                                               |                                   |
| **ABILITY**                                   |                                   |
| `ABILITIES.unlock(ABILITIES.Fireball);`       | Unlock abilities                  |
|                                               |                                   |
|                                               |                                   |
| **MARTYRDOM**                                 |                                   |
| `MARTYRDOM.death(100);`                       | More martyrdom points             |
|                                               |                                   |
|                                               |                                   |
| **PARTY**                                     |                                   |
| `PARTY.add(PARTYMEMBERS.BestFriend);`         | Add people to the party           |
|                                               |                                   |
|                                               |                                   |
| **CHARACTER**                                 |                                   |
| `CHARACTER.initialize(x, y);`                 | Puts character at position (x,y)  |
|                                               |                                   |
|                                               |                                   |
| **CURRENTLEVEL**                              |                                   |
| `CURRENTLEVEL.setup("demo/church");`          | Change level                      |
|                                               |                                   |
|                                               |                                   |
| **BATTLE**                                    |                                   |
| `BATTLE.api.make('_demo/_priest');`           | Start battle                      |
|                                               |                                   |
|                                               |                                   |
| **SPAWNING**                                  |                                   |
| `new S_Floor(375,1425,50,125);`               | New 50x125 floor at 375x1425      |
| `new S_SavePoint(225, 175);`                  | New save point at 225x175         |
| `new SBattle(100, 100, 'world/mummy');`       | New battle mystery object         |
| `new SE_event(20, 275, 'You find nothing');`  | New event mystery object          |
|                                               |                                   |

### DEBUGGING

You're also welcome to use the game-breaking features I implemented to make development easy or to give the player godlike powers at some point of their adventure[^2]:

|                                               |                                   |
|-----------------------------------------------|-----------------------------------|
|                                               |                                   |
| **DEBUG**                                     |                                   |
| `DEBUG.draw_grid();`                          | Draws a grid                      |
| `DEBUG.draw_hitboxes();`                      | Draws items hitboxes              |
|                                               |                                   |
| **THAUMATURGY**                               |                                   |
| `THAUMATURGY.run_faster();`                   | Increase movement speed           |
| `THAUMATURGY.activate_teleport();`            | Replace movement by teleportation |
|                                               |                                   |
| `THAUMATURGY.change_colors();`                | Change color scheme               |
| `THAUMATURGY.glitch();`                       | Triggers a glitch                 |
| `THAUMATURGY.remove_fog();`                   | Remove the fog                    |
| `THAUMATURGY.remove_camera_lock();`           | Allow browser scroll              |
|                                               |                                   |
| `THAUMATURGY.get_all_items();`                | Get all items                     |
| `THAUMATURGY.get_all_abilities();`            | Get all abilities                 |
| `THAUMATURGY.get_all_party_members();`        | Get all party members             |
|                                               |                                   |


### GETTING STARTED

You can tweak the existing game as much as you'd like. You could look into the code for the bad monsters, for instance. There would be a lot less suffering without the Goddess, the Demon Lord, Battles or ConsciousObject... Of course, some tweaks will break the game.[^3]

Better yet, you can use the engine and make a totally new universe! I trust that the game provides enough examples to help you get started, especially with the syntax explanation above. Look at the `levels/` and `battles/` subfolders. Maybe this is the only way to a true happy end, where the cycle of suffering is transcended by a game world where characters are happy! Go and be your own god!


[^1]: It is unclear whether or not this page is part of the game. This section probably is, though.
[^2]: Prehaps right now, when you're reading this.
[^3]: But maybe it deserves to be broken.
