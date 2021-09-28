// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/harpy.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);

PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 200  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 2);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Poison, 4);                    // 150  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 1);                     // 200  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 100  ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 3);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 3);                         // 100  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 1.0,
  react_time_s: 0.4,
  variability: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Harpy emits a loud shriek that seems to pierce your ears and melt you brain.", attack);
BATTLE.monster_actions.add_textual("The Harpy dives towards you with a loud cry.", attack);
BATTLE.monster_actions.add_textual("The Harpy emits a series of howls that pierce through your skull and chill you to the bone.", attack);

// mb more into shriek

// ===================
//hack START
// ===================

BATTLE.operations.start("A Hysterical Harpy Harasses the Heroes.");
