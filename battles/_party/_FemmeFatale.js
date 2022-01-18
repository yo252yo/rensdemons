
new CenteredMovingImage("assets/characters/party/FemmeFatale.png", 'background',32,48, 2);

AUDIO.music.characters.FemmeFatale();
PLAYER_ACTIONS.escape();

var _SCORE = 0.5;

var updateScore = function(diff){
  if(diff > 0){
    if (Math.sqrt(_SCORE) < 0.999999){
      _SCORE = Math.sqrt(_SCORE);
    } else {
      _SCORE -= 0.01 + Math.random() * 0.01;
    }
  } else if(diff < 0 && _SCORE * _SCORE > 0.001) {
    _SCORE *= _SCORE;
  }
}

var score = function(){
  var m = 1;
  var ss = _SCORE;
  while(ss*ss > 0.95) {
    ss *= ss;
    m *= 10;
  }
  var s = Math.round(_SCORE*100 * m) / m;
  return `${s}%`;
}




// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `There doesn't seem to be anything there...`,
);
