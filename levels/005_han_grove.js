AUDIO.music.hideandseek();

CURRENTLEVEL.start_function = function() {
  var callback = function(){
    SAVE.autosave();
    IO.control.character();
  }
  TextBannerSequence.make([
    "You arrive at a small grove. The lush trees provide a welcome shelter from the elements. Any of them would be a great place for a nap.",
    `$$BestFriend$: "How about a little break?"`,
  ], callback);
};

new S_TownFloor(50, 550, 500, 500, "005_world_map");


var seed = DICTIONARY.get("world_map_seed");
var gen = new Generator(seed);

var startBattle = function(){
  BATTLE.api.make('_party/_StreetSmart');
}

var nap = function() {
  TextBannerSequence.make([
    "You let yourself go and dive into a welcome rest.",
    "Dreams soothes your brain as the sleep soothes your body.",
    "...",
    "You feel an unusual presence next to you. And a weird noise. Are those... footsteps, approaching?",
    "You barely have time to open your eyes before finding yourself with a dagger against your neck.",
  ], startBattle);
}

var rest_menu = function () {
  new CenteredTextMenu("What do you do?",
                [
                  {"text": "Embrace it and take a nap.", "effect": nap},
                  {"text": "Fight it and get up!", "effect": "##CLOSE"},
               ]
             );
}

var makeTree = function(x,y,g){
  var t = new S_Tree(x, y, g);
  t.interaction = function(){
    TextBannerSequence.make([
      `You lay your bag on the ground and rest your back against the old bark. $$BestFriend$ takes place right next to you. The gentle wind caresses your cheeks as you silently wonder what the road ahead holds in store for you.`,
      `As you relax, you feel drowsiness take hold of you, and your eyes begin to close.`,
    ], rest_menu);
  }
  return t;
}

var treeFiller = new Filler(gen);
treeFiller.set_zone(50, 500, 500, 450);
treeFiller.set_tries(4, 15);
treeFiller.set_object(100, 100, makeTree);
treeFiller.fill_by_retry();

CURRENTLEVEL.initialize_with_character(50, 520);
