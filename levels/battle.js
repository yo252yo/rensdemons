
new LevelObject(new StaticSprite("testing/snake.png", 'background'), SCREEN.width() / 2 - 200, SCREEN.height() / 2);

TextBannerSequence.make([
  "A vicious viper ventured into view.",
], function(){

new BattleMenu("",
              [
                {"text": "battle", "effect": function(){ return true; }},
                {"text": "bouyah", "effect": function(){ return true; }},
                {"text": "chick", "effect": function(){ return true; }},
             ]);

});
