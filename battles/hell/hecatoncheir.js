// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/hell/hecatoncheir.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Eye, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Persuade, 2);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 1);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 2);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 2, true);           // 75  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);


// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.6,
  variability: 0.4, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Hecatoncheir extends its gooey tentacles deep into your soul and starts to tear apart your very being.", attack);
BATTLE.monster_actions.add_textual("The Hecatoncheir whips your spirit with its slimy appendages.", attack);
BATTLE.monster_actions.add_textual("The Hecatoncheir smothers your personality with its uncountable oozy arms.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start("A Horrible Hecatoncheir Hovers in a Haze.");
