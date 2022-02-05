
var url_string = window.location.href
var url = new URL(url_string);

new CenteredBattleImage("assets/battles/" + url.searchParams.get("b") + ".png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.start(url.searchParams.get("b") + "...");
