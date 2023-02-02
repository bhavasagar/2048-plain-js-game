import Cell from "./Cell.js"

const CELL_SIZE = 15;
const CELL_GAP = 1;

export default class GameBoard {
    #SIZE;
    #GAMEBOARDELEMENT;
    #cells;

    constructor(size, GAMEBOARDELEMENT) {
        this.#SIZE = size;
        this.#GAMEBOARDELEMENT = GAMEBOARDELEMENT;
        
        this.#GAMEBOARDELEMENT.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
        this.#GAMEBOARDELEMENT.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
        this.#GAMEBOARDELEMENT.style.setProperty('--cell-count', `${this.#SIZE}`);

        this.#cells = this.#createCells().map((cellElement, idx) => {
            return new Cell(
                cellElement,
                idx%this.#SIZE,
                Math.floor(idx/this.#SIZE)
            )
        });       
    }

    get cells() {
        return this.#cells;
    }

    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null);
    }

    randomEmptyCell() {
        return this.#emptyCells[Math.floor(Math.random()*(this.#emptyCells.length))];
    }

    #createCells() {
        let cells = [];
        for (let i = 0; i < this.#SIZE*this.#SIZE; i++) {    
            const cell = document.createElement('div');
            cell.classList.add('cell');
            this.#GAMEBOARDELEMENT.insertAdjacentElement("beforeend", cell);
            cells.push(cell)
        }
        return cells;
    }

}