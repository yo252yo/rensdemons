const HIT_DIPLOMACY = {
  start: function(index, action_object) {
    HIT_DIPLOMACY.end(index);
  },

  end: function(index){
    HIT.result.success(index);
  },
}
