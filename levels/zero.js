
var color_background = Color.random().hoffset(0.45);
var color_player = color_background.opposite();
var color_obj_light = color_background.hoffset(-0.25);
var color_obj_dark = color_obj_light.hoffset(-0.2);

document.body.style.backgroundColor = color_player.code();

new Rectangle(10,450,500,400, color_background.code());

(new StaticSprite("testing/char1.png", color_player.code())).place_at(50,150);
//(new MovingSprite("testing/vx_chara01_a.png", color_player.code(), 32, 48)).place_at(100,100);
/*
 var a = (new MovingSprite("testing/vx_chara01_a.png", color_player.code(), 32, 48));
 a.place_at(100,100);
 a.move(1,0);
*/

CHARACTER.initialize(color_player.code(), 100, 100);

(new StaticSprite("testing/tree.png", color_obj_light.code())).place_at(20,100);
(new StaticSprite("testing/tree.png", color_obj_light.code())).place_at(150,130);
(new StaticSprite("testing/tree.png", color_obj_light.code())).place_at(290,160);


(new StaticSprite("testing/house.png", color_obj_dark.code())).place_at(160,350);

(new StaticSprite("testing/tree.png", color_obj_light.code())).place_at(240,380);

/*
var style = document.createElement('style');
style.innerHTML = "div{ border: 3px dotted; margin:-3px; }";
document.body.appendChild(style);
*/
