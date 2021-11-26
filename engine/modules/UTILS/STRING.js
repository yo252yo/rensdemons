
const STRING_UTILS = {
  camel_case: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  _equal_except_at: function(str1, str2, pos) {
    for (var i = 0; i < str1.length; i++) {
      if(i!=pos && str1[i] != str2[i]) {
        return false;
      }
    }
    return true;
  },

  hash_str_to_int(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  },

  romanize (num) {
      if(!num){
        return "O";
      }
      var r = "";
      while(num > 100){
         r += "C";
         num -= 100;
      }
      var tens = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"];
      var units = ["","I","II","III","IV","V","VI","VII","VIII","IX"];
      r += tens[Math.floor(num / 10)];
      r += units[Math.floor(num % 10)];
      return r;
  },

  datedString (s){
    return (new Date()).toLocaleTimeString() + ": " + s;
  },
};
