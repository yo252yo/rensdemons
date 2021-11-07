
class S_Tree extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/forest/tree.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(25,0,20,15);
    this.specify_sprite_size(77,73);
    this.default_text = this.text_interaction([
      "It's a tree.",
      "Lustrous leaves, bulky branches... yes, definitely a tree.",
      "The foliage of the tree casts a pleasant shadow.",
      "It's a completely normal tree, hiding nothing whatsoever.",
    ]);
  }

  interaction(){
    if (this.hidden_in){
      this.hidden_in.place_at(this.visual_element.x, this.visual_element.y - 20);
      this.hidden_in.try_walk_by(-40, 30);
      this.hidden_in.interaction();
      this.hidden_in = null;
    } else {
      this.default_text();
    }
  }

  hide_in(object){
    this.hidden_in = object;
  }
}

class S_AlgaeWall extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/algaewall");
    this.adjust_hitbox(20,0,110,25);
    this.specify_sprite_size(143,101);
    this.default_text = this.text_interaction([
      "These green aquatic plants intertwine in an impassible wall.",
      "You're faced with underwater vines tangled in an inextricable mess.",
      "There's no passing by this wall of tangling vines.",
    ]);
  }
}

class S_Anemone extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/anemone");
    this.adjust_hitbox(0,0,20,20);
    this.specify_sprite_size(30,44);
    this.default_text = this.text_interaction([
      "The little tentacles around the mouth of the anemone seem to be fondling the water in search of food.",
      "You watch the mouth of the purple anemone open and close with the currents.",
      "It's a colorful anemone. Little fishes are swarming around it, finding a refuge in its watery mane.",
    ]);
  }
}

class S_Coral extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/coral");
    this.adjust_hitbox(0,0,50,25);
    this.specify_sprite_size(49,49);
    this.default_text = this.text_interaction([
      "This coral stands proudly as a refuge to thousands of tiny fishes swarming around it.",
      "You can't help but be impressed by the colorful reflections emanating from the porous coral structure.",
      "You are taken aback by the beauty of the mysterious natural arabesques drawn by the coral.",
    ]);
  }
}

class S_Seashell extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/seashell");
    this.adjust_hitbox(10,0,20,10);
    this.specify_sprite_size(27,22);
    this.default_text = this.text_interaction([
      "This seashell still has an inhabitant.",
      "The floor is littered with shells like this. Most of them are still alive and well.",
      "You watch as the water carries the small shell and its inhabitant back and forth.",
    ]);
  }
}

class S_Seashellpointy extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/seashellpointy");
    this.adjust_hitbox(10,0,20,10);
    this.specify_sprite_size(24,25);
    this.default_text = this.text_interaction([
      "This shell is without a doubt a refuge for a hermit crab.",
      "You must be careful not to step on these, as they are quite pointy.",
      "You try to grab the seashell, but a claw comes out and dissuades you.",
    ]);
  }
}

class S_Waterplants extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/waterplants");
    this.adjust_hitbox(0,0,40,20);
    this.specify_sprite_size(47,50);
    this.default_text = this.text_interaction([
      "The underwater plants waver with water currents. Their dance is hypnotic.",
      "The algae wave slowly under the water currents. They bathe the scene by a faint fluorescent glow.",
      "The colorful algae seem to beckon you, but you know that if you get too close you might get tangled.",
    ]);
  }
}

class S_PlantSmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/plant");
    this.specify_sprite_size(29,24);
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "You can easily step over this little bush.",
      "It's a simple little green bush.",
      "Just a little bush, like there are so many in these woods.",
    ]);
    this.walkable = true;
  }
}

class S_Shroomgiant extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomgiant");
    this.specify_sprite_size(104,113);
    this.adjust_hitbox(40,0,20,20);
    this.default_text = this.text_interaction([
      "This giant mushroom casts a wide shadow over the surroundings.",
      "You watch with apprehension this giant mushroom. If the cap were to fall, it might crush you.",
      "The bright red mushroom cap contrasts with the surrounding greenery. It also looks like you should probably not eat or lick it.",
    ]);
  }
}

class S_Shroomsmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomsmall");
    this.specify_sprite_size(29,24);
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "These mushrooms are of a very manageable size, but you lack the knowledge to figure out whether they're nourishing or deadly. Better stay away.",
      "There are countless mushrooms like these everywhere you look, under trees and bushes.",
      "The little mushrooms seem pretty innocuous. Hard to believe they're related to much bigger threats.",
    ]);
    this.walkable = true;
  }
}

