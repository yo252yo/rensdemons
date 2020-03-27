



var parchment_canvas = document.createElement('canvas');
parchment_canvas.id = "IE_map0";
parchment_canvas.style.position = "absolute";
parchment_canvas.style.width = "80%";
parchment_canvas.style.height = "90%";
parchment_canvas.style.left = "10%";
parchment_canvas.style.top = "10%";
parchment_canvas.style.zIndex = 0;
LEVEL.html().appendChild(parchment_canvas);


var resource = RESOURCES.get_img("testing/parchment.png");

RESOURCES.onload(resource, function() {
  parchment_canvas.getContext('2d').drawImage(resource, 0, 0,300,300);
///  setTimeout(function(){

     parchment_canvas.getContext('2d').globalCompositeOperation = 'source-in';
     parchment_canvas.getContext('2d').fillStyle = PALETTE.color_background.code();
     parchment_canvas.getContext('2d').fillRect(0, 0, parchment_canvas.clientWidth, parchment_canvas.clientHeight);

     drawmap();
//  },4000);
 });

//      drawmap();

function drawmap(){

     var map1_canvas = document.createElement('canvas');
   map1_canvas.id = "IE_map";
   map1_canvas.style.position = "absolute";
   map1_canvas.style.left = "40%";
   map1_canvas.style.top = "25%";
   map1_canvas.style.width = "500px";
   map1_canvas.style.height = "500px";
   map1_canvas.width = "500";
   map1_canvas.height = "500";
   map1_canvas.style.zIndex = 10;
   LEVEL.html().appendChild(map1_canvas);
   var map1 = RESOURCES.get_img("testing/circle.png");

   RESOURCES.onload(map1, function() {
     map1_canvas.getContext('2d').drawImage(map1, 0, 0,200,200);

        map1_canvas.getContext('2d').globalCompositeOperation = 'source-in';
        map1_canvas.getContext('2d').fillStyle = PALETTE.color_obj_dark.code();
        map1_canvas.getContext('2d').fillRect(0, 0, map1_canvas.clientWidth, map1_canvas.clientHeight);


   //  },4000);
    });


     var map2_canvas = document.createElement('canvas');
     map2_canvas.id = "IE_map2";
     map2_canvas.style.position = "absolute";
     map2_canvas.style.left = "40%";
     map2_canvas.style.top = "25%";
     map2_canvas.style.width = "500px";
     map2_canvas.style.height = "500px";
     map2_canvas.width = "500";
     map2_canvas.height = "500";
     map2_canvas.style.zIndex = 15;
     LEVEL.html().appendChild(map2_canvas);
     var map2 = RESOURCES.get_img("testing/map2.png");

     RESOURCES.onload(map2, function() {
        var offset1 = Math.floor(Math.random() * 4500);
           var offset2 = Math.floor(Math.random() * 4500);

          map2_canvas.getContext('2d').drawImage(map2,offset1,offset2,500,500, 0, 0, 250, 250);

          map2_canvas.getContext('2d').globalCompositeOperation = 'source-in';
          map2_canvas.getContext('2d').fillStyle = PALETTE.color_obj_light.code();
          map2_canvas.getContext('2d').fillRect(0, 0, map2_canvas.clientWidth, map2_canvas.clientHeight);

         map2_canvas.getContext('2d').globalCompositeOperation = 'destination-in';
         map2_canvas.getContext('2d').drawImage(map1, 0, 0,200,200);

     //  },4000);
      });
};

/*
var parchment = new StaticSprite("testing/parchment.png", PALETTE.color_background.code());
parchment.place_at(50,500);
parchment.adjust_depth(0);


var map1 = new StaticSprite("testing/map1.png", PALETTE.color_obj_light.code());
map1.place_at(-60,1490);
map1.adjust_depth(15);

var map2 = new StaticSprite("testing/map2.png", PALETTE.color_obj_dark.code());
map2.place_at(-60,1490);
map2.adjust_depth(10);


  this.parchment_canvas.getContext('2d').globalCompositeOperation = 'source-in';
  this.parchment_canvas.getContext('2d').fillStyle = this.color;
  this.parchment_canvas.getContext('2d').fillRect(0, 0, this.parchment_canvas.width, this.parchment_canvas.height);
*/

TextBannerSequence.make([
  "During thousands of years, the world of $$world_name$ had enjoyed peace and prosperity.",
  "Of course monarchs fell and rose, and the occasional war broke out, but not much truly threatened the life of its inhabitants.",
  "This all changed one fateful day where the Demon Lord $$demon_lord$ appeared and started to spread its Armies of Darkness over $$world_name$.",
  "Where these evil legions originated, nobody really knew. They swept over the world with a savagery $$world_name$ had never known. The monstrous creatures butchered and raped anyone who stood in their way, destroying families and ravaging villages.",
  "It wasn't long before $$world_name$ fell in an age of darkness. People grew afraid of leaving their homes, and the royal armies could do little more than secure a few cities from the barbaric hords of demons.",
  "Life was tough, and for many brief, but there was still hope to be found in $$world_name$. For in the darkest times, the light of the Goddess grew, and the Church brought to all the believers the promise of a better day.",
  "It was said that one day, a child would be born who would be the Vessel of the Goddess. This holy child would receive from Her Grace unfathomable powers, and through great perseverance and bravery they would slay the Demon Lord and its armies, liberating $$world_name$ from their cruelty and ushering the renewal of civilization.",
  "Needless to say that the holy child was eagerly awaited, and the Church of the Goddess had been searching for them for generations. But the wait would soon be coming to an end...",
]);
