// use(Object)
// runtime: Rectangle, StaticSprite

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
    super(visual, x, y);
    this.adjust_hitbox(0,0,48,48);
    this.specify_sprite_size(48, 48);

    this.interaction = function() {
      CURRENTLEVEL.setup(destination);
    }
  }
}


class S_Door extends LevelObject {
  constructor(x, y, closed, lock){
    var visual = new StaticSprite(`assets/objects/pandemonium/door_open.png`, 'obj_dark');
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
    this.specify_sprite_size(98, 92);
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

class S_StainedGlass extends LevelObject {
  constructor(x, y, type, seed){
    var visual = new StaticSprite("assets/objects/stainedglass/" + type + ".png", 'obj_light');
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

class B_Statue extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/statue");
    this.adjust_hitbox(0,0,50,40);
    this.specify_sprite_size(50,100);

    this.set_description("It's a statue of the Goddess. Blessed be her eternal soul.");

    this.add_interaction("Prostrate", "You prostrate yourself in front of the statue of the Goddess.");
    this.add_interaction("Admire", "This crude statue barely does justice to Her splendor, but you're glad to see Her presence near you.");
    this.add_interaction("Ponder", "A holy statue of the Goddess, like many others in this town.");
    this.add_interaction("Contemplate", "An effigy of the protective Goddess. Its presence is a silent invitation for Her grace upon this place.");
    this.add_interaction("Salvage", "You notice that this statue is a bit old. Some parts of it are crumbling. You seize a piece of rock that rolled a few feet away, and decide to keep it.", INVENTORY.increase_function(ITEM.Stone));
  }
}

class S_SavePoint extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/interior/savepoint.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(5,-5,40,20);
    this.specify_sprite_size(50,50);
  }

  interaction(){
    new CenteredTextMenu("You found an Altar of the Goddess. Will you pray that She remembers you?",
                  [
                    {"text": "Worship", "effect": function(){ SAVE.print.save_menu(); }},
                    {"text": "Postpone", "effect": "##CLOSE"}
                 ]);
  }
}

class S_Altar extends LevelObject {
  constructor(x, y, type){
    var visual = new StaticSprite("assets/objects/interior/savepoint.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(5,-5,40,20);
    this.specify_sprite_size(50,50);
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

class B_Bed extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/bed");
    this.adjust_hitbox(0,0,32,60);
    this.specify_sprite_size(32,75);

    this.set_description("It's a regular bed to sleep in.");

    this.add_interaction("Inspect", "This bed is made of linen covering a wooden frame. The thin mattress is made of hay. It doesn't look too great...");
    this.add_interaction("Resist", "This bed looks very comfortable. The thick wool beddings beckon you.");
    this.add_interaction("Envy", "The pillow seems to be made with feathers. How were they able to afford such luxury?");
    this.add_interaction("Nap", "The Goddess wants you to take a nap. It's not your bed, but it will do. You comply reluctantly. You can get a few minutes of sleep, and wake up barely more rested than before. Maybe even a bit more groggy.");
    this.add_interaction("Sit", "You obey the voice of the Goddess inside you that urges you to sit on the bed. You sit for a while and look at your surroundings. It's pretty boring, so you stop.");
    this.add_interaction("Loot", "The Goddess whispers you to plunder this bed. You remove the sheets, throw the pillows on the ground, open up the mattress... It was all for naught, because there's obviously nothing of value in a random bed. You apologize meekly, while $$BestFriend$ looks at you bewildered, between shock and consternation. At least you got some linens out of the whole ordeal...", INVENTORY.increase_function(ITEM.Linnens, 2));
  }
}

class B_Bucket extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/bucket");
    this.adjust_hitbox(0,0,31,28);
    this.specify_sprite_size(31,28);

    this.set_description("It's a wooden bucket.");
    this.add_interaction("Examine", "A bucket full of fresh water. Someone must have brought it back from the well recently.");
    this.add_interaction("Behold", "This bucket is empty...");
    this.add_interaction("Wonder", "As you gaze at this bucket, you can't help but wonder if this is really the best place for a bucket... But on the other hand, why not?");
    this.add_interaction("Thirst", "You suddenly realize you're pretty thirsty as you see water in this bucket. You wonder if you should ask for a sip... They probably wouldn't refuse... No, better hold it in.");
    this.add_interaction("Drink", "Moved by the Will of the Goddess, you grab the bucket and drink all the water in it. The family is due for another trip to the well, and $$BestFriend$ is angry at you... Good job.");
    this.add_interaction("Touch", "You impulsively cave to the urges the Goddess is imprinting on you, and put your hand in the bucket. You're wet now. Well done.");
    this.add_interaction("Seize", "Without a second thought, you grab the bucket and look inside. You don't know what you expected, it's just an empty bucket. Still, you can't shake the feeling that there should be something there...");
  }
}

