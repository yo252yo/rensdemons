// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/heaven/ponpon.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Fur, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP

PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 2);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 3);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 2, true);           // 50  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);



// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.9, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.6,
  variability: 0.3, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Ponpon looks at you with big adorable eyes. Your heart melts.", attack);
BATTLE.monster_actions.add_textual("The Ponpon wiggles its cute fluff. It squeezes your heart.", attack);
BATTLE.monster_actions.add_textual("The Ponpon flies around making chirpy noises. The cuteness is too strong to handle.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start("A Pure-looking Ponpon Pretends to be Pacific.");
