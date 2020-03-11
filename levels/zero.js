



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

new S_Floor(10,4050,5000,4000);

for (var i = 50; i< 5000; i+= 250){
for (var j = 150; j< 4000; j+= 250){
  new S_Tree(i,j);
}}

/*
var style = document.createElement('style');
style.innerHTML = "div{ border: 3px dotted; margin:-3px; }";
document.body.appendChild(style);
*/
