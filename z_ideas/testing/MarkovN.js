
class Markov {
  constructor(depth, array) {
    // Length of the learned sequences
    this.depth = depth;

    // Copy constructor
    if (array) {
      this.array = JSON.parse(array);
    } else {
      this.array = {};
    }
  }

  _increment(letters){
    if(!this.array[letters]) {
      this.array[letters] = 0;
    }
    this.array[letters] += 1;
  }

  ingest(word) {
    word = this._decorate(word);

    for (var start=0; start<word.length - this.depth; start++){
      this._increment(word.substr(start, this.depth));
    }
  }

  _find_next(letters){
    if (letters.length != this.depth - 1){
      CONSOLE.error("wrong letter number asked");
    }
    var candidates = {};
    var total = 0;

    for(var sequence in this.array){
      if (sequence.startsWith(letters)){
        candidates[sequence[sequence.length - 1]] = this.array[sequence];
        total += this.array[sequence];
      }
    }
    if(total == 0){
      return "$";
    }

    var index = Math.random() * total;
    for (var i in candidates){
      index -= candidates[i];
      if (index <= 0){
        return i;
      }
    }
  }

  _get_prefix(){
    return "^".repeat(this.depth-1);
  }

  _decorate(word){
    word = this._get_prefix() + word + "$";
    return word;
  }

  _undecorate(word){
    var s = word.split("^");
    return s[s.length-1].split("$")[0];
  }

  generate_word(){
    var word = this._get_prefix();
    var letter = "^";
    while (letter != "$"){
      var s = letter;
      var sequence = word.substr(word.length - this.depth +1, this.depth - 1);
      letter = this._find_next(sequence);
      if (letter != "$"){
        word += letter;
      }
    }
    return this._undecorate(word);
  }

  generate_words(n){
    var r = [];
    for (var i = 0; i<n; i++){
      r.push(this.generate_word());
    }
    return r;
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
        this.ingest(this.toCamelCase(lsplit));
      }
    }

    toCamelCase(str){
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    ingest_all (text){
      var split = text.split("\n");
      for (var i in split){
        var line = split[i].split(" ");
        for (var j in line){
          if (line[j].length < 3){
            continue;
          }
          this.ingest(line[j]);
        }
      }
    }

    export() {
      return JSON.stringify(this.array);
    }

    multiply (m){
      for(var i in this.array){
        this.array[i] *= m;
      }
    }

    add (markov){
      for(var i in markov.array){
        if(!this.array[i]){
          this.array[i] = {};
        }
        this.array[i] += markov.array[i];
      }
    }


    _equal_but_at(s1, s2, pos){
      for (var i = 0; i < s1.length; i++){
        if(i!=pos && s1[i] != s2[i]){
          return false;
        }
      }
      return true;
    }

    _find_mutation(mutating, pos){
      var candidates = {};
      var total = 0;
      for(var sequence in this.array){
        if (this._equal_but_at(mutating, sequence, pos)){
          candidates[sequence[pos]] = this.array[sequence];
          total += this.array[sequence];
        }
      }
      if(total == 0){
        return mutating[pos];
      }

      var index = Math.random() * total;
      for (var i in candidates){
        index -= candidates[i];
        if (index <= 0){
          return i;
        }
      }
      return mutating[pos];
    }

    _tweak_mutate_at(word, pos){
      var pattern_end = Math.min(pos + 1, word.length - 1);
      var pattern_start = pattern_end - this.depth + 1;
      var pattern_pos = pos - pattern_start;

      var mutating_part = word.substr(pattern_start, this.depth);
      var mutated_part = mutating_part.substr(0, pattern_pos) + this._find_mutation(mutating_part, pattern_pos) +  mutating_part.substr(pattern_pos+1);

      var mutated = word.substr(0, pattern_start);
      mutated += mutated_part;
      mutated += word.substr(pattern_end + 1);
      return mutated;
    }

    _mutate_at(word, pos){
      var m = Math.random();
      if (m < 0.03){ // delete mutation
        return word.substr(0, pos) + word.substr(pos+1);
      } else if (m < 0.1) { // additive mutation
        var new_word = word.substr(0, pos) + "'" + word.substr(pos);
        return this._tweak_mutate_at(new_word, pos);
      } else {
        return this._tweak_mutate_at(word, pos);
      }
    }

    mutate(word, mutations){
      var mutated_word = word;
      while(mutated_word == word){
        var prefix = this._get_prefix();
        var decorated = this._decorate(mutated_word);

        var mutations = 1 + Math.floor(Math.random() * mutations);
        for (var i =0; i< mutations; i++){
          var mutate_pos = prefix.length + Math.floor(Math.random() * word.length);
          mutated_word = this._mutate_at(decorated, mutate_pos);
        }
        mutated_word = this._undecorate(mutated_word);
      }
      return mutated_word;
    }
}


var r = [];
for (var i = 0; i<100; i++){
  r.push(m.mutate("Aerith", 10));
}
r;
