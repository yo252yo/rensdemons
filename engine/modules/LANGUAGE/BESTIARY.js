BESTIARY = {
  dict: {},

  intro: function(battle_name) {
    var split = battle_name.split("/");
    if (split.length < 2 || ! BESTIARY.dict[split[split.length-2]]){
      return undefined;
    }
    if (! BESTIARY.dict[split[split.length-2]][split[split.length - 1]]){
      return undefined;
    }
    return BESTIARY.dict[split[split.length-2]][split[split.length - 1]]["intro"];
  },

  is_boss(battle_name){
    return [
      "caves/rhino",
      "caves/lizard",
      "forests/blob",
      "forests/fungus",
      "mountains/phoenix",
      "mountains/dragon",
      "pandemonium/lord",
      "pandemonium/lieutenant",
      "trial/basilisk",
      "waters/whale",
      "waters/serpent",
    ].includes(battle_name);
  },

  introed: function(battle_name) {
    var split = battle_name.split("/");
    if (split.length < 2 || ! BESTIARY.dict[split[split.length-2]]){
      return undefined;
    }
    if (! BESTIARY.dict[split[split.length-2]][split[split.length - 1]]){
      return undefined;
    }
    return BESTIARY.dict[split[split.length-2]][split[split.length - 1]]["introed"];
  },

  outroed: function(battle_name) {
    var split = battle_name.split("/");
    if(BESTIARY.is_empathized(battle_name)){
      return "<br />" + BESTIARY.dict[split[0]][split[1]]["outro"];
    }
    return "";
  },

  size: function(category) {
    if (! BESTIARY.dict[category]){
      return -1;
    }
    return Object.keys(BESTIARY.dict[category]).length;
  },

  is_empathized:function(battlename) {
    var score = BATTLETREE.score.num_wins(battlename);

    if(battlename.startsWith("encounters")){
      return false;
    } else if(BESTIARY.is_boss(battlename) && score > 0){
      return true;
    } else if (battlename.startsWith("trial") && score > 1) {
      return true;
    } else if (score > 2) {
      return true;
    }
    return false;
  },

  picture_address: function(battlename) {
    var suffix = ``;
    if(!BESTIARY.is_boss(battlename) && BESTIARY.is_empathized(battlename)){
      suffix = "_empathized";
    }

    return BESTIARY.default_picture_address(battlename, suffix);
  },

  normalize(battlename){
    return battlename.replace(BATTLEOBJECTSMANAGER.prefix, "");
  },

  default_picture_address: function(battlename, suffix) {
    var split = battlename.split("/");
    if (!suffix){
      suffix = "";
    }
    if(battlename.startsWith(BATTLEOBJECTSMANAGER.prefix)){
      return "assets/" + battlename.replace(BATTLEOBJECTSMANAGER.prefix, "objects/") + ".png";
    } else if(split.length <= 1 || !BESTIARY.dict[split[0]] || !BESTIARY.dict[split[0]][split[1]] || BESTIARY.dict[split[0]][split[1]]["no_img"]){
      return undefined;
    } else {
      return `assets/battles${suffix}/${battlename}.png`;
    }
  },

  picture: function(battlename) {
    return new CenteredBattleImage(BESTIARY.picture_address(battlename), 'background');
  },

  setup_attacks: function(battlename, attack){
    var split = battlename.split("/");
    if(split.length <= 1 || !BESTIARY.dict[split[0]] || !BESTIARY.dict[split[0]][split[1]]){
      return undefined;
    }
    var texts = BESTIARY.dict[split[0]][split[1]]["attacks"];
    for(var a in texts) {
      BATTLE.monster_actions.add_textual(texts[a], attack);
    }
  },

  attacks_list: function(battlename){
    if(!BESTIARY.is_empathized(battlename)){
      return "";
    }

    var split = battlename.split("/");
    if(split.length <= 1 || !BESTIARY.dict[split[0]] || !BESTIARY.dict[split[0]][split[1]]){
      return undefined;
    }
    var texts = BESTIARY.dict[split[0]][split[1]]["attacks"];
    var result = "<ul>";
    for(var a in texts) {
      result += `<li><b>${a}</b>:<ul style="list-style-type: none;"><li>${texts[a]}</ul></li></li>`;
    }
    result += "</ul>";
    return result;
  },
}

//hack encounters
BESTIARY.dict["encounters"] = {};
BESTIARY.dict["encounters"]["traveler"] = {
  "intro": "You cross the path of another weary traveler.",
  "introed": "You crossed the path of another weary traveler.",
};
BESTIARY.dict["encounters"]["ruins"] = {
  "intro": "You stumble upon an odd structure. As you approach, you conclude that it must be the ruins of a building from a long gone civilization. It is entirely unlike anything you know. Instead of wood and stone, you find mostly rusted metal and a smooth, alien substance.",
  "introed": "You stumbled upon an odd structure.",
};
BESTIARY.dict["encounters"]["villagers"] = {
  "no_img": true,
  "introed": "You started a self-aware conversation with a villager.",
};
BESTIARY.dict["encounters"]["elder"] = {
  "intro": "A cloaked eldery woman walks slowly towards you.",
  "introed": "A cloaked eldery woman walked slowly towards you.",
};
BESTIARY.dict["encounters"]["minstrel"] = {
  "intro": "You meet a minstrel traveling with his instruments.",
  "introed": "You met a minstrel traveling with his instruments.",
};
BESTIARY.dict["encounters"]["purse"] = {
  "intro": "You find an abandonned purse on the ground.",
  "introed": "You found an abandonned purse on the ground.",
};


