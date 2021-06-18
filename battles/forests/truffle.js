// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/mushroom_2.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Mushroom, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.useless(ABILITY.Pray);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.7,
  react_time_s: 1.2,
  time_variation: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Truffle spreads out toxic spores in all directions.", attack);
BATTLE.monster_actions.add_textual("The Truffle spits spores towards you.", attack);
BATTLE.monster_actions.add_textual("The Truffle fills the air with venomous particles. You struggle to catch your breath.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Terrible Truffle Threatens you Toxically.");

//todo
