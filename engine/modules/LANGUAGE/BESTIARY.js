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

    if(BESTIARY.is_boss(battlename) && score > 0){
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


//hack world
BESTIARY.dict["world"] = {};
BESTIARY.dict["world"]["arsonist"] = {
  "intro": "An Ambitious Arsonist Aspires to set you Ablaze.",
  "introed": "An Ambitious Arsonist Aspired to set you Ablaze.",
  "outro": "An everlasting flame consumed it to its core and drove it mad with anger.",
};
BESTIARY.dict["world"]["bruiser"] = {
  "intro": "A Brutal Bruiser thinks you're Begging for a Beating.",
  "introed": "A Brutal Bruiser thought you were Begging for a Beating.",
  "outro": "Its mace could never impress the object of its unrequited love.",
};
BESTIARY.dict["world"]["butcher"] = {
  "intro": "A Butcher Beholds you as the Basis for his Buffet.",
  "introed": "A Butcher Beheld you as the Basis for his Buffet.",
  "outro": "It lost the sense of taste and starved as all food became repulsive.",
};
BESTIARY.dict["world"]["djinn"] = {
  "intro": "A Deviant Djinn Drifts in an eerie Dance.",
  "introed": "A Deviant Djinn Drifted in an eerie Dance.",
  "outro": "Carried by the breeze, it dissolved, and its little particles could be found everywhere in the world.",
};
BESTIARY.dict["world"]["ghost"] = {
  "intro": "A Ghastly Ghost Glows Gloomily.",
  "introed": "A Ghastly Ghost Glowed Gloomily.",
  "outro": "It grew fainter and fainter in presence and memories until the day no-one could see or remember it.",
};
BESTIARY.dict["world"]["goblin"] = {
  "intro": "A Grumpy Goblin Grasps some Grass.",
  "introed": "A Grumpy Goblin Grasped some Grass.",
  "outro": "No matter how much it pulled out plants, it never got closure over its mother dead and burrowed at such an early age.",
};
BESTIARY.dict["world"]["grizzly"] = {
  "intro": "A Gnarly Grizzly Growls Gluttonously.",
  "introed": "A Gnarly Grizzly Growled Gluttonously.",
  "outro": "Its thick fur made it too hot for it to go outside except in the dead of the night.",
};
BESTIARY.dict["world"]["knight"] = {
  "intro": "A black Knight Knows he will Kill a Kid.",
  "introed": "A black Knight Knew he will Kill a Kid.",
  "outro": "Failing its trial to fetch a child's blood, it got excluded from the knight's order and disowned by its family.",
};
BESTIARY.dict["world"]["mammoth"] = {
  "intro": "A Massive Mammoth Mashes the Mud at every step.",
  "introed": "A Massive Mammoth Mashed the Mud at every step.",
  "outro": "It continued blindly charging ahead, for even if its muscles were moving, the light of its soul had long been extinguished.",
};
BESTIARY.dict["world"]["mummy"] = {
  "intro": "A Meandering Mummy Moans Mournfully.",
  "introed": "A Meandering Mummy Moaned Mournfully.",
  "outro": "Nobody understood its wails, so its pleas to kill it and end its suffering were never heeded.",
};
BESTIARY.dict["world"]["skeleton"] = {
  "intro": "A Snorty Skeleton Seizes its Sword.",
  "introed": "A Snorty Skeleton Seized its Sword.",
  "outro": "Without a living brain in its skull, it was condemned to relieve eternally the final instants of its last battle.",
};
BESTIARY.dict["world"]["vadhaka"] = {
  "intro": "A Vigorous Vadhaka Vows Vengeance.",
  "introed": "A Vigorous Vadhaka Vowed Vengeance.",
  "outro": "When it understood how vain the quest for vengeance was, its blades were already tarnished with the blood of the innocents.",
};
BESTIARY.dict["world"]["wraith"] = {
  "intro": "A Wayward Wraith Wails its Woe.",
  "introed": "A Wayward Wraith Wailed its Woe.",
  "outro": "It searched and screamed all over the world, but it never found the soul of its lover in spite of their promise to stay united in death.",
};


//hack waters
BESTIARY.dict["waters"] = {};
BESTIARY.dict["waters"]["serpent"] = {
  "intro": "A Sumptuous Serpent Slashes through the Sea.",
  "introed": "A Sumptuous Serpent Slashed through the Sea.",
  "outro": "In the depths where it dwelled, time was much slower, so the next time it surfaced all life had long vanished.",
};
BESTIARY.dict["waters"]["anemone"] = {
  "intro": "An Angry Anemone Articulates its Appendage.",
  "introed": "An Angry Anemone Articulated its Appendage.",
  "outro": "Its long meditative lifetime granted it immense wisdom, but it was never able to communicate it with its only mobile limb.",
};
BESTIARY.dict["waters"]["anglerjelly"] = {
  "intro": "An Attentive Anglerjelly Aims at Attracting you.",
  "introed": "An Attentive Anglerjelly Aimed at Attracting you.",
  "outro": "Its encounter with you left it feeling even more empty than before, and it continued to roam the sea searching for something it couldn't quite define.",
};
BESTIARY.dict["waters"]["octopus"] = {
  "intro": "An Oppressive Octopus Obstruct the Ocean.",
  "introed": "An Oppressive Octopus Obstructed the Ocean.",
  "outro": "Everyone feared its suspicious embrace, so it never got the hug it desperately wanted.",
};
BESTIARY.dict["waters"]["naiad"] = {
  "intro": "A Nautical Naiad Nags you Noxiously.",
  "introed": "A Nautical Naiad Nagged you Noxiously.",
  "outro": "A parasite on the head removed all agency from its original body, which kept screaming internally.",
};
BESTIARY.dict["waters"]["whale"] = {
  "intro": "A Wondrous Whale Wrecks your Wares.",
  "introed": "A Wondrous Whale Wrecked your Wares.",
  "outro": "It could not stop itself from eating all its aquatic companions and ended up alone in an empty lake.",
};
BESTIARY.dict["waters"]["triton"] = {
  "intro": "A Triton Trooper Treads the Tides.",
  "introed": "A Triton Trooper Treaded the Tides.",
  "outro": "It was rare for members of this species to survive their spartan training very long.",
};
BESTIARY.dict["waters"]["squid"] = {
  "intro": "A Slithering Squid Swims to Smother you.",
  "introed": "A Slithering Squid Swam to Smother you.",
  "outro": "It was a delicacy in some cities, especially its shell which could enhance any broth.",
};
BESTIARY.dict["waters"]["mermaid"] = {
  "intro": "A Magnificent Mermaid Mesmerizes you with Magnetism.",
  "introed": "A Magnificent Mermaid Mesmerized you with Magnetism.",
  "outro": "She abandoned her world for the fisherman she loved, but he got tired of her within weeks.",
};
BESTIARY.dict["waters"]["jellyfish"] = {
  "intro": "A Judgmental Jellyfish Jiggles Joyfully.",
  "introed": "A Judgmental Jellyfish Jiggled Joyfully.",
  "outro": "Its dance was an artistic catharsis, but nobody ever understood it.",
};
BESTIARY.dict["waters"]["crab"] = {
  "intro": "A Cruel Crab Cuts water with its Claws.",
  "introed": "A Cruel Crab Cut water with its Claws.",
  "outro": "Despite how hard it tried, it could never leave the ground and swim upwards like the other creatures it envied.",
};


//hack trial
BESTIARY.dict["trial"] = {};
BESTIARY.dict["trial"]["viper"] = {
  "intro": "A Vicious Viper Ventures into View.",
  "introed": "A Vicious Viper Ventured into View.",
  "outro": "Its skin was praised as the highest quality leather.",
};
BESTIARY.dict["trial"]["rodent"] = {
  "intro": "A Repulsive Rodent Rushes to your Rear.",
  "introed": "A Repulsive Rodent Rushed to your Rear.",
  "outro": "It never found its way home and erred forever in the labyrinth.",
};
BESTIARY.dict["trial"]["cockroach"] = {
  "intro": "A Crass Cockroach Crawls Creepily.",
  "introed": "A Crass Cockroach Crawled Creepily.",
  "outro": "It got crushed by a slapping hand without a second thought.",
};
BESTIARY.dict["trial"]["basilisk"] = {
  "intro": "A Beastly Basilisk Blitzes on your Body.",
  "introed": "A Beastly Basilisk Blitzed on your Body.",
  "outro": "It lived recluse as an non believer in an overly zealous society.",
};
BESTIARY.dict["trial"]["arachnid"] = {
  "intro": "An Aversive Arachnid Appears on your Arm.",
  "introed": "An Aversive Arachnid Appeared on your Arm.",
  "outro": "A second of clumsiness and it got trapped in its own web.",
};


//hack pandemonium
BESTIARY.dict["pandemonium"] = {};
BESTIARY.dict["pandemonium"]["lieutenant"] = {
  "intro": "A Loquacious Lieutenant Laughs at your Logic.",
  "introed": "A Loquacious Lieutenant Laughed at your Logic.",
  "outro": "The only thing it ever cared about and wanted was recognition from his lord.",
};
BESTIARY.dict["pandemonium"]["lord"] = {
  "intro": "A Luciferian Lord Laments at your Loftiness.",
  "introed": "A Luciferian Lord Lamented at your Loftiness.",
  "outro": "It rejoiced as the sweet embrace of death liberated it from the too heavy weight of its duty.",
};
BESTIARY.dict["pandemonium"]["abaddon"] = {
  "intro": "An Abhorrent Abaddon Awaits your Attrition.",
  "introed": "An Abhorrent Abaddon Awaited your Attrition.",
  "outro": "It waited, waited and waited some more but reckoning never came.",
};
BESTIARY.dict["pandemonium"]["asmodeus"] = {
  "intro": "An Abyssal Asmodeus Assesses you and Attacks.",
  "introed": "An Abyssal Asmodeus Assessed you and Attacks.",
  "outro": "It never forgave itself for misjudging you, and spent all its life proofing and checking its computations.",
};
BESTIARY.dict["pandemonium"]["azazel"] = {
  "intro": "An Accursed Azazel Ambushes you with Aplomb.",
  "introed": "An Accursed Azazel Ambushed you with Aplomb.",
  "outro": "It didn't matter how good it did, its father simply was happier with its new family.",
};
BESTIARY.dict["pandemonium"]["mammon"] = {
  "intro": "A Macabre Mammon Mocks your Minuscule size.",
  "introed": "A Macabre Mammon Mocked your Minuscule size.",
  "outro": "There came a time where it couldn't detach itself from its cynical remarks, and it fell into a deep depression and lost any sort of enjoyment.",
};
BESTIARY.dict["pandemonium"]["belial"] = {
  "intro": "A Bestial Belial Banishes you Brutally.",
  "introed": "A Bestial Belial Banished you Brutally.",
  "outro": "But all its attempts failed, and in the end it could never inflict upon another what had been done to it.",
};
BESTIARY.dict["pandemonium"]["titan"] = {
  "intro": "A Titan Trumpets your Tragic Termination.",
  "introed": "A Titan Trumpeted your Tragic Termination.",
  "outro": "It told so many lies that when he asked for help at death's door nobody believe it.",
};
BESTIARY.dict["pandemonium"]["belphegor"] = {
  "intro": "A Barbaric Belphegor Besmirches you with Babble.",
  "introed": "A Barbaric Belphegor Besmirched you with Babble.",
  "outro": "It swore its submission by taking a vow of silence, and it was never heard again.",
};
BESTIARY.dict["pandemonium"]["golem"] = {
  "intro": "A Gigantic Golem Gouges the Ground.",
  "introed": "A Gigantic Golem Gouged the Ground.",
  "outro": "Denial ran its course, but eventually it got caught up by the memories of embarrassing moments it was suppressing, and the shame overwhelmed it.",
};
BESTIARY.dict["pandemonium"]["hellhound"] = {
  "intro": "A Hulky Hellhound lets out a Hollow Howl.",
  "introed": "A Hulky Hellhound let out a Hollow Howl.",
  "outro": "It ran after all the skeletons in hell and burrowed them in its secret spot.",
};
BESTIARY.dict["pandemonium"]["ifrit"] = {
  "intro": "An Incandescent Ifrit Ignites with Ire.",
  "introed": "An Incandescent Ifrit Ignited with Ire.",
  "outro": "It will never forget the look in your eyes when it realized it was no match for you.",
};


//hack mountains
BESTIARY.dict["mountains"] = {};
BESTIARY.dict["mountains"]["phoenix"] = {
  "intro": "A Pompous Phoenix Parades or Patrols.",
  "introed": "A Pompous Phoenix Paraded or Patrolled.",
  "outro": "Every time it resurrected, the pain of death was more acute than the last.",
};
BESTIARY.dict["mountains"]["pterosaur"] = {
  "intro": "A Predatory Pterosaur Pierces through the Panorama.",
  "introed": "A Predatory Pterosaur Pierced through the Panorama.",
  "outro": "It flew too high, grew scared of the sun, and never again took to the sky.",
};
BESTIARY.dict["mountains"]["manticore"] = {
  "intro": "A Mythical Manticore Marches on the Mountain.",
  "introed": "A Mythical Manticore Marched on the Mountain.",
  "outro": "It grew conscious of its repulsive appearance and convinced itself it was too hideous to show its face ever again.",
};
BESTIARY.dict["mountains"]["hawk"] = {
  "intro": "A Hungry Hawk Hurls towards the Humans.",
  "introed": "A Hungry Hawk Hurled towards the Humans.",
  "outro": "Kicked from its flock, disowned, it decided to head towards countries unknown.",
};
BESTIARY.dict["mountains"]["harpy"] = {
  "intro": "A Hysterical Harpy Harasses the Heroes.",
  "introed": "A Hysterical Harpy Harassed the Heroes.",
  "outro": "It spent its life shrieking in pain, haunted by the trauma of a past memory.",
};
BESTIARY.dict["mountains"]["emu"] = {
  "intro": "An Enraged Emu Encroaches on your Ensemble.",
  "introed": "An Enraged Emu Encroached on your Ensemble.",
  "outro": "Because of its long legs, all its eggs broke upon being laid, so it died childless.",
};
BESTIARY.dict["mountains"]["dragon"] = {
  "intro": "A Dominating Dragon Descends with a Deafening roar.",
  "introed": "A Dominating Dragon Descended with a Deafening roar.",
  "outro": "As the last of its race, it fetched a fortune as a hunt trophy.",
};
BESTIARY.dict["mountains"]["chimera"] = {
  "intro": "A Cawing Chimera Charges like a Cannonball.",
  "introed": "A Cawing Chimera Charged like a Cannonball",
  "outro": "The parts of different animals that composed this ungoldy patchwork always struggled to work together, until they didn't.",
};


//hack hell
BESTIARY.dict["hell"] = {};
BESTIARY.dict["hell"]["warlock"] = {
  "intro": "A Wicked Warlock Wages War.",
  "introed": "A Wicked Warlock Waged War.",
  "outro": "Peeking into untold dimensions eroded its mind until it couldn't distinguish fake from reality.",
};
BESTIARY.dict["hell"]["centipede"] = {
  "intro": "A Colossal Centipede Contemplates Crushing you.",
  "introed": "A Colossal Centipede Contemplated Crushing you.",
  "outro": "Its incessant hunger fattened it up to the point where its limbs could no longer support it.",
};
BESTIARY.dict["hell"]["toad"] = {
  "intro": "A Toxic Toad Taunts you by its Throbs.",
  "introed": "A Toxic Toad Taunted you by its Throbs.",
  "outro": "It continued to scream for help, but its deformed croaking kept being mistaken for aggression.",
};
BESTIARY.dict["hell"]["serpentine"] = {
  "intro": "A Saucy Serpentine Seeks to Seduce you.",
  "introed": "A Saucy Serpentine Sought to Seduce you.",
  "outro": "Its heart remained cold, it never found any real comfort in the arms of its many lovers.",
};
BESTIARY.dict["hell"]["satyr"] = {
  "intro": "A Sanguinary Satyr Shrieks in the Shadows.",
  "introed": "A Sanguinary Satyr Shrieked in the Shadows.",
  "outro": "It never got to realize its only secret wish, to be a normal goat.",
};
BESTIARY.dict["hell"]["sandworm"] = {
  "intro": "A Swirly Sandworm Spews its Spite.",
  "introed": "A Swirly Sandworm Spewed its Spite.",
  "outro": "Only its husk remained as a refuge to shield travelers from unkind elements.",
};
BESTIARY.dict["hell"]["hacatoncheir"] = {
  "intro": "A Horrible Hecatoncheir Hovers in a Haze.",
  "introed": "A Horrible Hecatoncheir Hovered in a Haze.",
  "outro": "It tangled its tentacles in an sharp rock, and became a staple of the landmark.",
};
BESTIARY.dict["hell"]["eyeball"] = {
  "intro": "An Eerie Eyeball Examines your Ego.",
  "introed": "An Eerie Eyeball Examined your Ego.",
  "outro": "As it grew old, its perceptions waned, so much so that it ended up blind.",
};
BESTIARY.dict["hell"]["devilfly"] = {
  "intro": "A Deadly Devilfly Drones with Defiance.",
  "introed": "A Deadly Devilfly Droned with Defiance",
  "outro": "A gust of wind propelled it to another part of the world, far from everything it ever knew and loved.",
};


//hack heaven
BESTIARY.dict["heaven"] = {};
BESTIARY.dict["heaven"]["valkyrie"] = {
  "intro": "A Vile Valkyrie Volunteers to Violate you.",
  "introed": "A Vile Valkyrie Volunteered to Violate you.",
  "outro": "It learned to accept its true self and its cannibalistic inclinations.",
};
BESTIARY.dict["heaven"]["seraph"] = {
  "intro": "A Smug Seraph Shames your Soul.",
  "introed": "A Smug Seraph Shamed your Soul.",
  "outro": "It preferred to take its own life than to face its countrymen after dishonor in battle.",
};
BESTIARY.dict["heaven"]["raijuu"] = {
  "intro": "A Rebel Raijuu's Radiation Reverberates around.",
  "introed": "A Rebel Raijuu's Radiation Reverberated around.",
  "outro": "When its energy finished to discharge, it was nothing more than a pile of ash.",
};
BESTIARY.dict["heaven"]["ponpon"] = {
  "intro": "A Pure-looking Ponpon Pretends to be Pacific.",
  "introed": "A Pure-looking Ponpon Pretended to be Pacific.",
  "outro": "Its cuteness was too much to handle for anyone around, so it chose isolation and exile.",
};
BESTIARY.dict["heaven"]["maneki"] = {
  "intro": "A Mischievous Maneki Marinates some Machination.",
  "introed": "A Mischievous Maneki Marinated some Machination",
  "outro": "It got exchanged and traded around the world as a good luck charm.",
};
BESTIARY.dict["heaven"]["cherub"] = {
  "intro": "A Cheeky Cherub Condemns your Career.",
  "introed": "A Cheeky Cherub Condemned your Career.",
  "outro": "It remained crippled in foetal position by the weight of victory expectations it could not fulfil.",
};
BESTIARY.dict["heaven"]["angel"] = {
  "intro": "An Arrogant Angel Ascends with Attitude.",
  "introed": "An Arrogant Angel Ascended with Attitude.",
  "outro": "It did its best, considering its abilities, but sometimes your best is not enough.",
};
BESTIARY.dict["heaven"]["goddess"] = {};


//hack forests
BESTIARY.dict["forests"] = {};
BESTIARY.dict["forests"]["blob"] = {
  "intro": "A Burgeoning Blob Buds and Bloats.",
  "introed": "A Burgeoning Blob Budded and Bloated.",
  "outro": "Every drop of rain eroded it a little until the day it got completely dissolved.",
};
BESTIARY.dict["forests"]["boar"] = {
  "intro": "A Brazen Boar Braces for Battle.",
  "introed": "A Brazen Boar Braced for Battle.",
  "outro": "It would have tasted nice had someone found the carcass before it rotted.",
};
BESTIARY.dict["forests"]["flower"] = {
  "intro": "A Flesh-eating Flower wants to Feed on your Face.",
  "introed": "A Flesh-eating Flower wanted to Feed on your Face.",
  "outro": "Many people stepped on the wilted bouquet that was rejected and thrown on the floor.",
};
BESTIARY.dict["forests"]["fox"] = {
  "intro": "A Frisky Fox Feints Flight.",
  "introed": "A Frisky Fox Feinted Flight",
  "outro": "Its agility could no longer protect it from predators when it sprained a leg.",
};
BESTIARY.dict["forests"]["fungus"] = {
  "intro": "A Feral Fungus Frightens you with its Force.",
  "introed": "A Feral Fungus Frightened you with its Force.",
  "outro": "It spent its life in hiding, paralyzed by the fear of facing problems that force could not solve.",
};
BESTIARY.dict["forests"]["mandragora"] = {
  "intro": "A Malicious Mandragora Manifests its Monstrosity.",
  "introed": "A Malicious Mandragora Manifested its Monstrosity.",
  "outro": "But it was not enough to deter alchemists who carefully kept it barely alive while grating its flesh for its magical properties.",
};
BESTIARY.dict["forests"]["morel"] = {
  "intro": "A Menacing Morel Meets its Match.",
  "introed": "A Menacing Morel Met its Match.",
  "outro": "Its rhizome extended and pumped all the water off the ground of the forest, desiccating all vegetation.",
};
BESTIARY.dict["forests"]["nymph"] = {
  "intro": "A Naughty Nymph is Nourished by Nature.",
  "introed": "A Naughty Nymph was Nourished by Nature.",
  "outro": "War took its toll on the environment, and the nymph wilted away in the debris of the ransacked forest.",
};
BESTIARY.dict["forests"]["squirrel"] = {
  "intro": "A Savage Squirrel Springs on Stage.",
  "introed": "A Savage Squirrel Sprang on Stage.",
  "outro": "Getting into fights prevented it to stockpile food, and it starved to death when weather got rough.",
};
BESTIARY.dict["forests"]["tree"] = {
  "intro": "A moving Tree Twists and Turns Towards you.",
  "introed": "A moving Tree Twisted and Turned Towards you",
  "outro": "It twisted and turned some more in the heart, under a cauldron full of stew.",
};
BESTIARY.dict["forests"]["truffle"] = {
  "intro": "A Terrible Truffle Threatens you Tirelessly.",
  "introed": "A Terrible Truffle Threatened you Tirelessly.",
  "outro": "Putting up a noxious front to protect its insecurities worked too well and it withered from loneliness.",
};
BESTIARY.dict["forests"]["trunk"] = {
  "intro": "A Terrifying Thorny Trunk Towers over you.",
  "introed": "A Terrifying Thorny Trunk Towered over you.",
  "outro": "It screamed as villagers dismantled it to build a stool.",
};


//hack caves
BESTIARY.dict["caves"] = {};
BESTIARY.dict["caves"]["bat"] = {
  "intro": "A Black Bat Bursts Before you.",
  "introed": "A Black Bat Burst Before you.",
  "outro": "Failing to secure its prey, it had to watch its all family starve to death.",
};
BESTIARY.dict["caves"]["bloodsucker"] = {
  "intro": "A Bizarre Bloodsucker Buzzes near your Body.",
  "introed": "A Bizarre Bloodsucker Buzzed near your Body.",
  "outro": "Failing to contribute its share to its community, it got chased out and lived as an outcast.",
};
BESTIARY.dict["caves"]["slime"] = {
  "intro": "A Slushy Slime Sludges Sloppily.",
  "introed": "A Slushy Slime Sludged Sloppily.",
  "outro": "A monster drunk it in its sleep, confusing it with a puddle.",
};
BESTIARY.dict["caves"]["crawler"] = {
  "intro": "A Cunning Crawler Creeps in the Cavern.",
  "introed": "A Cunning Crawler Creeped in the Cavern.",
  "outro": "It perfected its mimicry to the point where its friends could not distinguish it from a rock.",
};
BESTIARY.dict["caves"]["scorpion"] = {
  "intro": "A Spiteful Scorpion's Stinger Shines.",
  "introed": "A Spiteful Scorpion's Stinger Shone.",
  "outro": "It got captured by humans who wanted to harvest its venom and lived in captivity.",
};
BESTIARY.dict["caves"]["mole"] = {
  "intro": "A Measly Mole Moves in the Muck.",
  "introed": "A Measly Mole Moved in the Muck.",
  "outro": "Digging one too many tunnel, it found itself trapped by a cave-in.",
};
BESTIARY.dict["caves"]["rhino"] = {
  "intro": "A Rocky Rhino's Roar Resounds all around.",
  "introed": "A Rocky Rhino's Roar Resounded all around",
  "outro": "Its precious shell got mined crystal after crystal until nothing was left of the rocky creature.",
};
BESTIARY.dict["caves"]["lizard"] = {
  "intro": "A Large Lizard Looms over the Land.",
  "introed": "A Large Lizard Loomed over the Land.",
  "outro": "It got into a deadly feud with its clone that grew out of its cut tail.",
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
  "intro": "The room is decorated with lively green plants.",
  "introed": "The room was decorated with lively green plants.",
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
