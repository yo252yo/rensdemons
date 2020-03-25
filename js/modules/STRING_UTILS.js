
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
};
