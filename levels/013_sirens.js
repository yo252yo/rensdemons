
/*
mermaid,naiad,triton

serpent < boss
*/

new S_SandFloor(1725,2750,450,200);
new S_ExitFloor(1725,2775,450,50, "010_world_map");

var b = new M_Boat(1700,2600);
new S_SeaFloor(1075,2575,2450,1200);

CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
  `You arrive at the border of a big lake. The surface is shining under the sunlight.`,
  `$$BestFriend$: "It's beautiful! Look, there's a boat here! We should definitely borrow it and go in the middle of the lake! It would be so peaceful and relaxing! Not to mention safe..."`,
  `$$Ren$: "I'm not sure about that... This looks suspicious... Especially when you say things like that..."`,
  `$$BestFriend$: "Please!"`,
  ], IO.control.character);
}

CURRENTLEVEL.initialize_with_character(1950,2675);
