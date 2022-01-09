// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/ifrit.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Elixir_fire, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 5);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 8, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 4, true);             // 20  ALCH

PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);

// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 0.4,
  variability: 0.9, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Ifrit sends you a mental picture of the eyes of a loved one the moment you disappointed them. They trusted you.", attack);
BATTLE.monster_actions.add_textual("The Ifrit sends you a mental picture of the eyes of a loved one the moment they realized that you were a different person that they thought. They don't know you anymore.", attack);
BATTLE.monster_actions.add_textual("The Ifrit sends you a mental picture of the eyes of a loved one the last moment they ever thought about you. Life goes on.", attack);
BATTLE.monster_actions.add_textual("The Ifrit sends you a mental picture of the eyes of somebody that you used to know. So many connections gone now.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("pandemonium/ifrit"));
