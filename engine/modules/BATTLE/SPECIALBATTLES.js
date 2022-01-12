
const SPECIALBATTLES = {
  _battle_extra_data: null,

  rubble: function(payoff, callback){
    SPECIALBATTLES._battle_extra_data = payoff;
    BATTLE.api.make("_rubble", callback);
  },

  treasure: function(payoff, callback){
    SPECIALBATTLES._battle_extra_data = payoff;
    BATTLE.api.make("_treasure", callback);
  },

  encounters: function(name, payoff, seed, callback){
    SPECIALBATTLES._battle_extra_data = [payoff, seed];
    BATTLE.api.make("encounters/" + name, callback);
  },

  shop: function(sprite_nb){
    SPECIALBATTLES._battle_extra_data = [sprite_nb];
    BATTLE.api.make('_shop');
  },
}