//hack world
BESTIARY.dict["world"] = {};
BESTIARY.dict["world"]["arsonist"] = {
  "intro": "An Ambitious Arsonist Aspires to set you Ablaze.",
  "introed": "An Ambitious Arsonist Aspired to set you Ablaze.",
  "outro": "An everlasting flame consumed it to its core and drove it mad with anger.",
  "attacks": {
    "Torching": "The Arsonist waves its incandescent torch in your direction.",
    "Fireball": "The Arsonist hits you with a ball of fire.",
    "Pyromania": "The Arsonist sets fire to the floor around you.",
  },
};
BESTIARY.dict["world"]["bruiser"] = {
  "intro": "A Brutal Bruiser thinks you're Begging for a Beating.",
  "introed": "A Brutal Bruiser thought you were Begging for a Beating.",
  "outro": "Its mace could never impress the object of its unrequited love.",
  "attacks": {
    "Slam": "The Bruiser slams you with its heavy mace.",
    "Spin": "The Bruiser spins around, holding its spiked bludgeon.",
    "Pounding": "The Bruiser chains up slow but powerful hits.",
  },
};
BESTIARY.dict["world"]["butcher"] = {
  "intro": "A Butcher Beholds you as the Basis for his Buffet.",
  "introed": "A Butcher Beheld you as the Basis for his Buffet.",
  "outro": "It lost the sense of taste and starved as all food became repulsive.",
  "attacks": {
    "Chop": "The Butcher smashes you with the biggest knife you've ever seen.",
    "Mince": "The Butcher hits you with a blade as big as yourself.",
    "Slice": "The Butcher slices through the air with precision, as if to cut you in half.",
  },
};
BESTIARY.dict["world"]["djinn"] = {
  "intro": "A Deviant Djinn Drifts in an eerie Dance.",
  "introed": "A Deviant Djinn Drifted in an eerie Dance.",
  "outro": "Carried by the breeze, it dissolved, and its little particles could be found everywhere in the world.",
  "attacks": {
    "Whirlwind": "The Djinn charges in your direction, surrounded by a tornado that tears through the air.",
    "Thunderstorm": "The Djinn spins around in a whirlwind of lightning.",
    "Dash": "The Djinn dives towards you at an incredible speed, propelled by its mastery over the elements.",
  },
};
BESTIARY.dict["world"]["ghost"] = {
  "intro": "A Ghastly Ghost Glows Gloomily.",
  "introed": "A Ghastly Ghost Glowed Gloomily.",
  "outro": "It grew fainter and fainter in presence and memories until the day no-one could see or remember it.",
  "attacks": {
    "Haunting": "The Ghost extends a vapory arm towards you and burrows it deep in your chest. The cold pierces through you.",
    "Tease": "The Ghost floats around you, grinning menacingly.",
    "Chill": "The Ghost charges through you. It feels as if you've been in ice cold water. You think a piece of your soul is missing.",
  },
};
BESTIARY.dict["world"]["goblin"] = {
  "intro": "A Grumpy Goblin Grasps some Grass.",
  "introed": "A Grumpy Goblin Grasped some Grass.",
  "outro": "No matter how much it pulled out plants, it never got closure over its mother dead and burrowed at such an early age.",
  "attacks": {
    "Stick": "The Goblin slaps you with its stick.",
    "Vegetables": "The Goblin shakes its vegetal weapon in your direction. Maybe it's cursing you...",
    "Bouquet": "The Goblin waves its bouquet around while mumbling something that sounds like an incantation.",
  },
};
BESTIARY.dict["world"]["grizzly"] = {
  "intro": "A Gnarly Grizzly Growls Gluttonously.",
  "introed": "A Gnarly Grizzly Growled Gluttonously.",
  "outro": "Its thick fur made it too hot for it to go outside except in the dead of the night.",
  "attacks": {
    "Roar": "The Grizzly roars at you and then charges.",
    "Slap": "The Grizzly slaps you with a powerful paw.",
    "Bite": "The Grizzly bites you in a quick maw movement.",
  },
};
BESTIARY.dict["world"]["knight"] = {
  "intro": "A black Knight Knows he will Kill a Kid.",
  "introed": "A black Knight Knew he will Kill a Kid.",
  "outro": "Failing its trial to fetch a child's blood, it got excluded from the knight's order and disowned by its family.",
  "attacks": {
    "Slam": "The Knight charges you with his wide and sturdy shield.",
    "Cutthroat": "The Knight aims at your throat with a slash of his sword.",
    "Fencing": "The Knight swings his sword expertly towards your weak spots.",
  },
};
BESTIARY.dict["world"]["mammoth"] = {
  "intro": "A Massive Mammoth Mashes the Mud at every step.",
  "introed": "A Massive Mammoth Mashed the Mud at every step.",
  "outro": "It continued blindly charging ahead, for even if its muscles were moving, the light of its soul had long been extinguished.",
  "attacks": {
    "Stampede": "The Mammoth slowly progresses towards you, each step making the ground around tremble.",
    "Stomp": "The Mammoth stomps the ground in your direction, trying to crush you.",
    "Tusks": "The Mammoth slams you with his powerful tusks.",
  },
};
BESTIARY.dict["world"]["mummy"] = {
  "intro": "A Meandering Mummy Moans Mournfully.",
  "introed": "A Meandering Mummy Moaned Mournfully.",
  "outro": "Nobody understood its wails, so its pleas to kill it and end its suffering were never heeded.",
  "attacks": {
    "Choke": "The Mummy seizes your neck and starts choking you.",
    "Bandages": "The Mummy whips you with a loose bandages.",
    "Reach": "The Mummy hits you with a slow but powerful punch.",
  },
};
BESTIARY.dict["world"]["skeleton"] = {
  "intro": "A Snorty Skeleton Seizes its Sword.",
  "introed": "A Snorty Skeleton Seized its Sword.",
  "outro": "Without a living brain in its skull, it was condemned to relieve eternally the final instants of its last battle.",
  "attacks": {
    "Sword": "The skeleton hits you with its sword.",
    "Spar": "The skeleton is quite skilled with its weapon, alternating between feints and hits.",
    "Swing": "The skeleton swings its sword at you, while the rattling of the bones unsettles you.",
  },
};
BESTIARY.dict["world"]["vadhaka"] = {
  "intro": "A Vigorous Vadhaka Vows Vengeance.",
  "introed": "A Vigorous Vadhaka Vowed Vengeance.",
  "outro": "When it understood how vain the quest for vengeance was, its blades were already tarnished with the blood of the innocents.",
  "attacks": {
    "Pummel": "The Vadhaka drowns you under hits from her many arms.",
    "Overwhelm": "The Vadhaka attacks you from all sides with her numerous limbs.",
    "Weapons": "The Vadhaka multiplies her assaults with her diverse weapons.",
  },
};
BESTIARY.dict["world"]["wraith"] = {
  "intro": "A Wayward Wraith Wails its Woe.",
  "introed": "A Wayward Wraith Wailed its Woe.",
  "outro": "It searched and screamed all over the world, but it never found the soul of its lover in spite of their promise to stay united in death.",
  "attacks": {
    "Howl": "The Wraith howls at the sky, and the air around trembles.",
    "Curse": "The Wraith curses you and fills your brain with the cacophony of hundreds of tortured souls screaming for relief.",
    "Malediction": "The Wraith speaks with a deep voice, though you cannot see its mouth. It is long forgotten words invoking a malediction on you.",
  },
};


//hack waters
BESTIARY.dict["waters"] = {};
BESTIARY.dict["waters"]["serpent"] = {
  "intro": "A Sumptuous Serpent Slashes through the Sea.",
  "introed": "A Sumptuous Serpent Slashed through the Sea.",
  "outro": "In the depths where it dwelled, time was much slower, so the next time it surfaced all life had long vanished.",
  "attacks": {
    "Swallowing Wormhole": "The Serpent swims in a circle, first slowly, then with increasing speed. Soon, a huge wormhole opens up in the middle of the water, sucking up everything in its surroundings.",
    "Explosive Tsunami": "The Serpent shakes the water chaotically. Waves collides up in the sky, projecting massive liquid projectiles in all directions with a palpable unrelenting power.",
    "Storm Pillar": "The Serpent dives out of the water and summons dark clouds around it. They soon form a maelstorm grabbing everything around and sucking up the water into a majestic liquid pillar.",
  },
};
BESTIARY.dict["waters"]["anemone"] = {
  "intro": "An Angry Anemone Articulates its Appendage.",
  "introed": "An Angry Anemone Articulated its Appendage.",
  "outro": "Its long meditative lifetime granted it immense wisdom, but it was never able to communicate it with its only mobile limb.",
  "attacks": {
    "Squirm": "The Anemone extends its giant squirmy tentacle in your direction.",
    "Mucus": "The Anemone spreads out a cloud of dark liquid, you better avoid it.",
    "Excretion": "The Anemone spits balls of a venomous goo.",
  },
};
BESTIARY.dict["waters"]["anglerjelly"] = {
  "intro": "An Attentive Anglerjelly Aims at Attracting you.",
  "introed": "An Attentive Anglerjelly Aimed at Attracting you.",
  "outro": "Its encounter with you left it feeling even more empty than before, and it continued to roam the sea searching for something it couldn't quite define.",
  "attacks": {
    "Mesmerize": "The Anglerjelly flickers its light gently, lulling you towards an eternal sleep in a watery grave.",
    "Hypnotize": "The Anglerjelly moves its luminous appendage slowly in an attempt at hypnotizing you.",
    "Attract": "The Anglerjelly seems pretty innocuous. It bathes the scene in a soft light. You feel the urge to get closer...",
  },
};
BESTIARY.dict["waters"]["octopus"] = {
  "intro": "An Oppressive Octopus Obstruct the Ocean.",
  "introed": "An Oppressive Octopus Obstructed the Ocean.",
  "outro": "Everyone feared its suspicious embrace, so it never got the hug it desperately wanted.",
  "attacks": {
    "Stretch": "The Octopus stretches its many arms towards you.",
    "Grab": "The Octopus unfurls its tentacles. They get hold of your arms and legs and start dragging you towards the monster.",
    "Squeeze": "The Octopus grabs you with its many arms and squeezes you tighter and tighter.",
  },
};
BESTIARY.dict["waters"]["naiad"] = {
  "intro": "A Nautical Naiad Nags you Noxiously.",
  "introed": "A Nautical Naiad Nagged you Noxiously.",
  "outro": "A parasite on the head removed all agency from its original body, which kept screaming internally.",
  "attacks": {
    "Slap": "The Naiad slaps you with her tentacles.",
    "Punch": "The Naiad's slimy appendages expand and hit you.",
    "Choke": "The Naiad waves her rod and casts a choking spell on you.",
  },
};
BESTIARY.dict["waters"]["whale"] = {
  "intro": "A Wondrous Whale Wrecks your Wares.",
  "introed": "A Wondrous Whale Wrecked your Wares.",
  "outro": "It could not stop itself from eating all its aquatic companions and ended up alone in an empty lake.",
  "attacks": {
    "Gargantuan Glide": "The Whale moves slowly but surely in your direction, mouth wide open. It is so huge that it occupies almost all of your field of view. Escaping its implacable march is going to be tough.",
    "Devouring Gulp": "The Whale sucks in a large quantity of water, creating a maelstrom of currents around you that shake you violently. You struggle to keep control of your body.",
    "Swaying Song": "The Whale emits a loud and deep cry that seems to make the whole lake vibrate. It then slaps its gigantic fin in your direction. It's several times the size of your house.",
  },
};
BESTIARY.dict["waters"]["triton"] = {
  "intro": "A Triton Trooper Treads the Tides.",
  "introed": "A Triton Trooper Treaded the Tides.",
  "outro": "It was rare for members of this species to survive their spartan training very long.",
  "attacks": {
    "Hook": "The Triton waves its hook towards you.",
    "Javelin": "The Triton charges at you with his deadly javelin.",
    "Slit": "The Triton tries to slit your throat with his weapon.",
  }
};
BESTIARY.dict["waters"]["squid"] = {
  "intro": "A Slithering Squid Swims to Smother you.",
  "introed": "A Slithering Squid Swam to Smother you.",
  "outro": "It was a delicacy in some cities, especially its shell which could enhance any broth.",
  "attacks": {
    "Spike": "The Squid smashes you with one of its spiky tentacles.",
    "Dart": "The Squid darts at you with a pointy tentacle that seems sharp enough to pierce any armor.",
    "Barrage": "The Squid overwhelms you with a barrage of hits from its strong tentacles.",
  },
};
BESTIARY.dict["waters"]["mermaid"] = {
  "intro": "A Magnificent Mermaid Mesmerizes you with Magnetism.",
  "introed": "A Magnificent Mermaid Mesmerized you with Magnetism.",
  "outro": "She abandoned her world for the fisherman she loved, but he got tired of her within weeks.",
  "attacks": {
    "Seduce": "The Mermaid winks at you and beckons you into her treacherous arms.",
    "Sooth": "The Mermaid sings a song that lulls your defenses.",
    "Slither": "The Mermaid approaches you gently, but suddenly switches to grabbing your throat.",
  },
};
BESTIARY.dict["waters"]["jellyfish"] = {
  "intro": "A Judgmental Jellyfish Jiggles Joyfully.",
  "introed": "A Judgmental Jellyfish Jiggled Joyfully.",
  "outro": "Its dance was an artistic catharsis, but nobody ever understood it.",
  "attacks": {
    "Filaments": "The Jellyfish extends a veil of venomous filaments in your direction.",
    "Poison": "The Jellyfish tries to sting you with its translucent poisonous tentacles.",
    "Swarm": "The Jellyfish swims all around you energetically. You must be extremely careful to avoid being burnt by its trail.",
  },
};
BESTIARY.dict["waters"]["crab"] = {
  "intro": "A Cruel Crab Cuts water with its Claws.",
  "introed": "A Cruel Crab Cut water with its Claws.",
  "outro": "Despite how hard it tried, it could never leave the ground and swim upwards like the other creatures it envied.",
  "attacks": {
    "Claw": "The Crab pinches your arm with its dented claws.",
    "Snap": "The Crab rushes at you, snapping its pincers towards your face.",
    "Pinch": "The Crab crawls towards you and pinches your leg.",
  },
};


