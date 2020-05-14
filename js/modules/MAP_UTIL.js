
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

  add(key_list, value) {
    var m = this._map;
    for(var i =0; i <key_list.length; i++){
      var key = key_list[i];

      if (i == key_list.length - 1){
        if (!(key in m)){
          m[key] = [value];
        } else {
          m[key].push(value);
        }
      } else {
        if(!(key in m)){
          m[key] = {};
        }

        m = m[key];
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
}
