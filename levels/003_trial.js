

LEVEL.initialize_with_character(150, 150);

new S_SavePoint(275, 120);

// Top right
new S_Floor(50,250,200,200);
new S_Floor(125,600,75,375);
new S_Floor(125,600,525,75);
new S_Floor(625,800,620,475);
new S_Floor(1050,375,75,350);
new S_Floor(1050,100,350,75);
new S_Floor(1375,250,425,225);
new S_Floor(1650,500,75,300);
new S_Floor(1650,500,425,75);
new S_Floor(2000,500,75,325);
new S_Floor(2000,225,425,70);
new S_Floor(2400,350,325,225);
new S_Floor(2700,225,1650,75);
new S_Floor(3000,525,75,375);
new S_Floor(3000,525,225,75);
new S_Floor(3150,650,75,200);
new S_Floor(3150,650,225,75);
new S_Floor(3300,1100,75,525);
  new S_Floor(2800,1100,1550,75);
new S_Floor(4275,1100,75,950);

// Center left
new S_Floor(700,1700,75,950);
new S_Floor(475,1700,775,75);
new S_Floor(475,1700,75,550);
new S_Floor(225,1225,325,75);
new S_Floor(200,2100,75,950);
new S_Floor(1175,2100,75,475);
new S_Floor(100,2575,1300,500);

// Bottom left
new S_Floor(600,3125,75,575);
new S_Floor(200,3125,475,75);
new S_Floor(200,3525,75,475);
new S_Floor(200,3525,325,75);
new S_Floor(450,3800,75,350);
new S_Floor(450,3800,800,75);
new S_Floor(1175,4500,75,775);

// Mid path
 new S_Floor(1375,2250,900,75);
 new S_Floor(1525,2250,75,1400);
 new S_Floor(1525,925,300,75);

new S_Floor(1800,1100,500,350);
new S_Floor(2275,850,600,75);
new S_Floor(2525,850,75,500);
new S_Floor(2800,1100,75,325);

// Mid right
new S_Floor(2200,2575,75,400);
new S_Floor(2200,2575,625,75);
new S_Floor(2750,2575,75,650);
new S_Floor(2575,1975,825,400);
new S_Floor(3375,1925,550,75);
new S_Floor(3650,1925,75,475);
new S_Floor(3575,1500,325,300);

new S_Floor(600,3125,925,75);
new S_Floor(1450,3450,75,400);
new S_Floor(1525,1550,500,75);
new S_Floor(4850,550,75,275);
new S_Floor(4275,550,725,75);

// mid bot
new S_Floor(1275,2825,75,275);
new S_Floor(1275,2825,650,75);
new S_Floor(1875,3075,75,325);
new S_Floor(1875,3075,500,75);
new S_Floor(2325,3375,925,525);
new S_Floor(3200,3125,325,75);
new S_Floor(3450,3675,75,625);
new S_Floor(3450,3675,450,75);
new S_Floor(3825,3975,75,375);
new S_Floor(2825,3875,1050,75);
new S_Floor(2825,3875,75,250);
new S_Floor(2100,3700,800,75);
new S_Floor(2100,3925,75,300);
new S_Floor(1175,3925,1000,75);

// bottom right
new S_Floor(4450,2600,800,400);
new S_Floor(3450,3125,75,300);
new S_Floor(3875,2150,75,300);
new S_Floor(3875,2150,250,75);
new S_Floor(4050,2875,75,775);
new S_Floor(4050,2450,425,75);
new S_Floor(3450,2875,675,75);
new S_Floor(4050,3075,75,275);
new S_Floor(4050,3075,875,75);

new S_Floor(3825,3975,375,75);
new S_Floor(4150,4250,75,350);
new S_Floor(4150,4250,875,75);
new S_Floor(4950,4250,75,500);
new S_Floor(4950,3825,625,75);
new S_Floor(5500,3825,75,600);
new S_Floor(5500,3300,725,75);
new S_Floor(6150,3275,75,900);
new S_Floor(5175,2450,1050,75);
new S_Floor(5700,2400,75,1175);
new S_Floor(4900,1250,875,75);
new S_Floor(4900,1725,75,500);
new S_Floor(6200,2875,775,75);


var battleCallback = function() {
  console.log(hp);
  LEVEL.remove_object(hp);
}

var hp_menu = function () {
  new CenteredTextMenu("",
                [
                  {"text": "Yes, sir", "effect": function(){ BATTLE.api.make("viper", battleCallback); }},
                  {"text": "Not yet", "effect": "##CLOSE"},
               ]
             );
}


var make_priest = function (x, y) {
  var priest = new M_Priest(x,y);
 return priest;
}
var hp = make_priest(175, 170);
hp.interaction = function() {
  TextBannerSequence.make([
    "The task that awaits you is a perillous one. You will most likely perish, like many before you. Are you ready? Did you pray for the Godess' power?"
  ], hp_menu);
}


new S_battle(50, 170, 75, "viper");
new S_battle(200, 200, 25, "viper");

IO.control.character();
