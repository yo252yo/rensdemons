// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/caves/bat.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.5);
BATTLE.operations.add_loot(ITEM.Fang, 0.5);
BATTLE.operations.add_loot(ITEM.Bone, 0.5);
BATTLE.operations.add_loot("", 2);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 2);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 3);                         // 75  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Fireball, 3);                  // 10  ELEM
PLAYER_ACTIONS.win(ABILITY.Thunder, 1);                   // 83  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 2);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 2);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 4, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 2, true);
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 40  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);




// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 0.5,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Bat flutters around your head and aims for your eyes.", attack);
BATTLE.monster_actions.add_textual("The Bat dives to bite you with its poisonous fangs.", attack);
BATTLE.monster_actions.add_textual("The Bat whirls around you in a flurry of slashes.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Black Bat Bursts Before you.");
