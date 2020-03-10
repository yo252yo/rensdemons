
class Import {
    constructor(src) {
      this.src = src;
      this.loaded = false;
      this.create_html();
    }

    create_html(){
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = src + ".js";
      s.id = "SC_" + src;

      var self = this;
      s.addEventListener('load', function(){ self.loaded = true; });

      var ref = document.getElementsByTagName( 'script' )[ 0 ];
      ref.parentNode.insertBefore(s, null);
      return s;
    }

}