//hack trial
BESTIARY.dict["trial"] = {};
BESTIARY.dict["trial"]["viper"] = {
  "intro": "A Vicious Viper Ventures into View.",
  "introed": "A Vicious Viper Ventured into View.",
  "outro": "Its skin was praised as the highest quality leather.",
  "attacks": {
    "Slither": "The Viper slithers on the ground towards you.",
    "Bite": "The Viper open its jaw, it shines with drool. Or is that poison?",
    "Hiss": "The Viper's pointy tongue emits a strident hiss.",
  },
};

BESTIARY.dict["trial"]["rodent"] = {
  "intro": "A Repulsive Rodent Rushes to your Rear.",
  "introed": "A Repulsive Rodent Rushed to your Rear.",
  "outro": "It never found its way home and erred forever in the labyrinth.",
  "attacks": {
    "Bite": "The Rodent takes a bite off your leg. It stings. You hope it won't get infected.",
    "Scratch": "The Rodent scratches around, like it's looking for something.",
    "Squeak ": "The Rodent shakes its whiskers. Maybe it's calling for help.",
  },
};

BESTIARY.dict["trial"]["cockroach"] = {
  "intro": "A Crass Cockroach Crawls Creepily.",
  "introed": "A Crass Cockroach Crawled Creepily.",
  "outro": "It got crushed by a slapping hand without a second thought.",
  "attacks": {
    "Charge": "The Cockroach runs between your legs.",
    "Chirp": "The Cockroach emits small chirping sound.",
    "Crawl": "The Cockroach runs around in circles.",
  },
};

BESTIARY.dict["trial"]["basilisk"] = {
  "intro": "A Beastly Basilisk Blitzes on your Body.",
  "introed": "A Beastly Basilisk Blitzed on your Body.",
  "outro": "It lived recluse as an non believer in an overly zealous society.",
  "attacks": {
    "Mortal Gaze": "The Basilisk straightens up, ready to pounce at you. Adrenaline rushes through your body. A cold shiver runs down your spine. You can hear your frantic heartbeat in your eardrums. Time seems to be slowing down for a moment.",
  },
};

BESTIARY.dict["trial"]["arachnid"] = {
  "intro": "An Aversive Arachnid Appears on your Arm.",
  "introed": "An Aversive Arachnid Appeared on your Arm.",
  "outro": "A second of clumsiness and it got trapped in its own web.",
  "attacks": {
    "Crawl": "The Arachnid crawls up your arm. The unsettling sensation of its fur against your skin makes you panic.",
    "Bite": "The Arachnid bites you. Nothing too serious. Yet.",
    "Burrow": "The Arachnid's many legs burrow in your forearm. There's no dislodging their hooks.",
  },
};


