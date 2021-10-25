
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*21);

// ===================
//hack 1. FLOORS
// ===================
new S_Floor(1225,2500,175,125);
new S_Floor(1125,2400,375,325);

// ===================
//hack 2. EXIT
// ===================
new S_ExitFloor(1225,2525,175,50, "042_fissure_trunk");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
var postBossDialog = function(){
  TextBannerSequence.make([
    `The carcass of the rocky monster forms a pile of shining colorful minerals. You cannot help but look through the pile of prismatic stones without knowing exactly why. Perhaps simply to see the vibrant hues dance on the cave ceilling.`,
    `In the middle of the debris, you find a few stone tablets. Like all the inscriptions you've seen in this place, it is written in different languages, but unlike the others, this one has clearly been made by hand, without too much care for appearances. Some letters have faded out, but you can still make out the gist of the message.`,

    `To whoever sees this in the future, if there even is a future. Evil is upon us, the beast is unleashed. Our hubris and pride have blinded us. We were full of ourselves, entranced by our accomplishments, and we lost our way. We celebrated our greatness, revelled in our individuality... We took our world for granted. We were careless and ungrateful. We forgot the Goddess. All powerful that She is, She needs our worship to protect us... In our godless age, our faith decreased, so did Her Blessed Embrace. And now the beasts are swarming through the cracks to punish us for our sins...`,
    `Do not be blinded by the flattering appeal of narcissism! Stay clear of vanity! Do not forget humility! We need the Goddess, as She needs us.`,

    `$$BestFriend$: "So... the Ancestors lost their faith... and the Goddess' protection..."`,
    `$$Ren$: "That's what it seems... I had a feeling it would be something of the sort..."`,
    `$$BestFriend$: "Where does that leave us?"`,
    `$$Ren$: "Well, for once, it means that faith is our most important weapon. We have regained the Goddess' protection, we have her on our side. I'm living proof of that. But She cannot just dissipate our problems away by magic."`,
    `$$BestFriend$: "What next, then?"`,
    `$$Ren$: "We must trust in Her judgement... She may protect us, but She can only act through us... We must wield the weapon She gave us..."`,
    `$$BestFriend$: "You..."`,
    `$$Ren$: "Yes. No more tricks, no more artifacts. Our blind faith, and strike at the heart of the enemy."`,
    `$$BestFriend$: "It seems risky..."`,
    `$$Ren$: "Faith means not having any doubt!"`,
    `$$BestFriend$: "Well, you're the one atuned to the Goddess. If that's what She tells you to do, this must be the key to victory!"`,
    `$$Ren$: "Let's go back to $$demon_lieutenant$. And this time, let's not stop until $$demon_lord$ is defeated and $$world_name$ is free! We need to be the arm that carries out the Goddess's will!"`,
  ]);

  STATS.record.flag("StoryOfTheAncients");
  ABILITIES.unlock("_rhino_defeated");
}

var s = new SBattle(1275, 2250, 'caves/rhino', 100);
s.interaction = function(){
  if (!ABILITIES.has_ability("_rhino_defeated")){
    BATTLE.api.make("caves/rhino", postBossDialog);
  } else{
    TextBannerSequence.make([
      `$$Ren$: "Let's go back to $$demon_lieutenant$. And this time, let's not stop until $$demon_lord$ is defeated and $$world_name$ is free! We need to be the arm that carries out the Goddess's will!"`,
    ]);
  }
}

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var decorFiller = new Filler(gen.get());

decorFiller.set_zone(1000,2650,650,750);
decorFiller.set_tries(5, 15);
decorFiller.set_object(175, 50, function(x,y,seed){ return new S_RocksHuge(x, y); });
decorFiller.fill_decor_by_retry();
decorFiller.set_tries(5, 10);
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks1(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks2(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks3(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks4(x, y); });
decorFiller.fill_by_retry();

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================




// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.start_function = function() {
  var callback = function(){
    SAVE.autosave();
    IO.control.character();
  }
  TextBannerSequence.make([
    "You arrive in a spherical cave. The curved walls are adorned with shining golden arabesques which join at the apex above you. In the middle of the room, you notice what appears to be a pile of huge colorful precious stones, slightly shimmering in the darkness. But looking at it more closely, you notice that it's the rocky shell of a massive monsters who appears to be asleep.",
    `$$BestFriend$: "So much for this last cavern... It could make us rich, but I'm not sure it will teach us anything about the ancestors..."`,
    `$$Ren$: "Don't speak too fast. I do feel like there is something important in this room. This whole cave has been leading up to it... We need to slay that monster!"`,
    `$$BestFriend$: "Are you sure? It seems risky... Is that another one of your Goddess-given intuitions?"`,
    `$$Ren$: "Exactly! I just know that's what we need to do!"`,
    `$$BestFriend$: "Let's do it, then..."`,
  ], callback);
};


CURRENTLEVEL.initialize_with_character(1300,2475);
