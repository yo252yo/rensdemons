// use(TextElement)
// runtime SCREEN, IO



class TextMenu extends TextElement {
    constructor(title, options) {
        var top = Math.floor(SCREEN.height() * 0.2);
        var left = Math.floor(SCREEN.width() * 0.2);
        var height = 0;//Math.floor(SCREEN.height() * 0.31);
        var width = Math.floor(SCREEN.width() * 0.6);

        var padding = 30;

        super(left,top+height, width, height, padding);

        IO.control_menu(this);

        this.title = title;
        this.options = options;
        this.selected = 0;
        this.print_menu();
    }

    print_menu() {
      var html = this.title;
      html += "<br />";

      var index = 0;
      for (var i in this.options){
          html += "<br />";
          if (index == this.selected){
              html += ">";
          } else {
              html += "_";
          }

          html += " ";
          html += '<span onclick="IO.menu_pick(\'' + i + '\');"';
          // For some reason putting a listener on mouseenter or mouseover on this fucks up everything.
          html += ' onmousemove="IO.menu_select(\'' + i + '\');"';
          html += '>' + this.options[i]["text"];
          html += "</span>";
          index ++;
      }
      this.html.innerHTML = html;
    }

    close() {
      this.destroy();
      setTimeout(function() { IO.cede_control(); }, 500);
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
      this.print_menu();
    }

    execute(choice) {
      if(this.options[choice]["effect"] == "##CLOSE"){
        this.close();
      } else {
        this.options[choice]["effect"]();
      }
    }

    move_select(offset) {
      this.selected += offset;

      if (this.selected > this.options.length - 1){
        this.selected -= this.options.length;
      }
      if (this.selected < 0){
        this.selected += this.options.length;
      }
      this.print_menu();
    }

    confirm_select() {
      this.execute(this.selected);
    }
}
