
const TERMINAL = {
  run: function(){
    var content = document.getElementById('terminal_entry').value;
    try {
      var result = eval(content);
    } catch(e){
      var result = e;
    }

    var previous = document.getElementById('terminal_content').innerHTML;
   document.getElementById('terminal_content').innerHTML = previous + "<br /> >" + content + "<br />" + result;
   document.getElementById('terminal_entry').value = '';
   document.getElementById('terminal_content').scrollTop = document.getElementById('terminal_content').scrollHeight;
 },

  recolor: function(){
    PALETTE.factory.make_new();
  },

}

class S_Terminal extends LevelObject {
  constructor(x, y) {
    var visual = new StaticSprite("assets/objects/savepoint.png", 'obj_dark');
    super(visual, x, y);
    this.adjust_hitbox(5,-5,40,10);
  }

  interaction() {
      new CenteredTextMenu(`
        <form action='javascript:TERMINAL.run();'>
        <div id='terminal_content' style="height:400px;background:grey;overflow:scroll;"> </div>
        <input type="text" id='terminal_entry' />
        <br />
        <input type="submit" />
        </form>
        `,
                    [
                      {"text": "Close", "effect": "##CLOSE"}
                   ]);


      for (var log in CONSOLE.logs){
       document.getElementById('terminal_content').innerHTML += CONSOLE.logs[log] + "<br />";
     }
     document.removeEventListener('keydown', IO.handlers.onKeyDown);
     document.removeEventListener('keyup', IO.handlers.onKeyUp);
  }
}

new S_Terminal(275, 250);

new S_Floor(50,750,500,700);

CURRENTLEVEL.initialize_with_character(350, 700);
