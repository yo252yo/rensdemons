SOURCE_TILE_SIZE = 32;
TILE_SIZE = 32;


const DRAWING = {
    lock_scroll: true,
    width: 1500,
    height: 1500,
    TILE_SIZE: TILE_SIZE,
    canvas_html: document.getElementById('canvas'),
    canvas_filter_html: document.getElementById('canvas_filter'),
    canvas: document.getElementById('canvas').getContext('2d'),
    
    init() {
        this.canvas_html = document.getElementById('canvas');
        this.canvas_filter_html = document.getElementById('canvas_filter');
        this.canvas = document.getElementById('canvas').getContext('2d');
    },
    
    _reset_canvas_dimensions() {
        this.canvas_html.width = this.width;
        this.canvas_html.height = this.height;   
        this.canvas_filter_html.width = this.width;
        this.canvas_filter_html.height = this.height;   
        document.body.style.width = this.width + Math.max(window.outerWidth, window.innerWidth, document.documentElement.clientWidth);
        document.body.style.height = this.height + Math.max(window.outerHeight, window.innerHeight, document.documentElement.clientHeight);
    },
    
    _apply_filters() {    
        var _context = this.canvas_html.getContext('2d');
        _context.globalCompositeOperation = 'hue';
        _context.fillStyle=WORLD.get().colors.main + "10";
        _context.fillRect(0,0,this.canvas_html.width,this.canvas_html.height);

        _context.globalCompositeOperation = 'color';
        _context.fillStyle=WORLD.get().colors.secondary + "20";
        _context.fillRect(0,0,this.canvas_html.width,this.canvas_html.height);
        
        
        
        var _context = this.canvas_filter_html.getContext('2d');
        _context.globalCompositeOperation = 'hue';
        _context.fillStyle=WORLD.get().colors.main + "20";
        _context.fillRect(0,0,this.canvas_filter_html.width,this.canvas_filter_html.height);

        _context.globalCompositeOperation = 'color';
        _context.fillStyle=WORLD.get().colors.secondary + "5";
        _context.fillRect(0,0,this.canvas_filter_html.width,this.canvas_filter_html.height);
    },
    
    get_image_set(name) {
        var set = document.getElementById(name);
        if (set) {
            return set;
        }
        var set = document.createElement("img");
        set.id = name;
        set.src = name;
        set.style = "display:none;";
        
        document.getElementsByTagName('body')[0].appendChild(set);
        return set;        
    },
    
    _get_tileset(name){
        var tileset = this.get_image_set("tiles/" + name);
        tileset.onload = function(){
            DRAWING.repaint();
        };
        return tileset;
    },
    
    _draw_tile(x, y, tile){
        var tileset = this._get_tileset(tile.source);
        
        var tileset_x_0 = tile.source_x * SOURCE_TILE_SIZE;
        var tileset_y_0 = tile.source_y * SOURCE_TILE_SIZE;
        var pos_x = x * TILE_SIZE;
        var pos_y = y * TILE_SIZE;
        this.canvas.drawImage(tileset, tileset_x_0, tileset_y_0, SOURCE_TILE_SIZE, SOURCE_TILE_SIZE, pos_x, pos_y, TILE_SIZE, TILE_SIZE);
    },
    
    _draw_map(){        
        var tiles = MAP.get_tiles();
        var max_x = 0;
        var max_y = 0;
        if (!tiles) {
            return;
        }
        for(var tile_x = 0; tile_x < tiles.length; tile_x ++){
            if (!tiles[tile_x]) {
                continue;
            }
            if (tile_x > max_x)  max_x = tile_x;
            for(var tile_y = 0; tile_y < tiles[tile_x].length; tile_y ++){
                if (tiles[tile_x][tile_y]){
                    this._draw_tile(tile_x, tile_y, tiles[tile_x][tile_y]);
                    if (tile_y > max_y)  max_y = tile_y;
                }
            }
        }
        
        this.width = (max_x + 1) * TILE_SIZE;
        this.height = (max_y + 1) * TILE_SIZE;
    },
    
    scroll(){
        if (CHARACTER.is_hidden()){
            window.scrollTo(0, 0);
        } else {
            var position = CHARACTER.coordinates();
            var winWidth = Math.min(window.outerWidth, window.innerWidth, document.documentElement.clientWidth);
            var winHeight = Math.min(window.outerHeight, window.innerHeight, document.documentElement.clientHeight);
            window.scrollTo(position[0] - winWidth/2, position[1] - winHeight/2);
            // scroll to position in the middle of the screen instead of corner
        }
    },
    
    repaint() {
        this.canvas.clearRect(0, 0, this.width, this.height);
        this._reset_canvas_dimensions();
        this._draw_map();
        this._apply_filters();
        this.scroll();
    },
    
    set_dimensions(w, h) {
        this.width = w;
        this.height = h;
        this.repaint();
    },
};
