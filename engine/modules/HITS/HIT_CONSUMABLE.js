const HIT_CONSUMABLE = {
  start: function(index, action_object) {
    HIT_CONSUMABLE.end(index);
  },

  end: function(index){
    HIT.result.success(index);
  },
}
