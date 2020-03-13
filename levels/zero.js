



//(new MovingSprite("testing/vx_chara01_a.png", color_player.code(), 32, 48)).place_at(100,100);
/*
 var a = (new MovingSprite("testing/vx_chara01_a.png", color_player.code(), 32, 48));
 a.place_at(100,100);
 a.move(1,0);
*/

CHARACTER.initialize(80, 60);

new S_Tree(20,100);
new S_Tree(150,130);
new S_Tree(290,160);
new S_Tree(240,380);

new S_House(160,350);

new S_Floor(10,2050,2000,2000);

for (var i = 50; i< 5000; i+= 250){
for (var j = 150; j< 4000; j+= 250){
  new S_Tree(i,j);
}}


var t = new TextBanner();
t.change_text("This is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis isa tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis isa tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a teshis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a tehis is a test");


var t = new TextBox(50,100,50,50);
t.change_text("Th");

var t = new TextBox(200,200,50,50);
t.change_text("Th");
t.set_opacity(0.7);

/*
var style = document.createElement('style');
style.innerHTML = "div{ border: 3px dotted; margin:-3px; }";
document.body.appendChild(style);
*/
