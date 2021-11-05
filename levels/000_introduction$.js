AUDIO.music.interface.introduction();

SAVE.make_new_game(); // In case we come here with ability tree or states...

var size = 600;

var map_container = HTML.div.make({
  left: "50%",
  top: 100,
  width: size,
  height: size,
  position: "fixed",
});

map_container.style.marginLeft = "-" + (size/2) + "px";
CURRENTLEVEL.system.html().appendChild(map_container);

function map_canvas(zindex){
  var html_canvas =  HTML.canvas.make(size, size, zindex);
  map_container.appendChild(html_canvas);
  return html_canvas;
}

var base_canvas = map_canvas(10);
var seed_canvas = map_canvas(15);

var base_resource = RESOURCES.get_img("assets/screens/map_base.png");
var seed_resource = RESOURCES.get_img("assets/screens/map_seed.png");

var drawMap = function() {
  var offset1 = RANDOM.int(5000 - size);
  var offset2 = RANDOM.int(5000 - size);

  // Draws the seed
  seed_canvas.getContext('2d').drawImage(seed_resource, offset1, offset2, size, size, 0, 0, size, size);

  // Colors the seed
  HTML.canvas.tint(seed_canvas, "obj_light");

  // Cut to the base
  seed_canvas.getContext('2d').globalCompositeOperation = 'destination-in';
  seed_canvas.getContext('2d').drawImage(base_resource, 0, 0, size, size);
};

var makeMap = function() {
  // Draws the base
  base_canvas.getContext('2d').drawImage(base_resource, 0, 0, size, size);

  // Colors the base
  HTML.canvas.tint(base_canvas, "obj_dark");

  RESOURCES.onload(seed_resource, drawMap);
};

RESOURCES.onload(base_resource, makeMap);

var nextPage = function(){
  setTimeout(function(){ CURRENTLEVEL.setup("001_hideandseek$"); }, 1500);
}
var displayText = function() {
  TextBannerSequence.make([
    "During thousands of years, the kingdom of $$world_name$ had enjoyed peace and prosperity.",
    "Of course monarchs fell and rose, and the occasional war broke out, but not much truly threatened the life of its inhabitants.",
    "With the mastery of magic, under the guidance of the Goddess, they developed into a society of abundance and happiness.",


    "This all changed one fateful day where the Demon Lord $$demon_lord$ appeared and started to spread its Armies of Darkness over $$world_name$.",
    "Where these evil legions originated, nobody really knew. They swept over the world with a savagery $$world_name$ had never known. The monstrous creatures butchered and raped anyone who stood in their way, destroying families and ravaging villages.",
    "It wasn't long before $$world_name$ fell in an age of darkness. People grew afraid of leaving their homes, and the royal armies could do little more than secure a few cities from the barbaric hordes of demons.",

    "Surviving day to day became all that humans could aspire to, and the wonders of the past were lost to time as many cities turned to abandoned ruins.",

    "Life was tough, and for many brief, but there was still hope to be found in $$world_name$. For in the darkest times, the light of the Goddess grew, and the Church brought to all the believers the promise of a better day.",
    "It was said that one day, a child would be born who would be the Vessel of the Goddess. This holy child would receive from Her Grace unfathomable powers, and through great perseverance and bravery they would slay the Demon Lord and its armies, liberating $$world_name$ from their cruelty and ushering the renewal of civilization.",
    "Needless to say that the Promised Child was eagerly awaited, and the Church of the Goddess had been searching for them for generations. But the wait would soon be coming to an end...",
  ], nextPage);
}

setTimeout(displayText, 1000);

FOG.stop();
