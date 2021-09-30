// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/hell/devilfly.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Scale, 1);


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
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.3,
  variability: 0.7, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Devilfly resounding buzz grows louder until it takes the place of all sounds in the unverse and crushes your spirit under its overwhelming omnipresence.", attack);
BATTLE.monster_actions.add_textual("The Devilfly's macabre buzzing imprints on your mind that everything is either dead or dying. There is nothing but walking corpses, flesh in decay.", attack);
BATTLE.monster_actions.add_textual("The Devilfly's hypnotic noise slowly turns your own brain against itself. It fills your mind with the hallucination that you're full of critters crawling inside you, making you want to rip your own skin.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Deadly Devilfly Drones with Defiance.");
