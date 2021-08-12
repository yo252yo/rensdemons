new CenteredImage("assets/battles/civilians/priest.png", 'background');

PLAYER_ACTIONS.escape("Leave");
BATTLE.operations.add_loot("_wiseOldTraining", 1);
AUDIO.music.characters.WiseOld();

LANGUAGE.actions["Endure"] = {
  usage: function(){
    return "You do nothing.";
  },
  win: function(){
    return `$$WiseOld$: "Good, very good. It seems that your body is sound too! We only need to proof your mind!"`;
  },
};

PLAYER_ACTIONS.win("Endure", 13);
BATTLETREE.api.unlock("_party/_WiseOldBody", "Endure");

var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 1.2,
  react_time_s: 1.2,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("$$WiseOld$ hits you with a staff.", attack);


// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `$$WiseOld$: "The trial of the body... We all know that the flesh is weak. But you must demonstrate stamina and dexterity! You must hold on, even when it seems absurd."`,
);
