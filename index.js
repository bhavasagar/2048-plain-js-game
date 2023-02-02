console.log("INDEX JS ");

import GameBoard from "./Components/GameBoard.js";
import Tile from "./Components/Tile.js";

var game;
const GAMEBOARDELEMENT = document.querySelector('.game-board');

function init() {
    const GAMESIZE = 4
    game = new GameBoard(GAMESIZE, GAMEBOARDELEMENT);

    game.randomEmptyCell().tile = new Tile(GAMEBOARDELEMENT);
    game.randomEmptyCell().tile = new Tile(GAMEBOARDELEMENT);

    setUpEventListner();
}

function setUpEventListner() {
    window.addEventListener('keydown', handleInput, {once: true});
}

function handleInput(e) {
    switch (e.key) {
        case "ArrowUp":
            console.log("Up");
            moveUp();
            break;
        case "ArrowLeft":
            console.log("Left");
            moveLeft();
            break;
        case "ArrowDown":
            console.log("Down");
            moveDown();
            break;
        case "ArrowRight":
            console.log("Right");
            moveRight();
            break;
        default: setUpEventListner()
            return;
    }

    game.cells.forEach(cell => {
        cell.mergeTiles();
    });
    const emptyCell = game.randomEmptyCell()
    if (emptyCell)
        emptyCell.tile = new Tile(GAMEBOARDELEMENT);
    setUpEventListner()
}

function moveUp() { 
    slideTiles(game.getCellsByColumn());
}
function moveLeft() { 
    slideTiles(game.getCellsByRow());
}
function moveDown() { 
    slideTiles(game.getCellsByColumn().map(column => [...column].reverse()));
}
function moveRight() {     
    slideTiles(game.getCellsByRow().map(row => [...row].reverse()));    
}

function slideTiles(cells) {
    // console.log(cells);
    cells.forEach(group => {
        console.log(group);
        for (let i = 1; i < group.length; i++) {
            let cell = group[i];
            // console.log(cell.tile, i);
            if (!cell.tile) continue;
            let lastValidCell;
            for (let j = i-1; j >= 0; j--) {
                let moveToCell = group[j];
                console.log(moveToCell.canAccept(cell.tile), cell.tile, moveToCell);
                if (!moveToCell.canAccept(cell.tile)) break;
                lastValidCell = moveToCell;
            } 
            // console.log(lastValidCell);
            if (lastValidCell != null) {
                if (lastValidCell.tile == null) {
                    lastValidCell.tile = cell.tile;
                } else {                
                    lastValidCell.mergeTile = cell.tile;
                }
                cell.tile = null;
            }
        }

    });
}


init();
