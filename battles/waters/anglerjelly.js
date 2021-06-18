// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/anglerjelly.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.useless(ABILITY.Pray);

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

//todo
