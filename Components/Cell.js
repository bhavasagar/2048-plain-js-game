export default class Cell {
    #cellElement;
    #x;
    #y;
    #tile;
    #mergeTile;

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }

    get tile() {
        return this.#tile;
    }

    set tile(value) {
        this.#tile = value;
        if (value == null) return;
        this.#tile.x = this.x;
        this.#tile.y = this.y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get mergeTile() {
        return this.#mergeTile;
    }

    set mergeTile(value) {
        this.#mergeTile = value;
        this.#mergeTile.x = this.x;
        this.#mergeTile.y = this.y;
    }

    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return;
        this.tile.value += this.mergeTile.value;
        this.mergeTile.remove();
        this.#mergeTile = null;

        localStorage.setItem("score", (parseInt(localStorage.getItem("score")) + this.tile.value).toString())
    }

    canAccept(incommingTile) {
        // console.log(this.tile, this.tile?.value, incommingTile.value, this.mergeTile);
        return (this.tile == null || 
            (this.tile.value == incommingTile.value && !this.mergeTile))
    }  

    remove() {
        this.#cellElement.remove();
    }
}