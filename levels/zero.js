
var color_background = Color.random().hoffset(0.45);
var color_player = color_background.opposite();
var color_obj_light = color_background.hoffset(-0.25);
var color_obj_dark = color_obj_light.hoffset(-0.2);

document.body.style.backgroundColor = color_player.code();

new Rectangle(10,450,500,400, color_background.code());

(new StaticSprite("testing/char1.png", color_player.code())).move(100,100);

(new StaticSprite("testing/tree.png", color_obj_light.code())).move(20,0);
(new StaticSprite("testing/tree.png", color_obj_light.code())).move(150,30);
(new StaticSprite("testing/tree.png", color_obj_light.code())).move(290,60);


(new StaticSprite("testing/house.png", color_obj_dark.code())).move(150,30);

(new StaticSprite("testing/tree.png", color_obj_light.code())).move(240,280);

/*
var style = document.createElement('style');
style.innerHTML = "div{ border-style: dotted; }";
document.body.appendChild(style);
*/
