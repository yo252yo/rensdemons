
new S_Floor(50,750,500,700);

for (var i = 100; i< 700; i += 100) {
  new S_Column(150,i);
  new S_Column(400,i);
}

new S_SavePoint(275, 250);

if(ABILITIES.has_ability("_trial_passed")){
  var f = new S_Floor(250,775,100,35, 'obj_dark');
  f.interaction = function(){
    CURRENTLEVEL.setup("004_town1");
  }
}
