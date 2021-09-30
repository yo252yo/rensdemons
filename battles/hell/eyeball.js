// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/hell/eyeball.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Eye, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 6);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Incinerate, 1);                // 1000 ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 4);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 4, true);           // 50  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);


// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 0.4,
  variability: 0.8, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Eyeball stares at the depths of your mind.", attack);
BATTLE.monster_actions.add_textual("The Eyeball relentless gaze pierces through your soul.", attack);
BATTLE.monster_actions.add_textual("The Eyeball maintains its cold judging glance that seems to see clearly even what you're thinking.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start("An Eery Eyeball Examines your Ego.");