//hack pandemonium
BESTIARY.dict["pandemonium"] = {};
BESTIARY.dict["pandemonium"]["lieutenant"] = {
  "intro": "A Loquacious Lieutenant Laughs at your Logic.",
  "introed": "A Loquacious Lieutenant Laughed at your Logic.",
  "outro": "The only thing it ever cared about and wanted was recognition from his lord.",
  "attacks": {
    "Unholy Warcry": "The Lieutenant roars, and the ground trembles below your feet. A torrent of obsidian rocks rolls down from the nearest peak and head straight for you.",
    "Blazing Musculature": "The Lieutenant pumps up his ungodly muscles. Flames start surrounding his crackled skin. He charges at you with a torrent of powerful fist blows.",
    "Volcanic Eruption": "The Lieutenant raises both arms and screams. As an answer to his cry, cracks open in the ground under your feet, and molten lava starts to make its way up. You quickly have to find a place safe from this scorching flooding.",
    "Ablaze Rain": "The Lieutenant snaps his fingers. Hundreds of incandescent ball of fire appear in the air all around him. They dash through the air in your direction, leaving sparkly trails as they go.",
  },
};
BESTIARY.dict["pandemonium"]["lord"] = {
  "intro": "A Luciferian Lord Laments at your Loftiness.",
  "introed": "A Luciferian Lord Lamented at your Loftiness.",
  "outro": "It rejoiced as the sweet embrace of death liberated it from the too heavy weight of its duty.",
  "attacks": {
    "Ardent Tornado": "The Demon Lord raises an arm in the air. Immediately, he gets surrounded by a pillar of flames that reaches the ceiling and follows along the dark stone to engulf the whole room. The temperature of the atmosphere raises sharply, and it becomes hard to breathe. The flames are everywhere.",
    "Overwhelming Projection": "The Demon Lord projects his demonic spirit into your mind. You try to put on psychological defenses, but they are laughable faced with the brute force of the monster. He fills your brain with horrific visions of nightmares. Your biggest fears and traumas harass you relentlessly, and you fall on the ground, paralyzed.",
    "Internal Combustion": "The Demon Lord attacks you with a wave of magical energy. It sips into your whole body and sets your nerves ablaze. Every inch of yourself feels like it has been lit on fire. The acute pain is so overwhelming that you almost faint.",
    "Blazing Exhalation": "The Demon Lord breathes on the ball of fire that he holds in his hand. A wave of flames expands from it and surrounds him. He soon finds himself at the center of an incandescent tornado. You realize with horror that the devouring whirlwind is expanding, taking more and more of the room's volume. It won't be long before the whole space is a burning maelstrom.",
    "Barren Aridity": "The Demon Lord snaps his finger. The air around you warms up fast. It becomes dry and sparks appear here and there. It seems to take up a crimson shade. Suddenly, you find yourself ablaze. A layer of flames surrounds every inch of your body and slowly devour your flesh.",
  },
};
BESTIARY.dict["pandemonium"]["abaddon"] = {
  "intro": "An Abhorrent Abaddon Awaits your Attrition.",
  "introed": "An Abhorrent Abaddon Awaited your Attrition.",
  "outro": "It waited, waited and waited some more but reckoning never came.",
  "attacks": {
    "Phobic Tetanization": "The Abaddon fills your mind with your worst phobias and fears. You wuss.",
    "Embarrassment Recoil": "The Abaddon digs deep in your mind and awakens the most embarrassing and cringy memories. You keep failing.",
    "Relentless Chronology": "The Abaddon reminds you of all your sad and painful moments of your life. You keep losing what you care about.",
  },
};
BESTIARY.dict["pandemonium"]["asmodeus"] = {
  "intro": "An Abyssal Asmodeus Assesses you and Attacks.",
  "introed": "An Abyssal Asmodeus Assessed you and Attacks.",
  "outro": "It never forgave itself for misjudging you, and spent all its life proofing and checking its computations.",
  "attacks": {
    "Insignificance Realization": "The Asmodeus projects the whole universe in your brain. You can see yourself growing smaller than the smallest conceivable speck in an abyss of void. You are nothing.",
    "Sensory Depravation": "The Asmodeus isolates you from the real world by dimming your senses. You are nowhere.",
    "Involuntary Accident": "The Asmodeus awakens the memories of all the bad things you did without meaning to, highlighting your lack of mastery over the world. How can you expect to amount to anything?",
    "Lonely Opacity": "The Asmodeus reminds you that you will never be able to see other people's mind. You're bound to interact with them through the distortion of language. They'll never know you. You are alone.",
  },
};
BESTIARY.dict["pandemonium"]["azazel"] = {
  "intro": "An Accursed Azazel Ambushes you with Aplomb.",
  "introed": "An Accursed Azazel Ambushed you with Aplomb.",
  "outro": "It didn't matter how good it did, its father simply was happier with its new family.",
  "attacks": {
    "Hidden Judgments": "The Azazel projects in your mind the voices of everyone you care about listing the worst things they think about you. Nobody likes you.",
    "Eventual Forgetting": "The Azazel erases you from the memories of everyone you have known, plunging you in an abyss of loneliness. Nobody thinks about you.",
    "Superficial Hypocrisy": "The Azazel postulates you that nobody really loves you. Everyone is using you, tolerating you or just pretending. You matter to nobody.",
  },
};
BESTIARY.dict["pandemonium"]["mammon"] = {
  "intro": "A Macabre Mammon Mocks your Minuscule size.",
  "introed": "A Macabre Mammon Mocked your Minuscule size.",
  "outro": "There came a time where it couldn't detach itself from its cynical remarks, and it fell into a deep depression and lost any sort of enjoyment.",
  "attacks": {
    "Unmatchable Expectations": "The Mammon tortures you by reminding you of everything you've ever wanted but could never have. You keep being disappointed.",
    "Unfulfillable Desire": "The Mammon makes you acutely aware that no matter what you do you will never be satisfied with what you have. You'll always want something more. You're doomed to remain lacking.",
    "Radical Expandability": "The Mammon reminds you of all the things you held dear and have lost, or worst, forgotten. Everything is replaceable, even you.",
  },
};
BESTIARY.dict["pandemonium"]["belial"] = {
  "intro": "A Bestial Belial Banishes you Brutally.",
  "introed": "A Bestial Belial Banished you Brutally.",
  "outro": "But all its attempts failed, and in the end it could never inflict upon another what had been done to it.",
  "attacks": {
    "Social Slander": "The Belial threatens to spread false rumors about you. Nobody will trust you.",
    "Emotional Blackmail": "The Belial blackmails you by threatening the people you love. Wouldn't want anything bad to happen to them, would you?",
    "Abusive Relationship": "The Belial denies your existence until you do what it wants. The onus is on you.",
  },
};
BESTIARY.dict["pandemonium"]["titan"] = {
  "intro": "A Titan Trumpets your Tragic Termination.",
  "introed": "A Titan Trumpeted your Tragic Termination.",
  "outro": "It told so many lies that when he asked for help at death's door nobody believe it.",
  "attacks": {
    "Convincing Libel": "The Titan claims that you did something horrible. They're so persuasive that you begin to believe it yourself.",
    "Maddening Gaslighting": "The Titan insists that they saw you do a heinous act, and they have proof. It's impossible, or is it?",
    "Unintended Consequences": "The Titan informs you that a thing you thought was innocuous had terrible repercussions. And it's all your fault.",
  },
};
BESTIARY.dict["pandemonium"]["belphegor"] = {
  "intro": "A Barbaric Belphegor Besmirches you with Babble.",
  "introed": "A Barbaric Belphegor Besmirched you with Babble.",
  "outro": "It swore its submission by taking a vow of silence, and it was never heard again.",
  "attacks": {
    "Unfalsifiable Nihilism": "The Belphegor reminds you that life has no objective meaning and your existence is futile. Nothing matters.",
    "Insignificant Perspective": "The Belphegor fills your mind with the conviction that you do not matter and nothing you can do will have any effect in the grand scheme of things. You are powerless.",
    "Apathetic Depression": "The Belphegor's influence on your brain plunges you in an abyss of depression. You become acutely aware how insignificant any of your actions are. How can you even dream of changing anything?",
  },
};
BESTIARY.dict["pandemonium"]["golem"] = {
  "intro": "A Gigantic Golem Gouges the Ground.",
  "introed": "A Gigantic Golem Gouged the Ground.",
  "outro": "Denial ran its course, but eventually it got caught up by the memories of embarrassing moments it was suppressing, and the shame overwhelmed it.",
  "attacks": {
    "Verbal Abuse": "The Golem overwhelms you with a torrent of insults.",
    "Insecurities Exhibition": "The Golem shouts abuse targeting your worst insecurities.",
    "Intense Harassment": "The Golem harasses you with a relentless flow of slander.",
  },
};
BESTIARY.dict["pandemonium"]["hellhound"] = {
  "intro": "A Hulky Hellhound lets out a Hollow Howl.",
  "introed": "A Hulky Hellhound let out a Hollow Howl.",
  "outro": "It ran after all the skeletons in hell and burrowed them in its secret spot.",
  "attacks": {
    "Unsolvable Riddle": "The Hellhound offers to let you go if you can answer its riddle. You think about it for a while, but it's above your level.",
    "Unwinnable Challenge": "The Hellhound offers to let you go if you can outrun it. You raise to the challenge, but it is just much faster.",
    "Unbeatable Spirit": "The Hellhound offers to let you go if you can win a stare contest. You fight valiantly but its spirit is stronger.",
  },
};
BESTIARY.dict["pandemonium"]["ifrit"] = {
  "intro": "An Incandescent Ifrit Ignites with Ire.",
  "introed": "An Incandescent Ifrit Ignited with Ire.",
  "outro": "It will never forget the look in your eyes when it realized it was no match for you.",
  "attacks": {
    "Disappointment Memory": "The Ifrit sends you a mental picture of the eyes of a loved one the moment you disappointed them. They trusted you.",
    "Misunderstanding Souvenir": "The Ifrit sends you a mental picture of the eyes of a loved one the moment they realized that you were a different person that they thought. They don't know you anymore.",
    "Last Recollection": "The Ifrit sends you a mental picture of the eyes of a loved one the last moment they ever thought about you. Life goes on.",
    "Forgotten Connections": "The Ifrit sends you a mental picture of the eyes of somebody that you used to know. So many connections gone now.",
  },
};


