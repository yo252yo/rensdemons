const HIT_SPIRIT = {

  start: function(index, action_object) {
    HIT_SPIRIT.end(index);
  },

  end: function(index){
    HIT.result.success(index);
  },
}
