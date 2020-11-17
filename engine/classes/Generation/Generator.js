
class Generator {
  constructor(seed_source) {
    this.seed = this._hash_seed(seed_source);
    this.original_seed = this.seed;
  }

  _hash_seed(seed_source){
    seed_source = (seed_source * 2134073);

    seed_source = ((seed_source >> 16) ^ seed_source) * 295559667;
    seed_source = ((seed_source >> 16) ^ seed_source) * 295559667;
    seed_source = (seed_source >> 16) ^ seed_source;
    return seed_source;
  }

  _get_next() {
    var next = this.seed;

    next ^= (next << 21);
    next ^= (next >>> 35);
    next ^= (next << 4);
    this.seed = next;
    return next;
  }

  _reverse_string(s){
    var r = "";
    for (var i = s.length-1; i >=0; i--){
      if(s[i] != "-" && s[i] != "."){
        r += s[i];
      }
    }
    return r;
  }

  get() { // result is in [0,1]
    var value = this._get_next().toString();
    return parseFloat("0." + this._reverse_string(value));
  }

  int(threshold){
    return Math.floor(this.get() * threshold);
  }

  _check_seeds() {
    var buckets = [0,0,0,0,0,0,0,0,0,0];
    for(var seed = 1; seed <10000; seed++){
      this.seed = this._hash_seed(seed);
      for(var i = 0; i <200; i++){
        var r = Math.floor((this.get() * 10 )) % 10;
        buckets[r] ++;
      }
    }
    return buckets;
  }

  _check_seed() {
    var buckets = [0,0,0,0,0,0,0,0,0,0];
    this.seed = this._hash_seed(Math.floor(Math.random()*10000));
    for(var i = 0; i <100000; i++){
      var r = Math.floor((this.get() * 10 )) % 10;
      buckets[r] ++;
    }
    return buckets;
  }
}
