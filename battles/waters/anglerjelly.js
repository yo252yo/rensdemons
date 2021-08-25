// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/anglerjelly.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 5);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 2);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 150  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 150  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 4);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Poison_darts, 3, true);           // 10   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 1.1,
  time_variation: 0.7, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Anglerjelly flickers its light gently, lulling you towards an eternal sleep in a watery grave.", attack);
BATTLE.monster_actions.add_textual("The Anglerjelly moves its luminous appendage slowly in an attempt at hypnotizing you.", attack);
BATTLE.monster_actions.add_textual("The Anglerjelly seems pretty innocuous. It bathes the scene in a soft light. You feel the urge to get closer...", attack);


// ===================
//hack START
// ===================
BATTLE.operations.start("An Attentive Anglerjelly Aims at Attracting you.");
