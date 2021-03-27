AUDIO.music.town();

var seed = DICTIONARY.get("town_1_seed");

var make_town_specifics = function(){
  // make the meeting with PreciousChild for instance
}
var gen = new TownGenerator(seed, 1800, 1800, make_town_specifics);

gen.build();

var g = gen.church_entrance();

var bf = new M_ChildF(g[0] + 50, g[1] + 10);

var bf_join_party = function(){
  PARTY.add(PARTYMEMBERS.BestFriend);
  TextBannerSequence.make([
    "$$BestFriend$ joins your party!",
  ], function(){ bf.destroy(); IO.control.character(); });
};

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
    `You still hesitate, worried about the dangers ahead. $$BestFriend$ takes your hand and smiles.`,
    `$$BestFriend$: "Stop thinking about it, it's not a matter up for discussion. I'm not taking no for an answer. I'm not leaving your side, period. So, should we go?"`,
  ], bf_join_party);
};


CURRENTLEVEL.initialize_with_character(g[0], g[1]);
