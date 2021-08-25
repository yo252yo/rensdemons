
CURRENTLEVEL.system.html().innerHTML = `
<div style="font-family:monospace;font-size:x-large;font-weight:bold;margin:50px;">An operating system wasn't found. Try disconnecting any drives that don't contain an operating system.<br />Press Ctrl+Alt+Del to restart
</div>`;

var displayText = function() {
  FOG.stop();
  TextBannerSequence.make([
    "CONGRATULATIONS for beating this demo of Ren's demons, and thanks a lot for playing!!!",
    "If you have access to this, I guess you know who to send all your thoughts, comments and impressions to. Especially bug reports. Your victory awards you priority treatment ;)",
    "Remember that the full version (under development) will be a complete game, with a few similar mechanics and items but a completely different story and meaning! I hope this demo gets you excited for it and eager to play the real thing! Follow @yo252yo for updates /o/",
  ], function(){ window.open("https://www.twitter.com/yo252yo"); });
}

setTimeout(displayText, 1000);
FOG.stop();
