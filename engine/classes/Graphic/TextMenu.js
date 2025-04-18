// use(TextElement)
// runtime SCREEN, IO

var _CHOICES_COOLDOWN = 500;


// Since the JS events for mouseover and click are all over the place, we need
// to compensate using a simple mutex

var MenuChoiceExecutor = function() {
  this._busy  = false;
};

MenuChoiceExecutor.prototype.synchronize = function(task) {
  if (!this._busy){
     this._execute(task);
   }
};

MenuChoiceExecutor.prototype._execute = function(task) {
  this._busy = true;

  var self = this;
  (function(){
    task();
    setTimeout(function(){  self._busy = false; }, _CHOICES_COOLDOWN );
  })();
};

const _EXECUTOR = new MenuChoiceExecutor();


var TEXTMENU_EMPTYROW = {"text": " ", "effect": function(){}, "keep_open": true};

class TextMenu extends TextElement {

    static followup() {
      if(!IO.interface._can_open_escape_menu() || !PARTY.has_member(PARTYMEMBERS.BestFriend)){
        return;
      }
      if ( Math.random() >= 0.05){
        return;
      }
      TextBannerSequence.make(RANDOM.pick([
        [
          `$$BestFriend$: "$$Ren$? Are you okay?"`,
          `$$Ren$: "Yes, why?"`,
          `$$BestFriend$: "Well you were just standing there without moving or doing anything for a while..."`,
          `$$Ren$: "Yeah sorry I just spaced out..."`,
        ],
        [
          `$$BestFriend$: "What's wrong?"`,
          `$$Ren$: "What do you mean?"`,
          `$$BestFriend$: "You stopped moving for a while. I got worried, it seemed almost like you stopped breathing."`,
          `$$Ren$: "Don't worry, I was just checking out stuff."`,
          `$$BestFriend$: "Checking out... stuff?"`,
          `$$Ren$: "Yeah, I was more or less talking to the Goddess. Nevermind, let's just go!"`,
        ],
        [
          `$$BestFriend$: "$$Ren$? $$Ren$?!"`,
          `$$Ren$: "What?"`,
          `$$BestFriend$: "You were not responding before. It's like you spaced out pretty hard."`,
          `$$Ren$: "Yeah, sorry, I was... hum... thinking about things."`,
          `$$BestFriend$: "Oh."`,
          `$$Ren$: "Let's go!"`,
          `$$BestFriend$: "Are you sure you're fit to go? It's not the first time it happens! I usually don't say anything..."`,
          `$$Ren$: "Yes, it was nothing."`,
        ],
        [
          `$$BestFriend$: "Are you done?"`,
          `$$Ren$: "What?"`,
          `$$BestFriend$: "You got another one of those weird fits where you stop moving and like... talk to the Goddess in your head or whatever it is you do."`,
          `$$Ren$: "Oh, yeah, sorry. I didn't know you could see that..."`,
          `$$BestFriend$: "How could I not? It's pretty weird for you to stop all of a sudden..."`,
          `$$Ren$: "Anyway, I'm done now. Thanks for waiting."`,
        ],
      ]));
    }

    constructor(title, options, x, y, w, h, padding, dont_expand_title) {
        super(x,y, w, h, padding);

        this.parent = IO._menu;
        this.last_executed = (new Date());
        IO.control.menu(this);
        this.title = title;
        this.dont_expand_title = dont_expand_title;
        this.options = options;
        this.selected = 0;
        this.in_destruction = false;
        this.html.style.wordBreak = "normal"; // not needed in menus
        this.print_menu();
        this.scroll_if_overflow();
    }

    change(title, options){
      this.title = title;
      this.options = options;
    }

    print_menu() {
      if (this.title) {
        var html = this.title;
        if (this.title && !this.dont_expand_title) {
          html += "<br /><br />";
        }
        this.html.innerHTML = html;
      }

      this.html_menu = document.createElement('div');
      this.html.appendChild(this.html_menu);
      this.update_menu();
    }

