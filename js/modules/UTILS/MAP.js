
class FluidMap {
  constructor(m) {
    if(m){
      this._map = m;
    } else {
      this._map = {};
    }
  }

  export(){
    return this._map;
  }

  set(key_list, value) {
    var m = this._map;
    for(var i =0; i <key_list.length; i++){
      var key = key_list[i];
      if(!(key in m)){
        m[key] = {};
      }
      if (i == key_list.length - 1){
        m[key] = value;
      } else {
        m = m[key];
      }
    }
  }

  add(key_list, value, unique) {
    var m = this._map;
    for(var i =0; i <key_list.length; i++){
      var key = key_list[i];

      if (i == key_list.length - 1){
        if (!(key in m)){
          m[key] = [value];
        } else {
          if(!unique || !(value in m[key])){
            m[key].push(value);
          }
        }
      } else {
        if(!(key in m)){
          m[key] = {};
        }

        m = m[key];
      }
    }
  }

  delete(key_list) {
    var m = this._map;
    for(var i =0; i < key_list.length; i++) {
      var key = key_list[i];

      if (i == key_list.length - 1) {
        delete m[key];
      } else {
        if(key in m) {
          m = m[key];
        } else {
          return;
        }
      }
    }
  }

  get(key_list) {
    var m = this._map;
    for(var i =0; i < key_list.length; i++){
      var key = key_list[i];
      if(!(key in m)){
        return null;
      }
      m = m[key];
    }
    return m;
  }

  increment(key_list, increment) {
    if(!increment){
      increment = 1;
    }
    // could be optimized
    this.set(key_list, this.get(key_list) + increment);
  }

  length(key_list) {
    try {
      return Object.keys(this.get(key_list)).length;
    } catch (e) {
      return 0;
    }
  }
}
