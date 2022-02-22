// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
var gen = new Generator(Math.random());//DICTIONARY.get("world_seed")*41);
AUDIO.music.levels.heaven();

if(typeof HEAVEN_SEQUENCE == "undefined") {
  HEAVEN_SEQUENCE = "";
}

// Careful, if we add more sequences that start with L and R, we might make it impossible to leave ^^
// the sequences are inverted (first character = latest)
var GODDESS_SEQUENCE = "rlrlddtt";
var MIRROR_SEQUENCE = "lrlrttdd";
var UTF_SEQUENCE = "ddtddddd";

var checkProgress = function(pattern){
  for(var i = 0; i < pattern.length; i++){
    if (HEAVEN_SEQUENCE.startsWith(pattern.substring(i))){
      return pattern.length - i;
    }
  }
  return 0;
}

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================
var t = new S_TownFloor(1125,1550,500,500, "050_hell_map", "assets/patterns/clouds.png");

var leave = function(){
  HEAVEN_SEQUENCE = "";
  CURRENTLEVEL.setup("050_hell_map");
}

var exit = function(from){
  // We're on final floor
  if (HEAVEN_SEQUENCE.startsWith(GODDESS_SEQUENCE) || HEAVEN_SEQUENCE.startsWith(MIRROR_SEQUENCE) || HEAVEN_SEQUENCE.startsWith(UTF_SEQUENCE)){
    return leave();
  }
  // Update sequence
  HEAVEN_SEQUENCE = from + HEAVEN_SEQUENCE;
  HEAVEN_SEQUENCE = HEAVEN_SEQUENCE.substring(0,10);
  // potentially leaving
  if(Math.random() < 0.3 && !checkProgress(GODDESS_SEQUENCE) && !checkProgress(MIRROR_SEQUENCE) && !checkProgress(UTF_SEQUENCE)){
    return leave();
  }

  CURRENTLEVEL.setup("060_heaven$");
}

t.left_border.interaction  = function(){  exit("l");  };
t.right_border.interaction = function(){  exit("r");  };
t.top_border.interaction   = function(){  exit("t");  };
t.bot_border.interaction   = function(){  exit("d");  };


// ===================
//hack D. UNIQUE ELEMENTS
// ===================
if (HEAVEN_SEQUENCE.startsWith(GODDESS_SEQUENCE)){
  var s1 = new B_Statue(1350,1275);
  var endFight = function() {
    if(INVENTORY.count("_killed_god")){
      var callback = function(){
        MARTYRDOM.death(); // to get the menu notification
        CURRENTLEVEL.setup("end@B");
      }
      TextBannerSequence.make([
        `As you deliver the final blow, the holy body of the Goddess starts to fragment into a myriad of tiny sparkly particles. As the shining grains begin to dissipate, you see for the first time the sacred body actually move.`,
        `It's a very subtle motion. The Goddess' lips come very slightly apart, and you hear Her whisper.`,
        `Goddess: "Fool... You don't know anything..."`,
        `Unexpectedly, the tone is one of compassion, not contempt. You feel a wave of empathy washing over you, as if you found in Her a kindred spirit. But you do not have time to asks the questions that submerge your mind.`,
        `The cloud of luminous dust, sole remainder of the entity that ruled the universe, dissipates slowly into the air...`,
      ], callback);
    } else if(INVENTORY.count("_ended_suffering")){
      var callback = function(){
        CURRENTLEVEL.setup("end@C");
      }
      TextBannerSequence.make([
        `Goddess: "Eliminating monsters, who raided the world and destroyed cities..."`,
        `The only difference you can notice is a vague humming sound.`,
        `$$Ren$: "Thanks..."`,
        `But you're interrupted by the Goddess who continues her litany.`,
        `Goddess: "Eliminating animals, who can be dangerous, and suffer themselves..."`,
        `$$Ren$: "Hey, thank you but I think that's ok..."`,
        `Goddess: "Eliminating weather, who can destroy crops..."`,
        `$$Ren$: "Wait, don't do that, we need it!"`,
        `Goddess: "Eliminating human adults, who suffer constantly from many worries..."`,
        `$$Ren$: "Stop it! That's enough! You're going too far!"`,
        `Goddess: "Eliminating human children, who will grow up to suffer..."`,
        `$$Ren$: "No!"`,
        `$$Ren$'s scream faded as the Promised Child disappeared in a flash of light.`,
        `Goddess: "Eliminating all life forms, who could evolve to further suffer..."`,
        `Goddess: "Eliminating the Goddess, and the world, so that it does not spawn any more suffering..."`,
        `The Goddess' light grows brighter and swallows everything. Pretty soon, there is nothing but an ocean of pure white.`,
      ], callback);
    } else if(INVENTORY.count("_restarted_world")){
      var callback = function(){
        CURRENTLEVEL.setup("end@D");
      }
      TextBannerSequence.make([
        `The Goddess' light grows brighter and swallows everything. Pretty soon, you perceive nothing but an ocean of pure white.`,
      ], callback);
    }
  }

  s1.interaction = function(){
    BATTLE.api.make("heaven/_goddess", endFight);
  };

  var s = new S_StainedGlass_wall(1200,1430, 'circle');
  s.visual_element.adjust_depth(0);
  s.interaction = undefined;

  new S_SavePoint(1150, 1525);
  new S_SavePoint(1550, 1525);
  new S_SavePoint(1550, 1125);
  new S_SavePoint(1150, 1125);

  if (STATS.ending(ENDINGS.God)){
    new S_Grimoire(1350,1495);
  }
}


