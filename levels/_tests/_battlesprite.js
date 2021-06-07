
var last = 0;


var battle_names = [
  'assets/battles/waters/anemone.png',
  'assets/battles/waters/anglerjelly.png',
  'assets/battles/waters/crab.png',
  'assets/battles/waters/jellyfish.png',
  'assets/battles/waters/octopus.png',
  'assets/battles/waters/squid.png',
  'assets/battles/waters/whale.png',
  'assets/battles/waters/Nxp2_devil-mermaid_b.png',
  'assets/battles/waters/Nxp2_grell-mage_c.png',
  'assets/battles/waters/Nxp2_lamia.png',
  'assets/battles/waters/Nxp2_serpent.png',
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
