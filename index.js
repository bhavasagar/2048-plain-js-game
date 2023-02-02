console.log("INDEX JS ");

import GameBoard from "./Components/GameBoard.js";
import Tile from "./Components/Tile.js";

function init() {
    const GAMEBOARDELEMENT = document.querySelector('.game-board');
    const GAMESIZE = 4
    const game = new GameBoard(GAMESIZE, GAMEBOARDELEMENT);

    game.randomEmptyCell().tile = new Tile(GAMEBOARDELEMENT); 
    game.randomEmptyCell().tile = new Tile(GAMEBOARDELEMENT); 
}

init();