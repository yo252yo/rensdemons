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

  pick: function(arr, gen){
    if (!gen){
      var index = RANDOM.int(arr.length);
    } else {
      var index = Math.floor(gen.get() * arr.length);
    }
    return arr[index];
  },

  grab: function(arr, gen){
    if (!gen){
      var index = RANDOM.int(arr.length);
    } else {
      var index = Math.floor(gen.get() * arr.length);
    }
    var r = arr[index];
    arr.splice(index,1);
    return r;
  },

  pick_in_weighted_array: function(arr, gen){
    var total = 0;
    for (var i in arr) {
      total += arr[i];
    }

    if (!gen){
      var index = RANDOM.float(total);
    } else {
      var index = (gen.get() * total);
    }

    for (var i in arr) {
      index -= arr[i];
      if (index <= 0) {
        return i;
      }
    }
    return i; // Should not happen, though
  },

  shuffle: function(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  },

  glitch: function(text, strength){
    var ntext = "";
    for (var i = 0; i < text.length; i++) {
        if (Math.random() < strength){
          ntext += RANDOM.pick("###$$%%&*-._");
        } else {
          ntext += text[i];
        }
    }
    return ntext;
  },
}
