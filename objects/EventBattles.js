
class EB_Pebbles extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/pebbles", color, size);

    this.set_description(BESTIARY.intro("exterior/pebbles"));
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

class EB_Plants extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/plant", color, size);

    this.set_description(BESTIARY.intro("exterior/plant"));
    this.add_interaction("Pluck", "You harvest a leaf from the small plant. It's very green, but serves no purpose whatsoever. Did you imagine it would trigger something? Why did you do that?");
    this.add_interaction("Trample", "You jump on the plant and trample it to death, under the inquisitive gaze of $$BestFriend$. You explain that you really couldn't help yourself.");
    this.add_interaction("Taste", "Trusting your instinct, you shove a bit of the leaves in your mouth, before immediately spitting it out. It may not have been poisonous, but it tasted extremely bitter.");
    this.add_interaction("Whistle", "You take a bit of leaf between your fingers and try to live an iconic moment whistling with $$BestFriend$. Fortunately, the Goddess knows better than to let you succeed. You feel a short lived embarrassment at your failure, but the success would probably have given you a much more awkward memory.");
    this.add_interaction("Rub", "You rub the plant on your arm, moved by the vague impression that some leaves are supposed to be medicinal. Nothing much happens.");
    this.add_interaction("Uproot", "You seize the base of the plant and pull with all your strength. It's not easy, but you manage to get it out of the ground. Now what? You ask the Goddess inside you. But there's no answer.");
    this.add_interaction("Water", "You share some of your resources with the plant. It doesn't thank you, but you can feel its gratitude. Or maybe you're imagining it.");
  }
}

class EB_Seashell extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/seashell", color, size);

    this.set_description(BESTIARY.intro("exterior/seashell"));
    this.add_interaction("Listen", "You bring the seashell to your ear. It is said that you can hear the sea, but since you're already underwater, it changes nothing for you.");
    this.add_interaction("Grind", "You crush the shell with your boot. Soon, it's nothing but a thin powder, barely distinguishable from the sand around. $$BestFriend$ seems disappointed.");
    this.add_interaction("Ornate", "You take the shell and quickly fashion a little necklace from it, that you give to $$BestFriend$. The presents is much appreciated, and the new ornament makes the smile of your best friend smile even brighter.");
    this.add_interaction("Balance", "You try to balance the seashell on your finger. The pressure of the water around you makes it pretty easy. You're not sure why you did it, but it does feel a little nice.");
    this.add_interaction("Admire", "You take a moment to look at the shell. It's pale, but it has reflects from a myriad of hues that change as you move it around. It's quite mesmerizing.");
    this.add_interaction("Gather", "This might be worth something. You pick it up, before noticing it's actually broken in several pieces. No use for it now...");
  }
}

// NO BEST FRIEND!
class EB_Skeleton extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/skeleton", color, size);

    this.set_description(BESTIARY.intro("exterior/skeleton"));
    this.add_interaction("Plunder", "You look around for any valuables that might be up for the taking after the demise of their previous owner. Sadly, there doesn't seem to be anything eager to be adopted by your benevolent care.");
    this.add_interaction("Empathize", "You try to imagine the life of whoever these bones used to be. They had a family, friends, desires, hopes... But now this pile of bones is all there is to show for it. It's tragic, but it's the fate that awaits you too, some day.");
    this.add_interaction("Investigate", "You look closely at the bones to try and figure out what you can about the person or the circumstances of their death. Sadly, you're just a child, and not a wise scholar well versed in medicinal studies, so you don't learn anything from this, but it was certainly worth a shot!");
    this.add_interaction("Scramble", "Moved by the Goddess, you mess up the pile of bones. Why would anyone do such a thing? Maybe someone in the far future will find these bones, and imagine they belonged to someone very weirdly shaped?");
    this.add_interaction("Scrutinize", "Looking at the bones, you can clearly see bitemarks. Some scavenger animal came this way and devoured what was left of this pour soul.");
    this.add_interaction("Harmonize", "You forget all respect for the dead and start smashing the bones against each other, producing some different sounds. Pretty soon, you've mastered their tone and you've managed to compose a pleasant rhythmic melody.");
    this.add_interaction("Study", "You look at the different bones and how they fit together, shuddering at the thought that something very similar is present inside of you.");
  }
}


class EB_Tomb extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/tomb", color, size);

    this.set_description(BESTIARY.intro("exterior/tomb"));
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
  }
}

class EB_Well extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/well", color, size);

    this.set_description(BESTIARY.intro("exterior/well"));
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
  }
}

class EB_Sign extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/sign", color, size);

    this.set_description(BESTIARY.intro("exterior/sign"));
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
  }
}

class EB_Tent extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/tent", color, size);

    this.set_description(BESTIARY.intro("exterior/tent"));
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
  }
}

class EB_Camp extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/camp", color, size);

    this.set_description(BESTIARY.intro("exterior/camp"));
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
  }
}

class EB_Bush extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/bush", color, size);

    this.set_description(BESTIARY.intro("exterior/bush"));
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
    this.add_interaction("...", "...");
  }
}
