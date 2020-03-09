class Color {
    static random() {
      var r256 = function() {
        return Math.floor(Math.random() * 256);
      };

      return new Color(r256(), r256(), r256());
    }

    static fromHsv(h, s, v){
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
          case 0: r = v, g = t, b = p; break;
          case 1: r = q, g = v, b = p; break;
          case 2: r = p, g = v, b = t; break;
          case 3: r = p, g = q, b = v; break;
          case 4: r = t, g = p, b = v; break;
          case 5: r = v, g = p, b = q; break;
        }

        return new Color(Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255));
    }

    constructor(r, g, b) {
      var validate = function(n){
        if (n<0) {  return 0; }
        else if (n > 255) { return 255; }
        else { return n; }
      }

      this.r = validate(r);
      this.g = validate(g);
      this.b = validate(b);
    }

    toHsv(r, g, b) {
      r /= 255, g /= 255, b /= 255;

      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, v = max;

      var d = max - min;
      s = max == 0 ? 0 : d / max;

      if (max == min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      return [ h, s, v ];
    }

    code() {
      var tohex = function(num) {
        var s = num.toString(16).toUpperCase();
        if (s.length < 2){
          s = "0" + s;
        }
        return s;
      }

      return "#" + tohex(this.r) + tohex(this.g) + tohex(this.b);
    }

    opposite() {
      return new Color(256 - this.r, 256 - this.g, 256 - this.b);
    }

    offset(i) {
      return new Color( this.r + i, this.g + i, this.b + i);
    }

    hoffset(i) {
      var h = this.toHsv();

      var s = h[1];// - ((h[1] > 0.5) * 2 - 1) * i;
      var v = h[2] - ((h[2] > 0.5) * 2 - 1) * i;

//      var si = h[1] + h[2] > 1;
  //    var s = h[1] - (si * 2 - 1) * i;
    //  var v = h[2] - (si * 2 - 1) * i;

      return Color.fromHsv(h[0], s, v);
    }
}