class B_Cabinet extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/cabinet");
    this.adjust_hitbox(0,0,31,48);
    this.specify_sprite_size(31,48);

    this.set_description("A wooden cabinet, probably storing clothes or tableware...");
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
    super(x, y, "interior/chair");
    this.adjust_hitbox(0,0,30,33);
    this.specify_sprite_size(30,33);

    this.set_description("This is a chair.");
    this.add_interaction("Please", "You want to sit in it. But it would be rude. Or would it? You're not even sure...");
    this.add_interaction("Recall", "You recognize this chair as the work of a local craftsman.");
    this.add_interaction("Sit", "The Goddess compels you to sit on this chair for a few seconds, and to get up again. That was pointless, $$BestFriend$ is puzzled. But Her ways are mysterious.");
    this.add_interaction("Obey", "Obeying the commands of the Goddess, you stare at this perfectly unremarkable chair. It's so unremarkable. You stare at it so much that you start to wonder whether its utterly unremarkableness wouldn't be a special feature in itself. Was that what the Goddess wanted you to understand?");
    this.add_interaction("Obliterate", "With the Goddess on your side, you violently smash the piece of furniture. $$BestFriend$ is quite shocked by this behavior and tries to stop you, but to no avail. The deed is done. At least you can get a bit of wood out of this.", INVENTORY.increase_function(ITEM.Stick, 2));
  }
}

class B_Hay extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/hay");
    this.adjust_hitbox(0,0,64,36);
    this.specify_sprite_size(64,66);

    this.set_description("A pile of hay.");
    this.add_interaction("Appraise", "Hay may not make the most comfortable of beds, but it is certainly the cheapest.");
    this.add_interaction("Empathize", "Any place can be a bed when you're tired enough. When monsters roam the lands, you cannot be too picky..");
    this.add_interaction("Jump", "The Goddess urges you to jump in the hay. $$BestFriend$ joins you and you have a great time. It's fun, but now you're covered in it.");
    this.add_interaction("Sleep", "You get the feeling that the Goddess wants you to nap there. You try for a while, but it's so uncomfortable. You get back up, feeling that you've failed Her.");
    this.add_interaction("Stare", "For some reason, it seems that the Goddess wants you to look at this haystack. Does She want you to count how many stems there are? Does She want you to find something in there? Surely She could not be this cruel... You try to chase the thought from your mind.");
  }
}

class B_Housefire extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/housefire");
    this.adjust_hitbox(0,0,33,20);
    this.specify_sprite_size(33,33);

    this.set_description("This is a housefire.");
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
    super(x, y, "interior/jar");
    this.adjust_hitbox(0,0,32,20);
    this.specify_sprite_size(32,35);

    this.set_description("A beautiful pottery jar.");
    this.add_interaction("Think", "This jar probably holds water. Or maybe a more expensive alcoholic beverage?");
    this.add_interaction("Reminisce", "You wonder for a second what secrets this jar holds. Maybe it's full of fruits, macerating in their juice...");
    this.add_interaction("Crush", "Something in you compels you to break this jar. Jars are for breaking, aren't they? As you do, all the berries it contained spill on the floor. You manage to save a few for your personal use.", INVENTORY.increase_function(ITEM.Berry,3));
    this.add_interaction("Break", 'As you watch this jar, you can hear the voice of the Goddess inside you. "Break it... Break it...". You resist it. For now...');
    this.add_interaction("Smash", "Compelled by the Goddess, you mercilessly throw that jar on the ground to break it. It was empty. How embarrassing. You try to put the pieced back together, but the deed is done. $$BestFriend$ is shocked when the owner turns out really understanding and forgives you as soon as you mention that you're the Promised Child.");
  }
}

