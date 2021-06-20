// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/octopus.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);


PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);

PLAYER_ACTIONS.useless(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.useless(PARTYMEMBERS.StreetSmart);

PLAYER_ACTIONS.win(ABILITY.Fireball, 5);                  // 50   ELEM
PLAYER_ACTIONS.win(ABILITY.Thunder, 3);                   // 150  ELEM
PLAYER_ACTIONS.useless(ABILITY.Storm, 1);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 2);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 2);                    // 150  SPIR
PLAYER_ACTIONS.useless(ABILITY.Petrify, 1);                   // 300  SPIR

PLAYER_ACTIONS.useless(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 3, true);            // 20   ALCH
PLAYER_ACTIONS.useless(ITEM.Elixir_decay, 1, true);           // 150  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Dagger, 6);                       // 75   WEAP
PLAYER_ACTIONS.useless(ITEM.Shield, 1);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 10   TOOL
PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL
PLAYER_ACTIONS.useless(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Octopus stretches its many arms towards you.", attack);
BATTLE.monster_actions.add_textual("The Octopus unfurls its tentacles. They get hold of your arms and legs and start dragging you towards the monster.", attack);
BATTLE.monster_actions.add_textual("The Octopus grabs you with its many arms and squeezes you tighter and tighter.", attack);

// tentacle, squeeze, drag

// ===================
//hack START
// ===================
BATTLE.operations.start("An Oppressive Octopus Obstruct the Ocean.");

//todo
