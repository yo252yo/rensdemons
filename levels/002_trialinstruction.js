
CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    "Priest: \"Second-Borns! The day you've all been waiting for has finally arrived! Today, you shall prove yourself to the Goddess.\"",
    "Priest: \"Many before you have failed. But you know as much as we do that the times are hard and require efforts. One day, the Promised Child will come and liberate us from the tyranny of $$demon_lord$, for it has been foretold. And that day may well be today.\"",
    "Priest: \"Now, second-borns, today we will see if the Promised Child is among you. I truly hope it is. Please advance to the High Priest in orderly fashion.\"",
  ], function(){ SAVE.autosave(); IO.control.character(); });
};

CURRENTLEVEL.initialize_with_character(350, 700);


var battleCallback = function() {
  TextBannerSequence.make([
    "Everyone in the room was very excited. Some were yelling, some were dancing, other were just too stunned to realize what had happened.",
    "Priest: \"The day has finally come! The Promised Child is here! Praised be the Goddess.\"",
    "Priests and children alike were weeping tears of joys. For centuries, mankind had awaited this event. And now it was finally here. During their lifetime. In front of them. In their little town! The cheers lasted for a moment. Finally, the head priest turned towards Ren.",
    "Priest: \"Come, child. You have much to learn. Your journey is only beginning.\"",
  ], function(){ CURRENTLEVEL.setup("demoend"); });
}



var make_priest = function (x, y) {
  var priest = new M_Priest(x,y);
  priest.interaction = function() {

    new TextBannerRandom([
      "Priest: \"May you be the Promised Child.\"",
      "Priest: \"I pray you are the one to bring us salvation.\"",
      "Priest: \"Have no fear, your sacrifice is worthwhile in the eye of the Goddess.\"",
      "Priest: \"Do not forget to pray at the altar. Only Her strength can help you.\"",
    ]);
 };
 return priest;
}




for (var i = 100; i< 700; i += 100) {
  new S_Column(150,i);
  new S_Column(400,i);
}

new S_SavePoint(275, 120);

var hp_menu = function () {
  new CenteredTextMenu("",
                [
                  {"text": "Yes, sir", "effect": function(){ BATTLE.api.make("viper", battleCallback); }},
                  {"text": "Not yet", "effect": "##CLOSE"},
               ]
             );
}

var hp = make_priest(275, 70);
hp.interaction = function() {
  TextBannerSequence.make([
    "The task that awaits you is a perillous one. You will most likely perish, like many before you. Are you ready? Did you pray for the Godess' power?"
  ], hp_menu);
}

new S_Floor(50,750,500,700);

make_priest(200, 550);
make_priest(275, 550);
make_priest(350, 550);

(new M_ChildM(150, 670)).interaction = function() {
  TextBannerSequence.make([
    "The child is just weeping in silence."
  ])
 };
(new M_ChildF(180, 710)).interaction = function() {
  TextBannerSequence.make([
    "$$child_friends_f1$: \"You go ahead, I wanna watch your Trial. But you'll fail and I'll succeed, that's for sure!\""
  ])
 };
(new M_ChildM(250, 720)).interaction = function() {
  TextBannerSequence.make([
    "$$child_friends_m1$: \"We all know how this goes... It was nice being friends with you.\""
  ])
 };
(new M_ChildF(280, 710)).interaction = function() {
  TextBannerSequence.make([
    "Girl: \"I'm scared... so scared... why did I have to be a Second-Born! I wish big brother were never here! No! I wish big brother were the Promised Child... Mommy...\""
  ])
 };
