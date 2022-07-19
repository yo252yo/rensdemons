
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
    this.add_interaction("Admire", "You take a moment to look at the shell. It's pale, but it has shades from a myriad of hues that change as you move it around. It's quite mesmerizing.");
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
    this.add_interaction("Reanimate", "You take the bones and make them move, like a puppetmaster. Sadly, this is a very pale imitation of life, and it does not help you feel better.");
    this.add_interaction("Grind", "You think it would be a waste to leave some perfectly good bones here, so you start grinding them into a thin powder. Perhaps you can find someone who can make use of this in alchemy or in cooking...");
  }
}


class EB_Tomb extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/tomb", color, size);

    this.set_description(BESTIARY.intro("exterior/tomb"));
    this.add_interaction("Meditate", "You ponder the circumstances that lead travelers to this place. When they lost a fellow, they did their best to offer a proper burrial. The result is not very impressive, but they probably could not do better on the road. You silently hope you won't have to ever do the same for one of your companions.");
    this.add_interaction("Pray", "You address a silent prayer to the memory of this fallen stranger. May the Goddess take good care of their soul, wherever it may be.");
    this.add_interaction("Examine", "The wood that composes the tomb had been worn out by elements, showing its age. This was clearly done a long time ago. Could it be from a party of adventurers who tried to defeat $$demon_lord$ long before you?");
    this.add_interaction("Raid", "Throwing respect to the wind, you decide to rob this grave. This would be an extremely sacrilegious act, but you're the Promised Child, so you're pretty sure that the Goddess sanctions it. Unfortunately, this ethical debate is all for nothing, because the grave contains only bones and nothing of use.");
    this.add_interaction("Fix", "This shabby tomb is starting to show its age. Out of respect for the deceased, you decide to fix it up and improve it. After a few moments of dusting off and consolidating, it seems good as new.");
    this.add_interaction("Resurrect", "You gather your strength and attempt to cast a resurrection spell. But you quickly remember that although the Goddess blessed you with many powers, this is not one of them.");
  }
}

class EB_Well extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/well", color, size);

    this.set_description(BESTIARY.intro("exterior/well"));
    this.add_interaction("Sing", "You decide to leverage the acoustic properties of the well to sing a duet with yourself. It is not very good.");
    this.add_interaction("Throw", "You throw a pebble in the well to estimate how deep it is. After a few seconds, you hear the noise of the rock hitting the water. Only then do you realize it's actually pretty hard to translate this into an estimate of depth. But it's way too deep for you to go down, that's for sure.");
    this.add_interaction("Drink", "You drop a bucket in the well and use it to draw water. You quench your thirst and take this chance to refill the bottles you are carrying.");
    this.add_interaction("Exorcise", "This brings back legends and fairytales about possible spirits inhabiting wells. In doubt, you address a small prayer in an attempt to exorcise any potential wandering soul haunting this place.");
    this.add_interaction("Contaminate", "Estimating that this well will most likely be visited by hostile forces, you drop some poison in it. You pray that no innocent soul gets hurt by this move. But most of all, you pray that you remember to avoid using this well in the future.");
    this.add_interaction("Jump", "You almost jump down the well before realizing that it would be extremely foolish. You would have no way to get back. It's not like there is a cavern or a tunnel at the bottom of the well through which you could come back up... That would be silly.");
  }
}

class EB_Sign extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/sign", color, size);

    this.set_description(BESTIARY.intro("exterior/sign"));
    this.add_interaction("Read", "You read the sign. It contains very basic information about where you are and points the way to neighboring cities. That's a pretty run-of-the-mill sign.");
    this.add_interaction("Climb", "For unknown reasons, you attempt to climb the wooden sign. You stand on top in a fragile equilibrium for a few seconds. The view from up there made you feel glorious.");
    this.add_interaction("Inscribe", "You decide that it would be a nice gesture to scratch on this signs a few indications to help future travelers on their way. You write down a few important things you've learned about this area.");
    this.add_interaction("Decypher", "You try to read what the sign says, but the years of tough weather make this operation pretty impossible. Furthermore, you get the vague feeling that the original writing was not in a language you know. Could it be?");
    this.add_interaction("Burn", "You assess that the wood composing this sign is quite wasted here. What better purpose could it serve than to warm up the Promised Child? You tear it down and enjoy the respite of a small bonfire.");
    this.add_interaction("Guide", "You look closely at the sign, hoping for any indication that could help you on your quest. Sadly, the sign only has a few words about the surroundings, that everyone knows. So much for this...");
    this.add_interaction("Invert", "You decide to play a prank on the next group of adventurers to come this way and invert the direction of the sign. After all, you wouldn't want another group to defeat $$demon_lord$ before you do...");
  }
}

