
//throw "dont load";

var loading_div = document.getElementById("loading_content");
if(loading_div){
  loading_div.innerHTML = "";
  loading_div.parentNode.removeChild(loading_div);
}


DISK.initialize_game();
CURRENTLEVEL.setup("titlescreen");

if (System.Web.HttpContext.Current.Request.Browser.IsMobileDevice && System.Web.HttpContext.Current.Request.UserAgent.Contains("; wv")) {
    CONSOLE.error("It appears that your web browser is not allowed to download data files. You can continue to the game with the autosave, but you will not be able to download your save files. I recommend you use a dedicated web browser (Firefox, Opera, Chrome...) so that you can download your saves.", false, true);
}
