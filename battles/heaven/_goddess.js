// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/heaven/goddess.png", 'background');
AUDIO.music.characters.Goddess();

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.add({
  name: ABILITY.Escape,
  outcome: BATTLETREE.ESCAPE,
  description: ["You decide you're not prepared for this encounter."],
});


PLAYER_ACTIONS.add({
  name: "Kill God",
  description: LANGUAGE.actions.usage("Kill God"),
  function: function(){
    PLAYER_ACTIONS.win("Kill God", 6);
    ABILITIES.unlock("_killed_god");
  }
});

BATTLETREE.api.unlock("heaven/_goddess", "Kill God");

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.95, // Between 0 and 1
  warning_time_s: 0.0,
  react_time_s: 0.2,
  variability: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual(`Goddess: "Why?"`, attack);

// ===================
//hack START
// ===================

BATTLE.operations.start([
  "A Glorious Goddess Governs her Game.",
  "She does not move, yet Her complex garments undulate slowly as if born by a breeze. She doesn't open Her mouth, but a crystaline voice resonates inside your head.",
  `Goddess: "At last, you have come to me, my child. I have been waiting for you."`,
]);
;