class S_Shroomtall extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomtall");
    this.specify_sprite_size(57,92);
    this.adjust_hitbox(20,0,20,20);
    this.default_text = this.text_interaction([
      "The trunk of this mushroom extends vertically even higher than the surrounding trees.",
      "This mushroom is much taller than the others.",
      "This mushroom towers over you by several times your size.",
    ]);
  }
}

class S_Planks extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/planks");
    this.adjust_hitbox(10,0,20,10);
    this.specify_sprite_size(31,32);
    this.default_text = this.text_interaction([
      "These planks are all that remains of a long lost ship. There's definitely traces of the past here.",
      "You wonder where these planks come from, and what else from human civilization made its way there.",
      "The planks are barely recognizable, as the water smoothed the wood to an almost rock-like softness.",
    ]);
  }
}

class S_Pebbles extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/pebbles");
    this.adjust_hitbox(10,0,20,15);
    this.specify_sprite_size(40,47);
    this.visual_element.adjust_depth(this.visual_element.y-this.visual_element.height);
    this.default_text = this.text_interaction([
      "Of course, little rocks are everywhere. You need to be very careful not to trip on them.",
      "Those little rocks are too small to do anything, except making you trip, maybe.",
      "You barely avoid falling as you lose your footing from these little pebbles.",
    ]);
    this.walkable = true;
  }
}

var rocks = [
  "These are rocks, obviously.",
  "Yes, you are surrounded by rocks.",
  "You have to make your way slowly between massive rocks and peaks.",
  "Some of those peaks have edges sharp enough to cut you pretty deep. You try your best to keep your footing without touching them.",
  "You can see the mark of the elements on these rocks. They were there long before you, and will remain there long after...",
  "Rocks!",
  "Rocks, more rocks... Everywhere you look, all you can see...",
];

class S_RocksHuge extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rockshuge");
    this.adjust_hitbox(10,0,130,50);
    this.specify_sprite_size(157,171);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Rocks1 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks1");
    this.adjust_hitbox(20,0,50,20);
    this.specify_sprite_size(79,54);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Rocks2 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks2");
    this.adjust_hitbox(10,0,40,20);
    this.specify_sprite_size(57,69);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Rocks3 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks3");
    this.adjust_hitbox(0,0,40,20);
    this.specify_sprite_size(50,50);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Rocks4 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks4");
    this.adjust_hitbox(0,0,30,20);
    this.specify_sprite_size(30,59);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Web extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/web");
    this.adjust_hitbox(0,0,100,40);
    this.specify_sprite_size(102,154);
    this.default_text = this.text_interaction([
      "Giant spider webs fall down the ceiling. This place hasn't been visited in a long time...",
      "There's a lot of spider webs and dust, demonstrating how little this place has been used. Some of them coalesce in giant webs coming down the ceiling.",
      "This was either made by one very big spider, or many little ones over a very long period of time...",
    ]);
  }
}

class S_WebLarge extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/weblarge");
    this.adjust_hitbox(0,0,190,30);
    this.specify_sprite_size(204,101);
    this.default_text = this.text_interaction([
      "The back of the room is littered with metallic debris covered by a huge layer of spider web.",
      "The wall is covered by cobwebs, you can barely distinguish it behind.",
      "A metallic wall is hidden behind several layers of spider webs. Nobody has been here in centuries.",
    ]);
  }
}

class S_Bocals extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/bocals");
    this.adjust_hitbox(0,0,30,20);
    this.specify_sprite_size(43,40);
    this.default_text = this.text_interaction([
      "The previous inhabitants of this place supposedly used this to store food, but it was so long ago... The content is now some sort of black goo that you'd rather stay clear of.",
      "This probably used to hold some sort of sustenance, but now it just looks like rot and mold. It's covered in dust and spider webs.",
      "The content of this container have been sealed for centuries. You cannot imagine the smell that might arise if you were to open them.",
    ]);
  }
}

class S_Rubble extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/rubble");
    this.adjust_hitbox(0,0,30,10);
    this.specify_sprite_size(29, 29);
    this.default_text = this.text_interaction([
      "A pile of rubble, scraps of stone and wood...",
    ]);
  }
}

class S_RubbleLarge extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/rubblelarge");
    this.specify_sprite_size(63,63);
    this.adjust_hitbox(0,0,60,30);
    this.default_text = this.text_interaction([
      "This messy pile of bricks is all that remains of a former construction...",
    ]);
  }
}

