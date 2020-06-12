
const AUDIO = {
  _TRACKS: {},
  VOLUME: {
    SFX: 0.8,
  },

  _load_sound: function (track){
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

  _play_sfx: function(track){
    var audio = new Audio('assets/sounds/' + track + '.wav');
    audio.volume = AUDIO.VOLUME.SFX;
    audio.play();
  },

  effect: {
    levelup: function() {     AUDIO._play_sfx('lvlup'); },
    unlock: function() {      AUDIO._play_sfx('unlock'); },
    clickmove: function() {   AUDIO._play_sfx('clickmove'); },
    page: function() {        AUDIO._play_sfx('page'); },
    choice: function() {      AUDIO._play_sfx('choice'); },
    interaction: function() { AUDIO._play_sfx('interaction'); },
  },
};


AUDIO.init();