//hack mountains
BESTIARY.dict["mountains"] = {};
BESTIARY.dict["mountains"]["phoenix"] = {
  "intro": "A Pompous Phoenix Parades or Patrols.",
  "introed": "A Pompous Phoenix Paraded or Patrolled.",
  "outro": "Every time it resurrected, the pain of death was more acute than the last.",
  "attacks": {
    "Transcendental Cry": "The Phoenix opens its beak wide and lets out a single note. It seems that the air around you withers and contracts under the mysterious melancholy of its ethereal timbre, making it hard to breathe.",
    "Piercing Shriek": "The Phoenix lets out a mighty shriek which clearly echoes miles and miles away. The sharp sound pierces through the ears and the brains of everyone in the vicinity.",
    "Ember Whirlwind": "The Phoenix whips you with its incandescent tail. A tornado of embers surround you, heating up the air and scorching your skin.",
  },
};
BESTIARY.dict["mountains"]["pterosaur"] = {
  "intro": "A Predatory Pterosaur Pierces through the Panorama.",
  "introed": "A Predatory Pterosaur Pierced through the Panorama.",
  "outro": "It flew too high, grew scared of the sun, and never again took to the sky.",
  "attacks": {
    "Maul": "The Pterosaur bits you, burrowing its fangs in your legs.",
    "Snap": "The Pterosaur snaps its powerful jaw. Unlike regular birds, it's filled with sharp teeth that cry out for your flesh.",
    "Bite": "The Pterosaur bites the air in your direction.",
  },
};
BESTIARY.dict["mountains"]["manticore"] = {
  "intro": "A Mythical Manticore Marches on the Mountain.",
  "introed": "A Mythical Manticore Marched on the Mountain.",
  "outro": "It grew conscious of its repulsive appearance and convinced itself it was too hideous to show its face ever again.",
  "attacks": {
    "Tail": "The Manticore slams its powerful tail in your vicinity.",
    "Poison": "The Manticore flails its stinger around. Poison is dripping from it.",
    "Stinger": "The Manticore's venomous stinger darts towards you.",
  },
};
BESTIARY.dict["mountains"]["hawk"] = {
  "intro": "A Hungry Hawk Hurls towards the Humans.",
  "introed": "A Hungry Hawk Hurled towards the Humans.",
  "outro": "Kicked from its flock, disowned, it decided to head towards countries unknown.",
  "attacks": {
    "Nosedive": "The Hawk dives claws first in your direction.",
    "Fury": "The Hawk approaches and slashes you repeatedly with its sharp talons.",
    "Talons": "The Hawk's talons take a deep grip on your arm, digging your skin.",
  },
};
BESTIARY.dict["mountains"]["harpy"] = {
  "intro": "A Hysterical Harpy Harasses the Heroes.",
  "introed": "A Hysterical Harpy Harassed the Heroes.",
  "outro": "It spent its life shrieking in pain, haunted by the trauma of a past memory.",
  "attacks": {
    "Melt": "The Harpy emits a loud shriek that seems to pierce your ears and melt you brain.",
    "Charge": "The Harpy dives towards you with a loud cry.",
    "Screams": "The Harpy emits a series of howls that pierce through your skull and chill you to the bone.",
  },
};
BESTIARY.dict["mountains"]["emu"] = {
  "intro": "An Enraged Emu Encroaches on your Ensemble.",
  "introed": "An Enraged Emu Encroached on your Ensemble.",
  "outro": "Because of its long legs, all its eggs broke upon being laid, so it died childless.",
  "attacks": {
    "Stomp": "The Emu stomps the ground with its bird legs. It looks like it can't fly.",
    "Peck": "The Emu pecks you violently.",
    "Screech": "The Emu looks pretty upset, shaking its head and ruffling its feathers. It emits a loud screech.",
  },
};
BESTIARY.dict["mountains"]["dragon"] = {
  "intro": "A Dominating Dragon Descends with a Deafening roar.",
  "introed": "A Dominating Dragon Descended with a Deafening roar.",
  "outro": "As the last of its race, it fetched a fortune as a hunt trophy.",
  "attacks": {
    "Perennial Breath": "The Dragon towers over you high in the air. It looks at you and you can see the judgement and anger in its ancestral eyes. It spits a torrent of fire in your direction.",
    "Smog Cloud": "The Dragon flies over the scene gracefully. Its scales reflect the sunlight. Suddenly, it breathes out a huge stormy cloud that evolves towards you.",
    "Primeval Dance": "The Dragon slithers fluidly in the wind. Its mystical dance controls the elements, and a tornado starts to form around you.",
  },
};
BESTIARY.dict["mountains"]["chimera"] = {
  "intro": "A Cawing Chimera Charges like a Cannonball.",
  "introed": "A Cawing Chimera Charged like a Cannonball",
  "outro": "The parts of different animals that composed this ungoldy patchwork always struggled to work together, until they didn't.",
  "attacks": {
    "Bolt": "The Chimera charges towards you in the air, claws first.",
    "Swirl": "The Chimera overwhelms you with a storm of scratches from its sharp claws.",
    "Throw": "The Chimera grabs on to your arm and tries to throw you up in the air.",
  },
};


//hack hell
BESTIARY.dict["hell"] = {};
BESTIARY.dict["hell"]["warlock"] = {
  "intro": "A Wicked Warlock Wages War.",
  "introed": "A Wicked Warlock Waged War.",
  "outro": "Peeking into untold dimensions eroded its mind until it couldn't distinguish fake from reality.",
  "attacks": {
    "Time Melting": "The Warlock waves its mechanical rod and starts to melt the fabric of time itself.",
    "Personality Melting": "The Warlock waves its mechanical rod and starts to melt your ego. Everything that makes you you seems to dissolve.",
    "Reality Melting": "The Warlock waves its mechanical rod and starts to melt the reality around you. Dimensions seem to erode and compress.",
  },
};
BESTIARY.dict["hell"]["centipede"] = {
  "intro": "A Colossal Centipede Contemplates Crushing you.",
  "introed": "A Colossal Centipede Contemplated Crushing you.",
  "outro": "Its incessant hunger fattened it up to the point where its limbs could no longer support it.",
  "attacks": {
    "Dimensional Fold": "The Centipede folds your three dimensional reality into lower dimensions, crushing you in the process.",
    "Reality Devouring": "The Centipede devour the fabric of reality.",
    "Spacetime Knot": "The Centipede doesn't seem to move a muscle from the outside, but it is actually knitting dimensional threads to erase your existence from the universe.",
  },
};
BESTIARY.dict["hell"]["toad"] = {
  "intro": "A Toxic Toad Taunts you by its Throbs.",
  "introed": "A Toxic Toad Taunted you by its Throbs.",
  "outro": "It continued to scream for help, but its deformed croaking kept being mistaken for aggression.",
  "attacks": {
    "Hallucinatory Color": "The Toad skin shifts between bright colors. Suddenly, it adopts a hue that cannot exist. Your mind breaks down.",
    "Impossible Movement": "The Toad starts jumping around. The trajectory of the jumps is impossible in three dimensions. Your mind breaks down.",
    "Inaudible Frequency": "The Toad croaks first normally, but then switch to frequencies that cannot exist. Your brain is filled with impossible sounds. Your mind breaks down.",
  },
};
BESTIARY.dict["hell"]["serpentine"] = {
  "intro": "A Saucy Serpentine Seeks to Seduce you.",
  "introed": "A Saucy Serpentine Sought to Seduce you.",
  "outro": "Its heart remained cold, it never found any real comfort in the arms of its many lovers.",
  "attacks": {
    "Magnetic Allure": "The Serpentine undulates lusciously her magnificent body, mesmerizing you with her charms.",
    "Dangerous Invitation": "The Serpentine winks and blows you a kiss, beckoning you to come closer.",
    "Explicit Allusions": "The Serpentine makes indecent gestures in your direction, which does not fail to destabilize you.",
  },
};
BESTIARY.dict["hell"]["satyr"] = {
  "intro": "A Sanguinary Satyr Shrieks in the Shadows.",
  "introed": "A Sanguinary Satyr Shrieked in the Shadows.",
  "outro": "It never got to realize its only secret wish, to be a normal goat.",
  "attacks": {
    "Psychological Delusion": "The Satyr sends you a powerful curse that tricks you into believing you are a character from a story.",
    "Complete Amnesia": "The Satyr places a hex on you that makes you forget who you are, and even the very fact that you are.",
    "Mind Disabling": "The Satyr curses you, and renders you unable to think.",
    "Inescapable Nightmare": "The Satyr casts on you a powerful spell that convinces you that you are in a dream.",
  },
};
BESTIARY.dict["hell"]["sandworm"] = {
  "intro": "A Swirly Sandworm Spews its Spite.",
  "introed": "A Swirly Sandworm Spewed its Spite.",
  "outro": "Only its husk remained as a refuge to shield travelers from unkind elements.",
  "attacks": {
    "Flesh Hyperawareness": "The Sandworm undulates hypnotically and makes you realize that you're only a flesh puppet subject to circumstances without any free will.",
    "Alien Limbs": "The Sandworm mersmerizes motions makes you feel like you don't know yourself anymore. You feel alien in this body. Is it really you?",
    "Phenomenological Self": "The Sandworm mystic dance seems to have severed the link between your body and your soul. The flesh puppet acts by itself, and you're stuck within, powerless to control anything, not even managing to articulate a mouth into a scream.",
  },
};
BESTIARY.dict["hell"]["hecatoncheir"] = {
  "intro": "A Horrible Hecatoncheir Hovers in a Haze.",
  "introed": "A Horrible Hecatoncheir Hovered in a Haze.",
  "outro": "It tangled its tentacles in an sharp rock, and became a staple of the landmark.",
  "attacks": {
    "Soul Piercing": "The Hecatoncheir extends its gooey tentacles deep into your soul and starts to tear apart your very being.",
    "Brain Sliming": "The Hecatoncheir whips your spirit with its slimy appendages.",
    "Self Squelching": "The Hecatoncheir smothers your personality with its uncountable oozy arms.",
  },
};
BESTIARY.dict["hell"]["eyeball"] = {
  "intro": "An Eerie Eyeball Examines your Ego.",
  "introed": "An Eerie Eyeball Examined your Ego.",
  "outro": "As it grew old, its perceptions waned, so much so that it ended up blind.",
  "attacks": {
    "Mind Spying": "The Eyeball stares at the depths of your mind.",
    "Soul Exposing": "The Eyeball relentless gaze pierces through your soul.",
    "Thoughts Reading": "The Eyeball maintains its cold judging glance that seems to see clearly even what you're thinking.",
  },
};
BESTIARY.dict["hell"]["devilfly"] = {
  "intro": "A Deadly Devilfly Drones with Defiance.",
  "introed": "A Deadly Devilfly Droned with Defiance",
  "outro": "A gust of wind propelled it to another part of the world, far from everything it ever knew and loved.",
  "attacks": {
    "Encompassing Buzz": "The Devilfly resounding buzz grows louder until it takes the place of all sounds in the universe and crushes your spirit under its overwhelming omnipresence.",
    "Decaying Flesh": "The Devilfly's macabre buzzing imprints on your mind that everything is either dead or dying. There is nothing but walking corpses, flesh in decay.",
    "Revolting Brain": "The Devilfly's hypnotic noise slowly turns your own brain against itself. It fills your mind with the hallucination that you're full of critters crawling inside you, making you want to rip your own skin.",
  },
};


