// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/squirrel.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.5);
BATTLE.operations.add_loot(ITEM.Berry, 1);
BATTLE.operations.add_loot(ITEM.Fur, 0.1);
BATTLE.operations.add_loot("", 3);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 5);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 4);                    // 75   SPIR

PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 4);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 10   TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.01, // Between 0 and 1
  warning_time_s: 1.4,
  react_time_s: 0.1,
  variability: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Squirrel burrows its little teeth deep into your hand.", attack);
BATTLE.monster_actions.add_textual("The Squirrel keeps jumping around energetically. It's getting hard to follow where it's going to attack from.", attack);
BATTLE.monster_actions.add_textual("The Squirrel jumps on your face and scratches it with its little fangs.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Savage Squirrel Springs on Stage.");
