// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/octopus.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);


PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);

PLAYER_ACTIONS.useless(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.useless(PARTYMEMBERS.StreetSmart);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Octopus stretches its many arms towards you.", attack);
BATTLE.monster_actions.add_textual("The Octopus unfurls its tentacles. They get hold of your arms and legs and start dragging you towards the monster.", attack);
BATTLE.monster_actions.add_textual("The Octopus grabs you with its many arms and squeezes you tighter and tighter.", attack);

// tentacle, squeeze, drag

// ===================
//hack START
// ===================
BATTLE.operations.start("An Oppressive Octopus Obstruct the Ocean.");

//todo
