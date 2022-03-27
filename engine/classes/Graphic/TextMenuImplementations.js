
class CenteredTextMenu extends TextMenu {
    static getDimensions() {
      if(SCREEN.is_mobile()){
        return {
            top: Math.floor(SCREEN.height() * 0.1),
            left: Math.floor(SCREEN.width() * 0.1),
            height: 0,
            width: Math.floor(SCREEN.width() * 0.8),
            padding: 10,
            };
      } else {
        return {
            top: Math.floor(SCREEN.height() * 0.2),
            left: Math.floor(SCREEN.width() * 0.2),
            height: 0,
            width: Math.floor(SCREEN.width() * 0.6),
            padding: 30,
            };
      }
    }

    constructor(title, options) {
        var d = CenteredTextMenu.getDimensions();
        super(title, options, d.left,d.top+d.height, d.width, d.height, d.padding);
    }
}

class PromptTextMenu extends CenteredTextMenu {
    constructor(text, value, callback) {
        super(text + `:<br /><form action='javascript:IO_MENU.pick(0);'><input type="input" value="${value}" id="prompttextmenu" /></form>`, [{"text": "OK", "effect": "##CLOSE"}]);
        this.callback = callback;
        this.container.style.zIndex = "200002";
        IO.key_interceptor.deactivate();

        var select = function(){
          document.getElementById("prompttextmenu").focus();
          document.getElementById("prompttextmenu").select();
        }
        setTimeout(select, 400);
    }

    close() {
      var self = this;
      var returnvalue = document.getElementById("prompttextmenu").value;
      var f = function(){
        IO.key_interceptor.activate();
        self.callback(returnvalue);
      };
      super.close(true, f);
    }
}



class FullTextMenu extends TextMenu {
    static getDimensions() {
      if(SCREEN.is_mobile()){
        return {
            top: Math.floor(SCREEN.height() * 0.02),
            left: Math.floor(SCREEN.width() * 0.02),
            height: Math.floor(SCREEN.height() * 0.96),
            width: Math.floor(SCREEN.width() * 0.96),
            padding: 10,
            };
      } else {
        return {
            top: Math.floor(SCREEN.height() * 0.1),
            left: Math.floor(SCREEN.width() * 0.1),
            height: Math.floor(SCREEN.height() * 0.8),
            width: Math.floor(SCREEN.width() * 0.8),
            padding: 30,
            };
      }
    }

    constructor(title, options) {
        var d = FullTextMenu.getDimensions();
        super(title, options, d.left,d.top+d.height, d.width, d.height, d.padding);
    }
}

class BattleMenu extends TextMenu {
    static getDimensions() {
      if(SCREEN.is_mobile()){
        return {
            top: Math.floor(SCREEN.height() * 0.4),
            left: Math.floor(SCREEN.width() * 0.2),
            height: 0,
            width: Math.floor(SCREEN.width() * 0.75),
            padding: 10,
            };
      } else {
        return {
            top: Math.floor(SCREEN.height() * 0.6),
            left: Math.floor(SCREEN.width() * 0.6),
            height: 0,
            width: Math.floor(SCREEN.width() * 0.3),
            padding: 30,
            };
      }
    }

    constructor(title, options) {
        var d = BattleMenu.getDimensions();
        super(title, options, d.left,d.top+d.height, d.width, d.height, d.padding);

        this.html.style.background = PALETTE.battle_menu_background().code();
        this.html.style.border = "2px solid " + PALETTE.text_border().code();
        this.html.style.color = PALETTE.battle_menu_color().code();
        this.html.id = "battle_menu";
    }
}
