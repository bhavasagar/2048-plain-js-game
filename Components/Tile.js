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
        return this
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
        
        const power = Math.log2(v)
        const backgroundLightness = 100 - power * 9
        this.#tileElement.style.setProperty(
            "--bg-lightness",
            `${backgroundLightness}%`
        )
        this.#tileElement.style.setProperty(
            "--color-lightness",
            `${backgroundLightness <= 50 ? 90 : 10}%`
        )
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

    waitForTransition(animation=false) {
        return new Promise(resolve => {
            this.#tileElement.addEventListener(animation ? "animationend": "transitionend", resolve, {once: true})
        })
    }

    remove() {
        this.#tileElement.remove();
    }
}