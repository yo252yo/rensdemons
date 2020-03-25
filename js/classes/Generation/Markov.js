// STRING_UTILS


class Markov {
  constructor(depth, array) {
    // Length of the learned sequences
    this.depth = depth;

    // Copy constructor
    if (array) {
      this.kernel = JSON.parse(array);
    } else {
      this.kernel = {};
    }
  }

  // String operations
  _str_prefix() {
    return "^".repeat(this.depth-1);
  }

  _str_decorate(word) {
    return this._str_prefix() + word + "$";
  }

  _str_undecorate(word) {
    var s = word.split("^");
    return s[s.length-1].split("$")[0];
  }

  // Helper util
  _util_pick_letter_in_array(candidates) {
    var total = 0;
    for (var i in candidates) {
      total += candidates[i];
    }

    var index = Math.random() * total;
    for (var i in candidates) {
      index -= candidates[i];
      if (index <= 0) {
        return i;
      }
    }
    return "$"; // Should not happen, though
  }

  // Array operations
  _kernel_increment(sequence) {
    if(!this.kernel[sequence]) {
      this.kernel[sequence] = 0;
    }
    this.kernel[sequence] += 1;
  }

  _kernel_find_next(letters) {
    if (letters.length != this.depth - 1) {
      console.error("wrong letter number asked");
    }
    var candidates = {};
    for(var sequence in this.kernel) {
      if (sequence.startsWith(letters)) {
        candidates[sequence[sequence.length - 1]] = this.kernel[sequence];
      }
    }
    return this._util_pick_letter_in_array(candidates);
  }

  _kernel_find_mutation(mutating_sequence, pos) {
    var candidates = {};
    for(var sequence in this.kernel) {
      if (STRING_UTILS._equal_except_at(mutating_sequence, sequence, pos)) {
        candidates[sequence[pos]] = this.kernel[sequence];
      }
    }
    var winner = this._util_pick_letter_in_array(candidates);
    if (winner == "$") {
      winner = mutating_sequence[pos];
    }
    return winner;
  }

  // I/O
  export() {
    return JSON.stringify(this.kernel);
  }

  multiply(m) {
    for(var i in this.kernel) {
      this.kernel[i] *= m;
    }
  }

  add(markov) {
    for(var i in markov.array) {
      if(!this.kernel[i]) {
        this.kernel[i] = {};
      }
      this.kernel[i] += markov.array[i];
    }
  }

  // Ingestion
  ingest_word(word) {
    // For now we focus on nouns and use the camelization.
    word = this._str_decorate(STRING_UTILS.camel_case(word));

    for (var start=0; start<word.length - this.depth; start++) {
      this._kernel_increment(word.substr(start, this.depth));
    }
  }

  ingest_array(array) {
    for (var i =0; i<array.length; i++) {
      this.ingest_word(array[i]);
    }
  }

  ingest_first_words(text) {
    var split = text.split("\n");
    for (var i in split) {
      var line = split[i];
      if (line.length < 3) { continue; }
      var lsplit = line.split(" ")[0].split("/")[0];
      this.ingest_word(lsplit);
    }
  }

  ingest_all (text) {
    var split = text.split("\n");
    for (var i in split) {
      this.ingest_array(split[i].split(" "));
    }
  }

  // Generation. Note: this can generate way too big words.
  generate_word() {
    var word = this._str_prefix();
    var letter = "^";
    while (letter != "$") {
      var s = letter;
      var sequence = word.substr(word.length - this.depth +1, this.depth - 1);
      letter = this._kernel_find_next(sequence);
      if (letter != "$") {
        word += letter;
      }
    }
    return this._str_undecorate(word);
  }

  generate_words(n) {
    var r = [];
    for (var i = 0; i<n; i++) {
      r.push(this.generate_word());
    }
    return r;
  }

  // Mutations
  _tweak_mutate_at(word, pos) {
    var pattern_end = Math.min(pos + 1, word.length - 1);
    var pattern_start = pattern_end - this.depth + 1;
    var pattern_pos = pos - pattern_start;

    var mutating_part = word.substr(pattern_start, this.depth);
    var mutated_part = mutating_part.substr(0, pattern_pos) + this._kernel_find_mutation(mutating_part, pattern_pos) +  mutating_part.substr(pattern_pos+1);

    var mutated = word.substr(0, pattern_start);
    mutated += mutated_part;
    mutated += word.substr(pattern_end + 1);
    return mutated;
  }

  _mutate_at(word, pos) {
    var m = Math.random();

    if (m < 0.03) { // delete mutation
      return word.substr(0, pos) + word.substr(pos+1);
    } else if (m < 0.1) { // additive mutation
      var new_word = word.substr(0, pos) + "'" + word.substr(pos);
      return this._tweak_mutate_at(new_word, pos);
    } else {
      return this._tweak_mutate_at(word, pos);
    }
  }

  mutate(word, mutations) {
    if (!mutations){
      mutations = 1;
    }
    var mutated_word = word;
    while(mutated_word == word) {
      var prefix = this._str_prefix();
      var decorated = this._str_decorate(mutated_word);

      var nb_mut = 1 + Math.floor(Math.random() * mutations);
      for (var i =0; i< nb_mut; i++) {
        var mutate_pos = prefix.length + Math.floor(Math.random() * word.length);
        mutated_word = this._mutate_at(decorated, mutate_pos);
      }
      mutated_word = this._str_undecorate(mutated_word);
    }
    return mutated_word;
  }

  mutate_n(word, mutations, n) {
    var r = [];
    for (var i = 0; i<n; i++) {
      r.push(this.mutate(word, mutations));
    }
    return r;
  }
}
