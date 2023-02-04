console.log("INDEX JS ");

import GameBoard from "./Components/GameBoard.js";
import Tile from "./Components/Tile.js";

var game, touchstartX, touchstartY, touchendX, touchendY;
const GAMEBOARDELEMENT = document.querySelector('.game-board');

function init() {
    const GAMESIZE = 4
    game = new GameBoard(GAMESIZE, GAMEBOARDELEMENT);

    game.randomEmptyCell().tile = new Tile(GAMEBOARDELEMENT);
    game.randomEmptyCell().tile = new Tile(GAMEBOARDELEMENT);

    localStorage.setItem('score', '0');
    document.querySelector("*[data-id='score-value']").textContent = "0";

    setUpEventListner();

    document.querySelector("[data-new-game]")?.addEventListener('click', () => {
        game.emptyCells();
        init();
    }, {once: true});


    touchEventListeners();
}

function touchEventListeners() {
    window.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
    }, false);
    
    window.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        let direction = '';
        if (touchendX < touchstartX) {
            direction = "ArrowLeft"
            console.log('Swiped Left');
        }
        if (touchendX > touchstartX) {
            direction = "ArrowRight"
            console.log('Swiped Right');
        }
        
        if (touchendY < touchstartY) {
            direction = "ArrowUp"
            console.log('Swiped Up');
        }
        
        if (touchendY > touchstartY) {
            direction = "ArrowDown"
            console.log('Swiped Down');
        }
        switchDirection(direction);
    }, false);
}

function setUpEventListner() {
    window.addEventListener('keydown', handleInput, {once: true});
}

async function switchDirection(target) {
    switch (target) {
        case "ArrowUp":
            console.log("Up");
            if (!canMoveUp()) {
                return setUpEventListner();
            }
            await moveUp();
            break;
        case "ArrowLeft":
            console.log("Left");
            if (!canMoveLeft()) {
                return setUpEventListner();
            }
            await moveLeft();
            break;
        case "ArrowDown":
            console.log("Down");
            if (!canMoveDown()) {
                return setUpEventListner();
            }
            await moveDown();
            break;
        case "ArrowRight":
            console.log("Right");
            if (!canMoveRight()) {
                return setUpEventListner();
            }
            await moveRight();
            break;
        default: setUpEventListner()
            return;
    }
}

async function handleInput(e) {
    switchDirection(e.key);
    
    game.cells.forEach(cell => {
        cell.mergeTiles();
    });
    const emptyCell = game.randomEmptyCell()
    if (emptyCell)
    emptyCell.tile = new Tile(GAMEBOARDELEMENT);

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        console.log("** GAME OVER**");
        return
    }

    document.querySelector("*[data-id='score-value']").textContent = localStorage.getItem("score");

    setUpEventListner()
}

function moveUp() { 
    return slideTiles(game.getCellsByColumn());
}
function moveLeft() { 
    return slideTiles(game.getCellsByRow());
}
function moveDown() { 
    return slideTiles(game.getCellsByColumn().map(column => [...column].reverse()));
}
function moveRight() {     
    return slideTiles(game.getCellsByRow().map(row => [...row].reverse()));    
}

function canMoveUp() {
    return canMove(game.getCellsByColumn());
}
function canMoveLeft() {
    return canMove(game.getCellsByRow());
}
function canMoveDown() {
    return canMove(game.getCellsByColumn().map(column => [...column].reverse()));
}
function canMoveRight() {
    return canMove(game.getCellsByRow().map(row => [...row].reverse()));
}

function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, idx) => {            
            if (cell.tile == null) return false;
            if (idx > 0) return group[idx-1].canAccept(cell.tile);
        })
    })
}

function slideTiles(cells) {

    return Promise.all(  
        cells.flatMap(group => {
            // console.log(group);
            const promises = []
            for (let i = 1; i < group.length; i++) {
                let cell = group[i];
                // console.log(cell.tile, i);
                if (!cell.tile) continue;
                let lastValidCell;
                for (let j = i-1; j >= 0; j--) {
                    let moveToCell = group[j];
                    // console.log(moveToCell.canAccept(cell.tile), cell.tile, moveToCell);
                    if (!moveToCell.canAccept(cell.tile)) break;
                    lastValidCell = moveToCell;
                } 
                // console.log(lastValidCell);
                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition())
                    if (lastValidCell.tile == null) {
                        lastValidCell.tile = cell.tile;
                    } else {                
                        lastValidCell.mergeTile = cell.tile;
                    }
                    cell.tile = null;
                }
            }
            return promises;
        })
    );
    // console.log(cells);
}


init();
