// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.levels.hideandseek();
var gen = new Generator(DICTIONARY.get("world_seed")*8);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

var town = new S_TownFloor(1050, 1550, 500, 500, "010_world_map", "assets/patterns/mud.png");

// ===================
//hack E. DECOR (permanent filler)
// ===================

var nap = function() {
  TextBannerSequence.make([
    "You let yourself go and dive into a welcome rest.",
    "Dreams soothes your brain as the sleep soothes your body.",
    "...",
    "You feel an unusual presence next to you. And a weird noise. Are those... footsteps, approaching?",
    "You barely have time to open your eyes before finding yourself with a dagger against your neck.",
  ], function(){
    BATTLE.api.make('_party/_StreetSmart');
  });
}

var trap = function() {
  TextBannerSequence.make([
    "You struggle to not fall asleep, but you keep your mind focused on your goal. Pretty soon, you feel the presence of your assailant.",
  ], function(){
    BATTLE.api.make('_party/_StreetSmart2');
  });
}

var rest = function() {
  TextBannerSequence.make([
    "You all have a good rest. You feel refreshed, ready to go on the road again!",
  ], function(){
    CURRENTLEVEL.setup("010_world_map");
  });
}

var rest_options = [
  {"text": "Fight it and get up!", "effect": "##CLOSE"},
];

if (PARTY.has_member(PARTYMEMBERS.StreetSmart)) {
  rest_options.push({"text": "Nap carefully, keep watch in turns.", "effect": rest});
} else if(STATS.flag("StreetSmart_mugged")) {
  rest_options.push({"text": "Nap carefully, keep watch in turns.", "effect": rest});
  rest_options.push({"text": "Pretend to nap to trap thieves.", "effect": trap});
} else {
  rest_options.push({"text": "Embrace it and take a nap.", "effect": nap});
}

var rest_menu = function () {
  new CenteredTextMenu("What do you do?", rest_options);
}

var makeTree = function(x,y,seed){
  var t = new S_Tree(x, y, seed);
  t.interaction = function(){
    TextBannerSequence.make([
      `You lay your bag on the ground and rest your back against the old bark. $$BestFriend$ takes place right next to you. The gentle wind caresses your cheeks as you silently wonder what the road ahead holds in store for you.`,
      `As you relax, you feel drowsiness take hold of you, and your eyes begin to close.`,
    ], rest_menu);
  }
  return t;
}

var treeFiller = new Filler(gen.get(), 100, 100);
treeFiller.set_zone(1050, 1500, 500, 450);
treeFiller.set_tries(4, 15);
treeFiller.add_constructor(makeTree);
treeFiller.fill_floor_by_retry();

// ===================
//hack G. START/INIT
// ===================


CURRENTLEVEL.setup_text_start_function([
    "You arrive at a small grove. The lush trees provide a welcome shelter from the elements. Any of them would be a great place for a nap.",
    `$$BestFriend$: "How about a little break?"`,
  ], undefined, true);

town.get_exit().initialize_with_character(1050, 1520);
