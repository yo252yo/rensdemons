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
}



LEVEL.initialize_character(350, 700);

for (var i = 100; i< 700; i += 100) {
  new S_Column(150,i);
  new S_Column(400,i);
}

new S_SavePoint(275, 120);

new S_Floor(50,750,500,700);

make_priest(200, 550);
make_priest(275, 550);
make_priest(350, 550);

new M_ChildM(150, 670);
new M_ChildF(180, 710);
new M_ChildM(250, 720);
new M_ChildF(280, 710);

TextBannerSequence.make([
  "Priest: \"Second-Borns! The day you've all been waiting for has finally arrived! Today, you shall prove yourself to the Goddess.\"",
  "Priest: \"Many before you have failed. But one day, the Promised Child will come, for it is foretold. And that day may well be today.\"",
], function(){ IO.control.character(); });