//hack heaven
BESTIARY.dict["heaven"] = {};
BESTIARY.dict["heaven"]["valkyrie"] = {
  "intro": "A Vile Valkyrie Volunteers to Violate you.",
  "introed": "A Vile Valkyrie Volunteered to Violate you.",
  "outro": "It learned to accept its true self and its cannibalistic inclinations.",
  "attacks": {
    "Hypocritical Acceptance": "The Valkyrie tells you to just be yourself. As long as you fit in with expectations, of course...",
    "Conditional Endorsement": "The Valkyrie tells you to express yourself. As long as they agree with what you are saying, of course...",
    "Controlled Expression": "The Valkyrie tells you to do what you want. As long as it coincides with what they want, of course...",
  },
};
BESTIARY.dict["heaven"]["seraph"] = {
  "intro": "A Smug Seraph Shames your Soul.",
  "introed": "A Smug Seraph Shamed your Soul.",
  "outro": "It preferred to take its own life than to face its countrymen after dishonor in battle.",
  "attacks": {
    "Lowest Expectations": "The Seraph suggests you to take it easy. Nobody believes in you.",
    "Condescending Compassion": "The Seraph patronizingly reminds you that it's ok to ask for help. It's not your fault you're bad.",
    "Disdainful Excuses": "The Seraph excuses your failures in a condescending tone. You did only what you could, which is not much.",
  },
};
BESTIARY.dict["heaven"]["raijuu"] = {
  "intro": "A Rebel Raijuu's Radiation Reverberates around.",
  "introed": "A Rebel Raijuu's Radiation Reverberated around.",
  "outro": "When its energy finished to discharge, it was nothing more than a pile of ash.",
  "attacks": {
    "Suspicious Inactivity": "The Raijuu doesn't do anything. It's simply pulsating light that you can almost feel go through your body. This can't be good.",
    "Suffocating Idleness": "The Raijuu is not moving. The air is cracking around it. Who knows what its proximity is doing to your flesh...",
    "Immobile Radiation": "The Raijuu is static. Its light aura permeates your every cell, irradiating you to your core.",
  },
};
BESTIARY.dict["heaven"]["ponpon"] = {
  "intro": "A Pure-looking Ponpon Pretends to be Pacific.",
  "introed": "A Pure-looking Ponpon Pretended to be Pacific.",
  "outro": "Its cuteness was too much to handle for anyone around, so it chose isolation and exile.",
  "attacks": {
    "Soul Liquefaction": "The Ponpon looks at you with big adorable eyes. Your heart melts.",
    "Heart Constriction": "The Ponpon wiggles its cute fluff. It squeezes your heart.",
    "Cuteness Overdose": "The Ponpon flies around making chirpy noises. The cuteness is too strong to handle.",
  },
};
BESTIARY.dict["heaven"]["maneki"] = {
  "intro": "A Mischievous Maneki Marinates some Machination.",
  "introed": "A Mischievous Maneki Marinated some Machination",
  "outro": "It got exchanged and traded around the world as a good luck charm.",
  "attacks": {
    "Impossible Odds": "The Maneki challenges you to a game of luck. Most outcomes will have you suffer, but there's a one in a million chance you might get extremely rich!",
    "Devil Wager": "The Maneki makes a bet with you. Heads, it becomes your ally. Tails, you suffer.",
    "Faustian Bargain": "The Maneki proposes a gamble. You think you see the flaw in the bargain and you have a winning strategy, so you accept. You were wrong.",
  },
};
BESTIARY.dict["heaven"]["cherub"] = {
  "intro": "A Cheeky Cherub Condemns your Career.",
  "introed": "A Cheeky Cherub Condemned your Career.",
  "outro": "It remained crippled in fetal position by the weight of victory expectations it could not fulfil.",
  "attacks": {
    "Crushing Expectations": "The Cherub crushes you under the weight of all expectations placed on you. How can you possibly accomplish what they expect from you?",
    "Overwhelming Regrets": "The Cherub stirs up all your regrets of things you should have done to overwhelm you with guilt. How did you let that happen?",
    "Unreachable Character": "The Cherub simply notes that there is no way you can be the person that everyone wants you to be. It's okay to give up on yourself.",
  },
};
BESTIARY.dict["heaven"]["angel"] = {
  "intro": "An Arrogant Angel Ascends with Attitude.",
  "introed": "An Arrogant Angel Ascended with Attitude.",
  "outro": "It did its best, considering its abilities, but sometimes your best is not enough.",
  "attacks": {
    "Unsolicited Feedback": "The Angel congratulates you for making it this far considering your lack of abilities. They're just saying that for you!",
    "Adversarial Management": "The Angel snarks mockingly at you, sapping your confidence. They're just trying to help you grow!",
    "Performance Review": "The Angel recounts your past experiences, criticizing and ridiculing them. They're trying to help you!",
  },
};
BESTIARY.dict["heaven"]["goddess"] = {};


//hack forests
BESTIARY.dict["forests"] = {};
BESTIARY.dict["forests"]["blob"] = {
  "intro": "A Burgeoning Blob Buds and Bloats.",
  "introed": "A Burgeoning Blob Budded and Bloated.",
  "outro": "Every drop of rain eroded it a little until the day it got completely dissolved.",
  "attacks": {
    "Jiggly Glide": "The Blob's gelatinous body deforms and slides towards you. At this rate, it won't be long before you're engulfed in the green goo.",
    "Wobbly Jump": "The Blob shakes and jumps in the air. Its shape wobbles as it flies over you and its shadow surrounds you. In a few seconds, it will crash back on the ground, no doubt crushing you in the process.",
    "Gooey Split": "The Blob splits up in a dozen smaller versions of itself, and then splits up some more. Pretty soon, you find yourself surrounded by a see of lush jelly crawling towards you from all sides.",
  },
};
BESTIARY.dict["forests"]["boar"] = {
  "intro": "A Brazen Boar Braces for Battle.",
  "introed": "A Brazen Boar Braced for Battle.",
  "outro": "It would have tasted nice had someone found the carcass before it rotted.",
  "attacks": {
    "Stomp": "The Boar stomps its hooves and charges at you head first.",
    "Slam": "The Boar slams its head and tries to hurt you with his tusks.",
    "Rage": "The Boar exhales strongly. It seems enraged. It starts running towards you.",
  },
};
BESTIARY.dict["forests"]["flower"] = {
  "intro": "A Flesh-eating Flower wants to Feed on your Face.",
  "introed": "A Flesh-eating Flower wanted to Feed on your Face.",
  "outro": "Many people stepped on the wilted bouquet that was rejected and thrown on the floor.",
  "attacks": {
    "Numb": "The Flower spreads out a cloud of strong fruity aroma. It's alluring power is affecting your senses.",
    "Taint": "The Flower disseminates poisonous gas in the vicinity. You hold your breath while trying to escape.",
    "Entice": "The Flower's scent reaches your nose, and you feel irresistibly drawn towards it...",
  },
};
BESTIARY.dict["forests"]["fox"] = {
  "intro": "A Frisky Fox Feints Flight.",
  "introed": "A Frisky Fox Feinted Flight",
  "outro": "Its agility could no longer protect it from predators when it sprained a leg.",
  "attacks": {
    "Jump": "The Fox jumps at you. The momentum makes you tumble.",
    "Paw": "The Fox hits you with a front paw. The sharp claws leave marks in your skin.",
    "Jaw": "The Fox bites you. Its sharp teeth and powerful jaw penetrate deep in your flesh.",
  },
};
BESTIARY.dict["forests"]["fungus"] = {
  "intro": "A Feral Fungus Frightens you with its Force.",
  "introed": "A Feral Fungus Frightened you with its Force.",
  "outro": "It spent its life in hiding, paralyzed by the fear of facing problems that force could not solve.",
  "attacks": {
    "Gargantuan Trample": "The Fungus takes a step towards you. The ground shakes under the weight of its huge bulky legs. It raises one again to stomp and crush you.",
    "Mycelium Embrace": "The Fungus slams one of its huge appendages like an arm. It's bigger than you and aimed right at you, crushing the vegetation around and everything on its path.",
    "Colossal Devastation": "The Fungus seems to be aiming at using its huge mass to crush you. You see it vacillate towards you, uprooting the nearby trees on the way.",
  },
};
BESTIARY.dict["forests"]["mandragora"] = {
  "intro": "A Malicious Mandragora Manifests its Monstrosity.",
  "introed": "A Malicious Mandragora Manifested its Monstrosity.",
  "outro": "But it was not enough to deter alchemists who carefully kept it barely alive while grating its flesh for its magical properties.",
  "attacks": {
    "Slash": "The Mandragora slaps you with one of its thin flexible roots.",
    "Whip": "The Mandragora unleashes on you a deluge of whips from its roots.",
    "Grab": "The Mandragora tries to immobilize you by wrapping a root around you.",
  },
};
BESTIARY.dict["forests"]["morel"] = {
  "intro": "A Menacing Morel Meets its Match.",
  "introed": "A Menacing Morel Met its Match.",
  "outro": "Its rhizome extended and pumped all the water off the ground of the forest, desiccating all vegetation.",
  "attacks": {
    "Ensnare": "The Morel expands its rhizome at an incredible speed. It expands under your feet and starts ensnaring them.",
    "Uproot": "The Morel grows its roots longer, and they surge suddenly out of the ground and converge towards you.",
    "Quake": "The Morel activates its rhizome which shakes the ground beneath you. You start to sink in the mud, grabbed by the vegetal tentacles.",
  },
};
BESTIARY.dict["forests"]["nymph"] = {
  "intro": "A Naughty Nymph is Nourished by Nature.",
  "introed": "A Naughty Nymph was Nourished by Nature.",
  "outro": "War took its toll on the environment, and the nymph wilted away in the debris of the ransacked forest.",
  "attacks": {
    "Spread": "The Nymph extends her vines towards you and tries to ensnare you.",
    "Seduce": "The Nymph uses her charms to lower your defenses.",
    "Embrace": "The Nymph slowly surrounds you with her vines, making it hard to move.",
  },
};
BESTIARY.dict["forests"]["squirrel"] = {
  "intro": "A Savage Squirrel Springs on Stage.",
  "introed": "A Savage Squirrel Sprang on Stage.",
  "outro": "Getting into fights prevented it to stockpile food, and it starved to death when weather got rough.",
  "attacks": {
    "Nip": "The Squirrel burrows its little teeth deep into your hand.",
    "Acrobatics": "The Squirrel keeps jumping around energetically. It's getting hard to follow where it's going to attack from.",
    "Plunge": "The Squirrel jumps on your face and scratches it with its little fangs.",
  },
};
BESTIARY.dict["forests"]["tree"] = {
  "intro": "A moving Tree Twists and Turns Towards you.",
  "introed": "A moving Tree Twisted and Turned Towards you",
  "outro": "It twisted and turned some more in the heart, under a cauldron full of stew.",
  "attacks": {
    "Branch": "The Tree slaps you with a strong and lush branch.",
    "Leaves": "The Tree whips you with a thousand leaves.",
    "Foliage": "The Tree overwhelms you with a tornado of foliage.",
  },
};
BESTIARY.dict["forests"]["truffle"] = {
  "intro": "A Terrible Truffle Threatens you Tirelessly.",
  "introed": "A Terrible Truffle Threatened you Tirelessly.",
  "outro": "Putting up a noxious front to protect its insecurities worked too well and it withered from loneliness.",
  "attacks": {
    "Spores": "The Truffle spreads out toxic spores in all directions.",
    "Spit": "The Truffle spits spores towards you.",
    "Smog": "The Truffle fills the air with venomous particles. You struggle to catch your breath.",
  },
};
BESTIARY.dict["forests"]["trunk"] = {
  "intro": "A Terrifying Thorny Trunk Towers over you.",
  "introed": "A Terrifying Thorny Trunk Towered over you.",
  "outro": "It screamed as villagers dismantled it to build a stool.",
  "attacks": {
    "Timber": "The Trunk falls in your direction in a loud rumble.",
    "Log": "The Trunk rolls towards you at incredible speed.",
    "Twig": "The Trunk extends a pointy twig to pierce your body.",
  },
};


