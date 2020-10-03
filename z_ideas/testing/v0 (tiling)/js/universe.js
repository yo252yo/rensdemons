
const UNIVERSE = {
    _UNIVERSE_CONTENT: {},

    get(key) {
        if (! this._UNIVERSE_CONTENT){
            return null;
        }
        if (key in this._UNIVERSE_CONTENT){
            return this._UNIVERSE_CONTENT[key];
        }
        CONSOLE.error('Trying to access universe key missing: ' + key);
        return null;
    },

    get_with_default(key, default_value){
        if (this._UNIVERSE_CONTENT && key in this._UNIVERSE_CONTENT){
            return this._UNIVERSE_CONTENT[key];
        } else {
            this.set(key, default_value);
            return default_value;
        }
    },

    set(key, value) {
        if (! this._UNIVERSE_CONTENT){
            this._UNIVERSE_CONTENT = {};
        }
        this._UNIVERSE_CONTENT[key] = value;
    },

    save() {
        localStorage.setItem('rd_state', JSON.stringify(this._UNIVERSE_CONTENT));
    },

    load() {
        this._UNIVERSE_CONTENT = JSON.parse(localStorage.getItem('rd_state'));
        if (! this._UNIVERSE_CONTENT){
            this._UNIVERSE_CONTENT = {};
        }
    },

    HARD_RESET() {
        this._UNIVERSE_CONTENT = {};
        this.save();
    },

};
