// use(Object)
// runtime: Rectangle, StaticSprite

//hack Special objects

class S_Column extends LevelObject {
  constructor(x, y, seed){
    var visual = new StaticSprite("assets/objects/interior/column.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(10,0,20,15);
    this.interaction = this.text_interaction([
      "It's a column.",
      "Nothing but a column.",
      "A simple yet elegant stone column. It's supporting the roof.",
    ], seed);
  }
}

class S_Stairs extends LevelObject {
  constructor(x, y, up, destination){
    var dir = up ? '_up' : '_down';
    var visual = new StaticSprite(`assets/objects/pandemonium/stairs${dir}.png`, 'obj_dark');
    visual.specify_sprite_size(48, 48);
    super(visual, x, y);
    this.adjust_hitbox(0,0,48,48);

    this.interaction = function() {
      CURRENTLEVEL.setup(destination);
    }
  }
}

class S_Door extends LevelObject {
  constructor(x, y, closed, lock){
    var visual = new StaticSprite(`assets/objects/pandemonium/door_open.png`, 'obj_dark');
    visual.specify_sprite_size(98, 92);
    super(visual, x, y);
    this.closed = closed;
    if(this.closed) {
      this.visual_closed = new StaticSprite(`assets/objects/pandemonium/door_closed.png`, 'obj_dark');
      this.visual_closed.place_at(this.x, this.y);
      this.adjust_hitbox(0,0,98,40);
      this.lock = lock;
    } else {
      this.adjust_hitbox(0,0,0,0);
    }
  }

  open(){
    if(this.visual_closed){
      this.visual_closed.destroy();
    }
    this.adjust_hitbox(0,0,0,0);
    this.closed = false;
  }

  interaction(){
    if (!this.closed){ return; }

    if(INVENTORY.count(ITEM['MaouKey' + this.lock]) > 0) {
      this.open();
    } else {
      TextBannerSequence.make([
        "Your path is barred by a massive door radiating demonic energy. You understand from the runes and pictograms carved in the stone that to open it you will need the " + ITEM['MaouKey' + this.lock] + ". Armed with your Goddess given intuition, you're convinced that it's on this floor.",
      ]);
    }
  }
}

class S_StainedGlass_wall extends LevelObject {
  constructor(x, y, type, seed){
    var visual = new StaticSprite("assets/objects/stainedglass/" + type + ".png", 'obj_light');
    if(type == "church") {
      visual.specify_sprite_size(41, 140);
    } else {
      visual.specify_sprite_size(55, 140);
    }
    super(visual, x, y);
    this.interaction = this.text_interaction([
      "The giant stained glass bathes the whole room in colorful lights.",
      "This stained glass window is massive.",
      "The light peeks through the magnificent ornate shapes, and you feel as if it comes from the Goddess herself.",
      "It takes you a few moment to understand the mosaic picture that those numerous little fragments are forming.",
      "The colorful light carresses your cheek and you feel as if the Goddess herself is reaching out through these windows.",
      "You look at the deformed picture in colorful shadows that this window projects on the ground.",
      "You marvel at the subtle craftsmanship that conspired to create so many fragments of colors that all fit together perfectly in a luminous picture.",
      "Just like the window lights up the room, so too does the religious picture on display light up the mind.",
    ], seed);
  }
}

class S_RoyalThrone extends SimpleObject {
  constructor(x, y, seed){
    super(x, y, 36, 83, "interior/throne");
    this.adjust_hitbox(0,0,36, 53);

    this.default_text = this.text_interaction([
      "This is the throne of the king of all humans. It's suitably cushiony.",
    ], seed);
  }
}

class S_Altar extends LevelObject {
  constructor(x, y, type){
    var visual = new StaticSprite("assets/objects/interior/savepoint.png", 'obj_light');
    visual.specify_sprite_size(50,50);
    super(visual, x, y);
    this.adjust_hitbox(5,-5,40,20);
    this.type = type;
  }

  interaction(){
    var type = this.type;
    var options = {};
    var text = "";

    if (Object.keys(ITEMS_ARCHETYPES).includes(type)){
      options = [{"text": "Offer", "effect": function(){ SHOP.menu_sell(type, 100000); }},
                {"text": "Request", "effect": function(){ SHOP.menu_buy(type, 100000); }}];
      text = "You can offer goods or coins for requests.";
    }
    if (Object.keys(ABILITIES_ARCHETYPES).includes(type)){
        options = [{"text": "Meditate", "effect": function(){ TRAINER.menu(type, 100000); }}];
        text = "You can medidate in hope that the Goddess teaches you.";
    }

    new CenteredTextMenu(`What is an Altar of the Goddess doing in such an unholy place? You can pray so that She remembers you, but you notice that this altar is also dedicated to the Way of the ${type}. ${text}`,
                  options.concat([
                    {"text": "Worship", "effect": function(){ SAVE.print.save_menu(); }},
                    {"text": "Postpone", "effect": "##CLOSE"}
                 ]));
  }
}

class S_SavePoint extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/interior/savepoint.png", 'obj_light');
    visual.specify_sprite_size(50,50);
    super(visual, x, y);
    this.adjust_hitbox(5,-5,40,20);
  }

  interaction(){
    new CenteredTextMenu("You found an Altar of the Goddess. Will you pray that She remembers you?",
                  [
                    {"text": "Worship", "effect": function(){ SAVE.print.save_menu(); }},
                    {"text": "Postpone", "effect": "##CLOSE"}
                 ]);
  }
}

