// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.town.hope();
var gen = new Generator(DICTIONARY.get("world_seed")*2);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================
TOWN = new S_TownFloor(1050, 2050, 1000, 1000, "010_world_map");

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

new S_Church(1450, 1400, "004_trial_end");

new S_Store(CITIES.hope, ITEMS_ARCHETYPES_NAMES.Weapon, 200, 1700, 1175, gen.get());
new S_Store(CITIES.hope, ITEMS_ARCHETYPES_NAMES.Tool, 100, 1850, 1225, gen.get());

var s = new S_Store(CITIES.hope, "Occult", 0, 1150, 1950, gen.get());
s.enter_function = function() {
  CURRENTLEVEL.setup("006_occultshop$");
};

if (!PARTY.has_member(PARTYMEMBERS.PreciousChild)){
  var preciousChild  = new M_PreciousChild(1875, 1980);
}

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 1975, 950,  975);
houseFiller.set_tries(5, 70);
houseFiller.add_constructor(function(x,y,seed){ return new S_House(CITIES.hope, x, y, seed); }, 1 ,120, 160);
houseFiller.fill_floor_by_retry();


var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 1975, 1000, 975);
villagerFiller.set_tries(3, 30);//this.gen.int(10) - 7
villagerFiller.add_constructor(function(x,y,seed){ return new M_Villager(CITIES.hope, x, y, seed); },1 , 50, 60);
villagerFiller.fill_floor_by_retry();

villagerFiller.set_tries(2, 6);
villagerFiller.add_constructor(function(x,y,seed){ return new M_Guard(CITIES.hope, x, y, seed); },1 , 50, 60);
villagerFiller.fill_floor_by_retry();


var g =  [1525, 1425];
var bf = new M_BestFriend(g[0] + 50, g[1] + 10);

var bf_join_party = function(){
  PARTY.add(PARTYMEMBERS.BestFriend);
  TextBannerSequence.make([
    "$$BestFriend$ joins your party!",
  ], function(){ bf.destroy(); IO.control.character(); });
};

var bf_without_foreknowledge = function(){
  TextBannerSequence.make([
    `You still hesitate, worried about the dangers ahead. $$BestFriend$ takes your hand and smiles.`,
    `$$BestFriend$: "Stop thinking about it, it's not a matter up for discussion. I'm not taking no for an answer. I'm not leaving your side, period. So, should we go?"`,
  ], bf_join_party);
}

var bf_with_foreknowledge = function(){
  TextBannerSequence.make([
    `$$Ren$: "I'm forbidding you to come! I know for a fact that if you join me, you will die!"`,
    `$$BestFriend$: "Is that so? How can you be so sure?"`,
    `$$Ren$: "The Goddess..."`,
    `$$BestFriend$: "Oh, stop it with the Goddess! There's no way you know everything that's going to happen!"`,
    `$$Ren$: "But..."`,
    `$$BestFriend$: "And what if I don't come, then what? Did the Goddess tell you that you'll succeed?"`,
    `$$Ren$: "Well not yet, but..."`,
    `$$BestFriend$: "See, you need me. Stop thinking about it, it's not a matter up for discussion. I'm not taking no for an answer. I'm not leaving your side, period. So, should we go?"`,
    `You reluctantly cave, hoping that this time, something will be different...`,
  ], bf_join_party);
}

var bf_prejoin_party = function(){
  if(STATS.flag("KilledBestFriend")){
    new CenteredTextMenu("Are you going to disclose your past experiences about what happens to your friend?",
                  [
                    {"text": "Tell everything", "effect": function(){ bf_with_foreknowledge(); }},
                    {"text": "Pretend not to know", "effect": function(){ bf_without_foreknowledge(); }},
                 ]
               );
  } else {
    bf_without_foreknowledge();
  }
};

// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.start_function = function() {
  var infoSource = "The Goddess herself";
  if (ABILITIES.has_ability("_004_priest_asked")){
    infoSource = "A priest";
  }
  bf.face_character();
  TextBannerSequence.make([
    `As soon as you exit the building, you find $$BestFriend$, waiting for you on the doorsteps. You can clearly see on your friend's face the shadow of extreme worry melting away into a radiant smile.`,
    `$$BestFriend$: "By the Goddess, $$Ren$, I was so worried! I tried to put on a brave face, but I didn't think you'd make it. Nobody ever did. I thought the next person I would talk to would be a priest telling me the worst dreadful news... In all my life, I have never been so scared! And then I heard some yells from inside. I thought maybe, just maybe..."`,
    `$$BestFriend$ is too overwhelmed to properly articulate. Most sentences die in an incoherent sob. Tears of relief start pouring on the face of your companion.`,
    `$$BestFriend$: "I... I thought I'd never see you again. I thought..."`,
    `You share a tender hug that leaves your shoulder wet.`,
    `$$Ren$: "There, there. I don't know how, but I made it out."`,
    `Words fail to capture the many emotions going through both of you, so you remain silent for a few moments. Slowly, the storm of anguish and relief dissipates.`,
    `$$BestFriend$: "I'm so happy..."`,
    `$$Ren$: "Me too."`,
    `$$BestFriend$ takes a step back and sends you a serious look.`,
    `$$BestFriend$: "So that means you are...."`,
    `$$Ren$: "...the Promised Child. Yes. I guess the worries are far from over."`,
    `You exchange a half-hearted laugh.`,
    `$$BestFriend$: "So what happens next?"`,
    `$$Ren$: "It seems that I need to leave this city. I'm going to need some serious training if I want to stand up to $$demon_lord$. Apparently it starts in $$town_2$, north of here."`,
    `$$BestFriend$: "How do you know that?"`,
    `$$Ren$: "${infoSource} told me."`,
    `$$BestFriend$: "... told you to go by yourself? You're just a child!"`,
    `$$Ren$: "Yes, but doubting me is doubting the Goddess, you see. If I'm the Promised Child, I'm not supposed to need help from mortals. I have the Goddess with me. Apparently it's blasphemous to imply that Her holy protection may not be enough."`,
    `$$BestFriend$: "Blasphemous or not, I don't care, I'm coming with you!"`,
    `$$Ren$: "But... it's gonna be dangerous, who knows what monsters we'll have to face."`,
    `$$BestFriend$: "Well then we'll face them together! And if we die, we'll die together. I'm sure it won't happen, though, since the Goddess has your back."`,
    `$$BestFriend$ winks playfully.`,
    `$$Ren$: "I... I don't know, I don't want bad things to happen to you..."`,
    `$$BestFriend$: "And I can't imagine anything worse than sitting here stuck in this village worrying about you, not knowing if you're even coming back. I've had a taste of this over the last few hours, and it's enough for a lifetime. Never again, no thanks."`,
  ], bf_prejoin_party);
};


CURRENTLEVEL.initialize_with_character(g[0], g[1]);
