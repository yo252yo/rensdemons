// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/manticore.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.1);
BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);

PLAYER_ACTIONS.useless(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.useless(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.useless(PARTYMEMBERS.TraitorFisher);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 5);                  // 100  ELEM
PLAYER_ACTIONS.useless(ABILITY.Thunder, 5);                   // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 200  ELEM

PLAYER_ACTIONS.useless(ABILITY.Poison, 1);                    // 75   SPIR
PLAYER_ACTIONS.useless(ABILITY.Shrink, 4);                    // 150  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 3);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 5);                // 100  DIPL
PLAYER_ACTIONS.useless(ABILITY.Sneak, 1);                     // 200  DIPL
PLAYER_ACTIONS.useless(ABILITY.Persuade, 3);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);             // 50   ALCH
PLAYER_ACTIONS.useless(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 150  ALCH

PLAYER_ACTIONS.useless(ITEM.Sword_wooden, 1);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 75   WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 3);                        // 250  WEAP

PLAYER_ACTIONS.useless(ITEM.Poison_darts, 10, true);           // 10   TOOL
PLAYER_ACTIONS.useless(ITEM.Arrow, 1, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.6,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Manticore slams its powerful tail in your vicinity.", attack);
BATTLE.monster_actions.add_textual("The Manticore flails its stringer around. Poison is dripping from it.", attack);
BATTLE.monster_actions.add_textual("The Manticore's venomous stinger darts towards you.", attack);

// mb more into stinger

// ===================
//hack START
// ===================

BATTLE.operations.start("A Mythical Manticore Marches on the Mountain.");
