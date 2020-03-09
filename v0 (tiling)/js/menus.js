
const MENUS = {
    new_box(pos_x, pos_y, html) {        
        var div = document.createElement("div");
        div.innerHTML = html;
        div.style = "display:visible;background:#FFFFFFAA;border:2px solid #333333dd;padding:10px;top:" + pos_y + "px;left:" + pos_x + ";position:absolute;z-index:5";
        
        document.getElementsByTagName('body')[0].appendChild(div);
        return div;
    }   
};