//hack Indoors furniture

class B_Statue extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 50,100, "interior/statue");
    this.adjust_hitbox(0,0,50,40);

    this.add_interaction("Prostrate", "You prostrate yourself in front of the statue of the Goddess.");
    this.add_interaction("Admire", "This crude statue barely does justice to Her splendor, but you're glad to see Her presence near you.");
    this.add_interaction("Ponder", "A holy statue of the Goddess, like many others in this town.");
    this.add_interaction("Contemplate", "An effigy of the protective Goddess. Its presence is a silent invitation for Her grace upon this place.");
    this.add_interaction("Salvage", "You notice that this statue is a bit old. Some parts of it are crumbling. You seize a piece of rock that rolled a few feet away, and decide to keep it.", INVENTORY.increase_function(ITEM.Stone));
  }
}

class B_Bed extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 32,75, "interior/bed");
    this.adjust_hitbox(-2,0,34,60);

    this.add_interaction("Inspect", "This bed is made of linen covering a wooden frame. The thin mattress is made of hay. It doesn't look too great...");
    this.add_interaction("Resist", "This bed looks very comfortable. The thick wool beddings beckon you.");
    this.add_interaction("Envy", "The pillow seems to be made with feathers. How were they able to afford such luxury?");
    this.add_interaction("Nap", "The Goddess wants you to take a nap. It's not your bed, but it will do. You comply reluctantly. You can get a few minutes of sleep, and wake up barely more rested than before. Maybe even a bit more groggy.");
    this.add_interaction("Sit", "You obey the voice of the Goddess inside you that urges you to sit on the bed. You sit for a while and look at your surroundings. It's pretty boring, so you stop.");
    this.add_interaction("Loot", "The Goddess whispers you to plunder this bed. You remove the sheets, throw the pillows on the ground, open up the mattress... It was all for naught, because there's obviously nothing of value in a random bed. You apologize meekly, while $$BestFriend$ looks at you bewildered, between shock and consternation. At least you got some linens out of the whole ordeal...", INVENTORY.increase_function(ITEM.Linnens, 2));
    this.add_interaction("Roll", "You decide to embrace the joyful child in you and start rolling around on the bed. $$BestFriend$ seems judgmental at first, but finally concedes and joins you.");
    this.add_interaction("Assess", "Curious about the fabric quality, you rub your cheek against it. You're immediately embarrassed by the realization that you could have simply used your hands, but you're already committed. To top it all off, the fabric is not even especially soft.");
  }
}

class B_Bucket extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 31,28, "interior/bucket");
    this.adjust_hitbox(0,0,31,28);

    this.add_interaction("Examine", "A bucket full of fresh water. Someone must have brought it back from the well recently.");
    this.add_interaction("Behold", "This bucket is empty...");
    this.add_interaction("Wonder", "As you gaze at this bucket, you can't help but wonder if this is really the best place for a bucket... But on the other hand, why not?");
    this.add_interaction("Thirst", "You suddenly realize you're pretty thirsty as you see water in this bucket. You wonder if you should ask for a sip... They probably wouldn't refuse... No, better hold it in.");
    this.add_interaction("Drink", "Moved by the Will of the Goddess, you grab the bucket and drink all the water in it. The family is due for another trip to the well, and $$BestFriend$ is angry at you... Good job.");
    this.add_interaction("Touch", "You impulsively cave to the urges the Goddess is imprinting on you, and put your hand in the bucket. You're wet now. Well done.");
    this.add_interaction("Seize", "Without a second thought, you grab the bucket and look inside. You don't know what you expected, it's just an empty bucket. Still, you can't shake the feeling that there should be something there...");
  }
}

