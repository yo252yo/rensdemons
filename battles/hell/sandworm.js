// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/hell/sandworm.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Scale, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Sneak, 4);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 3);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 9, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 3, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);


// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 0.3,
  variability: 0.8, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Sandworm undulates hypnotically and makes you realize that you're only a flesh puppet subject to circumstances without any free will.", attack);
BATTLE.monster_actions.add_textual("The Sandworm mersmerizes motions makes you feel like you don't know yourself anymore. You feel alien in this body. Is it really you?", attack);
BATTLE.monster_actions.add_textual("The Sandworm mystic dance seems to have severed the link between your body and your soul. The flesh puppet acts by itself, and you're stuck within, powerless to control anything, not even managing to articulate a mouth into a scream.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("hell/sandworm"));
