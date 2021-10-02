// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/hell/centipede.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Scale, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Sneak, 2);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 2); 

PLAYER_ACTIONS.win(ABILITY.Incinerate, 1);                // 1000 ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 3);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 5);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 4, true);            // 30  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);

// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.8,
  variability: 0.2, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Centipede folds your three dimensional reality into lower dimensions, crushing you in the process.", attack);
BATTLE.monster_actions.add_textual("The Centipede devour the fabric of reality.", attack);
BATTLE.monster_actions.add_textual("The Centipede doesn't seem to move a muscle from the outside, but it is actually knitting dimensional threads to erase your existence from the universe.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start("A Colossal Centipede Contemplates Crushing you.");