class B_Pebbles extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "mountain/pebbles", color, size);

    this.set_description("There are pebbles on the ground.");
    this.add_interaction("Play", "You flick around a few spherical rocks with $$BestFriend$. The one who pushes the other's pebbles outside of the game area wins. Of course, you win!");
    this.add_interaction("Play", "You flick around a few spherical rocks with $$BestFriend$. The one who pushes the other's pebbles outside of the game area wins. Of course, you lose!");
    this.add_interaction("Eat", "What? Why would you do that? The Goddess formally forbids you from doing something so stupid! There are limits to exploration.");
    this.add_interaction("Throw", "You take a stone and throw it as far as you can. It's always good to remind yourself of your own strength. It's not much, by the way.");
    this.add_interaction("Examine", "You look at the rock very closely. You explain to a puzzle $$BestFriend$ that it is a method to find clues that the Goddess imprinted on you. Though, apparently, it's not working great right now...");
    this.add_interaction("Build", "You try to arrange the rocks to hold each other and form a house. It takes you a long time, as it keeps breaking. In the end, maybe it wasn't worth it.");
    this.add_interaction("Kick", "You kick a rock with your foot and watch it roll a few meters further. This felt like the obvious thing to do, but it accomplished nothing.");
    this.add_interaction("Trip", "You step on the rocks and lose your balance. You fall on your behind, but fortunately there does not seem to be any permanent damage.");
  }
}

class B_Plants extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "forest/plant", color, size);

    this.set_description("You find yourself near a little green plant.");
    this.add_interaction("Pluck", "You harvest a leaf from the small plant. It's very green, but serves no purpose whatsoever. Did you imagine it would trigger something? Why did you do that?");
    this.add_interaction("Trample", "You jump on the plant and trample it to death, under the inquisitive gaze of $$BestFriend$. You explain that you really couldn't help yourself.");
    this.add_interaction("Taste", "Trusting your instinct, you shove a bit of the leaves in your mouth, before immediately spitting it out. It may not have been poisonous, but it tasted extremely bitter.");
    this.add_interaction("Whistle", "You take a bit of leaf between your fingers and try to live an iconic moment whistling with $$BestFriend$. Fortunately, the Goddess knows better than to let you succeed. You feel a short lived embarrassment at your failure, but the success would probably have given you a much more awkward memory.");
    this.add_interaction("Rub", "You rub the plant on your arm, moved by the vague impression that some leaves are supposed to be medicinal. Nothing much happens.");
    this.add_interaction("Uproot", "You seize the base of the plant and pull with all your strength. It's not easy, but you manage to get it out of the ground. Now what? You ask the Goddess inside you. But there's no answer.");
    this.add_interaction("Water", "You share some of your resources with the plant. It doesn't thank you, but you can feel its gratitude. Or maybe you're imagining it.");
  }
}

class B_Seashell extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "water/seashell", color, size);

    this.set_description("There's a seashell on your way.");
    this.add_interaction("Listen", "You bring the seashell to your ear. It is said that you can hear the sea, but since you're already underwater, it changes nothing for you.");
    this.add_interaction("Grind", "You crush the shell with your boot. Soon, it's nothing but a thin powder, barely distinguishable from the sand around. $$BestFriend$ seems disappointed.");
    this.add_interaction("Ornate", "You take the shell and quickly fashion a little necklace from it, that you give to $$BestFriend$. The presents is much appreciated, and the new ornament makes the smile of your best friend smile even brighter.");
    this.add_interaction("Balance", "You try to balance the seashell on your finger. The pressure of the water around you makes it pretty easy. You're not sure why you did it, but it does feel a little nice.");
    this.add_interaction("Admire", "You take a moment to look at the shell. It's pale, but it has reflects from a myriad of hues that change as you move it around. It's quite mesmerizing.");
    this.add_interaction("Gather", "This might be worth something. You pick it up, before noticing it's actually broken in several pieces. No use for it now...");
  }
}


