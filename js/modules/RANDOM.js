const RANDOM = {
  float: function(limit) {
    if(!limit){
      limit = 1;
    }
    return Math.random() * limit;
  },

  int: function(limit) {
    if(!limit){
      limit = 1;
    }
    return Math.floor(Math.random() * limit);
  },

  pick: function(arr){
    var index = RANDOM.int(arr.length);
    return arr[index];
  },

  pick_in_weighted_array: function(arr){
    var total = 0;
    for (var i in arr) {
      total += arr[i];
    }

    var index = RANDOM.float(total);
    for (var i in arr) {
      index -= arr[i];
      if (index <= 0) {
        return i;
      }
    }
    return i; // Should not happen, though
  },
}
