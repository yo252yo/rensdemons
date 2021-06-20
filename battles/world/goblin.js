// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/goblin.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Stick, 1);
BATTLE.operations.add_loot("", 9);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);

PLAYER_ACTIONS.useless(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.useless(PARTYMEMBERS.TraitorFisher);
PLAYER_ACTIONS.useless(PARTYMEMBERS.FemmeFatale);

PLAYER_ACTIONS.win(ABILITY.Fireball, 3);                  // 50   ELEM
PLAYER_ACTIONS.useless(ABILITY.Thunder, 2);                   // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 4);                    // 75   SPIR
PLAYER_ACTIONS.useless(ABILITY.Shrink, 1);                    // 150  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 300  SPIR

PLAYER_ACTIONS.useless(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 2);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);            // 20   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.useless(ITEM.Elixir_venom, 1, true);           // 100  ALCH

PLAYER_ACTIONS.useless(ITEM.Dagger, 1);                       // 75   WEAP
PLAYER_ACTIONS.win(ITEM.Mace, 1);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Poison_darts, 4, true);           // 10   TOOL
PLAYER_ACTIONS.win(ITEM.Arrow, 4, true);                  // 5    TOOL
PLAYER_ACTIONS.useless(ITEM.Rope, 1);                         // 100  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 1.1,
  react_time_s: 0.7,
  time_variation: 0.6, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Goblin slaps you with its stick.", attack);
BATTLE.monster_actions.add_textual("The Goblin shakes its vegetal weapon in your direction. Maybe it's cursing you...", attack);
BATTLE.monster_actions.add_textual("The Goblin waves its bouquet around while mumbling something that sounds like an incantation.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Grumpy Goblin Grasps some Grass.");

.useles