class B_Cabinet_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 31,48, "interior/cabinet");
    this.adjust_hitbox(0,0,31,48);

    this.add_interaction("Imagine", "The family stores their belonging in this cabinet. What kind of things are there? You're curious, but you don't want to intrude. You're invading their privacy enough as it is...");
    this.add_interaction("Esteem", "Not everyone could afford a wooden cabinet with engravings of holy texts. This is surely a mark of wealth.");
    this.add_interaction("Condemn", "This storage container looks pretty unsteady. The people here probably built it themselves. Better not touch it.");
    this.add_interaction("Resist", "You try and resist the urge to open the cabinet and go through this family's possessions. Who would do such a thing?");
    this.add_interaction("Violate", "You cannot help but opening the drawers of this cabinet. $$BestFriend$ is outraged and tries to stop you, but nothing can be done. The Goddess is acting through you again. You rummage through foreign clothes and linens. Seriously, what good is that? You still take some anyway, you never know...", INVENTORY.increase_function(ITEM.Linnens));
    this.add_interaction("Open", "Pushed by Her Divine Grace, you go open this little cabinet. It's full of tableware and plates. What were you hoping to find?");
  }
}

class B_Chair extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 30,33, "interior/chair");
    this.adjust_hitbox(0,0,30,33);

    this.add_interaction("Please", "You want to sit in it. But it would be rude. Or would it? You're not even sure...");
    this.add_interaction("Recall", "You recognize this chair as the work of a local craftsman.");
    this.add_interaction("Sit", "The Goddess compels you to sit on this chair for a few seconds, and to get up again. That was pointless, $$BestFriend$ is puzzled. But Her ways are mysterious.");
    this.add_interaction("Obey", "Obeying the commands of the Goddess, you stare at this perfectly unremarkable chair. It's so unremarkable. You stare at it so much that you start to wonder whether its utterly unremarkableness wouldn't be a special feature in itself. Was that what the Goddess wanted you to understand?");
    this.add_interaction("Obliterate", "With the Goddess on your side, you violently smash the piece of furniture. $$BestFriend$ is quite shocked by this behavior and tries to stop you, but to no avail. The deed is done. At least you can get a bit of wood out of this.", INVENTORY.increase_function(ITEM.Stick, 2));
  }
}

class B_Hay extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 64,66, "interior/hay");
    this.adjust_hitbox(0,0,64,36);

    this.add_interaction("Appraise", "Hay may not make the most comfortable of beds, but it is certainly the cheapest.");
    this.add_interaction("Empathize", "Any place can be a bed when you're tired enough. When monsters roam the lands, you cannot be too picky..");
    this.add_interaction("Jump", "The Goddess urges you to jump in the hay. $$BestFriend$ joins you and you have a great time. It's fun, but now you're covered in it.");
    this.add_interaction("Sleep", "You get the feeling that the Goddess wants you to nap there. You try for a while, but it's so uncomfortable. You get back up, feeling that you've failed Her.");
    this.add_interaction("Stare", "For some reason, it seems that the Goddess wants you to look at this haystack. Does She want you to count how many stems there are? Does She want you to find something in there? Surely She could not be this cruel... You try to chase the thought from your mind.");
  }
}

class B_Housefire extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 33,33, "interior/housefire");
    this.adjust_hitbox(0,0,33,20);

    this.add_interaction("Appreciate", "The fire keeps the room warm and cooks the food. Two blessings in one.");
    this.add_interaction("Yearn", "On the fire, a pot is slowly cooking. It's some sort of stew. Or a soup?");
    this.add_interaction("Smell", "The smell of burning wood is filling up the room. It feels... nostalgic.");
    this.add_interaction("Nab", "Compelled by the Goddess, you grab a bit of the food that's slowly roasting on the fire and devour it. It may not have been yours to take, but the Will of the Goddess is absolute.");
    this.add_interaction("Probe", "You extend a hand towards the fire. It's warm. You get your hand closer and closer... Aouch! You burned yourself. Surely, you were not in control of yourself. It must have been the Goddess. $$BestFriend$ smirks, happy to see you get what you deserve.");
    this.add_interaction("Commandeer", "As Promised Child, you are entitled to the food of this household. $$BestFriend$ might not have realized that yet. But there is nothing your friend can do to stop you from grabbing what is cooking for yourself.", INVENTORY.increase_function(ITEM.Meat));
  }
}

class B_Jar extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 32,35, "interior/jar");
    this.adjust_hitbox(0,0,32,20);

    this.add_interaction("Think", "This jar probably holds water. Or maybe a more expensive alcoholic beverage?");
    this.add_interaction("Reminisce", "You wonder for a second what secrets this jar holds. Maybe it's full of fruits, macerating in their juice...");
    this.add_interaction("Crush", "Something in you compels you to break this jar. Jars are for breaking, aren't they? As you do, all the berries it contained spill on the floor. You manage to save a few for your personal use.", INVENTORY.increase_function(ITEM.Berry,3));
    this.add_interaction("Break", 'As you watch this jar, you can hear the voice of the Goddess inside you. "Break it... Break it...". You resist it. For now...');
    this.add_interaction("Smash", "Compelled by the Goddess, you mercilessly throw that jar on the ground to break it. It was empty. How embarrassing. You try to put the pieced back together, but the deed is done. $$BestFriend$ is shocked when the owner turns out really understanding and forgives you as soon as you mention that you're the Promised Child.");
    this.add_interaction("Appreciate", "This must be the work of a skillful potter. The surface is smooth, without obvious defect. So much effort went into this. And yet it is so fragile, so very breakable...");
    this.add_interaction("Punch", "Moved by an unexplainable intuition that this jar might contain something of worth, you punch and smash the pottery. To your dismay, you find that it's completely empty. Some jars are.");
  }
}

