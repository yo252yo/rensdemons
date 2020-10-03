_RUNNING_MOVEMENT_SPEED = 10;
_WALKING_MOVEMENT_SPEED = 5;

_ANIMATION_SPEED = 80;

_IS_AT_PRECISION = 5.1;
_CLICK_MOVEMENT_TIMEOUT = 40;


const CHARACTER = {
    character_html: document.getElementById('character'),
    _is_hidden: true,
    _can_move: true,
    movement_speed: _WALKING_MOVEMENT_SPEED,
    
    x:0,
    y:0,
    destination_x:0,
    destination_y:0,
    sprite_tile_x:0,
    sprite_tile_y:0,
    animate_lock:0,
    
    _move_sprite_to(x, y){
        this.x = x;
        this.y = y;
        
        this.character_html.style.left=this.x;
        this.character_html.style.top=this.y; 
        DRAWING.scroll();
    },
    
    place_at_tile(x, y) {
        this._move_sprite_to((x+.5) * DRAWING.TILE_SIZE, (y+.5) * DRAWING.TILE_SIZE);
        
        this.character_html.style.visibility="visible";
        this._is_hidden = false;
        this._can_move = true;
    },
    
    hide() {
        this.character_html.style.visibility="hidden";
        this._is_hidden = true;
        this._can_move = false;
    },
    
    is_hidden() {
        return this._is_hidden;
    },
    
    can_move() {
        return this._can_move;
    },
    
    is_at_x(x) {
        return (Math.abs(this.x - x) < _IS_AT_PRECISION);
    },
    
    
    is_at_y(y) {
        return (Math.abs(this.y - y) < _IS_AT_PRECISION);
    },
    
    
    is_at(x, y) {
        return (this.is_at_x(x) && this.is_at_y(y));
    },
    
    coordinates() {
        return [this.x, this.y];
    },
    
    _cancel_move(){
        this.destination_x = 0;
        this.destination_y = 0;        
    },
    
    _animate() {
        if (this.animate_lock > 0) {
            return;
        }
        this.animate_lock = 1;
        this.sprite_tile_x = 1;
        setTimeout(function(){ 
            CHARACTER.sprite_tile_x = 2; CHARACTER.draw(); 
                setTimeout(function(){ 
                    CHARACTER.sprite_tile_x = 0; CHARACTER.draw(); CHARACTER.animate_lock = 0;
                    
                    }, _ANIMATION_SPEED); 
            
            }, _ANIMATION_SPEED);           
    },
    
    _try_move_by(dx,dy){
        if (!this.can_move()){
            return;
        }
        var newx = this.x + dx * this.movement_speed;
        var newy = this.y + dy * this.movement_speed;
        var new_tile = MAP.get_tile_at_pixel(newx, newy);
        
        if (! new_tile || !new_tile.walkeable){
            return false;
        }
        
        
        this._move_sprite_to(newx, newy);
        if (dx > 0){
            this.sprite_tile_y = 2;
        }
        if (dx < 0){
            this.sprite_tile_y = 1;
        }
        if (dy > 0){
            this.sprite_tile_y = 0;
        }
        if (dy < 0){
            this.sprite_tile_y = 3;
        }
        this._animate();      
        
        this.draw();
        return true; // can move
    },
    
    move_up() {
        this._cancel_move();
        this._try_move_by(0, -1);
    },
    
    move_down() {
        this._cancel_move();
        this._try_move_by(0, 1);
    },
    
    move_left() {
        this._cancel_move();
        this._try_move_by(-1, 0); 
    },
    
    move_right() {
        this._cancel_move();
        this._try_move_by(1, 0); 
    },
    
    move_to_destination() {
        if (!this.can_move()){
            return;
        }
        if (this.is_at(this.destination_x, this.destination_y)){
            this.destination_x = 0;
            this.destination_y = 0;
            return;
        }
        var direction_x = 0;
        var direction_y = 0;

        if (!this.is_at_x(this.destination_x)){
            direction_x = Math.sign(this.destination_x - this.x);
        }
        if (!this.is_at_y(this.destination_y)){
            direction_y = Math.sign(this.destination_y - this.y);
        }
        var canMove = this._try_move_by(direction_x, direction_y);
        
        if (canMove){
            setTimeout(function(){ CHARACTER.move_to_destination(); }, _CLICK_MOVEMENT_TIMEOUT);
        } else {
            this.destination_x = 0;
            this.destination_y = 0;
            return;
        }
        
    },
    
    move_to(x, y) {
        var shouldStart = false;
        if (this.destination_x + this.destination_y == 0) {
            shouldStart = true;
        }
        this.destination_x = x;
        this.destination_y = y;
        if (shouldStart) {
            this.move_to_destination();
        }
    },
    
    run() {
        this.movement_speed = _RUNNING_MOVEMENT_SPEED;
    },
    
    walk() {
        this.movement_speed = _WALKING_MOVEMENT_SPEED;
    },

    draw() {
        var _context = this.character_html.getContext('2d');
        _context.clearRect(0, 0, 32, 48);
        var tileset = DRAWING.get_image_set("charas/vx_chara01_a.png");
        
        tileset.onload = function(){
            CHARACTER.draw();
        };
        
        
        
        
        _context.drawImage(tileset, 32 * this.sprite_tile_x, 48 * this.sprite_tile_y /* tileset */, 32, 48, 0, 0 /* canvas */, 32, 48);       
    },
    
    init() {
        this.draw();
    },
};
