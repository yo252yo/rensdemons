// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/harpy.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);

PLAYER_ACTIONS.useless(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.useless(PARTYMEMBERS.GeniusProdigy);
PLAYER_ACTIONS.useless(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.useless(PARTYMEMBERS.UpbeatDojikko);

PLAYER_ACTIONS.useless(ABILITY.Fireball, 1);                  // 50   ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 200  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 2);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 4);                    // 150  SPIR
PLAYER_ACTIONS.useless(ABILITY.Petrify, 1);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 1);                     // 200  DIPL
PLAYER_ACTIONS.useless(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.useless(ITEM.Elixir_ice, 1, true);             // 50   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 100  ALCH

PLAYER_ACTIONS.useless(ITEM.Dagger, 1);                       // 75   WEAP
PLAYER_ACTIONS.win(ITEM.Mace, 3);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 3);                         // 100  TOOL
PLAYER_ACTIONS.useless(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 1.0,
  react_time_s: 0.4,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Harpy emits a loud shriek that seems to pierce your ears and melt you brain.", attack);
BATTLE.monster_actions.add_textual("The Harpy dives towards you with a loud cry.", attack);
BATTLE.monster_actions.add_textual("The Harpy emits a series of howls that pierce through your skull and chill you to the bone.", attack);

// mb more into shriek

// ===================
//hack START
// ===================

BATTLE.operations.start("A Hurling Harpy Harasses the Heroes.");
