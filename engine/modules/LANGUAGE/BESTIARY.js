BESTIARY = {
  dict: {},

  intro: function(battle_name) {
    var split = battle_name.split("/");
    if (! BESTIARY.dict[split[0]]){
      return undefined;
    }
    if (! BESTIARY.dict[split[0]][split[1]]){
      return undefined;
    }
    return BESTIARY.dict[split[0]][split[1]]["intro"];
  },

  introed: function(battle_name) {
    var split = battle_name.split("/");
    if (! BESTIARY.dict[split[0]]){
      return undefined;
    }
    if (! BESTIARY.dict[split[0]][split[1]]){
      return undefined;
    }
    return BESTIARY.dict[split[0]][split[1]]["introed"];
  },

  size: function(category){
    if (! BESTIARY.dict[category]){
      return -1;
    }
    return Object.keys(BESTIARY.dict[category]).length;
  },
}


BESTIARY.dict["world"] = {};
BESTIARY.dict["world"]["arsonist"] = {
  "intro": "An Ambitious Arsonist Aspires to set you Ablaze.",
  "introed": "An Ambitious Arsonist Aspired to set you Ablaze.",
};
BESTIARY.dict["world"]["bruiser"] = {
  "intro": "A Brutal Bruiser thinks you're Begging for a Beating.",
  "introed": "A Brutal Bruiser thought you were Begging for a Beating.",
};
BESTIARY.dict["world"]["butcher"] = {
  "intro": "A Butcher Beholds you as the Basis for his Buffet.",
  "introed": "A Butcher Beholded you as the Basis for his Buffet.",
};
BESTIARY.dict["world"]["djinn"] = {
  "intro": "A Deviant Djinn Drifts in an eerie Dance.",
  "introed": "A Deviant Djinn Drifted in an eerie Dance.",
};
BESTIARY.dict["world"]["ghost"] = {
  "intro": "A Ghastly Ghost Glows Gloomily.",
  "introed": "A Ghastly Ghost Glowed Gloomily.",
};
BESTIARY.dict["world"]["goblin"] = {
  "intro": "A Grumpy Goblin Grasps some Grass.",
  "introed": "A Grumpy Goblin Grasped some Grass.",
};
BESTIARY.dict["world"]["grizzly"] = {
  "intro": "A Gnarly Grizzly Growls Gluttonously.",
  "introed": "A Gnarly Grizzly Growled Gluttonously.",
};
BESTIARY.dict["world"]["knight"] = {
  "intro": "A black Knight Knows he will Kill a Kid.",
  "introed": "A black Knight Knew he will Kill a Kid.",
};
BESTIARY.dict["world"]["mammoth"] = {
  "intro": "A Massive Mammoth Mashes the Mud at every step.",
  "introed": "A Massive Mammoth Mashed the Mud at every step.",
};
BESTIARY.dict["world"]["mummy"] = {
  "intro": "A Meandering Mummy Moans Mournfully.",
  "introed": "A Meandering Mummy Moaned Mournfully.",
};
BESTIARY.dict["world"]["ruins"] = {
  "intro": "You stumble upon an odd structure. As you approach, you conclude that it must be the ruins of a building from a long gone civilization. It is entirely unlike anything you know. Instead of wood and stone, you find mostly rusted metal and a smooth, alien substance.",
  "introed": "You stumbled upon an odd structure.",
};
BESTIARY.dict["world"]["skeleton"] = {
  "intro": "A Snorty Skeleton Seizes its Sword.",
  "introed": "A Snorty Skeleton Seized its Sword.",
};
BESTIARY.dict["world"]["traveler"] = {
  "intro": "You cross the path of another weary traveler.",
  "introed": "You crossed the path of another weary traveler.",
};
BESTIARY.dict["world"]["vadhaka"] = {
  "intro": "A Vigorous Vadhaka Vows Vengeance.",
  "introed": "A Vigorous Vadhaka Vowed Vengeance.",
};
BESTIARY.dict["world"]["wraith"] = {
  "intro": "A Wayward Wraith Wails its Woe.",
  "introed": "A Wayward Wraith Wailed its Woe.",
};


