const RANDOM = {
  PRIMES: [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223],

  float: function(limit) {
    if(!limit){
      limit = 1;
    }
    return Math.random() * limit;
  },

  int: function(limit) {
    if(!limit){
      limit = 1;
    }
    return Math.floor(Math.random() * limit);
  },

  pick: function(arr){
    var index = RANDOM.int(arr.length);
    return arr[index];
  },

  pick_in_weighted_array: function(arr){
    var total = 0;
    for (var i in arr) {
      total += arr[i];
    }

    var index = RANDOM.float(total);
    for (var i in arr) {
      index -= arr[i];
      if (index <= 0) {
        return i;
      }
    }
    return i; // Should not happen, though
  },

  hash_seed: function(seed){
    seed = (seed * 2134073);

    seed = ((seed >> 16) ^ seed) * 295559667;
    seed = ((seed >> 16) ^ seed) * 295559667;
    seed = (seed >> 16) ^ seed;
    return seed;
  },

  // returns a number between 0 and 1 extracted from the seed.
  get_factor_from_seed: function(seed, order){
    if (order >= RANDOM.PRIMES.length){
      CONSOLE.error("Please expand list in of primes in RANDOM.js until index " + order);
    }
    var d = ((seed / RANDOM.PRIMES[order])).toString(); // include digits past the coma
    var d = (seed * RANDOM.PRIMES[order]).toString();
    var r = "0.";
    for (var i = d.length-1; i >=0; i--){
      if(d[i] != "."){
        r += d[i];
      }
    }

    return r;
  },

  check_seeds:function(){
    var buckets = [0,0,0,0,0,0,0,0,0,0];
    for(var seed = 0; seed <10000; seed++){
      for(var i = 0; i <190; i++){
        var r = RANDOM.get_factor_from_seed(RANDOM.hash_seed(seed),i);
        r = Math.floor((r * 10 )) % 10;
        buckets[r] ++;
      }
    }
    return buckets;
  },
}
