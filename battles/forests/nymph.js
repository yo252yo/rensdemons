// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/nymph.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Mushroom, 1);
BATTLE.operations.add_loot(ITEM.Berry, 1);
BATTLE.operations.add_loot(ITEM.Flower, 1);



// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.kill_with_anything_over(700);

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 2);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 2);                  // 50  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 2);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 7, true);                  // 2   TOOL
PLAYER_ACTIONS.win(ITEM.Poison_darts, 4, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 3, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.6,
  variability: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Nymph extends her vines towards you and tries to ensnare you.", attack);
BATTLE.monster_actions.add_textual("The Nymph uses her charms to lower your defenses.", attack);
BATTLE.monster_actions.add_textual("The Nymph slowly surrounds you with her vines, making it hard to move.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("forests/nymph"));
