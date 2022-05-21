const HIT_ELEMENT = {
  start: function(index, action_object) {
    HIT_ELEMENT.end(index);
  },

  end: function(index){
    HIT.result.success(index);
  },
}
