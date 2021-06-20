// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/mandragora.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);

PLAYER_ACTIONS.useless(PARTYMEMBERS.SavageChild);
PLAYER_ACTIONS.useless(PARTYMEMBERS.DumbMuscles);

PLAYER_ACTIONS.win(ABILITY.Fireball, 4);                  // 50   ELEM
PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 3);                  // 100  ELEM
PLAYER_ACTIONS.useless(ABILITY.Thunder, 1);                   // 150  ELEM

PLAYER_ACTIONS.useless(ABILITY.Poison, 1);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 150  SPIR
PLAYER_ACTIONS.useless(ABILITY.Petrify, 2);                   // 300  SPIR

PLAYER_ACTIONS.useless(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.useless(ABILITY.Sneak, 4);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 2, true);            // 20   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_ice, 1, true);             // 50   ALCH
PLAYER_ACTIONS.useless(ITEM.Elixir_venom, 1, true);           // 100  ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 4);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 75   WEAP
PLAYER_ACTIONS.useless(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.useless(ITEM.Poison_darts, 1, true);           // 10   TOOL
PLAYER_ACTIONS.win(ITEM.Arrow, 3, true);                  // 5    TOOL
PLAYER_ACTIONS.useless(ITEM.Rope, 1);                         // 100  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  time_variation: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Mandragora slaps you with one of its thin flexible roots.", attack);
BATTLE.monster_actions.add_textual("The Mandragora unleashes on you a deluge of whips from its roots.", attack);
BATTLE.monster_actions.add_textual("The Mandragora tries to immobilize you by wrapping a root around you.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Malicious Mandragora Manifests its Monstrosity.");
