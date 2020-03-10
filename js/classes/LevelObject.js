// runtime: LEVEL


class Object {
    constructor(sprite, x, y) {
        this.visual_element = sprite;
        this.visual_element.place_at(x,y);
        this.walkable = false;

        LEVEL.index_object(this);
    }

    make_walkable() {
      this.walkable = true;
    }
}
