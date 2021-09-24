// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/mushroom_boss.png", 'background');
PLAYER_ACTIONS.allow_flight();

AUDIO.music.interface.boss();

BATTLE.operations.add_loot(ITEM.Mushroom, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1000);
PLAYER_ACTIONS.kill_with_any_party_member(3);

PLAYER_ACTIONS.win(ABILITY.Fireball, 7);                  // 25   ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 2);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 7);                   // 150  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 2);                 // 500  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 7);                // 50   DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 5);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 7, true);            // 20   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 4, true);           // 150  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 2, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 6);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 5);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 2);                          // 600  WEAP

PLAYER_ACTIONS.win(ITEM.Poison_darts, 7, true);           // 10   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 2);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 1.0,
  react_time_s: 1.3,
  time_variation: 0.3, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Fungus takes a step towards you. The ground shakes under the weight of its huge bulky legs. It raises one again to stomp and crush you.", attack);
BATTLE.monster_actions.add_textual("The Fungus slams one of its huge appendages like an arm. It's bigger than you and aimed right at you, crushing the vegetation around and everything on its path.", attack);
BATTLE.monster_actions.add_textual("The Fungus seems to be aiming at using its huge mass to crush you. You see it vacillate towards you, uprooting the nearby trees on the way.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Feral Fungus Frightens you with its Force.");