class EB_Tent extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/tent", color, size);

    this.set_description(BESTIARY.intro("exterior/tent"));
    this.add_interaction("Sleep", "After preparing your shelter, you give yourself up to a well deserved rest. You decide to sleep for as long as your body lets you. Energy is paramount in traveling.");
    this.add_interaction("Dream", "You fall asleep and start dreaming. You dream of a peaceful world full of magic where people could project themselves into one another's spirits and see through their eyes. When you wake up, you feel hopelessly alone.");
    this.add_interaction("Rest", "You still have a lot of grounds to cover. You allow yourself a quick rest, but you make a mental promise that you'll be gone before long.");
    this.add_interaction("Wear", "You take the fabric drape off the tent and wrap it around yourself. You spend a few minutes howling and pretending to be a ghost. It's great fun.");
    this.add_interaction("Weather", "As you finish building up the tent, the weather worsens. Thanking your luck, you patiently wither the end of the storm protected by your shelter.");
    this.add_interaction("Snuggle", "You snuggle in your blankets and hides. Adventuring is hard. Do you really have to go back? Maybe you could rest in this comfortable cocoon forever...");
  }
}

class EB_Camp extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/camp", color, size);

    this.set_description(BESTIARY.intro("exterior/camp"));
    this.add_interaction("Eat", "You make a meal with the provisions you're carrying. It's not amazing cuisine, but it does the job. You're not hungry anymore.");
    this.add_interaction("Cook", "You decide to take this chance to make something special. You take the ingredients you've gathered along your way, and let them stew together. The result is one step above the rations you usually eat on the road.");
    this.add_interaction("Roast", "You playfully approach berries and nuts from the flame to roast their surface only. They become crunchy.");
    this.add_interaction("Contemplate", "You lose yourself in the contemplation of the dancing flames. Their fluid motion is mesmerizing and puts your mind in a state of relaxing trance.");
    this.add_interaction("Warm", "You warm yourself by the fire. The weather has been getting colder lately. You've well earned a little break.");
    this.add_interaction("Light", "You take advantage of the shaky light of the fire to observe your surroundings. Shadows dance all around you, tricking you into thinking that there is a danger around every corner. You don't notice anything special.");
  }
}

class EB_Bush extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/bush", color, size);

    this.set_description(BESTIARY.intro("exterior/bush"));
    this.add_interaction("Hide", "You throw yourself in the bush and hide for a while. You're sure to be undetected by any enemy passing nearby. Sadly, there is none, and your whole stealth tactic is for naught.");
    this.add_interaction("Bounce", "You jump on the bush, expecting that the leafy branches would push you back in a pleasant bounce. But sometimes, reality does not match expectations. You pierce through the thin branches and fall face first on the ground.");
    this.add_interaction("Gather", "You decide to gather anything you can from this bush. There is not many berries, but maybe the leaves can be used for potions? When you're done, nothing is left but naked branches.");
    this.add_interaction("Scratch", "You walk a bit too close to the bush, and its thin branches scratch your skin in many tiny lines.");
    this.add_interaction("Fall", "As you walk near the bush, you trip and fall on it. Fortunately, the many branches of the plant cushion your fall, and you end up back on your feet without much damage.");
    this.add_interaction("Below", "You look below the bush and discover a few fresh MUSHROOMS that seem edible. You decide to collect them for later.", function(){INVENTORY.increase(ITEM.Mushroom);});
  }
}
