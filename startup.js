
var loading_div = document.getElementById("loading_content");
if(loading_div){
  loading_div.innerHTML = "";
}

// TODO, improve with memory management
DISK.initialize_game();

CURRENTLEVEL.setup("titlescreen");
