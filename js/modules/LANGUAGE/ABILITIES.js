LANGUAGE.actions[ABILITY.Pray] = {
  usage: function(){
    return RANDOM.pick([
      "You close your eyes and begs the Goddess for help.",
      "You focus your thoughts on the Goddess and pray for Her help.",
      "You pray for the Goddess to come to your rescue.",
    ])
  },
  fail: function(){
    return RANDOM.pick([
      "The Goddess works in mysterious ways. Nothing happens.",
      "The Goddess seems to ignore your call.",
      "The Goddess probably deems that you should solve this situation on your own.",
      "The Goddess wants you to find your own way.",
      "The Goddess will not be troubled over such trivial matters.",
    ]);
  },
};

LANGUAGE.actions[ABILITY.Flee] = {
  usage: function(){
    return RANDOM.pick([
      "You try to run away.",
      "You turn around and attempt to escape the $$&ENEMY$.",
      "You back away slowly.",
    ]);
  },
  fail: function(){
    return RANDOM.pick([
      "In a stroke of luck, you manage to escape.",
      "The $$&ENEMY$ chases you for a bit, but you manage to escape.",
      "As you turn around, the $$&ENEMY$ loses interest and runs off in the distance.",
    ]);
  },
};