class B_Shelf_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 59,67, "interior/shelf");
    this.adjust_hitbox(0,0,59,67);

    this.add_interaction("Look", "This shelf stores the family's food supplies. In a corner, there's even meat being salted and dried. Pretty fancy considering the dire situation that the devil's hordes have put the village in.");
    this.add_interaction("Consider", "This shelf is mostly empty. Most people survive day to day, without much resources. The Demon Lord $$demon_lord$ and its armies have forced the village into poverty and famine. But this may be about to change...");
    this.add_interaction("Inspect", "The Goddess pushes you to look closely at every inch of this shelf. Are you looking for some sort of clue? There's nothing here, just an ordinary shelf, emptied by the cruel circumstances that the evil armies have forced the village into.");
    this.add_interaction("Mess up", "Compelled by forces beyond yourself, you shuffle all the vegetables from this shelf. It would feel satisfying, if it wasn't also a bit shameful. It's not easy being a Divine vessel.");
    this.add_interaction("Pillage", "As soon as you feel like nobody is watching you, in a quick gesture, you grab something at random from the shelf and put it in your pocket. It turns out to be some medicinal herbs.", INVENTORY.increase_function(ITEM.Flower));
  }
}

class B_Stool extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 25,28, "interior/stool");
    this.adjust_hitbox(0,0,25,28);

    this.add_interaction("Avoid", "This stool doesn't seem very sturdy. It's obviously been put together by unskilled villagers. Better not rest on it.");
    this.add_interaction("Climb", "You cannot resist the urge to stand on the stool. $$BestFriend$ watches you, split between amusement and concern. Surely an act of the Goddess again...");
    this.add_interaction("Sit", "Obeying your inner voice, you sit on this stool. Nothing happens. You stand back up. Thanks you, Goddess.");
    this.add_interaction("Destroy", "The Goddess tells you that this stool would be much more useful to your quest as spare parts. $$BestFriend$ is not convinced by that argument, but cannot stop you from breaking down the piece of furniture and salvage its wood.", INVENTORY.increase_function(ITEM.Stick, 2));
  }
}

class B_Table extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 31,34, "interior/table");
    this.adjust_hitbox(0,0,31,34);

    this.add_interaction("Judge", "This table has clearly seen better days. You can see on it the marks of its usage. You can't help but think of the many meals, generation after generation, that this simple piece of furniture supported.");
    this.add_interaction("Hide", "You do not want to. You know how ridiculous it would be. But you also know you cannot resist the Goddess. So you crawl under the table, and stay hidden there for a while. You're not actually hidden, everyone can see you, especially $$BestFriend$ who keeps calling you back. This is so embarrassing. You finally get out, and swear to never acknowledge this happened.");
    this.add_interaction("Touch", "The Goddess makes you touch all the planks this table comprises. 13. This must mean something. Or must it?");
    this.add_interaction("Obliterate", "Before $$BestFriend$ can stop you, you jump on the table with all your strength. It's not long before the table is in shambles, and you fall on your back in the middle of wood pieces. $$BestFriend$ may laugh at your misfortune, but at least you got a bit of lumber out of that.", INVENTORY.increase_function(ITEM.Stick, 2));
  }
}

class B_Chest extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 50,45, "interior/chest", 1);
    this.adjust_hitbox(0,0,50,24);

    this.add_interaction("Resign", "It's just a matter of time before the Goddess has you ransacking it, isn't it?");
    this.add_interaction("Withstand", "You know the Goddess wants you to open this chest and loot it, but you also know it would be pointless and impolite. You try to look away, and keep the thought away from your mind.");
    this.add_interaction("Marvel", "Not only does this family have possessions, they have so much that they can even put some in a chest! It's nice to see that the everlasting war spared a few people.");
    this.add_interaction("Pillage", "You cannot help but obey the Goddess' orders. You force the chest open and dive into it head first. You swim through layers of linens that aren't yours. Nothing of interest here. You got nothing out of it but embarrassment.");
    this.add_interaction("Rob", "You jump on the chest and open it in a wide motion divinely guided, but your enthusiasm fades as soon as you see how empty it actually is. You fight tears thinking back at what it must have contained, one day. These people really need a savior.");
    this.add_interaction("Open", "You try to open the chest, but it is locked. Not all families leave their most pricy possessions at the mercy of the first passer-by...");
    this.add_interaction("Plunder", "Pushed by a force beyond your control, you open the chest and take whatever content you deem could be useful. You find an old wooden sword, probably a child's toy. Surely they won't miss it, if it's for the Goddess.", INVENTORY.increase_function(ITEM.Sword_wooden));
  }
}

