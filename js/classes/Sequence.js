// Helper to make a sequence of functions who accept a callback.
class Sequence {
  static invoke_with_callback(f, args, c) {
    args.push(c);
    f.apply(null, args);
  }

  constructor() {
    this.calls_array = [];
  }

  get_callback(i) {
    var self = this;
    if(i >= self.calls_array.length -1) {
      return function(){};
    }
    return function(){ self.call(i+1) };
  }

  call(i) {
    if(!i){
      i = 0;
    }
    var self = this;
    var ca = self.calls_array[i];;
    var callback = self.get_callback(i);
    Sequence.invoke_with_callback(ca.f, ca.args, callback);
  }

  add(f, args) {
    this.calls_array.push({f:f, args:args});
  }

  add_TextBannerSequence(args){
    this.add(TextBannerSequence.make, [args]);
  }

  add_MoveObjectWalk(obj, x, y){
    this.add(MovingObject.try_make_walk_to, [obj, x, y]);
  }

  add_function(f){
    this.add(f, []);
  }
}
