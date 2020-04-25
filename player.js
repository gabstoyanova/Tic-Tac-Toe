export default class Player {

    constructor(team) {
        this.team = team;
        this.onTurn = false;
    }

    addPiece(cell, ctx) {
        switch (this.team) {
            case 'X':
                cell.drawX(ctx);
                break;
            case 'O':
                cell.drawO(ctx);
                break;
        }
    }
}