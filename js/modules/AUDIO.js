
const AUDIO = {
  _TRACKS: {},
  _MUSIC_PLAYER: new Audio(),

  VOLUME: {
    SFX: 0.8,
    MUSIC: 0.3,
  },

  _load_sound: function (track){
    AUDIO._TRACKS[track] = new Audio('assets/sounds/' + track + '.wav');
  },
  _load_music: function (track){
    AUDIO._TRACKS[track] = new Audio('assets/music/' + track + '.mp3');
  },

  init: function (){
    AUDIO._load_sound('lvlup');
    AUDIO._load_sound('unlock');
    AUDIO._load_sound('clickmove');
    AUDIO._load_sound('page');
    AUDIO._load_sound('choice');
    AUDIO._load_sound('interaction');
    AUDIO._load_music('the girl with the baseball bat');
    AUDIO._load_music('love planet');
  },


  _play_buffered: function(track){
    AUDIO._TRACKS[track].play();
  },

  _start_music: function(){
    AUDIO._MUSIC_PLAYER.play().catch(function(error) {
      setTimeout(AUDIO._start_music, 100);
    });
  },

  _play_music: function(track){
    AUDIO._MUSIC_PLAYER.volume = AUDIO.VOLUME.MUSIC;
    AUDIO._MUSIC_PLAYER.src = 'assets/music/' + track + '.mp3';
    AUDIO._start_music();
  },

  _play_sfx: function(track){
    var audio = new Audio('assets/sounds/' + track + '.wav');
    audio.volume = AUDIO.VOLUME.SFX;
    audio.play();
  },

  effect: {
    levelup: function() {         AUDIO._play_sfx('lvlup'); },
    unlock: function() {          AUDIO._play_sfx('unlock'); },
    clickmove: function() {       AUDIO._play_sfx('clickmove'); },
    page: function() {            AUDIO._play_sfx('page'); },
    choice: function() {          AUDIO._play_sfx('choice'); },
    interaction: function() {     AUDIO._play_sfx('interaction'); },
  },

  music: {
    stop: function(){
      AUDIO._MUSIC_PLAYER.pause();
    },

    battle: function() {          AUDIO._play_music('the girl with the baseball bat'); },
    titlescreen: function() {     AUDIO._play_music('time for adventure 4 opening'); },
    introduction: function() {    AUDIO._play_music('love planet'); },
    hideandseek: function() {     AUDIO._play_music('champ de tournesol'); },
    trial: function() {           AUDIO._play_music('a tale about somewhere where the end of the story already occurs'); },

  }
};


AUDIO.init();