class B_Shelf extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/shelf");
    this.adjust_hitbox(0,0,59,67);
    this.specify_sprite_size(59,67);

    this.set_description("A wooden shelf of reasonable sturdiness.");
    this.add_interaction("Look", "This shelf stores the family's food supplies. In a corner, there's even meat being salted and dried. Pretty fancy considering the dire situation that the devil's hordes have put the village in.");
    this.add_interaction("Consider", "This shelf is mostly empty. Most people survive day to day, without much resources. The Demon Lord $$demon_lord$ and its armies have forced the village into poverty and famine. But this may be about to change...");
    this.add_interaction("Inspect", "The Goddess pushes you to look closely at every inch of this shelf. Are you looking for some sort of clue? There's nothing here, just an ordinary shelf, emptied by the cruel circumstances that the evil armies have forced the village into.");
    this.add_interaction("Mess up", "Compelled by forces beyond yourself, you shuffle all the vegetables from this shelf. It would feel satisfying, if it wasn't also a bit shameful. It's not easy being a Divine vessel.");
    this.add_interaction("Pillage", "As soon as you feel like nobody is watching you, in a quick gesture, you grab something at random from the shelf and put it in your pocket. It turns out to be some medicinal herbs.", INVENTORY.increase_function(ITEM.Flower));
  }
}

class B_Stool extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/stool");
    this.adjust_hitbox(0,0,25,28);
    this.specify_sprite_size(25,28);

    this.set_description("A simple wooden stool.");
    this.add_interaction("Avoid", "This stool doesn't seem very sturdy. It's obviously been put together by unskilled villagers. Better not rest on it.");
    this.add_interaction("Climb", "You cannot resist the urge to stand on the stool. $$BestFriend$ watches you, split between amusement and concern. Surely an act of the Goddess again...");
    this.add_interaction("Sit", "Obeying your inner voice, you sit on this stool. Nothing happens. You stand back up. Thanks you, Goddess.");
    this.add_interaction("Destroy", "The Goddess tells you that this stool would be much more useful to your quest as spare parts. $$BestFriend$ is not convinced by that argument, but cannot stop you from breaking down the piece of furniture and salvage its wood.", INVENTORY.increase_function(ITEM.Stick, 2));
  }
}

class B_Table extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/table");
    this.adjust_hitbox(0,0,31,34);
    this.specify_sprite_size(31,34);

    this.set_description("This is a textbook example of a wooden table. Four sturdy wooden legs, holding planks nailed together. A table.");
    this.add_interaction("Judge", "This table has clearly seen better days. You can see on it the marks of its usage. You can't help but think of the many meals, generation after generation, that this simple piece of furniture supported.");
    this.add_interaction("Hide", "You do not want to. You know how ridiculous it would be. But you also know you cannot resist the Goddess. So you crawl under the table, and stay hidden there for a while. You're not actually hidden, everyone can see you, especially $$BestFriend$ who keeps calling you back. This is so embarrassing. You finally get out, and swear to never acknowledge this happened.");
    this.add_interaction("Touch", "The Goddess makes you touch all the planks this table comprises. 13. This must mean something. Or must it?");
    this.add_interaction("Obliterate", "Before $$BestFriend$ can stop you, you jump on the table with all your strength. It's not long before the table is in shambles, and you fall on your back in the middle of wood pieces. $$BestFriend$ may laugh at your misfortune, but at least you got a bit of lumber out of that.", INVENTORY.increase_function(ITEM.Stick, 2));
  }
}

class B_Chest extends ItemBattleObject {
  constructor(x, y){
    super(x, y, "interior/chest", 1);
    this.adjust_hitbox(0,0,50,24);
    this.specify_sprite_size(50,45);

    this.set_description("A chest, doubtlessly holding the family's belongings.");
    this.add_interaction("Resign", "It's just a matter of time before the Goddess has you ransacking it, isn't it?");
    this.add_interaction("Withstand", "You know the Goddess wants you to open this chest and loot it, but you also know it would be pointless and impolite. You try to look away, and keep the thought away from your mind.");
    this.add_interaction("Marvel", "Not only does this family have possessions, they have so much that they can even put some in a chest! It's nice to see that the everlasting war spared a few people.");
    this.add_interaction("Pillage", "You cannot help but obey the Goddess' orders. You force the chest open and dive into it head first. You swim through layers of linens that aren't yours. Nothing of interest here. You got nothing out of it but embarrassment.");
    this.add_interaction("Rob", "You jump on the chest and open it in a wide motion divinely guided, but your enthusiasm fades as soon as you see how empty it actually is. You fight tears thinking back at what it must have contained, one day. These people really need a savior.");
    this.add_interaction("Open", "You try to open the chest, but it is locked. Not all families leave their most pricy possessions at the mercy of the first passer-by...");
    this.add_interaction("Plunder", "Pushed by a force beyond your control, you open the chest and take whatever content you deem could be useful. You find an old wooden sword, probably a child's toy. Surely they won't miss it, if it's for the Goddess.", INVENTORY.increase_function(ITEM.Sword_wooden));
  }
}