class B_AlchemyShelf_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 48,96, "interior/alchemyshelf");
    this.adjust_hitbox(-3,0,51,46);

    this.add_interaction("Count", "Moved by an unknown compulsion, you begin counting the jars on the shelf. $$BestFriend$ is quizzical but respectful of your obsession. You count twelve jars, two of whom are empty.");
    this.add_interaction("Taste", "Without asking the owner, you open a jar and taste one of the vegetables pickling inside. It's sour. Nothing happens.");
    this.add_interaction("Throw", "You take one of the jars and prepare to smash it on the ground, surely filling the whole room with smelly pickle juice. At the last second, you second guess yourself and realize that this is a terrible idea. You curse yourself for having it in the first place.");
    this.add_interaction("Reorganize", "You move the jars so that they are ordered by how much is left inside. Much better.");
    this.add_interaction("Observe", "You detail the content of the jars in the shelf. Most seem to be filled with vegetables, pickling for a longer conservation time. One is filled with seeds. A few here and there are empty, waiting for the next harvest.");
  }
}

class B_Barrel extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 30,33, "interior/barrel");
    this.adjust_hitbox(0,0,30,15);

    this.add_interaction("Hide", "The Goddess thinks you would look really cute wearing a wooden barrel, so you immediately execute on this thought and pop the lid of the barrel open to sneak inside. You're not quite sure what effect the Goddess expected, but $$BestFriend$ finds this pretty hilarious.");
    this.add_interaction("Pierce", "You pierce a hole in the barrel. Wine starts pouring from it on the floor of the room. You panic and try to find a solution to mitigate this mess. Fortunately, $$BestFriend$ is more clear-headed, and rolls the barrel on the floor, placing the hole on the up side.");
    this.add_interaction("Roll", "You push the barrel on its side and make it roll around the room. It's pretty fun, but mostly loud. The barrel continues spinning under its own weight. When you eventually get bored, you realize it's too heavy for you to put it back up.");
    this.add_interaction("Drink", "You pop a open a lid at the bottle of the barrel and attempt to drink directly from it. You clearly underestimated the liquid's pressure. You cannot resist more than a few seconds before mead spills out from your mouth and splashes on your face. Pretty soon, you're taking a sugary shower.");
    this.add_interaction("Smell", "The wooden keg is recent and smells of freshly cut wood. It's oiled, so the surface is also smooth to the touch.");
  }
}

class B_Bocals extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 41,42, "interior/bocals");
    this.adjust_hitbox(0,0,31,20);

    this.add_interaction("Smash", "You take one of the delicates glass jars and violently smash it on the ground. Shards of glass are spread everywhere. It's now dangerous to walk around. Well done. You must be proud of yourself.");
    this.add_interaction("Dip", "You throw hygiene to the wind, open one of the jar and dip a finger in. You then lick the sugary jam from your skin. It's delicious, but this was gross.");
    this.add_interaction("Observe", "These two glass jars have been emptied recently. They're due for an in depth cleaning soon.");
    this.add_interaction("Judge", "You think it's a bit irresponsible to leave such a breakable glass jar on the floor. Any clumsy visitor or passing adventurer could just bump into it and spread its content on the floor. A chance you're not like that.");
    this.add_interaction("Play", "You take a bit of the remaining jam and put some on $$BestFriend$'s nose. The counterattack comes fast. Pretty soon, you're at each other's throats in an intense tickle match, without any consideration for the owner of the place.");
  }
}

class B_Box extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 33,34, "interior/box");
    this.adjust_hitbox(0,0,33,24);

    this.add_interaction("Empty", "You proceed to move one by one all the potatoes from the box to the ground around. It's extremely slow and completely pointless. $$BestFriend$ is furious.");
    this.add_interaction("Look", "Harvest must have been decent for a change, the box is full of freshly reaped potatoes. It seems that it could last a while. It better, because who knows when the harvest will be good again?");
    this.add_interaction("Juggle", "You grab a few potatoes and start juggling with them. Since you don't know how to juggle, they fall quickly on the ground.");
    this.add_interaction("Sneak", "You think for a moment that a wooden box such as this could be a great way to hide and sneak around without attracting unwanted attention, but you quickly come back to your senses, realizing that a moving box is bound to attract unwanted attention in the first place.");
    this.add_interaction("Taste", "Are you crazy? No matter what thoughts cross your mind, you can't eat raw potatoes! They take a lot of preparation before being ready for consumption...");
  }
}

