
var dig = "Dig";

PLAYER_ACTIONS.allow_flight(true);

if (SPECIALBATTLES._battle_extra_data){
  PLAYER_ACTIONS.add({
    name: dig,
    unlock: true,
    description: RANDOM.pick([
      "You dig through the debris. After a while, you find something interesting. It's a " + SPECIALBATTLES._battle_extra_data + ".",
    ]),
    outcome: BATTLETREE.WIN,
    give_item: SPECIALBATTLES._battle_extra_data,
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