// NO BEST FRIEND!
class B_Skeleton extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "ruins/skeleton", color, size);

    this.set_description("You discover what appears to be a human skeleton.");
    this.add_interaction("Plunder", "You look around for any valuables that might be up for the taking after the demise of their previous owner. Sadly, there doesn't seem to be anything eager to be adopted by your benevolent care.");
    this.add_interaction("Empathize", "You try to imagine the life of whoever these bones used to be. They had a family, friends, desires, hopes... But now this pile of bones is all there is to show for it. It's tragic, but it's the fate that awaits you too, some day.");
    this.add_interaction("Investigate", "You look closely at the bones to try and figure out what you can about the person or the circumstances of their death. Sadly, you're just a child, and not a wise scholar well versed in medicinal studies, so you don't learn anything from this, but it was certainly worth a shot!");
    this.add_interaction("Scramble", "Moved by the Goddess, you mess up the pile of bones. Why would anyone do such a thing? Maybe someone in the far future will find these bones, and imagine they belonged to someone very weirdly shaped?");
    this.add_interaction("Scrutinize", "Looking at the bones, you can clearly see bitemarks. Some scavenger animal came this way and devoured what was left of this pour soul.");
    this.add_interaction("Harmonize", "You forget all respect for the dead and start smashing the bones against each other, producing some different sounds. Pretty soon, you've mastered their tone and you've managed to compose a pleasant rhythmic melody.");
    this.add_interaction("Study", "You look at the different bones and how they fit together, shuddering at the thought that something very similar is present inside of you.");
  }
}

class S_Beelzebub extends SimpleObject {
  constructor(x, y){
    super(x, y, "hell/beelzebub", "obj_dark");
    this.specify_sprite_size(173,264);
    this.adjust_hitbox(50,10,100,100);


    var self = this;
    var postBossPhase3 = function(){
      ABILITIES.unlock("_lieutenant_defeated");
      STATS.record.flag("KilledBestFriend");
      AUDIO.music.stop();

      TextBannerSequence.make([
        `You stay a long time kneeling on the ground in shock and disbelief. You don't want to let go of the body of $$BestFriend$. Tears keep flowing for hours. The world becomes a whirlwind of pain and sobs...`,
        `At some point, you lose consciousness and fall asleep. The cherished face of $$BestFriend$ follows you in feverish nightmares.`,
        `When you come to, your resolve has grown. The world around seems less colorful, your body is sluggish and heavy, you feel a deep empty hole in your chest. But you cannot let yourself go. You need to drag yourself forward and honor $$BestFriend$'s last wishes.`,
        `You cannot allow yourself to let so much efforts and pain go to waste...`,
      ]);
    }

    var postBossPhase2 = function(){
      AUDIO.music.characters.BestFriend();
      PARTY.remove(PARTYMEMBERS.BestFriend);
      self.destroy();

      TextBannerSequence.make([
        `$$BestFriend$: "$$Ren$..."`,
        `$$Ren$: "$$BestFriend$!"`,
        `You jump to the side of your long-life companion.`,
        `Despite all efforts, $$BestFriend$ did not reach shelter on time and could not avoid the powerful explosion. The concussion tore some limbs, the conflagration ravaged some others... The beloved faced that cheered you up so many times is beyond recognition.`,
        `There's no healing those cruel wounds... You immediately understand on some level that this inferno is the end of the road for $$BestFriend$. Yet, you refuse to accept it. You do not dare touch the weakened body, but you cannot help but trying every spell, unction or plant that comes to mind.`,
        `$$BestFriend$: "$$Ren$, it's useless..."`,
        `$$Ren$: "No! No! No!"`,
        `It seems to be all you manage to say through the tears. $$BestFriend$'s fate leaves no room for doubt. But you hold on as strongly as you can, refusing to accept a world where $$BestFriend$ is not at your side.`,
        `$$Ren$: "I can't! I can't do it without you!"`,
        `$$BestFriend$: "You have to... Otherwise this will all be for nothing..."`,
        `$$BestFriend$'s breath is slow and irregular. It pierces through the silence like a deadly whizzing.`,

        `$$Ren$: "Curse the Goddess! Curse it all! What good is it to be the Promised Child if I can't even save the person I care the most about!"`,

        `$$BestFriend$: "You can't... Say that..."`,
        `$$BestFriend$ takes a pause. Each word seems to be more difficult than the previous one.`,
        `$$BestFriend$: "You've got to... Keep the faith... Keep going..."`,
        `$$BestFriend$: "We've come so far... You need to end it..."`,
        `$$BestFriend$: "For everyone... For a better future..."`,
        `$$BestFriend$: "For $$PreciousChild$..."`,
        `$$BestFriend$: "Do it for me... Please..."`,

        `Your face is soaked with tears as you hold the hand of your friend close to your heart.`,
        `$$Ren$: "I will. I promise I will not let all of this be in vain. I will kill $$demon_lord$ and save $$world_name$. I will make it a happy and peaceful place... A place you would have wanted... It'll bear your name. You'll never be forgotten!"`,
        `$$BestFriend$: "Thank... You..."`,
        `$$BestFriend$ struggles to take a last painful breath, then falls eyes-closed on the ground. All suffering has stopped now, and the beloved face displays an outlandish peacefulness.`,

      ], postBossPhase3);
    }

    var postBossDialog = function(){
      TextBannerSequence.make([
        `$$demon_lieutenant$ falls down on the ground, defeated. The weight of the shock makes everything shake around you.`,
        `You let out a sigh of relief, but it is short lived: victory cannot be that easy. A morbid sizzling noise is coming out of the lifeless body of the demon. Its skin bubbles up. You barely have time to jump to cover, yelling at $$BestFriend$ to do the same.`,
        `The deformed body of $$demon_lieutenant$ suddenly explodes in a massive burst of flames. For a few moments that seem like an eternity, you cannot see anything around you. Torrents of burning lava are scattered in all directions, blinding you with their incandescent light. You hold your breath as much as possible from the stench of the body's ignited insides.`,
        `When the dust finally settles down, you're mostly unharmed. You look around for $$BestFriend$, only to discover with horror that your luck has not been shared...`,
      ], postBossPhase2);
    }

    this.interaction = function(){
      if(STATS.flag("StoryOfTheAncients")) {
        if(ABILITIES.has_ability("_lieutenant_confronted")) {
          BATTLE.api.make("pandemonium/lieutenant", postBossDialog);
        } else if(INVENTORY.has_ancient_armament()) {
          new CenteredTextMenu("What will you use?", [
            {"text": "The ancient artifact", "effect": function() {  BATTLE.api.make("pandemonium/_lieutenant_first_encounter"); }},
            {"text": "Your faith", "effect": function() { BATTLE.api.make("pandemonium/lieutenant", postBossDialog); }},
          ]);
        } else {
          BATTLE.api.make("pandemonium/lieutenant", postBossDialog);
        }
      } else {
        if (ABILITIES.has_ability("_lieutenant_confronted")){
          TextBannerSequence.make([
            `$$demon_lieutenant$: "I'll spare you this time. I have pity for you. You brought me some amusement, and I am weary of this war. But if I ever see you here again, or if you attempt to pass through to go to hell, I will have to kill you."`,
            `$$Ren$: "So... What now?"`,
            `$$BestFriend$: "I heard that west of here is the Forgotten Fissure, one of the oldest ruins from the time of the ancestors that we haven't checked out yet. Maybe we'll find an answer there?"`
          ]);
        } else {
          BATTLE.api.make("pandemonium/_lieutenant_first_encounter");
        }
      }
    }
  }
}

