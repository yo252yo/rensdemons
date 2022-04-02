
//throw "dont load";

var loading_div = document.getElementById("loading_content");
if(loading_div){
  loading_div.innerHTML = "";
  loading_div.parentNode.removeChild(loading_div);
}

DISK.initialize_game();
CURRENTLEVEL.setup("titlescreen");

if (navigator.userAgent.includes("; wv")) {
    CONSOLE.error("It appears that your web browser is not allowed to download data files. You can continue to the game with the autosave, but you will not be able to download your save files. I recommend you use a dedicated web browser (Firefox, Opera, Chrome...) so that you can download your saves.", false, true);
}

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js', {scope : '.' }).then(function() {
    CONSOLE.log.debug("Service worker registerd");
  });
}

var deferredInstallPrompt;

installWebApp = function(){
  if(!deferredInstallPrompt){
    return;
  }

  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then((result) => {
    if (result.outcome === 'accepted') {
      CONSOLE.log.debug("Web app install accepted");
      document.getElementById("installSpan").innerHTML = "Installed!<br /><br />";
    }
    deferredInstallPrompt = null;
  });
}


updateInstallMenu = function(){
  var d = document.getElementById("installSpan");
  if (!d || !deferredInstallPrompt){
    setTimeout(updateInstallMenu, 500);
    return;
  }
  d.style.display = "block";
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  updateInstallMenu();
  // Stop trying after 3 minutes
  setTimeout(function(){
    updateInstallMenu = function(){};
  }, 180000);
});
