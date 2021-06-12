AUDIO.music.levels.harpies();


new S_Floor(850,1250,50,50, 'obj_dark', '025_harpies');

// room
new S_Floor(750,1225,250,675);

new S_Floor(1025,1225,150,150);
new S_Floor(575,1225,150,150);

new S_Floor(1025,1050,150,150);
new S_Floor(575,1050,150,150);

new S_Floor(1025,875,150,150);
new S_Floor(575,875,150,150);

new S_Floor(1025,700,150,150);
new S_Floor(575,700,150,150);

// hallways
new S_Floor(975,1175,75,50);
new S_Floor(975,1000,75,50);
new S_Floor(975,825,75,50);
new S_Floor(975,650,75,50);
new S_Floor(700,650,75,50);
new S_Floor(700,825,75,50);
new S_Floor(700,1000,75,50);
new S_Floor(700,1175,75,50);



var bed = function (x, y) {
  var b = new B_Bed(x+50,y-95);
  b.interaction = function() {
    TextBannerSequence.make([
      "There's a bed, but... it's made of metal? That doesn't seem very comfortable, but it did stand the test of time.",
    ]);
   };
}

bed(1025,1225,150,150);
bed(575,1225,150,150);

bed(1025,1050,150,150);
bed(575,1050,150,150);

bed(1025,875,150,150);
bed(575,875,150,150);

bed(1025,700,150,150);
bed(575,700,150,150);


console.log("todo Ancient Armament Ammunition");


CURRENTLEVEL.initialize_with_character(850, 1225);
