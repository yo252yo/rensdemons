
LEVEL.initialize_character(350, 700);

for (var i = 100; i< 700; i += 100) {
  new S_Column(150,i);
  new S_Column(400,i);
}

new S_SavePoint(275, 120);

new S_Floor(50,750,500,700);

IO.control.character();
/*
TextBannerSequence.make([
  "Althoug",
], function(){ IO.control.character(); });
*/
