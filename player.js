export default class Player {

    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.onTurn = false;
        this.wins = false;
    }

    addPiece(cell, attributes) {
        switch (this.team) {
            case 'X':
                cell.drawX(attributes);
                break;
            case 'O':
                cell.drawO(attributes);
                break;
        }
    }
}