// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/viper.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.set_default.flee();
PLAYER_ACTIONS.set_default.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
var throwbranch = "Throw branch";

BATTLE.monster_actions.add_textual("The Viper slithers on the ground towards you.");
BATTLE.monster_actions.add_textual("The Viper open its jaw, it shines with drool. Or is that poison?");
BATTLE.monster_actions.add_textual("The Viper's pointy tongue emits a strident hiss.");

PLAYER_ACTIONS.add.action({
  name: ITEM.Branch,
  description: ["You point the branch towards the vicious enemy with your trembling hand. The viper gets distracted and seems more interested by the branch than you. It wraps yourself around it."],
  function: function(){
    INVENTORY.decrease(ITEM.Branch);
    BATTLE.player_actions.remove(ITEM.Branch);
    BATTLETREE.unlock(BATTLE.get_current_battle(), throwbranch, ITEM.Branch);
  },
});

PLAYER_ACTIONS.add.winning({
  name: throwbranch,
  description: ["You throw the branch with its temporary occupant."],
  effect: "They disappear together in the darkness, far from you.",
});

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Vicious Viper Ventured into View.");