class S_Maou extends SimpleObject {
  constructor(x, y){
    super(x, y, "pandemonium/maou", "obj_dark");
    this.specify_sprite_size(300,300);
    this.adjust_hitbox(50,10,180,100);

    var win = function() {
      TextBannerSequence.make([
        `With a final prayer to the Goddess, you deliver the final blow to Her sworn enemy...`,
      ], function(){
        CURRENTLEVEL.setup("end@A");
      });
    }

    var optionGenerator = function(text, prompt, next) {
        var choice = function() {
          new CenteredTextMenu(prompt, [
            {"text": "Kill " + DICTIONARY.get(["demon_lord"]), "effect": win},
            {"text": "Spare " + DICTIONARY.get(["demon_lord"]), "effect": next},
          ]);
        }
        return function(){
          TextBannerSequence.make(text, choice);
        }
    }

    var afterSecretEnd = function(){
      TextBannerSequence.make([
        `You're still shocked by what you saw $$demon_lord$ do to himself. What kind of being is the Goddess, to inspire such terror in her servants? The only way to find out is to head for Heaven, which shouldn't be far from this castle.`,
      ]);
    }
    var secretEnd = function(){
      ABILITIES.unlock("_secret_ending_chosen");
      TextBannerSequence.make([
        `Unsure of what you're doing, you slowly nurse $$demon_lord$ back to life.`,
        `When he regains consciousness, his face distort in a level of fear you've never seen on a demon before. Sweat runs down his forehead and he struggles to find his words. He grabs you, shakes you, and screams in a panicked voice:`,
        `$$demon_lord$: "What the fuck have you done, kid! We're so screwed! She'll never forgive us!"`,
        `$$Ren$: "What... Who do you mean?"`,
        `$$demon_lord$: "The Goddess! She's more powerful than you can ever imagine! She transcends time, space and dimensions!"`,
        `$$Ren$: "You... Know the Goddess?"`,
        `$$demon_lord$: "Of course! She created all things! I've been serving Her dutifully, and you fucked it all up!"`,
        `$$Ren$: "Wait a minute... You were serving the Goddess?"`,
        `$$demon_lord$: "Yes! You'd be a fool to oppose Her Almighty Will! I had one job to do, I was supposed to die, and that's fucking it! Why didn't you just kill me? What awaits us now is worse than death..."`,
        `$$Ren$: "What?"`,
        `$$demon_lord$: "` + RANDOM.glitch(`Maybe it's not too late! Kill me! Please! Kill me! Maybe we can still fix it!`, 0.01) + `"`,
        `$$demon_lord$ ` + RANDOM.glitch(`pitifully grabs your arm and shakes your weapon, but you're still too puzzled to do anything. The colossal demon starts sobbing like a newborn.`, 0.01),
        `$$demon_lord$: "` + RANDOM.glitch(`Please! I don't want to imagine what She will do to me! I've failed her! I was supposed to punish the humans for their hubris, and die peacefully when my time comes!`, 0.02) + `"`,
        `$$Ren$: "You mean... The Goddess is behind the demon invasion?"`,
        `$$demon_lord$: "` + RANDOM.glitch(`How could She not be? She is Divine! Everything is Her Holy Will! I just obey Her commands! Oh, Goddess, forgive me! Forgive him! Please, just let me die!`, 0.03) + `"`,
        RANDOM.glitch(`Sobs turn into convulsions. It truly is a pathetic sight. Strident wails raise from the contorted muscular body.`, 0.04),
        `$$Ren$: "Focus! There may still be hope! I want to meet Her. Where is She?"`,
        `$$demon_lord$: "` + RANDOM.glitch(`Heaven! She's in Heaven, of course. She's always been near, but you couldn't see Her. It's pointless, though, you cannot survive Her wrath. We're doomed. This world has no point anymore, this life has no meaning. Please, oh, Mighty One, please spare little miserable me!`, 0.06) + `"`,
        `$$demon_lord$ ` + RANDOM.glitch(`lets out a high pitched scream that pierces your ears. The whimper continues:`, 0.1),
        `$$demon_lord$: "` + RANDOM.glitch(`She's here! She sees All! She's Everywhere! And She's angry at us! Oh please, please! Her reckoning has come! Please, let it stop! Kill me!`, 0.15) + `"`,
        `Before you could do anything, you watch in horror as $$demon_lord$ burrows his fanged fingers deep within his chest and rips his body apart. Blood explodes in all directions as the massive lump of incandescent flesh crashes on the ground. $$demon_lord$ let out a final whisper:`,
        `$$demon_lord$: "Forgive me, Mother! I failed you!"`,
      ], afterSecretEnd);
    }

    var endFight10 = optionGenerator(["Fine! Have it your way! Don't come crawling back if you're stuck in a neverending nightmare. I gave you plenty of chances to end this adventure. There's nothing else."], "Will you refuse the ending?", secretEnd);
    var endFight9 = optionGenerator(["Why are you so intent on disobeying? You'll only prolong your suffering, and everyone else's. We all want this to be over. Even $$demon_lord$, I'm sure. He'd beg you if he could talk!"], "Will you slaughter an unconscious being?", endFight10);
    var endFight8 = optionGenerator(["Are you seriously going to spare the monster that caused all this suffering? He killed most of your kind! It makes you basically an accomplice! Is this really the side you want to be on?"], "Will you oppose what you should do?", endFight9);
    var endFight7 = optionGenerator(["You're unbelievable! Stop it! You're not supposed to resist! You're not supposed to go this way!"], "Will you resist the urge to kill?", endFight8);
    var endFight6 = optionGenerator(["Come on! You're supposed to kill him! He's the Big Bad Boss! What else is there? What other ending do you want there to be? Just listen to me! It's not too late for a happy resolution!"], "Will you murder the demon?", endFight7);
    var endFight5 = optionGenerator(["Just kill him already! It's not that hard! He deserves it! Think of all he's done! Avenge your friend!"], "KILL?", endFight6);
    var endFight4 = optionGenerator(["This is the last effort you'll ever need to do! Think of the peace that will come after! You'll be a hero! You'll have won!"], "Will you triumph?", endFight5);
    var endFight3 = optionGenerator(["If you waver now, all your efforts will be for nothing! Your whole journey will be meaningless! $$BestFriend$ will have died in vain!"], "Will you free the world from suffering?", endFight4);
    var endFight2 = optionGenerator(["This is the only way to rid the world of the demon threat, and all the suffering it brings! Without their leader, the demons will retreat and $$world_name$ will be saved!"], "Will you kill the Demon Lord?", endFight3);
    var endFight = optionGenerator(["$$demon_lord$ is on the floor, unconscious. Victory is in your grasp."], "Will you deliver the final blow?", endFight2);

    var startFight = function(){
      BATTLE.api.make("pandemonium/lord", endFight);
    }

    var extra = "";
    if(STATS.flag("FoughtMaou")>0){
      extra = " In fact, I've been one of your victims before! I've challenged you " + STATS.flag("FoughtMaou") + " times in the past already!";
    }

    this.interaction = function(){
      if(! ABILITIES.has_ability("_secret_ending_chosen")){
        TextBannerSequence.make([
          `$$demon_lord$: "So you made it all the way here, little vermin! Congratulations are in order, I suppose. But you must know that it is meaningless..."`,
          `$$Ren$: "Silence! I'll make you pay for all the lives you destroyed! For all my fellow humans! For $$BestFriend$!"`,
          `$$demon_lord$: "You're more stupid than I thought... Do you really think you're the first one to come here? Do you have any idea how many silly brats like you I've had to crush? None of them ever made any difference!"`,
          `$$Ren$: "Well, this time won't be the same! I know very well how many times you have to fail when the odds are stacked against you!${extra} But it changes nothing! I'll succeed eventually, because the Goddess is with me!"`,
          `$$demon_lord$: "Poor fool, what do you know of the Goddess?"`,
          `$$Ren$: "I know that She will guide me to victory!"`,
        ], startFight);
      } else {
        afterSecretEnd();
      }
    }
  }
}


