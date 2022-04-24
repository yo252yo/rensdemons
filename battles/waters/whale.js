// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('waters/whale');
PLAYER_ACTIONS.allow_flight();

AUDIO.music.interface.boss();

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.kill_with_anything_over(999999999999999999);

PLAYER_ACTIONS.useless(ITEM.Sword_legend, 1);
PLAYER_ACTIONS.useless(ITEM.War_hammer, 1);
PLAYER_ACTIONS.useless(ITEM.Staff, 1);
PLAYER_ACTIONS.useless(ITEM.Wand, 1);

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("waters/whale", {
  attack_amplitude: 0.85, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 1.6,
  variability: 0.1, // 1 = 100%
});


BATTLE.monster_actions.add_textual([
  `$$Ren$: "This may seem weird, but I'm having a weird hunch that this might be a fight we're supposed to lose..."`,
  `$$BestFriend$: "What do you mean? Are we supposed to just let ourselves... die?"`,
  `$$Ren$: "Something like that? I'm not sure... I'm getting this weird intuition from the Goddess, but I don't fully understand it. It seems that anything we do would be futile..."`,
  ], attack);

PLAYER_ACTIONS.add({
  name: ABILITY.Feed,
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: ["Empowered by the Goddess, you decide to end the confrontation in a surprising way. You trust your luck and throw yourself recklessly in the mouth of the animal. The Goddess must be watching over you, because you manage to avoid the giant teeth and land safely on the tongue of the animal."],
  extra_function: function(){
    INVENTORY.increase("_eaten_by_whale");
  }
});

// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("waters/whale"));