if(STATS.flag("PrimordialDeities") && HEAVEN_SEQUENCE.startsWith(UTF_SEQUENCE)){
  var computer = new S_Computer(1350, 1300);
}

if(STATS.flag("PrimordialDeities") && HEAVEN_SEQUENCE.startsWith(MIRROR_SEQUENCE)){
   new S_MagicMirror(1350, 1300);
}

// ===================
//hack E. DECOR (permanent filler)
// ===================
var placeholder = new S_Placeholder(1340, 1350, 100, 100);

var decorFiller = new Filler(gen.get(), 100, 100);
decorFiller.set_zone(1125,1550,500,500);

switch(gen.int(3)){
  case 0:
    decorFiller.add_default_constructor("S_Bookshelf", 1, 50, 100);
    decorFiller.add_default_constructor("S_BookshelfBig", 3, 150, 150);
    decorFiller.set_tries(30, 50);
    break;
  case 1:
    decorFiller.add_default_constructor("S_Cloud", 1, 70, 50);
    decorFiller.set_tries(15, 25);
    break;
  case 2:
    decorFiller.add_default_constructor("S_Tomb", 50, 75);
    decorFiller.set_tries(30, 50);
    break;
}

// no decor for first entrance or special floors
if (HEAVEN_SEQUENCE && !HEAVEN_SEQUENCE.startsWith(GODDESS_SEQUENCE) && !HEAVEN_SEQUENCE.startsWith(MIRROR_SEQUENCE) && !HEAVEN_SEQUENCE.startsWith(UTF_SEQUENCE)){
  decorFiller.fill_decor_by_retry();
}
// ===================
//hack F. EVENTS (temporary filler)
// ===================

var events = new EventFiller(gen.get(), 25);
events.set_zone(1125,1550,500,500);

events.battle('heaven/angel');
events.battle('heaven/cherub');
events.battle('heaven/maneki', 0.1);
events.battle('heaven/ponpon', 0.5);
events.battle('heaven/raijuu', 0.5);
events.battle('heaven/seraph');
events.battle('heaven/valkyrie');

events.groundItem(ITEM.Feather);
events.groundItem(ITEM.AncientRubbles);

events.text(`You cannot shake the distinct feeling of having been here before.`, 0.6);
events.text(`Your head spins with the voluptuous motions of the vapor all around you. There's a sort of sweetness in the air. It seems that the fog is even in your head. You cannot think straight, your memories start being hard to grasp. How did you get here?`, 0.6);
events.text(`You notice silhouettes floating above you. The clouds makes it impossible to see clearly, but it appears to be flying creatures with wide wingspan. Probably angels.`, 0.6);
events.text(`You cannot shake the feeling that someone is watching you. As if there were some sort of invisible eyes pointed permanently on you...`, 0.6);
events.text(`A fruity smell of incense is slowly surrounding you. You blink and feel like everything around you changed. Have you been teleported? Has the environment morphed? How will you ever get out of this everchanging maze of illusions?`, 0.6);
events.text(`You get a vague impression of importance in this place. The air feels somehow thinner. This might be a delusion, but you can't help but think that you're close to the fabric of this universe. You get a weird ominous presentiment that a wrong move here could affect many lives in unexpected ways...`, 0.6);
events.add_conversations(0.2, true);

events.set_tries(4, 18);

if (HEAVEN_SEQUENCE && !HEAVEN_SEQUENCE.startsWith(GODDESS_SEQUENCE) && !HEAVEN_SEQUENCE.startsWith(MIRROR_SEQUENCE) && !HEAVEN_SEQUENCE.startsWith(UTF_SEQUENCE)){
  events.fill_floor_by_retry();
}

placeholder.destroy();


// ===================
//hack G. START/INIT
// ===================

// Start functions
if (!ABILITIES.has_ability("_heaven_visited")){
  ABILITIES.unlock("_heaven_visited");
  CURRENTLEVEL.setup_text_start_function([
    `You find yourself in the middle of a sea of cottony clouds. The slow swirling motion of the vapor is numbing your senses. No doubt that some sort of divine magic is also at play in this disorientation. You're not exactly sure how you arrived there or where you should go... The mist extends in every direction, but every time you look away it seems that the world changes around you. It's going to be hard to orient yourself, let alone pierce the mystery of this place...`,
  ]);
} else if (HEAVEN_SEQUENCE.startsWith(GODDESS_SEQUENCE) && !ABILITIES.has_ability("_goddess_intro")) {
  ABILITIES.unlock("_goddess_intro");
  CURRENTLEVEL.setup_text_start_function([
    `You're not completely sure how you navigated this limitless ocean of clouds, but you made it. In front of you, on top of a large stained glass circle, stands the Goddess Herself. Or at least, you think that's her. She looks exactly like the many statues you've seen.`,
    `You're almost surprised to not find Her bigger. Compared to $$demon_lord$, She is closer to you in size. Yet, She radiates an unimaginable amount of power. Her silver skin glows almost blindingly, the velvety fabric She's draped in seems to fold infinitely, inviting your gaze to always dive deeper in fractal nebulae. It's impossible to look at Her for more than a second, lest you might never look away...`,
    `She's surrounded by altars, as if to suggest mindfulness before you dare approach Her.`,
  ]);
}


// We use a trick to always spawn in the same place!
CURRENTLEVEL._recover_position = [1375,1325];
CURRENTLEVEL.initialize_with_character(1375,1325);

// ===================
//hack H. AUTOSAVE
// ===================
if(STATS.flag("PrimordialDeities") && HEAVEN_SEQUENCE.startsWith(UTF_SEQUENCE)){
  SAVE.autosave();
}
