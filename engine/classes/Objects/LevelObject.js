// runtime: LEVEL, CHARACTER


class LevelObject {
    constructor(sprite, x, y) {
        this.x = x;
        this.y = y;
        this.original_x = x;
        this.original_y = y;
        this.visual_element = sprite;

        if (CURRENTLEVEL.objects.should_hide(this.hash())){
          this.visual_element.destroy();
          return;
        }

        this.visual_element.place_at(x, y);
        this.walkable = false;
        CURRENTLEVEL.objects.index_object(this);
    }

    place_at(x,y){
        this.x = x;
        this.y = y;
        this.visual_element.place_at(x, y);
    }

    shift(dx, dy) {
      this.y += dy;
      this.x += dx;
      this.visual_element.shift(dx, dy);
    }

    hash() {
      return this.constructor.name + "/" + this.original_x + "/" + this.original_y;
    }

    debug_name() {
      return this.hash();
    }

    get_visual() {
      return this.visual_element;
    }

    make_walkable() {
      this.walkable = true;
    }

    adjust_hitbox(x,y,w,h) {
      this.h_x = x - CHARACTER.margin_right;
      this.h_y = y + CHARACTER.margin_top;
      this.h_w = w + CHARACTER.margin_left + CHARACTER.margin_right;
      this.h_h = h + CHARACTER.margin_top + CHARACTER.margin_bottom;
    }

    draw_hitbox() {
      var html_rectangle = HTML.div.make({
        w:this.h_w,
        h:this.h_h,
        top:(this.visual_element.y + this.h_y - this.h_h),
        left:(this.visual_element.x + this.h_x),
      });
      html_rectangle.style.position = "absolute";
      html_rectangle.style.border = "3px dotted DarkGrey";
      html_rectangle.style.margin = "-3px";
      html_rectangle.style.zIndex = "30000";
      if (this.constructor.name == "SBattle"){
        html_rectangle.style.backgroundColor = "#FF000055";
        } else if (this.constructor.name == "SE_small_groundItem" || this.constructor.name == "SE_groundItem" || this.constructor.name == "SB_rubble"){
          html_rectangle.style.backgroundColor = "#0000FF55";
        } else if (this.constructor.name == "SB_event"){
          html_rectangle.style.backgroundColor = "#00FF0055";
        }

      var label = HTML.div.make({w: 200, top: this.h_h/3, h:35});
      label.innerHTML = this.debug_name();
      label.style.fontWeight = "bold";
      label.style.fontSize = "small";
      label.style.overflow = "hidden";
      label.style.backgroundColor = "#FFFFFF33";
      html_rectangle.appendChild(label);

      this.visual_element.container.style.opacity = 0.5;

      CURRENTLEVEL.system.html().appendChild(html_rectangle);
    }

    get_depth() {
      return this.visual_element.get_depth();
    }

    is_at_hitbox(x,y) {
      if (x >= this.visual_element.x + this.h_x && x <= this.visual_element.x + this.h_x + this.h_w) {
        if (y >= this.visual_element.y + this.h_y - this.h_h && y <= this.visual_element.y + this.h_y) {
          return true;
        }
      }
      return false;
    }

    is_at_sprite(x,y) {
      return this.visual_element.is_at(x,y);
    }

    is_interactible(x, y) {
      return (this.interaction && this.is_at_sprite(x,y));
    }

    is_walkable(x,y) {
      if (this.is_at_hitbox(x,y)) {
        if (this.walkable) {
          return 1;
        } else if (! this.walkable) {
          return -1;
        }
      }
      return 0;
    }

    distance_to_character() {
      var c = CHARACTER.get().gravity_center();

      var x = c[0];
      if (c[0] < this.visual_element.x) {
        x = this.visual_element.x;
      } else if (c[0] > this.visual_element.x + this.visual_element.width) {
        x = this.visual_element.x + this.visual_element.width;
      }

      var y = c[1];
      if (c[1] < this.visual_element.y - this.visual_element.height) {
        y = this.visual_element.y - this.visual_element.height;
      } else if (c[1] > this.visual_element.y) {
        y = this.visual_element.y;
      }

      var d = Math.sqrt(Math.pow(c[0] - x, 2) + Math.pow(c[1] - y, 2));
      return d;
    }

    destroy() {
      if (this.visual_element){
        this.visual_element.destroy();
      }
      CURRENTLEVEL.objects.remove_object(this);
      delete this;
    }

    text_interaction(texts, gen){
      this.text = RANDOM.pick(texts, gen);
      var f = function() {
        new TextBanner(this.text);
      }
      return f;
    }
}

class SimpleObject extends LevelObject {
  constructor(x, y, name) {
    var visual = new StaticSprite("assets/objects/" + name + ".png", 'obj_light');
    super(visual, x, y);
  }

  interaction(){
    if (this.default_text) {
      this.default_text();
    }
  }
}
