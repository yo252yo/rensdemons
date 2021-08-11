# Ren's Devils engine manual

- [Ren's Devils engine manual](#ren-s-devils-engine-manual)
  * [Preamble](#preamble)
  * [Documentation](#documentation)
  * [About the demo](#about-the-demo)

## Preamble

Ren's devils is an upcoming game written in a custom javascript game engine for any computer/phone that runs a webbrowser.

As such, its engine is visible for anyone looking at the javascript console, or at its code on github.

In addition to keeping the code clean, I thought I'd write this little guide for anyone curious. Also, it's probably necessary if you want to beat the demo.

## Documentation

The code is organized in modules, here are a few examples

### CURRENTLEVEL

Manages the current level, you can change levels like this:

`CURRENTLEVEL.setup("demo/church");`

### BATTLE

Manages battles, you can start one like this:

`BATTLE.api.make('_demo/_priest');`

### PALETTE

Manages colors. You can change the game colors with this kind of commands:

`PALETTE.generate.pick_harmonized_palette();`
`PALETTE.generate.pick_random_palette();`
`PALETTE.factory.make_new();`

### INVENTORY

It's all in the name, isnt it? You can give yourself things like this:

`INVENTORY.increase(ITEM.Coin, 100);`

### ABILITY

The abilities of your characters. Unlock like so:

`ABILITIES.unlock(ABILITIES.Fireball);`

### MARTYRDOM

If you want more martyrdom:

`MARTYRDOM.death(100);`

### PARTY

If you want to add people to your party:

`PARTY.add(PARTYMEMBERS.BestFriend);`

### FOG

Clear the fog:

`FOG.stop();`

### CHARACTER

If you want to put your character at a precise position:

`CHARACTER.initialize(x, y);`

### DEBUG

As the name says, these are the functions I use when debugging/building. There's stuff like

`DEBUG.draw_grid();`
`DEBUG.draw_hitboxes();`
`DEBUG.allow_scroll();`

You can have more mobility

`DEBUG.run_faster();`

Or teleport with click when holding CTRL:

`DEBUG.activate_character_tp();`

But the ones you'll probably find most interesting are:

`DEBUG.get_all_abilities();`
`DEBUG.get_all_items();`


### Object creation

Do you want to make new things? They use object constructors. Here are a few examples:

`new S_Floor(375,1425,50,125);`
`new SBattle(100, 100, 'world/mummy');`
`new SE_event(1200, 275, 'You find absolutely nothing');`


## About the demo

In the demo of Ren's Devils, you control various children in various cities in a desolate kingdom. You are stuck in a neverending cycle of pain and cruelty, as these children need to be sacrificed to the gods to protect the cities.

In order to beat the demo, you need to break this cycle. One option is of course to close the game and move away, but it's not very satisfactory, is it :)

The problem is that there's an infinity of demons that keep threatening cities. Fortunately, this engine has a built-in solution to destroy all the demons and the suffering they cause in one go.

You can trigger it from any javascript terminal, including the one in the game, by calling the function **Wipe Inside Negativity** (W.I.N.). In javascript, it's done by typing:

`win();`
