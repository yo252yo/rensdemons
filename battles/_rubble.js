
var dig = "Dig";

PLAYER_ACTIONS.add({
  name: ABILITY.Flee,
  description: RANDOM.pick([
    "You turn away, not doing anything for now.",
    "You think that the chance to find something good in this is not worth the effort.",
  ]),
  outcome: BATTLETREE.ESCAPE,
});

if (BATTLE.pending_text){
  PLAYER_ACTIONS.add({
    name: dig,
    unlock: true,
    description: RANDOM.pick([
      "You dig through the debris. After a while, you find something interesting. It's a " + BATTLE.pending_text + ".",
    ]),
    outcome: BATTLETREE.WIN,
    give_item: BATTLE.pending_text,
  });
} else{
  PLAYER_ACTIONS.add({
    name: dig,
    unlock: true,
    description: RANDOM.pick([
      "You dig through the debris. It takes a long time, and you don't find anything noteworthy...",
    ]),
    outcome: BATTLETREE.WIN,
  });
}

PLAYER_ACTIONS.add({
  name: ITEM.Elixir_fire,
  description: RANDOM.pick([
    "You burn it all to the ground to the ground without a second thought.",
  ]),
  outcome: BATTLETREE.WIN,
  consume_item: ITEM.Elixir_fire,
});

BATTLE.operations.start("You find a pile of rubble and debris.");
