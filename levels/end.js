
var end = 0;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  end = s[1];
}



AUDIO.music.interface.introduction();

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


var resetGame = function(){
  DICTIONARY.factory.make_new();
  PALETTE.factory.make_new();
}

var nextNextNextPage = function(){
  resetGame();
  makeMap();
  TextBannerSequence.make([
    "The human realm traversed eons. It moved, divided, reunited, until it came to be known as $$world_name$.",
  ], function(){ CURRENTLEVEL.setup("000_introduction$"); });
}

var nextNextPage = function(){
  resetGame();
  makeMap();
  TextBannerSequence.make([
    "So too did the planet around it. The world was soon beyond recognition. The relentless march of time went on.",
  ], nextNextNextPage);
}

var nextPage = function(){
  TextBannerSequence.make([
    "The kingdom expanded and spread human dominion over the whole world. As generations passed, it changed.",
  ], nextNextPage);
}






var sequence = [];

if(end == "A"){
  STATS.record.ending(ENDINGS.War);
  sequence = [
    `Congratulations! You have reached the ${ENDINGS.War}.`,
    "With $$demon_lord$ dead, the demon army retreated, and the world of $$world_name$ was at peace at long last. $$Ren$ was heralded as a hero, and named ruler as soon as age allowed it. The capital was rebuilt, grander than ever, and named $$BestFriend$ in honor of your fallen comrad.",
    "Faith remained strong in the kingdom. Demons never came back. This ushered a long era of prosperity where humans were able to develop to new heights.",
  ];

}




var displayText = function() {
  TextBannerSequence.make(sequence, nextPage);
}

ABILITIES.unlock("_just_finished_game");

setTimeout(displayText, 1000);

FOG.stop();
