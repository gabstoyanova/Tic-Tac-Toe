import Player from "./player.js";
import Board from "./board.js";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const GAME_SIZE = document.getElementById('canvas').width;
const LINEWIDTH = 7;

canvas.height = GAME_SIZE;
let cellsPerRow = 3;

let player1 = new Player('me', 'X');
let player2 = new Player('pesho', 'O');

function createBoard(numCells) {
    let board = new Board(player1, player2, numCells);
    board.getCells(ctx);
    board.drawLines(ctx);
    board.player1.onTurn = true;
    return board;
}

let board = createBoard(cellsPerRow);

let attributes = {
    context: ctx,
    lineWidth: LINEWIDTH,
};

function getCanvasMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();

    let mousePos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
    return mousePos;
}

function equal(a, b, c) {
    return (a == b && b == c && a != '');
}

/* todo 
change the number of spots a player has to fill to win according to the set
size of the board */
function checkIfWins(board, team) {

    let winner = 'noone';
    let grid = board.boardArray;

    //horizontal
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length - 2; j++) {
            if (equal(grid[i][j], grid[i][j + 1], grid[i][j + 2])) {
                winner = grid[i][j];
                break;
            }
        }
    }

    //vertical
    for (let i = 0; i < grid.length - 2; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (equal(grid[i][j], grid[i + 1][j], grid[i + 2][j])) {
                winner = grid[i][j];
                break;
            }
        }
    }

    // Diagonal
    for (let i = 0; i < grid.length - 2; i++) {
        for (let j = 0; j < grid.length - 2; j++) {
            if (equal(grid[i][j], grid[i + 1][j + 1], grid[i + 2][j + 2])) {
                winner = grid[i][j];
                break;
            }
        }
    }
    for (let i = 0; i < grid.length - 2; i++) {
        for (let j = 0; j < grid.length - 2; j++) {
            if (equal(grid[i + 2][j], grid[i + 1][j + 1], grid[i][j + 2])) {
                winner = grid[i + 2][j];
                break;
            }
        }
    }

    if (winner == team) {
        return true;
    } else {
        return false;
    }
}
canvas.addEventListener('click', function (e) {
    var mouse = getCanvasMousePosition(canvas, e);
    for (let i = 0; i < cellsPerRow; i++) {
        for (let j = 0; j < cellsPerRow; j++) {
            let cell = board.cells[i][j];
            if (
                cell.startPoint.x < mouse.x &&
                cell.startPoint.y < mouse.y &&
                cell.endPoint.x > mouse.x &&
                cell.endPoint.y > mouse.y
            ) {
                if (cell.isFree) {
                    if (player1.onTurn) {
                        player1.addPiece(cell, attributes);
                        board.boardArray[i][j] = 'X';
                        cell.isFree = false;

                        let freeCells = [].concat(...board.cells).filter(cell => cell.isFree);

                        if (checkIfWins(board, player1.team)) {
                            setTimeout(() => alert(`X wins!`), 10);
                            player1.onTurn = false;

                        } else if (freeCells.length == 0) {
                            setTimeout(() => alert(`Tie!`), 10);

                        } else {
                            player2.onTurn = true;
                            player1.onTurn = false;
                        }
                        console.log(board.boardArray);

                    } else if (player2.onTurn) {
                        player2.addPiece(cell, attributes);
                        board.boardArray[i][j] = 'O';
                        cell.isFree = false;
                        let freeCells = [].concat(...board.cells).filter(cell => cell.isFree);

                        if (checkIfWins(board, player2.team)) {
                            setTimeout(() => alert(`O wins!`), 10);
                            player2.onTurn = false;

                        } else if (freeCells.length == 0) {
                            setTimeout(() => alert(`Tie!`), 10);

                        } else {
                            player1.onTurn = true;
                            player2.onTurn = false;
                        }
                    }
                }
            }
        }
    }
});

document.getElementsByClassName("button")[0].addEventListener('click', e => {
    board.clearBoard();
    board.getCells(ctx);
    board.drawLines(ctx);
    player1.onTurn = true;
})

// stop page from refreshing after pressing submit
document.getElementById("myForm").addEventListener('submit', e => event.preventDefault());

// handle submit btn
document.getElementsByClassName('button submit')[0].addEventListener('click', e => {
    cellsPerRow = document.getElementById('grid').value;
    board = createBoard(cellsPerRow);
})