

function World() {
  this.name = "World" + Math.random();
  
  this.colors = {
    'main': RANDOM.color(),
    'second': RANDOM.color(),
  }
}

const WORLD = {
    get() {
        var backup = new World();
        return UNIVERSE.get_with_default("world", backup);
    }   
};
