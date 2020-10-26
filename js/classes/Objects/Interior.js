// use(Object)
// runtime: Rectangle, StaticSprite

class S_Column extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/column.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(10,0,20,15);
    this.interaction = this.text_interaction([
      "It's a column.",
      "Nothing but a column.",
      "A simple yet elegant stone column. It's supporting the roof.",
    ]);
  }
}

class S_Statue extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/statue.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(10,0,20,15);
    this.interaction = this.text_interaction([
      "It's a statue of the Goddess. Blessed be her eternal soul.",
      "You prostrate yourself in front of the statue of the Goddess.",
      "This crude statue barely does justice to Her splendor, but you're glad to see Her presence near you.",
      "A holy statue of the Goddess, like many others in this town.",
      "An effigy of the protective Goddess. Its presence is a silent invitation for Her grace upon this place.",
    ]);
  }
}

class S_SavePoint extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/savepoint.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(5,-5,40,10);
  }

  interaction(){
    new CenteredTextMenu("You found an Altar of the Goddess. Will you pray that She remembers you?",
                  [
                    {"text": "Worship", "effect": function(){ SAVE.print.save_menu(); }},
                    {"text": "Postpone", "effect": "##CLOSE"}
                 ]);
  }
}

class S_Bed extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/bed.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,32,60);
    this.interaction = this.text_interaction([
      "It's a regular bed to sleep in.",
      "This bed is made of linen covering a wooden frame. The thin matress is made of hay. It doesn't look too great...",
      "This bed looks very comfortable. The thick wool beddings beckon you.",
      "The pillow seems to be made with feathers. How were they able to afford such luxury?",
      "The Goddess wants you to take a nap. It's not your bed, but it will do. You comply reluctantly. You can get a few minutes of sleep, and wake up barely more rested than before. Maybe even a bit more groggy.",
      "You obey the voice of the Goddess inside you that urges you to sit on the bed. You sit for a while and look at your surroundings. It's pretty boring, so you stop.",
      "The Goddess whispers you to plunder this bed. You remove the sheets, throw the pillows on the ground, open up the mattress... It was all for naught, because there's obviously nothing of value in a random bed. You apologize meekly.",
    ]);
  }
}

class S_Bucket extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/bucket.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,31,28);
    this.interaction = this.text_interaction([
      "A bucket full of fresh water. Someone must have brought it back from the well recently.",
      "This bucket is empty...",
      "As you gaze at this bucket, you can't help but wonder if this is really the best place for a bucket... But on the other hand, why not?",
      "You suddenly realize you're pretty thirsty as you see water in this bucket. You wonder if you should ask for a sip... They probably wouldn't refuse... No, better hold it in.",
      "Moved by the Will of the Goddess, you grab the bucket and drink all the water in it. The family is due for another trip to the well...",
      "You impulsively cave to the urges the Goddess is imprinting on you, and put your hand in the bucket. You're wet now. Well done.",
      "Without a second thought, you grab the bucket and look inside. You don't know what you expected, it's just an empty bucket. Still, you can't shake the feeling that there should be something there...",
    ]);
  }
}

class S_Cabinet extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/cabinet.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,31,48);
    this.interaction = this.text_interaction([
      "The family stores their belonging in this cabinet. What kind of things are there? You're curious, but you don't want to intrude. You're invading their privacy enough as it is...",
      "A wooden cabinet, probably storing clothes or tableware...",
      "Not everyone could afford a wooden cabinet with engravings of holy texts. This is surely a mark of wealth.",
      "This storage container looks pretty unsteady. The people here probably built it themselves. Better not touch it.",
      "You try and resist the urge to open the cabinet and go through this family's possessions. Who would do such a thing?",
      "You cannot help but opening the drawers of this cabinet. The Goddess is acting through you again. You rummage through foreign clothes and linens. Seriously, what good is that?",
      "Pushed by Her Divine Grace, you go open this little cabinet. It's full of tableware and plates. What were you hoping to find?"
    ]);
  }
}

class S_Chair extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/chair.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,30,33);
    this.interaction = this.text_interaction([
      "This is a chair.",
      "You want to sit in it. But it would be rude. Or would it? You're not even sure...",
      "You recognize this chair as the work of a local craftsman.",
      "The Goddess compells you to sit on this chair for a few seconds, and to get up again. That was pointless. But Her ways are mysterious.",
      "Obeying the commands of the Goddess, you stare at this perfectly unremarkable chair. It's so unremarkable. You stare at it so much that you start to wonder whether its utterly unremarkableness wouldn't be a special feature in itself. Was that what the Goddess wanted you to understand?",
    ]);
  }
}

