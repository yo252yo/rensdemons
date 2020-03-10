// use(PALETTE)
// use(Rectangle)

class S_Floor extends Rectangle {
  constructor(x, y, w, h) {
    super(x,y,w,h, PALETTE.color_background.code());
  }
}
