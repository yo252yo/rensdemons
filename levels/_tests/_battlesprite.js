
var last = 0;


var battle_names = [
  'assets/battles/forests/blob.png',
  'assets/battles/forests/boar.png',
  'assets/battles/forests/flower.png',
  'assets/battles/forests/fox.png',
  'assets/battles/forests/mandragora.png',
  'assets/battles/forests/mantis.png',
  'assets/battles/forests/mushroom_1.png',
  'assets/battles/forests/mushroom_2.png',
  'assets/battles/forests/mushroom_boss.png',
  'assets/battles/forests/nymph.png',
  'assets/battles/forests/squirrel.png',
  'assets/battles/forests/tree.png',
  'assets/battles/forests/trunk.png',
];

var i = 0;
var a;
function g(){
  if (a){a.destroy();}
  a = new CenteredImage(battle_names[i], 'background');
  i = (i + 1) % battle_names.length;
  last = setTimeout(g, 2000);
}
g();



function stop(){
  clearTimeout(last);
}
