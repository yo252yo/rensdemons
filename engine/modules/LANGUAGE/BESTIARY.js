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
