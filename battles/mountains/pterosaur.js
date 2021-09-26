// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/pterosaur.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Scale, 1);
BATTLE.operations.add_loot("", 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 2);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_iron, 2);                   // 500  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 3);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 2);
PLAYER_ACTIONS.win(ABILITY.Shrink, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 6, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 3, true);           // 40  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);




// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.65, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 1.1,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Pterosaur bits you, burrowing its fangs in your legs.", attack);
BATTLE.monster_actions.add_textual("The Pterosaur snaps its powerful jaw. Unlike regular birds, it's filled with sharp teeth that cry out for your flesh.", attack);
BATTLE.monster_actions.add_textual("The Pterosaur bites the air in your direction.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Predatory Pterosaur Pierces through the Panorama.");
