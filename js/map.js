function Tile(source, source_x, source_y) {
    this.walkeable = true;
    this.source = source;
    this.source_x = source_x;
    this.source_y = source_y;
};

function Map() {
    this._tiles = [];
    
    this.get_tiles = function() {
        return this._tiles;
    };
    
    this.get_tile = function(x, y) {
        if (!(x in this._tiles)){
            return null;
        }
        if (!(y in this._tiles[x])){
            return null;
        }
        return this._tiles[x][y];
    };
    
    this.set_tile = function(x, y, tile) {
        if (!(x in this._tiles)){
            this._tiles[x] = [];
        }
        this._tiles[x][y] = tile;
    };
    this.delete_tile = function(x, y) {
        delete this._tiles[x][y];
    };
};


const MAP = {
    get() {
        return _MAP;
    },
    set(map) {
        _MAP = map;
    },
    clear() {
        _MAP = new Map();
    },
    set_tile(x, y, tile) {
        _MAP.set_tile(x, y, tile);
    },
    delete_tile(x, y) {
        _MAP.delete_tile(x, y);
    },
    get_tiles() {
        try {
            return _MAP.get_tiles();
        } catch (e) {
            return [];
        }
    },
    get_tile_at_pixel (pixel_x, pixel_y) {
        var x = Math.floor(pixel_x / DRAWING.TILE_SIZE);
        var y = Math.floor(pixel_y / DRAWING.TILE_SIZE);
        return _MAP.get_tile(x, y);
    },
};
