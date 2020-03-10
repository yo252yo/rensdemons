// use(PALETTE)
// use(StaticSprite)

class S_Tree extends StaticSprite {
  constructor(x, y) {
    super("testing/tree.png", PALETTE.color_obj_light.code());
    this.place_at(x,y);
  }
}

class S_House extends StaticSprite {
  constructor(x, y) {
    super("testing/house.png", PALETTE.color_obj_dark.code());
    this.place_at(x,y);
  }
}
