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


class TextMenu extends TextElement {
    constructor(title, options) {
        var top = Math.floor(SCREEN.height() * 0.2);
        var left = Math.floor(SCREEN.width() * 0.2);
        var height = 0;//Math.floor(SCREEN.height() * 0.31);
        var width = Math.floor(SCREEN.width() * 0.6);

        var padding = 30;

        super(left,top+height, width, height, padding);

        IO.control.menu(this);

        this.title = title;
        this.options = options;
        this.selected = 0;
        this.print_menu();
        this.last_executed = (new Date());
    }

    print_menu() {
      if (this.title) {
        var html = this.title + "<br /><br />";
        this.html.innerHTML = html;
      }

      this.html_menu = document.createElement('div');
      this.html.appendChild(this.html_menu);
      this.update_menu();
    }

    update_menu() {
      this.html_menu.innerHTML = "";

      for (var i in this.options){
          var current_item = document.createElement('div');
          // Closure because weird loop behavior.
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
          item.addEventListener('mousemove', select);
          }(current_item, i));

          var html = "";
          if (i == this.selected){
              html += ">";
          } else {
              html += "_";
          }

          current_item.innerHTML = html  + this.options[i]["text"];
          this.html_menu.appendChild(current_item);
      }
    }

    close() {
      this.destroy();
      setTimeout(function() { IO.control.cede(); }, 500);
    }

    pick(choice) {
      if (! this.options[choice]){
        console.error("Invalid menu choice: " + choice);
        return;
      }
      this.execute(choice);
    }

    select(choice) {
      this.selected = parseInt(choice);
      this.update_menu();
    }

    // Since several JS events can be fired, we need to be careful about executing
    // only once, hence the synchronous lock.
    execute(choice) {
      var f = null;
      var menu = this;

      if(menu.options[choice]["effect"] == "##CLOSE"){
        f = function() { menu.close(); };
      } else {
        f = function() {
          var child = menu.options[choice]["effect"]();
          if(child){
            menu.destroy();
            IO.control.cede();
          }
        };
      }

      _EXECUTOR.synchronize(f);
    }

    move_select(offset) {
      this.selected += offset;

      if (this.selected > this.options.length - 1){
        this.selected -= this.options.length;
      }
      if (this.selected < 0){
        this.selected += this.options.length;
      }
      this.update_menu();
    }

    confirm_select() {
      this.execute(this.selected);
    }
}