BESTIARY.dict["waters"] = {};
BESTIARY.dict["waters"]["serpent"] = {
  "intro": "A Sumptuous Serpent Slashes through the Sea.",
  "introed": "A Sumptuous Serpent Slashed through the Sea.",
};
BESTIARY.dict["waters"]["anemone"] = {
  "intro": "An Angry Anemone Articulates its Appendage.",
  "introed": "An Angry Anemone Articulated its Appendage.",
};
BESTIARY.dict["waters"]["anglerjelly"] = {
  "intro": "An Attentive Anglerjelly Aims at Attracting you.",
  "introed": "An Attentive Anglerjelly Aimed at Attracting you.",
};
BESTIARY.dict["waters"]["octopus"] = {
  "intro": "An Oppressive Octopus Obstruct the Ocean.",
  "introed": "An Oppressive Octopus Obstructed the Ocean.",
};
BESTIARY.dict["waters"]["naiad"] = {
  "intro": "A Nautical Naiad Nags you Noxiously.",
  "introed": "A Nautical Naiad Nagged you Noxiously.",
};
BESTIARY.dict["waters"]["whale"] = {
  "intro": "A Wondrous Whale Wrecks your Wares.",
  "introed": "A Wondrous Whale Wrecked your Wares.",
};
BESTIARY.dict["waters"]["triton"] = {
  "intro": "A Triton Trooper Treads the Tides.",
  "introed": "A Triton Trooper Treaded the Tides.",
};
BESTIARY.dict["waters"]["squid"] = {
  "intro": "A Slithering Squid Swims to Smother you.",
  "introed": "A Slithering Squid Swam to Smother you.",
};
BESTIARY.dict["waters"]["mermaid"] = {
  "intro": "A Magnificent Mermaid Mesmerizes you with Magnetism.",
  "introed": "A Magnificent Mermaid Mesmerized you with Magnetism.",
};
BESTIARY.dict["waters"]["jellyfish"] = {
  "intro": "A Judgmental Jellyfish Jiggles Joyfully.",
  "introed": "A Judgmental Jellyfish Jiggled Joyfully.",
};
BESTIARY.dict["waters"]["crab"] = {
  "intro": "A Cruel Crab Cuts water with its Claws.",
  "introed": "A Cruel Crab Cut water with its Claws.",
};


BESTIARY.dict["trial"] = {};
BESTIARY.dict["trial"]["viper"] = {
  "intro": "A Vicious Viper Ventures into View.",
  "introed": "A Vicious Viper Ventured into View.",
};
BESTIARY.dict["trial"]["rodent"] = {
  "intro": "A Repulsive Rodent Rushes to your Rear.",
  "introed": "A Repulsive Rodent Rushed to your Rear.",
};
BESTIARY.dict["trial"]["cockroach"] = {
  "intro": "A Crass Cockroach Crawls Creepily.",
  "introed": "A Crass Cockroach Crawled Creepily.",
};
BESTIARY.dict["trial"]["basilisk"] = {
  "intro": "A Beastly Basilisk Blitzes on your Body.",
  "introed": "A Beastly Basilisk Blitzed on your Body.",
};
BESTIARY.dict["trial"]["arachnid"] = {
  "intro": "An Aversive Arachnid Appears on your Arm.",
  "introed": "An Aversive Arachnid Appeared on your Arm.",
};


BESTIARY.dict["pandemonium"] = {};
BESTIARY.dict["pandemonium"]["lieutenant"] = {
  "intro": "A Loquacious Lieutenant Laughs at your Logic.",
  "introed": "A Loquacious Lieutenant Laughed at your Logic.",
};
BESTIARY.dict["pandemonium"]["lord"] = {
  "intro": "A Luciferian Lord Laments at your Loftiness.",
  "introed": "A Luciferian Lord Lamented at your Loftiness.",
};
BESTIARY.dict["pandemonium"]["abaddon"] = {
  "intro": "An Abhorrent Abaddon Awaits your Attrition.",
  "introed": "An Abhorrent Abaddon Awaited your Attrition.",
};
BESTIARY.dict["pandemonium"]["asmodeus"] = {
  "intro": "An Abyssal Asmodeus Assesses you and Attacks.",
  "introed": "An Abyssal Asmodeus Assessed you and Attacks.",
};
BESTIARY.dict["pandemonium"]["azazel"] = {
  "intro": "An Accursed Azazel Ambushes you with Aplomb.",
  "introed": "An Accursed Azazel Ambushed you with Aplomb.",
};
BESTIARY.dict["pandemonium"]["mammon"] = {
  "intro": "A Macabre Mammon Mocks your Minuscule size.",
  "introed": "A Macabre Mammon Mocked your Minuscule size.",
};
BESTIARY.dict["pandemonium"]["belial"] = {
  "intro": "A Bestial Belial Banishes you Brutally.",
  "introed": "A Bestial Belial Banished you Brutally.",
};
BESTIARY.dict["pandemonium"]["titan"] = {
  "intro": "A Titan Trumpets your Tragic Termination.",
  "introed": "A Titan Trumpeted your Tragic Termination.",
};
BESTIARY.dict["pandemonium"]["belphegor"] = {
  "intro": "A Barbaric Belphegor Besmirches you with Babble.",
  "introed": "A Barbaric Belphegor Besmirched you with Babble.",
};
BESTIARY.dict["pandemonium"]["golem"] = {
  "intro": "A Gigantic Golem Gouges the Ground.",
  "introed": "A Gigantic Golem Gouged the Ground.",
};
BESTIARY.dict["pandemonium"]["hellhound"] = {
  "intro": "A Hulky Hellhound lets out a Hollow Howl.",
  "introed": "A Hulky Hellhound let out a Hollow Howl.",
};
BESTIARY.dict["pandemonium"]["ifrit"] = {
  "intro": "An Incandescent Ifrit Ignites with Ire.",
  "introed": "An Incandescent Ifrit Ignited with Ire.",
};


