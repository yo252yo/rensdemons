# Ren's Devils engine manual

- [Ren's Devils engine manual](#ren-s-devils-engine-manual)
  * [ABOUT](#ABOUT)
  * [WINNING THE DEMO](#WINNING-THE-DEMO)
  * [ENGINE DOCUMENTATION](#ENGINE-DOCUMENTATION)

## ABOUT

Ren's Devils is an upcoming game written in a custom js game engine for any computer/phone that runs a webbrowser. Its engine is accessible to anyone from the js console, or its code on github.

In addition to keeping the code clean, I thought I'd write this little guide for anyone curious. Also, it's probably **necessary to beat the demo**.

## WINNING THE DEMO

In the demo of Ren's Devils, you control different children in various cities in a desolate kingdom. You are stuck in a neverending cycle of pain and cruelty, as these children need to be sacrificed to the Goddess to protect the cities.

In order to beat the demo, you need to **break this cycle**. One option is of course to close the game and move away, but it's not very satisfactory, is it :)

Fortunately, this engine has a built-in solution to destroy all the demons and the suffering they cause in one go. You can trigger it from any js **console**, including the one at the top of the mountain, by calling the module **Wipe Inside Negativity** (W.I.N.). In js, it's done by **typing**:

`win()`

## DOCUMENTATION

The code is organized in modules (global singletons), here are a few example commands:

|                                               |                                   |
|-----------------------------------------------|-----------------------------------|
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
| **FOG**                                       |                                   |
| `FOG.stop();`                                 | Removes the fog                   |
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
| **PALETTE**                                   |                                   |
| `PALETTE.factory.make_new();`                 | Change color scheme               |
| `PALETTE.generate.pick_harmonized_palette();` | Change color scheme (harmonized)  |
| `PALETTE.generate.pick_random_palette();`     | Change color scheme (random)      |
|                                               |                                   |
|                                               |                                   |
| **DEBUG**                                     |                                   |
| `DEBUG.draw_grid();`                          | Draws a grid                      |
| `DEBUG.draw_hitboxes();`                      | Draws items hitboxes              |
| `DEBUG.allow_scroll();`                       | Allow browser scroll              |
| `DEBUG.run_faster();`                         | Increase movement speed           |
| `DEBUG.get_all_abilities();`                  | Change color scheme (random)      |
| `DEBUG.get_all_items();`                      | Change color scheme (random)      |
|                                               |                                   |
| **SPAWNING**                                  |                                   |
| `new S_Floor(375,1425,50,125);`               | New 50x125 floor at 375x1425      |
| `new S_SavePoint(225, 175);`                  | New save point at 225x175         |
| `new SBattle(100, 100, 'world/mummy');`       | New battle mystery object         |
| `new SE_event(20, 275, 'You find nothing');`  | New event mystery object          |
|                                               |                                   |
