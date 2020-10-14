
const RANDOM = {
  voyelles: "aeiouy",
  consonnes: "bcdfghjklmnpqrstvwxz",

  pick_in_array: function(word) {
    var array = word.split("");
    return array[Math.floor(Math.random() * array.length)];
  },
  voyelle: function() {
    return this.pick_in_array(this.voyelles);
  },
  consonne: function() {
    return this.pick_in_array(this.consonnes);
  },
  syllabe: function(){
    var w = "";
    w += this.pick_in_array("qwrtghkxzv");
    if (Math.random() < 0.3){
      w += this.pick_in_array("rh");
    }
    w += this.voyelle();

    return w;
  },

  name: function() {
    var sequence = 0;
    var w = "";
    for (var i = 0 ; i < 3; i++){
      w += this.syllabe();
    }

    return w;
  },

  camelize: function camelize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  },

  test: function(){
  },

};


RANDOM.test();
