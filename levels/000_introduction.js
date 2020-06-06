
var size = 600;

var map_container = document.createElement('div');
map_container.style.position = "absolute";
map_container.style.left = "50%";
map_container.style.top = "100px";
map_container.style.width = size + "px";
map_container.style.height = size + "px";
map_container.style.marginLeft = "-" + (size/2) + "px";
CURRENTLEVEL.system.html().appendChild(map_container);

function map_canvas(zindex){
  var html_canvas = document.createElement('canvas');
  html_canvas.style.position = "absolute";
  html_canvas.style.width = size + "px";
  html_canvas.style.height = size + "px";
  html_canvas.width = size;
  html_canvas.height = size;
  html_canvas.style.zIndex = zindex;

  map_container.appendChild(html_canvas);
  return html_canvas;
}

var base_canvas = map_canvas(10);
var seed_canvas = map_canvas(15);

var base_resource = RESOURCES.get_img("assets/screens/map_base.png");
var seed_resource = RESOURCES.get_img("assets/screens/map_seed.png");

RESOURCES.onload(base_resource, function() {
  // Draws the base
  base_canvas.getContext('2d').drawImage(base_resource, 0, 0, size, size);

  // Colors the base
  base_canvas.getContext('2d').globalCompositeOperation = 'source-in';
  base_canvas.getContext('2d').fillStyle = PALETTE.color('obj_dark').code();
  base_canvas.getContext('2d').fillRect(0, 0, size, size);

  RESOURCES.onload(seed_resource, function() {
    var offset1 = RANDOM.int(5000 - size);
    var offset2 = RANDOM.int(5000 - size);

    // Draws the seed
    seed_canvas.getContext('2d').drawImage(seed_resource, offset1, offset2, size, size, 0, 0, size, size);

    // Colors the seed
    seed_canvas.getContext('2d').globalCompositeOperation = 'source-in';
    seed_canvas.getContext('2d').fillStyle = PALETTE.color('obj_light').code();
    seed_canvas.getContext('2d').fillRect(0, 0, size, size);

    // Cut to the base
    seed_canvas.getContext('2d').globalCompositeOperation = 'destination-in';
    seed_canvas.getContext('2d').drawImage(base_resource, 0, 0, size, size);
    });
 });

var nextPage = function(){
  setTimeout(function(){ CURRENTLEVEL.setup("001_hideandseek"); }, 1500);
}
var displayText = function() {
  TextBannerSequence.make([
    "During thousands of years, the kingdom of $$world_name$ had enjoyed peace and prosperity.",
    "Of course monarchs fell and rose, and the occasional war broke out, but not much truly threatened the life of its inhabitants.",
    "This all changed one fateful day where the Demon Lord $$demon_lord$ appeared and started to spread its Armies of Darkness over $$world_name$.",
    "Where these evil legions originated, nobody really knew. They swept over the world with a savagery $$world_name$ had never known. The monstrous creatures butchered and raped anyone who stood in their way, destroying families and ravaging villages.",
    "It wasn't long before $$world_name$ fell in an age of darkness. People grew afraid of leaving their homes, and the royal armies could do little more than secure a few cities from the barbaric hords of demons.",
    "Life was tough, and for many brief, but there was still hope to be found in $$world_name$. For in the darkest times, the light of the Goddess grew, and the Church brought to all the believers the promise of a better day.",
    "It was said that one day, a child would be born who would be the Vessel of the Goddess. This holy child would receive from Her Grace unfathomable powers, and through great perseverance and bravery they would slay the Demon Lord and its armies, liberating $$world_name$ from their cruelty and ushering the renewal of civilization.",
    "Needless to say that the Promised Child was eagerly awaited, and the Church of the Goddess had been searching for them for generations. But the wait would soon be coming to an end...",
  ], nextPage);
}

setTimeout(displayText, 1000);
