// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/chimera.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.1);
BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);
PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);

PLAYER_ACTIONS.useless(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.useless(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.useless(PARTYMEMBERS.SavageChild);

PLAYER_ACTIONS.useless(ABILITY.Ice_bolt, 1);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Thunder, 3);                   // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 5);                    // 75   SPIR
PLAYER_ACTIONS.useless(ABILITY.Shrink, 1);                    // 150  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 3);                   // 300  SPIR

PLAYER_ACTIONS.useless(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 4);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 2);                  // 500  DIPL

PLAYER_ACTIONS.useless(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 150  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.useless(ITEM.Dagger, 1);                       // 75   WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 2);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 5    TOOL
PLAYER_ACTIONS.useless(ITEM.Rope, 1);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 1,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Chimera charges towards you in the air, claws first.", attack);
BATTLE.monster_actions.add_textual("The Chimera overwhelms you with a storm of scratches from its sharp claws.", attack);
BATTLE.monster_actions.add_textual("The Chimera grabs on to your arm and tries to throw you up in the air.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start("A Cawing Chimera Charges Claws ahead.");
