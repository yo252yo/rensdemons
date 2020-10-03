
var color1 = Color.random();
var color2 = color1.opposite();
var color3 = color2.hoffset(0.3);
var color4 = color3.hoffset(0.2);

document.body.style.backgroundColor = color1.code();

(new StaticSprite("testing/char1.png", color1.code())).place_at(100,100);

var tree = new S_SavePoint("testing/tree.png", color3.code());
tree.place_at(20,0);

var tree = new StaticSprite("testing/tree.png", color3.code());
tree.place_at(200,30);

var tree = new StaticSprite("testing/tree.png", color3.code());
tree.place_at(250,50);
