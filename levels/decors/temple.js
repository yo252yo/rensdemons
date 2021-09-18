AUDIO.music.levels.temple();

new S_WoodFloor(1050,1750,500,700);

for (var i = 1100; i< 1700; i += 100) {
  new S_Column(1150,i);
  new S_Column(1400,i);
}

new S_SavePoint(1275, 1250);