class B_Chimney_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 51, 96, "interior/chimney");
    this.adjust_hitbox(-5,0,56,96);

    this.add_interaction("Discover", "You're pretty sure this kind of chimney is the place where a secret passage would be. You wait until the fire dies down, then process to press methodically each and every stone of the fireplace. But there is nothing to be found. Although, maybe it required a special combination of presses...");
    this.add_interaction("Climb", "As soon as the fire dies of, you slide yourself inside the chimney and attempt to go up. You may have expected a secret compartment or even a noteworthy experience, but there's nothing but a lot of soot. When you come down, you realize with shame that you've made the whole room black, in addition to your own body of course.");
    this.add_interaction("Warm", "You warm yourself at the fire. The heated air is slowly engulfing you, making you drowsy. It feels good to be close to the heat source of this room. You deserve a little rest.");
    this.add_interaction("Observe", "You look at the dancing flames in the heart of the chimney. You remain there longer than you anticipated, mesmerized by the fluid movements of the fire.");
  }

}

class B_Clock_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 34,87, "interior/clock");
    this.adjust_hitbox(-5,0,39,87);

    var d = new Date();
    var datestring = d.getHours() + ":" + d.getMinutes();
    this.add_interaction("Look", "You read the time on the clock. It is now " + datestring + ".");
    this.add_interaction("Monitor", "You keep looking at the clock, counting seconds in your head. As a vague intuition in you suggested, you discover that the needles do not move and that the clock seems broken. Weirder yet, it seems to indicate more or less the current time. What a coincidence. A broken clock is still right twice a day, after all.");
    this.add_interaction("Wonder", "The clock displays the correct time, like all the other clocks you've ever seen. Yet, you've never actually seen the needles move as time passes. Weird.");
  }
}

class B_Papers extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 23,23, "interior/papers", 1);
    this.adjust_hitbox(0,0,23,18);

    this.add_interaction("Peek", "You cannot help but peek at the papers. They are testaments dealing with the ways to handle the family's possession in various dire consequences.");
    this.add_interaction("Read", "Those parchments describe the history of the town and the kingdom. It seems perfectly accurate, but why would someone have that at their homes?");
    this.add_interaction("Crumple", "Following a divine command, you take those potentially important parchments and crumbles them into a ball. If they were so important, why were they on the floor in the first place?");
    this.add_interaction("Glance", "A quick glance tells you that it's a list of vegetables. Is it a shopping order? A harvest account? A business ledger?");
    this.add_interaction("Listen", "You carefully lend an ear and appreciate the cracking noise of the paper when you step on it. The owner appreciates it a lot less, but eventually forgives you when you tell him you're the Promised Child.");
  }
}

class B_Sack extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 36,35, "interior/sack");
    this.adjust_hitbox(0,0,36,18);

    this.add_interaction("Sit", "The bag of cereals espouses the shape of your body as you fall down into it. It turns out to be unexpectedly comfortable.");
    this.add_interaction("Punch", "You punch the bag, expecting it to make a dent, but the resistance is stronger than you anticipated and you end up hurting yourself while the bag remains unchanged.");
    this.add_interaction("Lift", "You grab the bag and get a good grip, but your attempts to lift it utterly fail. It's way heavier than you anticipated.");
    this.add_interaction("Examine", "You know this type of heavy burlap bags. They're used to bring wheat to the mill and take flour back. You can tell by the white deposits that this one is full of flour.");
    this.add_interaction("Appraise", "You wonder how much you could trade this bag of flour for. It seems like it could fetch a good price. But it's too impractical to carry around. Not to mention you don't want to deprive a family from their main food source.");
  }
}

class B_FancyShelf_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 49,97, "interior/fancyshelf");
    this.adjust_hitbox(-5,0,54,47);

    this.add_interaction("Admire", "This shelf has some metal linings and glass doors. This speaks volume about how expensive it is. This piece of furniture is fit for a castle, not a small peasant house.");
    this.add_interaction("Look", "The beautifully crafted container protects expensive looking plates and cutlery. Business must be going well for the owners.");
    this.add_interaction("Steal", "Such a display of wealth is begging to be robbed, but the door is securely locked close. You curse your luck and move on.");
  }
}

class B_Candles_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 31,59, "interior/wallcandles");
    this.adjust_hitbox(-5,0,36,59);

    this.add_interaction("Blow", "You blow on the candles. The room is a bit darker.");
    this.add_interaction("Play", "You play with the candles by passing your fingers quickly through the flame. If you're fast enough, it doesn't hurt. $$BestFriend$ wonders what the point of this is.");
    this.add_interaction("Appreciate", "The candles fill the room with a frail dancing light and a faint smell of wax.");
  }
}

