
new CenteredBattleImage("assets/battles/encounters/rubble.png", 'background', 2);


var dig = "Dig";

PLAYER_ACTIONS.allow_flight(true);

if (SPECIALBATTLES._battle_extra_data){
  PLAYER_ACTIONS.add({
    name: dig,
    unlock: true,
    description: [
      "You dig through the debris. After a while, you find something interesting. It's a " + SPECIALBATTLES._battle_extra_data + ".",
    ],
    outcome: BATTLETREE.WIN,
    give_item: SPECIALBATTLES._battle_extra_data,
  });
} else{
  PLAYER_ACTIONS.add({
    name: dig,
    unlock: true,
    description: [
      "You dig through the debris. It takes a long time, and you don't find anything noteworthy...",
    ],
    outcome: BATTLETREE.WIN,
  });
}

PLAYER_ACTIONS.add({
  name: ITEM.Elixir_fire,
  description: [
    "You burn it all to the ground to the ground without a second thought.",
  ],
  outcome: BATTLETREE.WIN,
  consume_item: ITEM.Elixir_fire,
});

PLAYER_ACTIONS.add({
  name: ITEM.Stone,
  description: [
    "You add a stone to the pile of debris. It makes the pile slightly bigger.",
  ],
  outcome: BATTLETREE.WIN,
  consume_item: ITEM.Stone,
});

PLAYER_ACTIONS.add({
  name: ITEM.Mace,
  description: [
    "You crush the pile of debris until only a thin powder is left. Not much you can do with that.",
  ],
  outcome: BATTLETREE.WIN,
});


PLAYER_ACTIONS.add({
  name: ABILITY.Shrink,
  description: [
    "You shrink the pile of debris to a minuscule size. Whatever might have been in there is now too small to see.",
  ],
  outcome: BATTLETREE.WIN,
});


BATTLE.operations.start("You find a pile of rubble and debris.");