class S_Throne extends SimpleObject {
  constructor(x, y){
    super(x, y, "pandemonium/throne", "obj_light");
    this.specify_sprite_size(200,184);
    this.adjust_hitbox(10,10,180,100);
    this.default_text = this.text_interaction([
      "This is the biggest piece of furniture you've ever seen. It seems carved directly in what appears to be bone, and richly aggremented of golden gildings and velvet cushions bigger than you. A fitting throne for the emperor of demons.",
    ]);
  }
}



class S_RockColumn extends SimpleObject {
  constructor(x, y){
    super(x, y, "cave/column");
    this.adjust_hitbox(0,0,40,30);
    this.specify_sprite_size(47,131);
    this.default_text = this.text_interaction([
      "A massive column of rock holds the ceilling of the cave above your head.",
      "A large natural pillar reaches all the way to the cavern's top.",
      "The cavern is pretty large and needs to be supported by several such rock stone.",
    ]);
  }
}

class S_CristalBig extends SimpleObject {
  constructor(x, y){
    super(x, y, "cave/cristalbig");
    this.adjust_hitbox(10,0,30,30);
    this.specify_sprite_size(54,96);
    this.default_text = this.text_interaction([
      "A large transparent rock lies in front of you. Through it, you can see the world in a azure teint.",
      "You find a massive ruby-like stone which reflects the pale surrounding glow with a bright red glare.",
      "This spiky stone shines brightly in a yellow hue and casts a powerful light on its surroundings.",
    ]);
  }
}

