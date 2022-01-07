// use(TextBox)
// runtime SCREEN, IO


class MenuScreen extends InteractingTextBox {
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

  constructor(text) {
      var d = MenuScreen.getDimensions();

      super(d.left,d.top+d.height, d.width, d.height, d.padding);

      if (text) {
        this.change_text(text, true, true);
      }
      this.scroll_if_overflow();
  }
}
