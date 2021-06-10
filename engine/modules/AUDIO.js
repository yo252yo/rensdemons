
const AUDIO = {
  _TRACKS: {},
  _MUSIC_PLAYER: new Audio(),
  _CURRENT_EFFECTS: {},

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
    AUDIO._load_sound('footstep');
    AUDIO._load_sound('choice');
    AUDIO._load_sound('interaction');
    AUDIO._load_sound('dodge_place');
    AUDIO._load_sound('dodge_attack');
    AUDIO._load_music('the girl with the baseball bat');
    AUDIO._load_music('love planet');
    AUDIO._load_music('time for adventure 4 opening');
    AUDIO._load_music('champ de tournesol');
    AUDIO._load_music('a tale about somewhere where the end of the story already occurs');
    AUDIO._load_music('un triste echo trop juste');
    AUDIO._load_music('ambiant inconvenient truth');
    AUDIO._load_music('floating temple');
    AUDIO._load_music('two live at musique tangeantes');
    AUDIO._load_music('un desert');

    AUDIO._MUSIC_PLAYER.loop = true;
    AUDIO._MUSIC_PLAYER.volume = AUDIO.VOLUME.MUSIC;
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

  _free_sfx_slot: function(key) {
    delete AUDIO._CURRENT_EFFECTS[key];
  },

  _play_sfx: function(track, cooldown, key) {
    if(!key)  {     key = track;  }
    if(!cooldown) {   cooldown = 100;    }

    if (key && AUDIO._CURRENT_EFFECTS[key]) {
      return;
    }

    var audio = new Audio('assets/sounds/' + track + '.wav');
    AUDIO._CURRENT_EFFECTS[key] = audio;
    audio.volume = AUDIO.VOLUME.SFX;
    audio.play();
    setTimeout(function(){ AUDIO._free_sfx_slot(key); }, cooldown);
  },

  effect: {
    levelup: function() {         AUDIO._play_sfx('lvlup'); },
    unlock: function() {          AUDIO._play_sfx('unlock'); },
    clickmove: function() {       AUDIO._play_sfx('clickmove'); },
    choice: function() {          AUDIO._play_sfx('choice'); },
    interaction: function() {     AUDIO._play_sfx('interaction'); },
    dodge_place: function() {     AUDIO._play_sfx('dodge_place'); },
    dodge_attack: function() {     AUDIO._play_sfx('dodge_attack'); },
    footstep: function(cooldown, key) {
      AUDIO._play_sfx('footstep', cooldown, key);
    },
    page: function() {
      var t = 250;
      if (_MIN_PAGE_TIME_MS)     t = _MIN_PAGE_TIME_MS;
      AUDIO._play_sfx('page', t);
    },
  },

  music: {
    stop: function(){
      AUDIO._MUSIC_PLAYER.pause();
    },

    interface:{
      battle: function() {          AUDIO._play_music('the girl with the baseball bat'); },
      titlescreen: function() {     AUDIO._play_music('time for adventure 4 opening'); },
      introduction: function() {    AUDIO._play_music('love planet'); },
      gameover: function() {        AUDIO._play_music('un triste echo trop juste'); },
      map: function() {             AUDIO._play_music('un desert'); },
      // boss battle music??
    },

    town: {
      hope: function() {       AUDIO._play_music('realismovisceral'); },
      denial: function() {     AUDIO._play_music('tinajero'); },
      acceptance: function() { AUDIO._play_music('two live at musique tangeantes'); },
      debauch: function() {    AUDIO._play_music('debaucheddance'); },
      fear: function() {       AUDIO._play_music('lacrobate'); },
    },
    // todo:
    characters:{
      StreetSmart: function() { AUDIO._play_music('lastenergy'); },
      UpbeatDojikko: function() { AUDIO._play_music('foulerlhorizon'); },
      PreciousChild: function() { AUDIO._play_music('hop'); },
      BestFriend: function() { AUDIO._play_music('tolose'); },
      GeniusProdigy: function() { AUDIO._play_music('shy'); },

// > im on a boat? groove all together / god made of soap
      WiseOld: function() { console.log("todo") }, // @hotline-gouv / space MTV?
      SnobRich: function() { console.log("todo") }, // moins de flic? humoresk by dvorak
      FemmeFatale: function() { console.log("todo") }, // sexy time
      TorturedSoul: function() { console.log("todo") },
      RetiredProtector: function() { console.log("todo") }, // rosee?
      DisguisedPrincess: function() { console.log("todo") }, // moins de flic?
      SavageChild: function() { console.log("todo") }, // GetReady?
      DumbMuscles: function() { console.log("todo") },
      TraitorFisher: function() { console.log("todo") }, // surfing?
    },

    levels: {
      hideandseek: function() {     AUDIO._play_music('champ de tournesol'); },
      trial: function() {           AUDIO._play_music('a tale about somewhere where the end of the story already occurs'); },
      temple: function() {          AUDIO._play_music('ambiant inconvenient truth'); },
      house: function() {           AUDIO._play_music('floating temple'); },

      sirens: function() { console.log("todo") },
      trees: function() { console.log("todo") },
      hawks: function() { console.log("todo") },
      slimes: function() { console.log("todo") },

      mushrooms: function() { AUDIO._play_music("jeudelaconversation") },
      squids: function() { console.log("todo") }, // static shoes
      harpies: function() { AUDIO._play_music("callofthecoyote") },

      hellsmaw: function() { console.log("todo") },
      hell: function() { console.log("todo") },
      fissure: function() { console.log("todo") },
      pandemonium: function() { console.log("todo") },
      heaven: function() { console.log("todo") },

    },
  },

  set_volume(type, percentage){
    AUDIO.VOLUME[type] = percentage / 100;
    if(type == "MUSIC") {
      AUDIO._MUSIC_PLAYER.volume = AUDIO.VOLUME.MUSIC;

    }
  },
};


AUDIO.init();
