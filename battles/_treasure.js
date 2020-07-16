
new CenteredImage("assets/battles/treasure.png", 'background');

var open = "Open";

PLAYER_ACTIONS.add({
  name: ABILITY.Flee,
  description: [],
  outcome: BATTLETREE.ESCAPE,
  outcome_description:  RANDOM.pick([
    "You turn away, not taking the treasure for now.",
    "You move away from the chest without touching its content.",
    "You renounce your chance to claim this treasure.",
  ]),
});

PLAYER_ACTIONS.add({
  name: open,
  description: [],
  outcome: BATTLETREE.WIN,
  outcome_description: RANDOM.pick([
    "You open the chest and get its content. It's a " + BATTLE.pending_text + ".",
  ]),
  give_item: BATTLE.pending_text,
});

PLAYER_ACTIONS.add({
  name: ITEM.Elixir_fire,
  description: [],
  outcome: BATTLETREE.WIN,
  outcome_description: RANDOM.pick([
    "You burn the chest to the ground without even opening it.",
  ]),
  consume_item: ITEM.Elixir_fire,
});

BATTLETREE.api.unlock(BATTLE.get_current_battle(), open);

BATTLE.operations.start("You find a wooden chest. It doesn't seem locked.");
