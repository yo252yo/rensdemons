// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/mushroom_2.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Mushroom, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);

PLAYER_ACTIONS.useless(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.useless(PARTYMEMBERS.PreciousChild);

PLAYER_ACTIONS.win(ABILITY.Fireball, 4);                  // 50   ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 200  ELEM
PLAYER_ACTIONS.useless(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.useless(ABILITY.Poison, 1);                    // 75   SPIR
PLAYER_ACTIONS.useless(ABILITY.Shrink, 3);                    // 150  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 2);                   // 300  SPIR

PLAYER_ACTIONS.useless(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.useless(ABILITY.Sneak, 3);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.useless(ITEM.Elixir_fire, 1, true);            // 20   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 4);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP
PLAYER_ACTIONS.useless(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Net, 3, true);           // 10   TOOL
PLAYER_ACTIONS.useless(ITEM.Arrow, 1, true);                  // 5    TOOL
PLAYER_ACTIONS.useless(ITEM.Rope, 2);                         // 100  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.7,
  react_time_s: 1.2,
  time_variation: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Truffle spreads out toxic spores in all directions.", attack);
BATTLE.monster_actions.add_textual("The Truffle spits spores towards you.", attack);
BATTLE.monster_actions.add_textual("The Truffle fills the air with venomous particles. You struggle to catch your breath.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Terrible Truffle Threatens you Toxically.");
