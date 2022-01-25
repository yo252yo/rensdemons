// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.levels.hawks();

var hawkpart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  hawkpart= parseInt(s[1]);
}
var gen = new Generator((DICTIONARY.get("world_seed")+ hawkpart)*61);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

var centerX = 1000 + 1500;
var centerY = 1000 + 1500;

var paths = [200, 150, 100, 75,  50];
var sizes = [1400,  900, 600, 400, 200];

var o = Math.floor((hawkpart-1) / 4);
var path = paths[o];
var size = sizes[o];

var exit;
var floors = [];

switch(hawkpart % 4){
  case 1:
    floors.push(new S_MudFloor(centerX-size, centerY+size,           size, path));
    var destination = hawkpart > 1 ? "014_hawks@" + (hawkpart-1) : "010_world_map";
    exit = new S_ExitFloor(centerX-size+size-25, centerY+size,           50, path, destination);
    floors.push(new S_MudFloor(centerX-size, centerY+size,           path, size));
    new S_ExitFloor(centerX-size, centerY+size-size+25,           path, 50, "014_hawks@" + (hawkpart+1));
  break;
  case 2:
    floors.push(new S_MudFloor(centerX-size, centerY-size + path,    size, path));
    new S_ExitFloor(centerX-size+size-25, centerY-size + path,    50, path, "014_hawks@" + (hawkpart+1));
    floors.push(new S_MudFloor(centerX-size, centerY,                path, size));
    exit = new S_ExitFloor(centerX-size, centerY+25,                path, 50, "014_hawks@" + (hawkpart-1));
  break;
  case 3:
    floors.push(new S_MudFloor(centerX, centerY-size + path,         size, path));
    exit = new S_ExitFloor(centerX-25, centerY-size + path,  50, path, "014_hawks@" + (hawkpart-1));
    floors.push(new S_MudFloor(centerX+size - path, centerY,         path, size));
    new S_ExitFloor(centerX+size - path, centerY+25,  path, 50, "014_hawks@" + (hawkpart+1));
  break;
  case 0: // 4
    floors.push(new S_MudFloor(centerX, centerY+size,                size, path));
    if (hawkpart < 20){
      new S_ExitFloor(centerX-25, centerY+size,       50, path, "014_hawks@" + (hawkpart+1));
    }
    floors.push(new S_MudFloor(centerX+size - path, centerY+size,    path, size));
    exit = new S_ExitFloor(centerX+size - path, centerY+size-size+25,  path, 50, "014_hawks@" + (hawkpart-1));
  break;
}

if (hawkpart == 20){ // summit
  new S_MudFloor(2475,2700,50,150);
  floors.push(new S_MudFloor(2400,2600,200,200));
}

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

if(hawkpart % 4 == 1){
  new S_SavePoint(exit.x - 125, exit.y + 25 - (path-50)/2);
}
if(hawkpart == 20){
  new SBattle(2475, 2650, 'mountains/phoenix');
  new SBattle(2475, 2500, '#wand'); // WIP TODO
}

// ===================
//hack E. DECOR
// ===================


var f = new Filler(gen.get());
var filler = new MultiFiller(f, 50, 50);

filler.add_default_constructor("S_RocksHuge", 3, 200, 50);
filler.add_default_constructor("S_Rocks1");
filler.add_default_constructor("S_Rocks2");
filler.add_default_constructor("S_Pebbles");
filler.add_default_constructor("S_Rootstall", 1.5);
filler.add_default_constructor("S_Root", 1.5);

filler.set_tries(10+2*size/100, 10+3*size/100);

for (var floor of floors){
  filler.set_zone(floor.x - 50,floor.y + 50,floor.w +100,floor.h +100);
  filler.fill_decor_by_retry();
}


// ===================
//hack F. EVENTS
// ===================


var events = new EventFiller(filler, 10);
events.set_tries(2+size/100, 2*size/100);
events.battle('mountains/pterosaur',0.3);
events.battle('mountains/emu',0.5);
events.battle('mountains/hawk', 2);
events.battle('world/grizzly');
events.battle('caves/scorpion', 0.5);

/*


events.groundItem(ITEM.Stick, 0.7);
events.groundItem(ITEM.Berry, 0.7);
events.groundItem(ITEM.Flower, 0.7);
events.battleRubble(ITEM.Elixir_vine, 1);

events.byConstructor("EB_Plants", 0.5);

events.text(`You feel observed. Are the trees all around somehow watching you? That's ridiculous, they're just trees... Yet, you can't fake this uneasy feeling.`, 0.5);
events.text(`You hear rustling in the bushes behind you. Is there someone else here?`, 0.5);
events.text(`You feel determined to explore this forest in depth. You may find very interesting things.`, 0.5);
events.text(`You find a weirdly shaped tiny tree. You're keenly aware that everything in this forest has a purpose, and you wonder what this tree is for. Is it a distraction?`, 0.5);
events.text(`You look around, leaving no bush unchecked, in hope of finding some sort of treasure, to no avail.`, 0.5);
events.text(`You investigate your surroundings, hoping for anything new and noteworthy. But it's just a forest.`, 0.5);
events.text('You look behind a bush, excited at the potential of what you may find there. Sadly, behind the bush is just another bush.', 0.5);
events.text(`You wonder how much longer you'll have to walk in the darkness of this oppressive forest. The result better be worth it!`, 0.5);
events.text('You cannot help but doubting yourself. Maybe you are underprepared for this forest. Maybe you should have trained more. Maybe you should leave and come back later...', 0.5);
events.text('You feel rather disappointed with this place so far. You expected a mighty sanctuary full of riches. But it turns out that sentient trees are very similar to normal trees. And very static.', 0.5);
events.text('You are confident in the fairness of this forest. The tougher the trial, the better the reward. You continue your march empowered by this feeling of determination.', 0.5);
events.text('You look carefully around you, but there seems to be nothing of note. This did not progress your quest at all.', 0.5);
events.text('You examine closely every plant and animal you come across. Everything that seems even remotely intriguing. Who knows where you can find a hidden gem?', 0.5);

*/

for (var floor of floors){
  events.set_zone_from_floor(floor);
  events.fill_floor_by_retry();
}

// ===================
//hack G. START/INIT
// ===================

if(hawkpart == 1){
  CURRENTLEVEL.setup_text_start_function([
    `You find yourself at the bottom of the tallest mountain you've ever seen. It is bound to be an arduous climb.`,
  ]);
}

exit.initialize_with_character(2500, 2500);