class S_CristalSmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "cave/cristalsmall");
    this.adjust_hitbox(10,0,35,20);
    this.specify_sprite_size(57,48);
    this.default_text = this.text_interaction([
      "This prismatic cristal deflects the light into a rainbow of a thousand shimmering hues.",
      "You find a rock that time has polished into a very smooth emerald surface.",
      "The translucent surface of this stone is marbled with darker lines which no doubt carry the trace of its history...",
    ]);
  }
}

class S_CristalTiny extends SimpleObject {
  constructor(x, y){
    super(x, y, "cave/cristaltiny");
    this.adjust_hitbox(10,0,30,30);
    this.specify_sprite_size(47, 45);
    this.default_text = this.text_interaction([
      "Tiny specks of luminous gravel surround you.",
      "The floor is littered with shimmering cristals that cast a vague glow on your feet.",
      "Little colored pebbles cast a diffuse multicolored light.",
    ]);
    this.walkable = true;
  }
}



class S_Hole extends SimpleObject {
  constructor(x, y, seed){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        super(x, y, "cave/hole");
        this.adjust_hitbox(0,0,48,90);
        this.specify_sprite_size(48, 90);
        break;

      case 1:
        super(x, y, "cave/hole2");
        this.adjust_hitbox(0,0,43,95);
        this.specify_sprite_size(43, 95);
        break;
    }
    this.default_text = this.text_interaction([
      "The ground in front of you seems fractured and about to give way...",
      "There's a crack in the floor in front of you. Too little to get in, but big enough to be dangerous.",
      "You drop a pebble in this crack to see how deep it goes. The answer is pretty deep.",
      "You feel like it's better to not get too close to this fractured stone, lest you may fall in.",
    ]);
  }
}



