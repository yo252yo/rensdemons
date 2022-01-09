// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/squid.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 4);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Thunder, 2);                   // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 150  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Persuade, 2);
PLAYER_ACTIONS.win(ABILITY.Sneak, 2);                     // 200  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 100  ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 5);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 10   TOOL
PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 5    TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 1,
  variability: 0.3, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Squid smashes you with one of its spiky tentacles.", attack);
BATTLE.monster_actions.add_textual("The Squid darts at you with a pointy tentacle that seems sharp enough to pierce any armor.", attack);
BATTLE.monster_actions.add_textual("The Squid overwhelms you with a barrage of hits from its strong tentacles.", attack);

// pierce, smash

// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("waters/squid"));
