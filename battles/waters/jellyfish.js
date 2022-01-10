// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('waters/jellyfish');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);

PLAYER_ACTIONS.win(ABILITY.Fireball, 5);                  // 50   ELEM
PLAYER_ACTIONS.win(ABILITY.Thunder, 2);                   // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 4);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 4);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 1, true);             // 50   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 4);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 75   WEAP

PLAYER_ACTIONS.win(ITEM.Arrow, 6, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 0.6,
  variability: 0.7, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Jellyfish extends a veil of venomous filaments in your direction.", attack);
BATTLE.monster_actions.add_textual("The Jellyfish tries to sting you with its translucent poisonous tentacles.", attack);
BATTLE.monster_actions.add_textual("The Jellyfish swims all around you energetically. You must be extremely careful to avoid being burnt by its trail.", attack);


// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("waters/jellyfish"));
