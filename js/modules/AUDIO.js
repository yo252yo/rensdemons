
const AUDIO = {
  _TRACKS: {},

  _sound: function (track){
    AUDIO._TRACKS[track] = new Audio('assets/sounds/' + track + '.wav');
  },

  init: function (){
    AUDIO._sound('lvlup');
    AUDIO._sound('unlock');
    AUDIO._sound('clickmove');
    AUDIO._sound('page');
    AUDIO._sound('choice');
    AUDIO._sound('interaction');
  },

  _play_buffered: function(track){
    AUDIO._TRACKS[track].play();
  },
  _play: function(track){
    (new Audio('assets/sounds/' + track + '.wav')).play();
  },

  effect: {
    levelup: function() { AUDIO._play('lvlup'); },
    unlock: function() {  AUDIO._play('unlock'); },
    clickmove: function() { AUDIO._play('clickmove'); },
    page: function() { AUDIO._play('page'); },
    choice: function() { AUDIO._play('choice'); },
    interaction: function() { AUDIO._play('interaction'); },
  },
};


AUDIO.init();