BESTIARY.dict["mountains"] = {};
BESTIARY.dict["mountains"]["phoenix"] = {
  "intro": "A Pompous Phoenix Parades or Patrols.",
  "introed": "A Pompous Phoenix Paraded or Patrolled.",
};
BESTIARY.dict["mountains"]["pterosaur"] = {
  "intro": "A Predatory Pterosaur Pierces through the Panorama.",
  "introed": "A Predatory Pterosaur Pierced through the Panorama.",
};
BESTIARY.dict["mountains"]["manticore"] = {
  "intro": "A Mythical Manticore Marches on the Mountain.",
  "introed": "A Mythical Manticore Marched on the Mountain.",
};
BESTIARY.dict["mountains"]["hawk"] = {
  "intro": "A Hungry Hawk Hurls towards the Humans.",
  "introed": "A Hungry Hawk Hurled towards the Humans.",
};
BESTIARY.dict["mountains"]["harpy"] = {
  "intro": "A Hysterical Harpy Harasses the Heroes.",
  "introed": "A Hysterical Harpy Harassed the Heroes.",
};
BESTIARY.dict["mountains"]["emu"] = {
  "intro": "An Enraged Emu Encroaches on your Ensemble.",
  "introed": "An Enraged Emu Encroached on your Ensemble.",
};
BESTIARY.dict["mountains"]["dragon"] = {
  "intro": "A Dominating Dragon Descends with a Deafening roar.",
  "introed": "A Dominating Dragon Descended with a Deafening roar.",
};
BESTIARY.dict["mountains"]["chimera"] = {
  "intro": "A Cawing Chimera Charges like a Cannonball.",
  "introed": "A Cawing Chimera Charged like a Cannonball",
};


BESTIARY.dict["hell"] = {};
BESTIARY.dict["hell"]["warlock"] = {
  "intro": "A Wicked Warlock Wages War.",
  "introed": "A Wicked Warlock Waged War.",
};
BESTIARY.dict["hell"]["centipede"] = {
  "intro": "A Colossal Centipede Contemplates Crushing you.",
  "introed": "A Colossal Centipede Contemplated Crushing you.",
};
BESTIARY.dict["hell"]["toad"] = {
  "intro": "A Toxic Toad Taunts you by its Throbs.",
  "introed": "A Toxic Toad Taunted you by its Throbs.",
};
BESTIARY.dict["hell"]["serpentine"] = {
  "intro": "A Saucy Serpentine Seeks to Seduce you.",
  "introed": "A Saucy Serpentine Sought to Seduce you.",
};
BESTIARY.dict["hell"]["satyr"] = {
  "intro": "A Sanguinary Satyr Shrieks in the Shadows.",
  "introed": "A Sanguinary Satyr Shrieked in the Shadows.",
};
BESTIARY.dict["hell"]["sandworm"] = {
  "intro": "A Swirly Sandworm Spews its Spite.",
  "introed": "A Swirly Sandworm Spewed its Spite.",
};
BESTIARY.dict["hell"]["hacatoncheir"] = {
  "intro": "A Horrible Hecatoncheir Hovers in a Haze.",
  "introed": "A Horrible Hecatoncheir Hovered in a Haze.",
};
BESTIARY.dict["hell"]["eyeball"] = {
  "intro": "An Eerie Eyeball Examines your Ego.",
  "introed": "An Eerie Eyeball Examined your Ego.",
};
BESTIARY.dict["hell"]["devilfly"] = {
  "intro": "A Deadly Devilfly Drones with Defiance.",
  "introed": "A Deadly Devilfly Droned with Defiance",
};


