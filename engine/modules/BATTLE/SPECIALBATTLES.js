
const SPECIALBATTLES = {
  _battle_extra_data: null,

  rubble: function(payoff, callback){
    SPECIALBATTLES._battle_extra_data = payoff;
    BATTLE.api.make("encounters/_rubble", callback);
  },

  encounters: function(name, payoff, seed, callback){
    SPECIALBATTLES._battle_extra_data = [payoff, seed];
    BATTLE.api.make("encounters/" + name, callback);
  },

}
