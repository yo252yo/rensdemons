LANGUAGE.battle = {
  dodge_fail: function() {
    return `You failed to dodge the incoming attack.`;
  },

  xp: function(before, after) {
    var r = "Through this encounter, you EXPERIENCED more about the fabric of reality (" + (after.xp  - before.xp ) + " XP). ";
    if (after.unseen > before.unseen){
      r += "You discovered " + (after.unseen  - before.unseen ) + " NEW THREADS. ";
    }
    if (after.explored > before.explored){
      r += "You explored " + (after.explored  - before.explored ) + " THREADS. ";
    }
    if(after.is_empathized && !before.is_empathized){
      r += "You also got a glimpse at the true self of this opponent and unlocked EMPATHY. ";
    }
    return r;
  },

  loot: function(loot) {
    return `As you walk away, you find something on the floor. It is a ${loot.toUpperCase()}.`;
  },

  escape: function() {
    return RANDOM.pick([`You move away from this scene.`,
                        `You go away and do not turn back.`,
                        `You escape from this encounter.`,
                        `You manage to make your way out of this situation.`]);
  },

  foresight: function() {
    return [
      `$$BestFriend$: "Leave it to me!"`,
      `$$Ren$: "Stop! No good can come of it. All we can do is run and come back when we're stronger!"`,
      `$$BestFriend$: "But we haven't tried anything yet! How do you know there's nothing we can do? The Goddess?"`,
      `You nod, and drag $$BestFriend$ by the hand away from the battle.`,
    ];
  },

  spoiler: function() {
    return [
      RANDOM.pick([
        `You approach the $$&ENEMY$, moved by a mysterious feeling of foreknowledge.`,
        `You share your Goddess given intuitions with the $$&ENEMY$.`,
        `Armed with your mystical experience, you let the $$&ENEMY$ peek through the veil of reality.`,
      ]),
      RANDOM.pick([
        `$$Ren$: "I know you. I know how this ends."`,
        `$$Ren$: "I have been to hell and back. I have seen the future. You do not stand in my way."`,
        `$$Ren$: "I have already defeated the demon lord once. There's nothing left for you but submission."`,
      ]),
      RANDOM.pick([
        `You are a just small child, but for some reason your words ring true to the $$&ENEMY$. Their expression changes radically.`,
        `The $$&ENEMY$ appears to be moved by your words and lose all aggressivity.`,
        `They really shouldn't, but against all odds the $$&ENEMY$ seems to believe you.`,
      ]),
      RANDOM.pick([
        `$$&ENEMY$: "So you know?"`,
        `$$&ENEMY$: "No need to keep this up, then."`,
        `$$&ENEMY$: "Oh, ok."`,
      ]),
      RANDOM.pick([
        `The $$&ENEMY$ gives you a compassionate smile and withdraws.`,
        `The $$&ENEMY$ wishes you good luck, with a hint of sadness in their eyes.`,
        `The $$&ENEMY$ pledges you their full support, and lets you go on your way.`,
      ]),
    ];
  },

  several_hit_feedback: function (){
    return [`It's clearly effective, but you can tell that one hit is not enough to bring down your enemy. You're going to need more!`];
  },

  last_hit_feedback: function (){
    return [`You're almost there! Just one more hit!`];
  },
};

LANGUAGE.actions.generic = {
  usage: function(){
    return `You attack the $$&ENEMY$.`;
  },
  win: function(){
    return `This gets rid of the $$&ENEMY$.`;
  },
  fail: function(){
    return `This does not affect the $$&ENEMY$.`;
  },
};


LANGUAGE.actions["Kill God"] = {
  usage: function(){
    return `You attempt to kill the Goddess.`;
  },
  win: function(){
    return `You finally succeed.`;
  },
};


//------------------------------------------------------------------------------
//Functions

LANGUAGE.actions._get = function(name, type) {
  var r;
  try{
    r = LANGUAGE.actions[name.trim()][type]();
  } catch (e){
    r = LANGUAGE.actions[`generic`][type]();
  }

  if(typeof r == "string"){
    return [r];
  } else {
    return r;
  }
};

LANGUAGE.actions.usage = function(name) {
  return LANGUAGE.actions._get(name, `usage`);
};

LANGUAGE.actions.win = function(name) {
  return LANGUAGE.actions._get(name, `win`);
};

LANGUAGE.actions.fail = function(name) {
  return LANGUAGE.actions._get(name, `fail`);
};