    update_menu() {
      this.html_menu.innerHTML = "";
      var selected_element = null;
      for (var i in this.options){
          var current_item = document.createElement('div');
          // Closure because weird loop behavior.
          // please explicit the function and the call like var f = function
          (function(item, index){
            var pick = function() {IO.menu.pick(index); };
            // We have to be clever because we dont know which fucking event
            // will fucking fire.
            var select = function(event) {
              if (event.button > 0){
                IO.menu.pick(index);
              } else{
                IO.menu.select(index);
              }
           };

          item.addEventListener('mousedown', pick);
          item.addEventListener('click', pick);
          //item.addEventListener('touchstart', pick);

          item.addEventListener('mousemove', select);
          }(current_item, i));

          var prefix = "";
          var suffix = "";
          if (!this.options[i]["text"] || this.options[i]["text"][0] == " "){
             if (i == this.selected){
              prefix += ".";
             } else{
              prefix += "&nbsp;";
            }
          } else if (i == this.selected){
              prefix += "<span class='highlighted'>>";
              suffix += "</span>";
              selected_element = current_item;
          } else {
              prefix += "_";
          }

          current_item.innerHTML = prefix + this.options[i]["text"] + suffix;
          this.html_menu.appendChild(current_item);
      }
      return selected_element;
    }

    close(with_follow, follow_function) {
      this.in_destruction = true;
      this.destroy();
      setTimeout(function() {
        IO.control.cede();
        if (with_follow){
          var f = follow_function || TextMenu.followup;
          setTimeout(function() { f(); }, 250);
        }
      }, 500);

    }

    back() {
      this.in_destruction = true;

      var p = this.parent;
      if (p) {
        IO.control.cede();
        // Maybe we need to explicitely save title and option because of destroy()
        // This should create an object of the same type as "this".
        new p.constructor(p.title, p.options, p.x, p.y, p.width, p.height, p.padding, p.dont_expand_title);
        this.destroy();
      } else {
        this.close();
      }
    }

    pick(choice) {
      if (! this.options[choice]){
        CONSOLE.error("Invalid menu choice: " + choice);
        return;
      }
      this.execute(choice);
    }

    select(choice) {
      var prevSelected = this.selected;
      this.selected = parseInt(choice);
      if (prevSelected != this.selected){
        this.update_menu();
      }
    }

    // Since several JS events can be fired, we need to be careful about executing
    // only once, hence the synchronous lock.
    execute(choice) {
      if (this.in_destruction){return;}

      var f = null;
      var menu = this;
      AUDIO.effect.choice();

      if(menu.options[choice]["effect"] && menu.options[choice]["effect"].startsWith && menu.options[choice]["effect"].startsWith("##CLOSE")){
        f = function() { menu.close(menu.options[choice]["effect"].endsWith("FOLLOW")); };
      } else if(menu.options[choice]["effect"] == "##BACK"){
        f = function() { menu.back(); };
      } else {
        f = function() {
          var child = menu.options[choice]["effect"];
          if(!menu.options[choice]["keep_open"]){
            IO.control.cede();
            menu.destroy();
          }
          child();
        };
      }

      _EXECUTOR.synchronize(f);
    }

    destroy() {
      this.parent = undefined;
      super.destroy();
    }

    move_select(offset) {
      this.selected += offset;

      if (this.selected > this.options.length - 1){
        this.selected -= this.options.length;
      }
      if (this.selected < 0){
        this.selected += this.options.length;
      }
      var selected_element = this.update_menu();

      if (selected_element && selected_element.offsetTop){
        this.html.scrollTo(0, selected_element.offsetTop - 200);
      }
    }

    confirm_select() {
      this.execute(this.selected);
    }

    try_escape() {
      if (this.in_destruction){return;}

      if (new Date() - this.last_executed < 600){
        return;
      }
      for(var i in this.options) {
        if (this.options[i]["effect"] && this.options[i]["effect"].startsWith && this.options[i]["effect"].startsWith("##CLOSE")){
          this.close(this.options[i]["effect"].endsWith("FOLLOW"));
          return;
        }
      }
      for(var i in this.options) {
        if (this.options[i]["effect"] == "##BACK"){
          this.back();
          return;
        }
      }
    }
}
