// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/whale.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.useless(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.useless(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.useless(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.useless(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.useless(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.useless(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.useless(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.useless(PARTYMEMBERS.TorturedSoul);
PLAYER_ACTIONS.useless(PARTYMEMBERS.RetiredProtector);
PLAYER_ACTIONS.useless(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.useless(PARTYMEMBERS.SavageChild);
PLAYER_ACTIONS.useless(PARTYMEMBERS.DumbMuscles);
PLAYER_ACTIONS.useless(PARTYMEMBERS.GeniusProdigy);
PLAYER_ACTIONS.useless(PARTYMEMBERS.TraitorFisher);


PLAYER_ACTIONS.useless(ITEM.Elixir_decay, 1, true);           // 150  ALCH
PLAYER_ACTIONS.useless(ABILITY.Petrify, 1);                   // 150  SPIR
PLAYER_ACTIONS.useless(ITEM.Elixir_chaos, 1, true);           // 200  ALCH
PLAYER_ACTIONS.useless(ITEM.Net, 1);                          // 200  TOOL
PLAYER_ACTIONS.useless(ITEM.Shield, 1);                       // 200  WEAP
PLAYER_ACTIONS.useless(ABILITY.Asphyxiate, 1);                // 250  ELEM
PLAYER_ACTIONS.useless(ITEM.Spear, 1);                        // 250  WEAP
PLAYER_ACTIONS.useless(ABILITY.Persuade, 1);                  // 250  DIPL
PLAYER_ACTIONS.useless(ABILITY.Earthquake, 1);                // 500  ELEM
PLAYER_ACTIONS.useless(ABILITY.Confusion, 1);                 // 500  SPIR
PLAYER_ACTIONS.useless(ABILITY.Intimidate, 1);                // 500  DIPL
PLAYER_ACTIONS.useless(ITEM.Sword_iron, 1);                   // 500  WEAP
PLAYER_ACTIONS.useless(ITEM.Axe, 1);                          // 600  WEAP
PLAYER_ACTIONS.useless(ABILITY.Incinerate, 1);                // 1000 ELEM
PLAYER_ACTIONS.useless(ITEM.Sword_great, 1);                  // 1000 WEAP
PLAYER_ACTIONS.useless(ABILITY.Lull, 1);                      // 1500 SPIR
PLAYER_ACTIONS.useless(ABILITY.Summon, 1);                    // 2500 ELEM
PLAYER_ACTIONS.useless(ABILITY.Mystify, 1);                   // 2500 DIPL
PLAYER_ACTIONS.useless(ABILITY.Charm, 1);                     // 2500 SPIR


PLAYER_ACTIONS.useless(ITEM.Sword_legend, 1);
PLAYER_ACTIONS.useless(ITEM.War_hammer, 1);
PLAYER_ACTIONS.useless(ITEM.Staff, 1);
PLAYER_ACTIONS.useless(ITEM.Wand, 1);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.85, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 1.6,
  time_variation: 0.1, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Whale moves slowly but surely in your direction, mouth wide open. It is so huge that it occupies almost all of your field of view. Escaping its implacable march is going to be tough.", attack);
BATTLE.monster_actions.add_textual("The Whale sucks in a large quantity of water, creating a maelstrom of currents around you that shake you violently. You struggle to keep control of your body.", attack);
BATTLE.monster_actions.add_textual("The Whale emits a loud and deep cry that seems to make the whole lake vibrate. It then slaps its gigantic fin in your direction. It's several times the size of your house.", attack);

PLAYER_ACTIONS.add({
  name: "Feed",
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: ["Empowered by the Goddess, you decide to end the confrontation in a surprising way. You trust your luck and throw yourself recklessly in the mouth of the animal. The Goddess must be watching over you, because you manage to avoid the giant teeth and land safely on the tongue of the animal."],
  extra_function: function(){
    INVENTORY.increase("_eaten_by_whale");
  }
});

// ===================
//hack START
// ===================
BATTLE.operations.start("A Wondrous Whale Wrecked your Wares.");
