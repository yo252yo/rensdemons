
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
      battle: function() {          AUDIO._play_music('interface/the girl with the baseball bat'); },
      titlescreen: function() {     AUDIO._play_music('interface/time for adventure 4 opening'); },
      introduction: function() {    AUDIO._play_music('interface/love planet'); },
      gameover: function() {        AUDIO._play_music('interface/un triste echo trop juste'); },
      map: function() {             AUDIO._play_music('interface/un desert'); }, // or foulerlhorizon???
      // boss battle music??
    },

    town: { // strings, ambiant
      hope: function() {       AUDIO._play_music('town/realismovisceral'); },
      denial: function() {     AUDIO._play_music('town/tinajero'); },
      acceptance: function() { AUDIO._play_music('town/two live at musique tangeantes'); },
      debauch: function() {    AUDIO._play_music('town/debaucheddance'); },
      fear: function() {       AUDIO._play_music('town/lacrobate'); },
    },
    // todo:
    characters:{ // chiptune, weird
      StreetSmart: function() { AUDIO._play_music('chara/lastenergy'); },
      WiseOld: function() { AUDIO._play_music("chara/spacemtv") },
      FemmeFatale: function() { AUDIO._play_music("chara/sexytime") },
      PreciousChild: function() { AUDIO._play_music('chara/shy'); },


      GeniusProdigy: function() { AUDIO._play_music('chara/hugconvoy'); },
      BestFriend: function() { AUDIO._play_music('chara/godmadeofsoap'); },
      // rm tolose


      UpbeatDojikko: function() { AUDIO._play_music('foulerlhorizon'); }, // bof, impala??

      SnobRich: function() { console.log("todo") }, // moins de flic? humoresk by dvorak

      TorturedSoul: function() { console.log("todo") }, // extrametal?
      RetiredProtector: function() { console.log("todo") }, // cest toi sur?
      DumbMuscles: function() { console.log("todo") },

      TraitorFisher: function() { console.log("todo") }, // surfing?
      DisguisedPrincess: function() { console.log("todo") }, // moins de flic?

      SavageChild: function() { console.log("todo") }, // GetReady?
    },

    levels: {
      hideandseek: function() {     AUDIO._play_music('level/champ de tournesol'); },
      trial: function() {           AUDIO._play_music('level/a tale about somewhere where the end of the story already occurs'); },
      temple: function() {          AUDIO._play_music('level/ambiant inconvenient truth'); },
      house: function() {           AUDIO._play_music('level/floating temple'); },

      sirens: function() { console.log("todo") },
      trees: function() { console.log("todo") },
      hawks: function() { console.log("todo") },
      slimes: function() { console.log("todo") },

      mushrooms: function() { AUDIO._play_music("level/jeudelaconversation") },
      squids: function() { AUDIO._play_music("level/ihatehimsomuch"); }, // static shoes, four?
      harpies: function() { AUDIO._play_music("level/callofthecoyote") },

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
