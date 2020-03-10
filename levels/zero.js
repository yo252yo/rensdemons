
document.body.style.backgroundColor = PALETTE.color_player.code();

new Rectangle(10,450,500,400, PALETTE.color_background.code());

(new StaticSprite("testing/char1.png", PALETTE.color_player.code())).place_at(50,150);
//(new MovingSprite("testing/vx_chara01_a.png", color_player.code(), 32, 48)).place_at(100,100);
/*
 var a = (new MovingSprite("testing/vx_chara01_a.png", color_player.code(), 32, 48));
 a.place_at(100,100);
 a.move(1,0);
*/

CHARACTER.initialize(100, 100);

(new StaticSprite("testing/tree.png", PALETTE.color_obj_light.code())).place_at(20,100);
(new StaticSprite("testing/tree.png", PALETTE.color_obj_light.code())).place_at(150,130);
(new StaticSprite("testing/tree.png", PALETTE.color_obj_light.code())).place_at(290,160);


(new StaticSprite("testing/house.png", PALETTE.color_obj_dark.code())).place_at(160,350);

(new StaticSprite("testing/tree.png", PALETTE.color_obj_light.code())).place_at(240,380);

/*
var style = document.createElement('style');
style.innerHTML = "div{ border: 3px dotted; margin:-3px; }";
document.body.appendChild(style);
*/