class S_HellPlantLeaning extends SimpleObject {
  constructor(x, y){
    super(x, y, "hell/plant");
    this.adjust_hitbox(10,0,30,10);
    this.specify_sprite_size(43,35);
    this.default_text = this.text_interaction([
      "This plant shines from an unnatural light.",
      "The plant is home of a swarm of disgusting bugs that fly around it noisily.",
      "The otherworldy vegetal undulates as if moved by a will of its own.",
    ]);
  }
}

class S_HellPlantSretching extends SimpleObject {
  constructor(x, y){
    super(x, y, "hell/plant2");
    this.adjust_hitbox(5,0,30,20);
    this.specify_sprite_size(32,46);
    this.default_text = this.text_interaction([
      "This vegetal extends slimy tentacles that look pretty poisonous.",
      "You observe an unfortunate fly get captured by the appendages of the unnatural plant.",
      "This plant looks like nothing you've ever seen, and doubtless comes from another world.",
    ]);
  }
}

class S_HellPlantSlimy extends SimpleObject {
  constructor(x, y){
    super(x, y, "hell/plant3");
    this.adjust_hitbox(5,0,20,15);
    this.specify_sprite_size(27,47);
    this.default_text = this.text_interaction([
      "This vegetal is constantly dripping brownish slime, like a repulsive fountain.",
      "All you can think of to describe this plant is that it looks a lot like someone dipped a little shrub in some sort of dark goo.",
      "You observe with a disgusted fascination the gunk that drops form the leaves of whatever this is. It makes an irregular squishy sound.",
    ]);
  }
}

class S_HellPlantLoops extends SimpleObject {
  constructor(x, y){
    super(x, y, "hell/plant4");
    this.adjust_hitbox(0,0,20,15);
    this.specify_sprite_size(16, 28);
    this.default_text = this.text_interaction([
      "This strange flower is made of many fibers that roll up and extend according to a pattern you cannot understand.",
      "As you approach the vegetal, you notice that it also extends in your direction. Better steer clear...",
      "This alien plant seems to slowly change color between purple and green.",
    ]);
  }
}

class S_Spike extends SimpleObject {
  constructor(x, y){
    super(x, y, "hell/spike");
    this.adjust_hitbox(0,0,30,30);
    this.specify_sprite_size(41, 96);
    this.default_text = this.text_interaction([
      "A brown spike perforates the rocky ground. You wonder if there's a monster under the ground...",
      "This sharp appendage rises unnaturally from the ground. It seems that it stopped moving a while ago and solidified among the rocks, but you prefer to not take any chance and not approach it.",
      "A spike taller than you emits an ungodly perverse aura.",
    ]);
  }
}



class S_HellEgg extends SimpleObject {
  constructor(x, y, seed){
    var gen = new Generator(seed);
    switch(gen.int(4)){
      case 0:
        super(x, y, "pandemonium/hellwebby1");
        this.adjust_hitbox(0,0,70,20);
        this.specify_sprite_size(70, 48);
        break;
    case 1:
      super(x, y, "pandemonium/hellwebby2");
      this.adjust_hitbox(0,0,40,30);
      this.specify_sprite_size(39, 59);
      break;
    case 2:
      super(x, y, "pandemonium/hellwebby3");
      this.adjust_hitbox(0,0,48,50);
      this.specify_sprite_size(48, 100);
      break;
    case 3:
      super(x, y, "pandemonium/hellwebby4");
      this.adjust_hitbox(0,0,45,30);
      this.specify_sprite_size(45, 91);
      break;
    }
    this.default_text = this.text_interaction([
      "This pile of gooey webs ebbs with an unhealthy glow.",
      "You find what you assume to be eggs, held together by a viscous net of gelatin.",
      "You imagine that demon larvae are gestating in these ungodly eggs. You seem some motion inside their slightly translucent membrane. Part of you wants to kill these monsters before they spawn, but you're not sure how to go about it. What if the fluid inside the egg was highly toxic? Better be careful...",
      "You accidentally brush the surface of the slimy heap. Your hand stays stuck and your skin starts to burn. You immediately withdraw.",
      "Gelatinous balls glow faintly with a yellowish hue. It also spreads a stink close to rotten meat.",
      "The slimy eggs are maintained above the ground by a complex entanglement of gelatinous threads. They seem to be slowly growing and retracting, as if pulsating...",
      "You venture the guess that this is where demons are created, and this is how they reproduce. Hopefully, destroying their kind will prevent them from spawning more of these monstrous eggs.",
    ]);
  }
}
