// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/asmodeus.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_decay, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);

/*TODO T3 defense
PLAYER_ACTIONS.win(ABILITY.Persuade, 3);                  // 250  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_iron, 2);                 // 20  WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 1);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 3, true);           // 40  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
*/




// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 0.5,
  variability: 0.5, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Asmodeus projects the whole universe in your brain. You can see yourself growing smaller than the smallest conceivable speck in an abyss of void. You are nothing.", attack);
BATTLE.monster_actions.add_textual("The Asmodeus isolates you from the real world by dimming your senses. You are nowhere.", attack);
BATTLE.monster_actions.add_textual("The Asmodeus awakens the memories of all the bad things you did without meaning to, highlighting your lack of mastery over the world. How can you expect to amount to anything?", attack);
BATTLE.monster_actions.add_textual("The Asmodeus reminds you that you will never be able to see other people's mind. You're bound to interact with them through the distortion of language. They'll never know you. You are alone.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start("An Abyssal Asmodeus Assesses you and Attacks.");