class B_Window_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 32,54, "interior/window");
    this.adjust_hitbox(-5,0,37,54);

    this.add_interaction("Look", "You peek through the window at the neighboring town. The atmosphere is pretty much the same on this side of the house.");
    this.add_interaction("Judge", "It appears that this window has not been cleaned in a while. You can't even properly see through. The inside heat makes it even more foggy.");
    this.add_interaction("Race", "You watch droplets of rain race down the window and take bets with yourself about which one will arrive at the bottom first. You win the bet.");
  }
}

class B_CurtainedWindow_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 52,72, "interior/curtainedwindow");
    this.adjust_hitbox(-5,0,57,72);

    this.add_interaction("Hide", "You roll yourself inside the heavy curtains. Despite everything, you're still a kid. It would be a great hiding spot if your friend was not next to you when you hid.");
    this.add_interaction("Close", "You close the curtains. They show signs of wear. This household probably does not like outsiders peeking inside.");
    this.add_interaction("Appraise", "The curtains are dusty. The bottoms are eaten to shreds by some insects. It's high time to replace them, but war makes this a low priority.");
  }
}

//hack Region-locked furniture

// Fear
class B_WeaponRack extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 48,39, "interior/weaponrack", 1);
    this.adjust_hitbox(0,0,48,20);

    this.add_interaction("Hairbrush", "The metal is so shiny that you can see yourself in it. You take this chance to fix up your hair.");
    this.add_interaction("Touch", "Drawn by the shine, you approach your finger from the blade. Well done, now you're bleeding.");
    this.add_interaction("Jump", "This looks like a hurdle, doesn't it? You feel compelled to jump above it, but you hit it and it falls, making a loud metallic mess in the process.");
    this.add_interaction("Wonder", "In this town, you've seen more weapons than citizens. Do they really need more than one per head?");
    this.add_interaction("Disgust", "One of the blades still has blood on it, proudly displayed as a token of a past victory.");
    this.add_interaction("Inspect", "The owner name is inscribed on the blade. It's accompanied by a motto that is less than kind to strangers.");
    this.add_interaction("Steal", "Dreaming of the price these weapons are worth, you try to sneak one away, but they are so important in this city that the owners never let them out of their sight for long.");
  }
}

class B_ShieldDisplay_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 28,52, "interior/shielddisplay", 1);
    this.adjust_hitbox(-4,0,32,52);

    this.add_interaction("Music", "You give a dry knock on the shield, You modulate the metallic noise it makes into a small melody. $$BestFriend$ is dubious about your performance.");
    this.add_interaction("Notice", "You see a lot of weapons and shields in this city. It seems that every villager makes a point of having the means to defend themselves. You wonder if it ever causes accidents.");
    this.add_interaction("Observe", "This shield is full of dents, and the paint is chipped off. It clearly has been used more than a couple of times in the past.");
  }
}

class B_WeaponDisplay_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 38,59, "interior/weapondisplay", 1);
    this.adjust_hitbox(0,0,40,59);

    this.add_interaction("Steal", "You attempt to steal one of these sharp looking short swords but they appear to be locked in place by some kind of mechanism. The owner does not appreciate your attempt.");
    this.add_interaction("Admire", "Those blades seem to have been sharpened pretty recently, which is more than you'd expect from a decorative piece. They're clearly ready to be use at the first occasion.");
    this.add_interaction("Touch", "Your inner urge to touch pretty much everything guides your fingers to the cold steel of the blades. Of course, you cut yourself on the sharp weapon, and $$BestFriend$ has to stop your bleeding.");
  }
}

// Indulgence
class B_Bottles extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 41,44, "interior/bottles", 1);
    this.adjust_hitbox(0,0,38,25);

    this.add_interaction("Break", "You inadvertently push and break a glass bottle, spreading wine everywhere, but before you even have time to apologize the people around you cheer loudly at your clumsiness and comfort you, telling you that it's not a big deal and that you should drink it off.");
    this.add_interaction("Chug", "You take a bottle and decide to drink it all in one go, under the reprobatory eye of $$BestFriend$. Fortunately for you, it was only half full to begin with, but it's still quite hard. You end up pretty drunk.");
    this.add_interaction("Tidy", "There's way too many bottles laying around on the floor in this town. They're everywhere, people keep stumbling. Nobody seems to take the time to tidy the trash properly. You attempt to do so, but it appears that villagers produce empty bottles faster than you can get rid of them.");
  }
}