//hack caves
BESTIARY.dict["caves"] = {};
BESTIARY.dict["caves"]["bat"] = {
  "intro": "A Black Bat Bursts Before you.",
  "introed": "A Black Bat Burst Before you.",
  "outro": "Failing to secure its prey, it had to watch its all family starve to death.",
  "attacks": {
    "Flutter": "The Bat flutters around your head and aims for your eyes.",
    "Gnaw": "The Bat dives to bite you with its poisonous fangs.",
    "Whirl": "The Bat whirls around you in a flurry of slashes.",
  },
};
BESTIARY.dict["caves"]["bloodsucker"] = {
  "intro": "A Bizarre Bloodsucker Buzzes near your Body.",
  "introed": "A Bizarre Bloodsucker Buzzed near your Body.",
  "outro": "Failing to contribute its share to its community, it got chased out and lived as an outcast.",
  "attacks": {
    "Intake": "The Bloodusucker extends a long trunk towards your bare skin.",
    "Prospect": "The Bloodusucker faces you mid-air, waiting for an opening to dive for your blood.",
    "Suck": "The Bloodusucker flutters like a moth and tries to grab your face.",
  },
};
BESTIARY.dict["caves"]["slime"] = {
  "intro": "A Slushy Slime Sludges Sloppily.",
  "introed": "A Slushy Slime Sludged Sloppily.",
  "outro": "A monster drunk it in its sleep, confusing it with a puddle.",
  "attacks": {
    "Goo": "The Slime throws some of its toxic goo at you.",
    "Boil": "The Slime bubbles up and grows in volume, trying to smother you in.",
    "Melt": "The Slime melts into an expanding noxious puddle that soon reaches your feet.",
  },
};
BESTIARY.dict["caves"]["crawler"] = {
  "intro": "A Cunning Crawler Creeps in the Cavern.",
  "introed": "A Cunning Crawler Creeped in the Cavern.",
  "outro": "It perfected its mimicry to the point where its friends could not distinguish it from a rock.",
  "attacks": {
    "Creep": "The Crawler blends in with the rocks around. You cannot see it in the shadows until it's already on you.",
    "Slither": "The Crawler dashes around you faster than your eyes. You can't see its assault coming.",
    "Ambush": "The Crawler disappears on the wall in front of you. It reemerges a few moments later right behind you.",
  },
};
BESTIARY.dict["caves"]["scorpion"] = {
  "intro": "A Spiteful Scorpion's Stinger Shines.",
  "introed": "A Spiteful Scorpion's Stinger Shone.",
  "outro": "It got captured by humans who wanted to harvest its venom and lived in captivity.",
  "attacks": {
    "String": "The Scorpion crawls up your leg and attempts to sting you.",
    "Poke": "The Scorpion waves its poisonous tail to poke you.",
    "Dart": "The Scorpion's stinger darts towards you, dripping with poison.",
  },
};
BESTIARY.dict["caves"]["mole"] = {
  "intro": "A Measly Mole Moves in the Muck.",
  "introed": "A Measly Mole Moved in the Muck.",
  "outro": "Digging one too many tunnel, it found itself trapped by a cave-in.",
  "attacks": {
      "Burrow": "The Mole burrows itself. Any second, it will come out under you.",
      "Graze": "The Mole slashes you with its unexpectedly long and sharp claws.",
      "Excavate": "The Mole digs under you, and the ground becomes shaky. You start to get engulfed...",
  },
};
BESTIARY.dict["caves"]["rhino"] = {
  "intro": "A Rocky Rhino's Roar Resounds all around.",
  "introed": "A Rocky Rhino's Roar Resounded all around",
  "outro": "Its precious shell got mined crystal after crystal until nothing was left of the rocky creature.",
  "attacks": {
      "Stalactite Rain": "The Rhino stomps the ground with a heavy paw. The whole cavern trembles around. Sharp rocks and stalactites fall from the ceiling in a flurry of projectiles.",
      "Colossal Tromp": "The Rhino charges at you. With each step, the floor shakes under its massive weight. The rocks on its back shine slightly in the darkness.",
      "Abyssal Slam": "The Rhino slams into the nearest wall. Its mineral body leaves an imprint on the solid walls of the cave. The vibrations threaten to make the whole place crumble. A fissure opens up under your feet and grows larger by the minute.",
  },
};
BESTIARY.dict["caves"]["lizard"] = {
  "intro": "A Large Lizard Looms over the Land.",
  "introed": "A Large Lizard Loomed over the Land.",
  "outro": "It got into a deadly feud with its clone that grew out of its cut tail.",
  "attacks": {
    "Appendage Swipe": "The Lizard flails its enormous tail, wiping up masses of rocks all around and even yanking some from the walls of the cave. They all get thrown towards you at incredible speed.",
    "Slithering Pounce": "The Lizard slides and crawls to the ceiling of the cavern, above you. With an agility that you wouldn't expect from its size, it then immediately jumps on you, maw opened, trying to squish you under its colossal body.",
    "Shadowy Plunge": "The Lizard slithers towards you through the darkness. It slides around you in the shadows at a surprising speed, making it hard to know where you need to defend. It almost escapes your sight a few times. Then it jumps on you for the strike.",
  },
};


