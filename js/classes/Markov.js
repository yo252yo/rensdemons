
class Markov {
  constructor(array) {
    if (array) {
      this.array = JSON.parse(array);
    } else {
    this.array = {};
    }
  }

  increment(letter, follow){
    if(!this.array[letter]) {
      this.array[letter] = {};
    }
    if(!this.array[letter][follow]) {
      this.array[letter][follow] = 0;
    }
    this.array[letter][follow] += 1;
  }

  find_next(letter){
    var array = this.array[letter];
    var total = 0;
    for (var i in array){
      total += array[i];
    }
    var index = Math.random() * total;
    for (var i in array){
      index -= array[i];
      if (index <= 0){
        return i;
      }
    }
  }

  generate_word(){
    var word = "";
    var letter = "^";
    while (letter != "$"){
      letter = this.find_next(letter);
      if (letter != "$"){
        word += letter;
      }
    }
    return word;
  }

  generate_words(n){
    var r = [];
    for (var i = 0; i<n; i++){
      r.push(this.generate_word());
    }
    return r;
  }

  ingest(word) {
    word = "^" + word + "$";
    for (var i =0; i<word.length -1; i++){
      this.increment(word[i], word[i+1]);
    }
  }

  ingest_array(array) {
    for (var i =0; i<array.length; i++){
      this.ingest(array[i]);
    }
  }

  ingest_paste(text) {
    var split = text.split("\n");
    for (var i in split){
      var line = split[i];
      if (line.length < 3){
        continue;
      }
      var lsplit = line.split(" ")[0].split("/")[0];
      this.ingest(lsplit);
    }
  }

  export() {
    return JSON.stringify(this.array);
  }
}

var m = new Markov();
m.ingest("charlie");
m.ingest("motaz");
m.ingest("yoann");
m.generate_words(100);

