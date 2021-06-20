// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/flower.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Flower, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);

PLAYER_ACTIONS.useless(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.useless(PARTYMEMBERS.GeniusProdigy);

PLAYER_ACTIONS.win(ABILITY.Fireball, 3);                  // 50   ELEM
PLAYER_ACTIONS.useless(ABILITY.Thunder, 1);                   // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 4);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 2);                    // 150  SPIR
PLAYER_ACTIONS.useless(ABILITY.Petrify, 1);                   // 300  SPIR

PLAYER_ACTIONS.useless(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 2, true);            // 20   ALCH
PLAYER_ACTIONS.useless(ITEM.Elixir_venom, 1, true);           // 100  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 150  ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 6);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 75   WEAP
PLAYER_ACTIONS.useless(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Arrow, 2, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL
PLAYER_ACTIONS.useless(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Flower spreads out a cloud of strong fruity aroma. It's alluring power is affecting your senses.", attack);
BATTLE.monster_actions.add_textual("The Flower disseminates poisonous gas in the vicinity. You hold your breath while trying to escape.", attack);
BATTLE.monster_actions.add_textual("The Flower's scent reaches your nose, and you feel irresistibly drawn towards it...", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Flesh-eating Flower wants to Feed on your Face.");

//todo