//hack interior
BESTIARY.dict["interior"] = {};
BESTIARY.dict["interior"]["stool"] = {
  "intro": "A simple wooden stool.",
  "introed": "A simple wooden stool.",
};
BESTIARY.dict["interior"]["statue"] = {
  "intro": "It's a statue of the Goddess. Blessed be her eternal soul.",
  "introed": "It's a statue of the Goddess. Blessed be her eternal soul.",
};
BESTIARY.dict["interior"]["bed"] = {
  "intro": "It's a regular bed to sleep in.",
  "introed": "It's a regular bed to sleep in.",
};
BESTIARY.dict["interior"]["bucket"] = {
  "intro": "It's a wooden bucket.",
  "introed": "It's a wooden bucket.",
};
BESTIARY.dict["interior"]["cabinet"] = {
  "intro": "A wooden cabinet, probably storing clothes or tableware...",
  "introed": "A wooden cabinet, probably storing clothes or tableware...",
};
BESTIARY.dict["interior"]["chair"] = {
  "intro": "This is a chair.",
  "introed": "This is a chair.",
};
BESTIARY.dict["interior"]["hay"] = {
  "intro": "A pile of hay.",
  "introed": "A pile of hay.",
};
BESTIARY.dict["interior"]["housefire"] = {
  "intro": "This is a housefire.",
  "introed": "This is a housefire.",
};
BESTIARY.dict["interior"]["jar"] = {
  "intro": "A beautiful pottery jar.",
  "introed": "A beautiful pottery jar.",
};
BESTIARY.dict["interior"]["shelf"] = {
  "intro": "A wooden shelf of reasonable sturdiness.",
  "introed": "A wooden shelf of reasonable sturdiness.",
};
BESTIARY.dict["interior"]["table"] = {
  "intro": "This is a textbook example of a wooden table. Four sturdy wooden legs, holding planks nailed together. A table.",
  "introed": "This is a textbook example of a wooden table. Four sturdy wooden legs, holding planks nailed together. A table.",
};
BESTIARY.dict["interior"]["chest"] = {
  "intro": "A chest, doubtlessly holding the family's belongings.",
  "introed": "A chest, doubtlessly holding the family's belongings.",
};
BESTIARY.dict["interior"]["weaponrack"] = {
  "intro": "This rack holds shiny, well sharpened swords, ready to be used at the first occasion.",
  "introed": "This rack held shiny, well sharpened swords, ready to be used at the first occasion.",
};
BESTIARY.dict["interior"]["alchemyshelf"] = {
  "intro": "This shelf stores dozens of jars containing various foods for long term storage.",
  "introed": "This shelf stored dozens of jars containing various foods for long term storage.",
};
BESTIARY.dict["interior"]["barrel"] = {
  "intro": "This wooden barrel is sure to contain some fine bevrage.",
  "introed": "This wooden barrel was sure to contain some fine bevrage.",
};
BESTIARY.dict["interior"]["bocals"] = {
  "intro": "A few empty jars lay on the floor.",
  "introed": "A few empty jars layed on the floor.",
};
BESTIARY.dict["interior"]["bottles"] = {
  "intro": "You find a couple of bottles on the floor.",
  "introed": "You found a couple of bottles on the floor.",
};
BESTIARY.dict["interior"]["bottlesshelf"] = {
  "intro": "This shelf is filled with dozens of bottles of alcoholic bevrages.",
  "introed": "This shelf was filled with dozens of bottles of alcoholic bevrages.",
};
BESTIARY.dict["interior"]["box"] = {
  "intro": "A wooden box is filled to the brim with potatoes.",
  "introed": "A wooden box was filled to the brim with potatoes.",
};
BESTIARY.dict["interior"]["chimney"] = {
  "intro": "A chimney provides light and heat to the room.",
  "introed": "A chimney provided light and heat to the room.",
};
BESTIARY.dict["interior"]["clock"] = {
  "intro": "A ticking clock counts the time you're wasting.",
  "introed": "A ticking clock counted the time you're wasting.",
};
BESTIARY.dict["interior"]["flowercrown"] = {
  "intro": "A beautiful flower crown brings life to the wall.",
  "introed": "A beautiful flower crown brought life to the wall.",
};
BESTIARY.dict["interior"]["mask"] = {
  "intro": "A mask is hung on the wall, displaying an uncanny happy expression.",
  "introed": "A mask was hung on the wall, displaying an uncanny happy expression.",
};
BESTIARY.dict["interior"]["papers"] = {
  "intro": "Rolls of papers lay on the floor.",
  "introed": "Rolls of papers layed on the floor.",
};
BESTIARY.dict["interior"]["pottedflower"] = {
  "intro": "A potted colorful flower brightens the room.",
  "introed": "A potted colorful flower brightened the room.",
};
BESTIARY.dict["interior"]["rope"] = {
  "intro": "This rope is showing signs of wear.",
  "introed": "This rope was showing signs of wear.",
};
BESTIARY.dict["interior"]["sack"] = {
  "intro": "A big sack contains provisions, probably cereals.",
  "introed": "A big sack contained provisions, probably cereals.",
};
BESTIARY.dict["interior"]["fancyshelf"] = {
  "intro": "This fancy shelf lets you know that this household is not poor.",
  "introed": "This fancy shelf let you know that this household is not poor.",
};
BESTIARY.dict["interior"]["shielddisplay"] = {
  "intro": "A shield is proudly displayed on the wall.",
  "introed": "A shield was proudly displayed on the wall",
};
BESTIARY.dict["interior"]["wallcandles"] = {
  "intro": "Candles light up the room with a trembling light.",
  "introed": "Candles lit up the room with a trembling light.",
};
BESTIARY.dict["interior"]["weapondisplay"] = {
  "intro": "The swords hung on the wall seem ready to be used at a moment's notice.",
  "introed": "The swords hung on the wall seemed ready to be used at a moment's notice.",
};
BESTIARY.dict["interior"]["window"] = {
  "intro": "Through the window, you can see the streets of the city.",
  "introed": "Through the window, you could see the streets of the city.",
};
BESTIARY.dict["interior"]["curtainedwindow"] = {
  "intro": "Fabric curtains provide a pleasant addition to this window.",
  "introed": "Fabric curtains provided a pleasant addition to this window.",
};
BESTIARY.dict["interior"]["pottedplant"] = {
  "intro": "The room is decorated with lively green plants.",
  "introed": "The room was decorated with lively green plants.",
};
BESTIARY.dict["interior"]["spikymask"] = {
  "intro": "The mask on the wall seems to mock you.",
  "introed": "The mask on the wall seemed to mock you.",
};



//hack exterior
BESTIARY.dict["exterior"] = {};
BESTIARY.dict["exterior"]["pebbles"] = {
  "intro": "There are pebbles on the ground.",
  "introed": "There were pebbles on the ground.",
};
BESTIARY.dict["exterior"]["plant"] = {
  "intro": "You find yourself near a little green plant.",
  "introed": "You found yourself near a little green plant.",
};
BESTIARY.dict["exterior"]["seashell"] = {
  "intro": "There's a seashell on your way.",
  "introed": "There was a seashell on your way.",
};
BESTIARY.dict["exterior"]["skeleton"] = {
  "intro": "You discover what appears to be a human skeleton.",
  "introed": "You discovered what appeared to be a human skeleton.",
};
BESTIARY.dict["exterior"]["camp"] = {
  "intro": "You answer the call of your stomach and establish a small campfire to eat.",
  "introed": "You answered the call of your stomach and establish a small campfire to eat.",
};
BESTIARY.dict["exterior"]["sign"] = {
  "intro": "This wooden sign may have useful information.",
  "introed": "This wooden sign could have useful information.",
};
BESTIARY.dict["exterior"]["tent"] = {
  "intro": "You decide it's high time to make camp and rest.",
  "introed": "You decided it was high time to make camp and rest.",
};
BESTIARY.dict["exterior"]["tomb"] = {
  "intro": "You come upon a run-down makeshift tomb.",
  "introed": "You came upon a run-down makeshift tomb.",
};
BESTIARY.dict["exterior"]["well"] = {
  "intro": "You find an old well. Perhaps you can still draw water?",
  "introed": "You found an old well. Perhaps you could still draw water?",
};
BESTIARY.dict["exterior"]["bush"] = {
  "intro": "You notice a fluffy lush bush.",
  "introed": "You noticed a fluffy lush bush.",
};

//hack villagers
BESTIARY.dict["villagers"] = {};
BESTIARY.dict["villagers"]["indulgence"] = {
  "introed": "You met strangers who drown their despair in debauchery.",
};
BESTIARY.dict["villagers"]["acceptance"] = {
  "introed": "You met strangers who resign to their demise.",
};
BESTIARY.dict["villagers"]["mourning"] = {
  "introed": "You met strangers who have lost everything.",
};
BESTIARY.dict["villagers"]["denial"] = {
  "introed": "You met strangers who take comfort in pretense.",
};
BESTIARY.dict["villagers"]["fear"] = {
  "introed": "You met strangers who blamed others for their misfortune.",
};
BESTIARY.dict["villagers"]["hope"] = {
  "introed": "You met strangers with blind faith in a brighter future.",
};
