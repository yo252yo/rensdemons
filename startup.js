
//throw "dont load";

var loading_div = document.getElementById("loading_content");
if(loading_div){
  loading_div.innerHTML = "";
  loading_div.parentNode.removeChild(loading_div);
}

DISK.initialize_game();