BESTIARY.dict["heaven"] = {};
BESTIARY.dict["heaven"]["valkyrie"] = {
  "intro": "A Vile Valkyrie Volunteers to Violate you.",
  "introed": "A Vile Valkyrie Volunteered to Violate you.",
};
BESTIARY.dict["heaven"]["seraph"] = {
  "intro": "A Smug Seraph Shames your Soul.",
  "introed": "A Smug Seraph Shamed your Soul.",
};
BESTIARY.dict["heaven"]["raijuu"] = {
  "intro": "A Rebel Raijuu's Radiation Reverberates around.",
  "introed": "A Rebel Raijuu's Radiation Reverberated around.",
};
BESTIARY.dict["heaven"]["ponpon"] = {
  "intro": "A Pure-looking Ponpon Pretends to be Pacific.",
  "introed": "A Pure-looking Ponpon Pretended to be Pacific.",
};
BESTIARY.dict["heaven"]["maneki"] = {
  "intro": "A Mischievous Maneki Marinates some Machination.",
  "introed": "A Mischievous Maneki Marinated some Machination",
};
BESTIARY.dict["heaven"]["cherub"] = {
  "intro": "A Cheeky Cherub Condemns your Career.",
  "introed": "A Cheeky Cherub Condemned your Career.",
};
BESTIARY.dict["heaven"]["angel"] = {
  "intro": "An Arrogant Angel Ascends with Attitude.",
  "introed": "An Arrogant Angel Ascended with Attitude.",
};


BESTIARY.dict["forests"] = {};
BESTIARY.dict["forests"]["blob"] = {
  "intro": "A Burgeoning Blob Buds and Bloats.",
  "introed": "A Burgeoning Blob Budded and Bloated.",
};
BESTIARY.dict["forests"]["boar"] = {
  "intro": "A Brazen Boar Braces for Battle.",
  "introed": "A Brazen Boar Braced for Battle.",
};
BESTIARY.dict["forests"]["flower"] = {
  "intro": "A Flesh-eating Flower wants to Feed on your Face.",
  "introed": "A Flesh-eating Flower wanted to Feed on your Face.",
};
BESTIARY.dict["forests"]["fox"] = {
  "intro": "A Frisky Fox Feints Flight.",
  "introed": "A Frisky Fox Feinted Flight",
};
BESTIARY.dict["forests"]["fungus"] = {
  "intro": "A Feral Fungus Frightens you with its Force.",
  "introed": "A Feral Fungus Frightened you with its Force.",
};
BESTIARY.dict["forests"]["mandragora"] = {
  "intro": "A Malicious Mandragora Manifests its Monstrosity.",
  "introed": "A Malicious Mandragora Manifested its Monstrosity.",
};
BESTIARY.dict["forests"]["morel"] = {
  "intro": "A Menacing Morel Meets its Match.",
  "introed": "A Menacing Morel Met its Match.",
};
BESTIARY.dict["forests"]["nymph"] = {
  "intro": "A Naughty Nymph is Nourished by Nature.",
  "introed": "A Naughty Nymph was Nourished by Nature.",
};
BESTIARY.dict["forests"]["squirrel"] = {
  "intro": "A Savage Squirrel Springs on Stage.",
  "introed": "A Savage Squirrel Sprang on Stage.",
};
BESTIARY.dict["forests"]["tree"] = {
  "intro": "A moving Tree Twists and Turns Towards you.",
  "introed": "A moving Tree Twisted and Turned Towards you",
};
BESTIARY.dict["forests"]["truffle"] = {
  "intro": "A Terrible Truffle Threatens you Tirelessly.",
  "introed": "A Terrible Truffle Threatened you Tirelessly.",
};
BESTIARY.dict["forests"]["trunk"] = {
  "intro": "A Terrifying Thorny Trunk Towers over you.",
  "introed": "A Terrifying Thorny Trunk Towered over you.",
};


BESTIARY.dict["caves"] = {};
BESTIARY.dict["caves"]["bat"] = {
  "intro": "A Black Bat Bursts Before you.",
  "introed": "A Black Bat Burst Before you.",
};
BESTIARY.dict["caves"]["bloodsucker"] = {
  "intro": "A Bizarre Bloodsucker Buzzes near your Body.",
  "introed": "A Bizarre Bloodsucker Buzzed near your Body.",
};
BESTIARY.dict["caves"]["slime"] = {
  "intro": "A Slushy Slime Sludges Sloppily.",
  "introed": "A Slushy Slime Sludged Sloppily.",
};
BESTIARY.dict["caves"]["crawler"] = {
  "intro": "A Cunning Crawler Creeps in the Cavern.",
  "introed": "A Cunning Crawler Creeped in the Cavern.",
};
BESTIARY.dict["caves"]["scorpion"] = {
  "intro": "A Spiteful Scorpion's Stinger Shines.",
  "introed": "A Spiteful Scorpion's Stinger Shone.",
};
BESTIARY.dict["caves"]["mole"] = {
  "intro": "A Measly Mole Moves in the Muck.",
  "introed": "A Measly Mole Moved in the Muck.",
};
BESTIARY.dict["caves"]["rhino"] = {
  "intro": "A Rocky Rhino's Roar Resounds all around.",
  "introed": "A Rocky Rhino's Roar Resounded all around",
};
BESTIARY.dict["caves"]["lizard"] = {
  "intro": "A Large Lizard Looms over the Land.",
  "introed": "A Large Lizard Loomed over the Land.",
};
