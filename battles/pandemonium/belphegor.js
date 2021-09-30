// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/belphegor.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_vine, 0.5);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Persuade, 3);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 2);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 2);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 6, true);           // 40  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);


// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.65, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.5,
  variability: 0.9, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Belphegor reminds you that life has no objective meaning and your existence is futile. Nothing matters.", attack);
BATTLE.monster_actions.add_textual("The Belphegor fills your mind with the conviction that you do not matter and nothing you can do will have any effect in the grand scheme of things. You are powerless.", attack);
BATTLE.monster_actions.add_textual("The Belphegor's influence on your brain plunges you in an abyss of depression. You become acutely aware how insignificant any of your actions are. How can you even dream of changing anything?", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Barbaric Belphegor Besmirches you with Babble.");
