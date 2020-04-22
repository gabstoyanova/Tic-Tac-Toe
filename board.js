import Cell from "/cell.js";

export default class Board {

    constructor(player1, player2, cellsPerRow) {
        this.cells = [];
        this.cellsPerRow = cellsPerRow;
        this.boardArray = [...Array(+cellsPerRow)].fill('').map(x => Array(+cellsPerRow).fill(''));
        this.player1 = player1
        this.player2 = player2
        this.cellSize = document.getElementById('canvas').width / cellsPerRow;
    }

    clearBoard() {
        this.cells.forEach(c => c.isFree = true);
        this.boardArray = [...Array(+this.cellsPerRow)].map(x => Array(+this.cellsPerRow).fill(''));
    }

    getCells(ctx) {
        let cells = [];

        for (let i = 0; i < this.cellsPerRow; i++) {
            cells[i] = [this.cellsPerRow];
            for (let j = 0; j < this.cellsPerRow; j++) {

                let width = this.cellSize;
                let crosspoint = {
                    x: (j + 1) * width,
                    y: (i + 1) * width
                };
                cells[i][j] = new Cell(
                    crosspoint.x - this.cellSize,
                    crosspoint.y - this.cellSize,
                    crosspoint.x, crosspoint.y);
                width += this.cellSize;
            }
        }

        ctx.fillStyle = '#e9e9af'
        let r = [].concat(...cells);
        r.forEach(c =>
            ctx.fillRect(c.startPoint.x, c.startPoint.y, c.endPoint.x, c.endPoint.y));

        this.cells = cells;
    }

    drawLines(ctx) {
        let linesOffset = 15;
        let canvasSize = document.getElementById('canvas').width;

        ctx.lineWidth = 7;
        ctx.strokeStyle = '#af8350';
        ctx.lineCap = "round";
        ctx.beginPath();

        // horizontal lines
        for (var line = 1; line < this.cellsPerRow; line++) {
            ctx.moveTo(linesOffset, line * this.cellSize);
            ctx.lineTo(canvasSize - linesOffset, line * this.cellSize);
        }

        //vertical lines
        for (var line = 1; line < this.cellsPerRow; line++) {
            ctx.moveTo(line * this.cellSize, linesOffset);
            ctx.lineTo(line * this.cellSize, canvasSize - linesOffset);
        }
        ctx.stroke();
    }
}