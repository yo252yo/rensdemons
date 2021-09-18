
AUDIO.music.levels.harpies();

var win = function(){
  CURRENTLEVEL.setup("demo/end");
}


var nothing = function(){
  TextBannerSequence.make([`That did not do anything.`]);
}
var turnoff = function(){
  TextBannerSequence.make([`The light fades out from the glass plate, and everything comes back to the state it was when you first entered the room.`]);
}

var lookat = function(){
 new CenteredTextMenu("What will you do?",
               [
                 {"text": "Look at the glass screen", "effect": function(){BATTLE.api.make('_demo/_screen')}},
                 {"text": "Walk away", "effect": turnoff},
              ]
            );
}

var turnon = function(){
  TextBannerSequence.make([
    `As soon as your finger touches the glass, the humming grows louder, and the glass becomes imbued with a light glow. In an instant, shapes start forming on the lit surface. First, you see a wheel spinning slowly. Then it fades away to display the silhouette of a child in front of an altar on a flat colored background. You distinguish some text in a box.`,
  ], lookat);
}

var approach = function(){
  new CenteredTextMenu("What will you do?",
                [
                  {"text": "Touch the glass", "effect": turnon},
                  {"text": "Touch a block", "effect": nothing},
                  {"text": "Nothing", "effect": "##CLOSE"},
               ]
             );
}


var computer = new S_SavePoint(1225, 1175);
computer.interaction = function(){
  TextBannerSequence.make([
    `This altar is a bit different from the ones you've seen back in town. On its surface, there is a big plate of glass, surrounded by many little blocks. Each of these blocks has a letter or a symbol carved on it.`,
  ], approach);
}


new S_Floor(1050,1450,400,400);
new S_ExitFloor(1150,1475,200,50, 'demo/mountain');

CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `You arrive in a cavern. The air is cool but damp. Nobody seems to have been here in ages, as demonstrated by a thick layer of dust on the floor. The walls seem covered in metal. A low constant humming fills the room but you cannot make out where it's coming from. Prehaps this weird metal altar in the center?`,
  ], IO.control.character);
};


CURRENTLEVEL.initialize_with_character(1250, 1400);
