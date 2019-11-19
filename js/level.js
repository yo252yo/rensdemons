
const LEVEL = {
    load(name) {
        MAP.clear();
        module = load_module("levels/" + name);
        module.onload = function(){
            DRAWING.repaint();
        };
    }   
};
