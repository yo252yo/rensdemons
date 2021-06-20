// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/wraith.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 1.3,
  time_variation: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Wraith howls at the sky, and the air around trembles.", attack);
BATTLE.monster_actions.add_textual("The Wraith curses you and fills your brain with the cacophony of hundreds of tortured souls screaming for relief.", attack);
BATTLE.monster_actions.add_textual("The Wraith speaks with a deep voice, though you cannot see its mouth. It is long forgotten words invoking a malediction on you.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Wayward Wraith Wails its Woe.");

//todo