class S_Hay extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/hay.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,64,66);
    this.interaction = this.text_interaction([
      "A pile of hay.",
      "Hay may not make the most comfortable of beds, but it is certainly the cheapest.",
      "Any place can be a bed when you're tired enough. When monsters roam the lands, you cannot be too picky...",
      "The Goddess urges you to jump in the hay. It's fun, but now you're covered in it.",
      "You get the feeling that the Goddess wants you to nap there. You try for a while, but it's so uncomfortable. You get back up, feeling that you've failed Her.",
      "For some reason, it seems that the Goddess wants you to look at this haystack. Does She want you to count how many stems there are? Does She want you to find something in there? Surely She could not be this cruel... You try to chase the thought from your mind.",
    ]);
  }
}

class S_Housefire extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/housefire.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,33,20);
    this.interaction = this.text_interaction([
      "This is a housefire.",
      "The fire keeps the room warm and cooks the food. Two blessings in one.",
      "On the fire, a pot is slowly cooking. It's some sort of stew. Or a soup?",
      "The smell of burning wood is filling up the room. It feels... nostalgic.",
      "Compelled by the Goddess, you grab a bit of the food that's slowly roasting on the fire and devour it. It may not have been yours to take, but the Will of the Goddess is absolute.",
      "You extend a hand towards the fire. It's warm. You get your hand closer and closer... Aouch! You burned yourself. Surely, you were not in control of yourself. It must have been the Goddess.",
    ]);
  }
}

class S_Jar extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/jar.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,32,20);
    this.interaction = this.text_interaction([
      "This jar probably holds water. Or maybe a more expensive alcoholic bevrage?",
      "You wonder for a second what secrets this jar holds. Maybe it's full of fruits, macerating in their juice...",
      "Something in you compels you to break this jar. Jars are for breaking, aren't they?",
      'As you watch this jar, you can hear the voice of the Goddess inside you. "Break it... Break it...". You resist it. For now...',
      "Compelled by the Goddess, you mercilessly throw that jar on the ground to break it. It was empty. How embarassing. You try to put the pieced back together, hoping to do a decent enough job to not be found out right away.",
    ]);
  }
}

class S_Shelf extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/shelf.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,59,67);
    this.interaction = this.text_interaction([
      "This shelf stores the family's food supplies. In a corner, there's even meat being salted and dried. Pretty fancy considering the dire situation that the devil's hords have put the village in.",
      "This shelf is mostly empty. Most people survive day to day, without much resources. The Demon Lord $$demon_lord$ and its armies have forced the village into poverty and famine. But this may be about to change...",
      "A wooden shelf of reasonable sturdiness.",
      "The Goddess pushes you to look closely at every inch of this shelf. Are you looking for some sort of clue? There's nothing here, just an ordinary shelf, emptied by the cruel circumstances that the evil armies have forced the village into.",
      "Compelled by forces beyond yourself, you shuffle all the vegetables from this shelf. It would feel satisfying, if it wasn't also a bit shamefull. It's not easy being a Divine vessel.",
    ]);
  }
}

class S_Stool extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/stool.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,25,28);
    this.interaction = this.text_interaction([
      "A simple wooden stool.",
      "This stool doesn't seem very sturdy. It's obviously been put together by unskilled villagers. Better not rest on it.",
      "You cannot resist the urge to stand on the stool. Surely an act of the Goddess again...",
      "Obeying your inner voice, you sit on this stool. Nothing happens. You stand back up. Thanks you, Goddess."
    ]);
  }
}

class S_Table extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/table.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,31,34);
    this.interaction = this.text_interaction([
      "This is a textbook example of a wooden table. Four sturdy wooden legs, holding planks nailed together. A table.",
      "This table has clearly seen better days. You can see on it the marks of its usage. You can't help but think of the many meals, generation after generation, that this simple piece of furniture supported.",
      "You do not want to. You know how ridiculous it would be. But you also know you cannot resist the Goddess. So you crawl under the table, and stay hidden there for a while. You're not actually hidden, everyone can see you. This is so embarassing. You finally get out, and swear to never acknowledge this happened.",
      "The Goddess makes you touch all the planks this table comprises. 13. This must mean something. Or must it?",
    ]);
  }
}

class S_Chest extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/chest.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,30,34);
    this.interaction = this.text_interaction([
      "A chest, doubtlessly holding the family's belongings. It's just a matter of time before the Goddess has you ransacking it, isn't it?",
      "You know the Goddess wants you to open this chest and loot it, but you also know it would be pointless and impolite. You try to look away, and keep the thought away from your mind.",
      "Not only does this family have possessions, they have so much that they can even put some in a chest! It's nice to see that the everlasting war spared a few people.",
      "You cannot help but obey the Goddess' orders. You force the chest open and dive into it head first. You swim through layers of linnens that aren't yours. Nothing of interest here. You got nothing out of it but embarassment.",
      "You jump on the chest and open it in a wide motion divinely guided, but your enthousiasm fades as soon as you see how empty it actually is. You fight tears thinking back at what it must have contained, one day. These people really need a savior.",
      "You try to open the chest, but it is locked. Not all families leave their most pricy possessions at the mercy of the first passer-by...",
    ]);
  }
}