class B_BottlesShelf_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 59,91, "interior/bottlesshelf", 1);
    this.adjust_hitbox(-5,0,64,91);

    this.add_interaction("Sample", "Encouraged by the cheers of the villagers, you sample a little bit of various beverages. Unfortunately, they forget to warn you that mixing alcohols can have bad consequences, and before soon you find yourself puking on the floor.");
    this.add_interaction("Appraise", "Some of these bottles look pretty expensive, but as soon as you lay your eyes on them people around you encourage you to open them and try them out. No way you can ever take anything out of here.");
    this.add_interaction("Moderate", "You ask around for a glass of a non alcoholic drink. Everyone finds this request pretty weird and explains that they only have beverages fit for partying here, and that you should get over yourself and give them a try.");
  }
}

// Hope
class B_FlowerCrown_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 34,55, "interior/flowercrown", 1);
    this.adjust_hitbox(-5,0,39,55);

    this.add_interaction("Tear", "You tear down the ornamental flower crown, just to see what happens if you do. Well, nothing happens besides it looking less good.");
    this.add_interaction("Wear", "You put the flower crown on your head. It's not very usual, but $$BestFriend$ thinks that it suits you.");
    this.add_interaction("Take", "You take a few leaves, hopeful that it may serve one day for some alchemical purposes. The villagers nearby laugh at you and explains that this decorative plant has absolutely no special property whatsoever.");
  }
}

class B_PottedFlower extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 46,45, "interior/pottedflower", 1);
    this.adjust_hitbox(5,0,36,25);

    this.add_interaction("Smell", "In addition to filling the room with lovely colors, these flowers exude a sweet intoxicating aroma.");
    this.add_interaction("Pluck", "You pluck out the flower. $$BestFriend$ is shocked and starts apologizing on your behalf, but the villagers tell you that it's not a problem. You've simply made more room for another one to grow. You admire their positivity.");
    this.add_interaction("Admire", "The colorful petals capture the ambient light and almost have a shine of their own.");
    this.add_interaction("Offer", "You offer the flower to $$BestFriend$ who blushes in return but insists on giving the flower back to its rightful owner.");
  }
}

class B_PottedPlant extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 51,46, "interior/pottedplant", 1);
    this.adjust_hitbox(2,0,46,25);

    this.add_interaction("Water", "You start watering the plant. $$BestFriend$ scolds you, saying there's such a thing as overwatering and this plant seems very well cared for.");
    this.add_interaction("Watch", "You look at the plant at the precise moment where a butterfly lands on one of its green leaves.");
    this.add_interaction("Smash", "You succumb to a compulsion of smashing pottery in people's houses, even if they obviously contain nothing but mud and roots. It's going to be a mess to clean.");
  }
}

// Denial
class B_Mask_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 32,55, "interior/mask", 1);
    this.adjust_hitbox(0,0,32,55);

    this.add_interaction("Fear", "Something about this mask makes you deeply uneasy, but you cannot pinpoint exactly why.");
    this.add_interaction("Wonder", "You ask yourself what secrets lie behind this mask. You've seen a few people wear them around.");
    this.add_interaction("Blind", "The masks that citizens display in their homes in this town are some of the brightest dyes you've ever seen. They appear more colorful than reality.");
    this.add_interaction("Clean", "You start to clean up this mask when you notice that it is already spotless. The owner takes way better care of it than anything else in this house...");
  }
}

class B_SpikyMask_wall extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 32,55, "interior/spikymask", 1);
    this.adjust_hitbox(0,0,32,55);

    this.add_interaction("Extrapolate", "People in this village seem to be found of masks. They must not like their own faces very much.");
    this.add_interaction("Dismiss", "You feel that through the empty eyes of the mask some sort of entity is following you with an invisible gaze. You try to dismiss this oppressive feeling.");
    this.add_interaction("Feel", "This mask makes you feel as if someone is watching your every move, following your every action with their gaze. Of course it's impossible.");
    this.add_interaction("Observe", "The mask is watching over you with an empty, unnaturally joyful stare.");
  }
}

// Acceptance

class B_Rope extends ItemBattleObject {
  constructor(x, y){
    super(x, y, 50,47, "interior/rope", 1);
    this.adjust_hitbox(0,0,50,42);

    this.add_interaction("Appraise", "This rope seems very sturdy. It appears that this village is gifted with talented cobblers who take the business of ropes very seriously. You've hardly ever seen one as big as this one.");
    this.add_interaction("Touch", "This rope shows heavy signs of wear. It is so used that some patches are soft to the touch, and fibers are loose here and there.");
    this.add_interaction("Listening", "The rope seems to have a force of its own. It's calling, beckoning you to it. You resist, of course, but this whole city puts you in quite a gloomy mood.");
    this.add_interaction("Ponder", "You silently ponder the macabre reasons why this town has so many ropes laying around. Wherever you may be, you can find one without walking more than a few minutes.");
    this.add_interaction("Interrogate", "When asked about the number of ropes in the city, the villagers replied that they are ready for defeat. Some of them have already pre-tied the knots...");
  }
}