// https://en.wikipedia.org/wiki/List_of_theological_demons
var n = new Markov(`{"^":{"A":48,"B":27,"C":8,"D":14,"E":6,"F":5,"G":13,"H":4,"I":3,"J":2,"K":11,"L":12,"M":13,"N":5,"O":7,"Ö":1,"P":12,"R":6,"S":23,"T":5,"U":1,"V":7,"W":2,"X":1,"Y":1,"Z":4},"A":{"a":1,"b":4,"c":1,"d":1,"e":1,"g":4,"h":1,"i":1,"k":2,"l":6,"m":3,"n":10,"p":1,"r":3,"s":6,"z":2,"$":1},"a":{"m":11,"d":4,"x":3,"s":23,"$":32,"l":23,"r":25,"t":6,"n":18,"y":2,"k":10,"g":5,"i":4,"z":4,"a":4,"b":9,"p":4,"v":3,"c":4,"e":2,"j":2,"-":1,"u":2,"h":2},"m":{"o":8,"m":3,"e":4,"a":10,"$":6,"d":1,"y":2,"i":4,"p":2,"b":1,"u":2,"t":1},"o":{"n":24,"u":3,"r":14,"c":6,"m":3,"s":8,"d":1,"t":3,"g":1,"a":1,"l":4,"k":2,"$":4,"p":1,"b":2,"v":1,"y":1},"n":{"$":30,"a":5,"q":1,"c":2,"d":6,"t":6,"z":2,"g":6,"s":2,"e":5,"j":1,"n":4,"i":7,"k":1,"u":1,"o":4},"b":{"a":7,"e":3,"o":2,"r":1,"y":1,"'":1,"i":4,"u":3,"$":2,"l":1,"h":1,"n":1},"d":{"d":2,"o":1,"r":4,"u":1,"h":3,"a":3,"e":1,"y":1,"$":2,"ö":1,"i":2},"e":{"z":1,"t":7,"l":16,"c":5,"s":8,"p":5,"a":1,"r":9,"e":3,"$":13,"b":1,"g":2,"m":9,"j":1,"v":4,"k":1,"u":1,"n":7,"o":2,"y":1,"x":1,"i":1,"d":1,"f":1,"q":1},"z":{"e":3,"o":4,"u":3,"a":2,"i":1},"t":{"h":13,"$":10,"o":4,"i":8,"a":11,"s":1,"e":2,"r":1},"h":{"i":7,"l":1,"$":15,"m":1,"r":2,"a":15,"u":5,"o":6,"e":9,"ū":1,"y":1},"i":{"b":1,"a":9,"e":3,"m":7,"t":11,"f":4,"u":4,"$":18,"c":3,"s":6,"n":11,"o":3,"l":7,"v":2,"g":5,"k":2,"d":1,"h":2,"r":1,"y":1},"u":{"$":10,"m":3,"s":14,"n":3,"r":12,"b":4,"t":3,"e":2,"k":2,"l":4,"a":3,"d":1,"c":4,"g":2,"z":1,"f":1},"r":{"a":14,"e":8,"i":13,"$":16,"o":10,"m":2,"c":4,"u":4,"b":2,"t":2,"s":1,"g":4,"l":1,"n":2,"f":1,"'":1,"y":1,"d":2},"x":{"a":1,"$":3},"s":{"$":41,"h":6,"t":6,"i":4,"u":3,"a":7,"b":1,"m":1,"o":1,"y":1,"k":1,"e":1,"s":1},"y":{"z":1,"s":1,"m":1,"$":2,"a":6,"o":2,"l":1,"y":1},"c":{"h":14,"e":2,"i":3,"$":3,"a":3,"u":3,"o":1,"k":1,"y":1,"c":1},"l":{"y":1,"e":7,"i":13,"$":19,"a":12,"l":7,"o":4,"u":2,"p":5,"b":1,"z":1,"k":1,"v":1,"c":1},"g":{"a":5,"r":1,"i":4,"$":5,"o":9,"e":4,"d":1,"g":1,"u":1},"p":{"t":1,"h":8,"e":1,"$":2,"o":2,"u":2,"s":1,"a":2},"k":{"a":8,"u":5,"k":1,"$":4,"i":3,"e":2,"s":1,"o":1},"q":{"a":1,"o":1},"f":{"$":1,"r":2,"u":2,"e":1,"l":1,"a":1},"'":{"e":2},"B":{"a":14,"e":5,"h":1,"i":1,"o":2,"u":4},"ū":{"t":1},"v":{"a":3,"$":1,"i":5,"-":1,"e":2},"C":{"a":1,"h":4,"i":1,"o":1,"r":1},"j":{"e":2,"j":1,"a":3,"u":1},"D":{"a":5,"e":5,"i":1,"j":1,"r":1,"z":1},"-":{"e":1,"L":1},"E":{"b":1,"l":2,"i":1,"r":1,"v":1},"F":{"o":3,"u":2},"G":{"a":4,"h":2,"l":1,"o":1,"r":2,"u":3},"L":{"a":1,"e":7,"i":2,"j":1,"u":2},"H":{"a":3,"i":1},"I":{"f":1,"n":1,"p":1},"J":{"i":2},"K":{"a":4,"o":2,"r":2,"i":1,"u":2},"M":{"a":9,"e":2,"o":1,"u":1},"N":{"a":4,"i":1},"O":{"n":2,"r":3,"s":1,"$":1},"Ö":{"r":1},"ö":{"g":1},"P":{"a":2,"e":3,"h":1,"i":1,"o":2,"r":2,"u":1},"R":{"a":4,"o":1,"u":1},"S":{"a":5,"c":1,"e":3,"h":5,"i":2,"t":3,"u":4},"T":{"a":1,"e":1,"i":1,"o":1,"u":1},"U":{"k":1},"V":{"a":5,"e":1,"i":1},"W":{"e":2},"X":{"a":1},"Y":{"e":1},"Z":{"a":2,"e":1,"i":1}}`);
