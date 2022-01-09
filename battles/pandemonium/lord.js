// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/lord.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

STATS.record.flag("FoughtMaou");

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(10000); // only artifacts
PLAYER_ACTIONS.kill_with_any_party_member(9);

PLAYER_ACTIONS.win(ABILITY.Mystify, 2);                   // 2500 DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 5);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Summon, 2);                    // 2500 ELEM

PLAYER_ACTIONS.win(ABILITY.Charm, 2);                     // 2500 SPIR

PLAYER_ACTIONS.win(ITEM.Net, 8);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 8, true);           // 75  ALCH



// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.85, // Between 0 and 1
  warning_time_s: 0.0,
  react_time_s: 0.3,
  variability: 0.6, // 1 = 100%
};


BATTLE.monster_actions.add_textual("$$demon_lord$ raises an arm in the air. Immediately, he gets surrounded by a pillar of flames that reaches the ceiling and follows along the dark stone to engulf the whole room. The temperature of the atmosphere raises sharply, and it becomes hard to breathe. The flames are everywhere.", attack);
BATTLE.monster_actions.add_textual("$$demon_lord$ projects his demonic spirit into your mind. You try to put on psychological defenses, but they are laughable faced with the brute force of the monster. He fills your brain with horrific visions of nightmares. Your biggest fears and traumas harass you relentlessly, and you fall on the ground, paralyzed.", attack);
BATTLE.monster_actions.add_textual("$$demon_lord$ attacks you with a wave of magical energy. It sips into your whole body and sets your nerves ablaze. Every inch of yourself feels like it has been lit on fire. The acute pain is so overwhelming that you almost faint.", attack);
BATTLE.monster_actions.add_textual("$$demon_lord$ breathes on the ball of fire that he holds in his hand. A wave of flames expands from it and surrounds him. He soon finds himself at the center of an incandescent tornado. You realize with horror that the devouring whirlwind is expanding, taking more and more of the room's volume. It won't be long before the whole space is a burning maelstrom.", attack);
BATTLE.monster_actions.add_textual("$$demon_lord$ snaps his finger. The air around you warms up fast. It becomes dry and sparks appear here and there. It seems to take up a crimson shade. Suddenly, you find yourself ablaze. A layer of flames surrounds every inch of your body and slowly devour your flesh.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start([
  BESTIARY.intro("pandemonium/lord"),
  `$$demon_lord$: "It's such a shame... It looks like I will have to crush you like I did all the others!"`,
  `$$Ren$: "Big talk for someone who's about to die!"`,
  `$$demon_lord$: "Enough! I'll show you by force how little you matter!"`
]);
