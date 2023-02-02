console.log("TILE JS");

export default class Tile {
    #x;
    #y;
    #value;
    #tileElement;

    constructor(GAMEBOARD, value = Math.random() > 0.5 ? 4 : 2) {
        const tile = document.createElement('div');
        tile.classList.add("tile");
        GAMEBOARD.append(tile);
        this.#tileElement = tile;
        this.value = value;    
    }

    get value() {
        return this.#value;
    }

    /**
     * @param {any} v
     */
    set value(v) {
        this.#value = v;
        this.#tileElement.textContent = v;
        // Add color logic later.
    }

    /**
     * @param {any} value
     */
    set x(value) { 
        this.#x = value;
        this.#tileElement.style.setProperty("--x", value)
    }
    
    /**
     * @param {string | null} value
     */
    set y(value) {
        this.#y = value;
        this.#tileElement.style.setProperty("--y", value)
    }

    remove() {
        this.#tileElement.remove();
    }
}