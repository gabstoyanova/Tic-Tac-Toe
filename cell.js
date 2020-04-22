export default class Cell {


    constructor(startX, startY, endX, endY) {
        
        /* coordinates of top left and bottom right corners */
        this.startPoint = {
            x: startX,
            y: startY
        }
        this.endPoint = {
            x: endX,
            y: endY
        }

        this.isFree = true;
        this.size = endX - startX;
    }

    drawX(utils) {

        let ctx = utils.context;
        let sectionSize = this.size;
        let offset = sectionSize / 4;

        ctx.strokeStyle = "#bf4059";
        ctx.lineWidth = utils.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x + offset, this.startPoint.y + offset);
        ctx.lineTo(this.startPoint.x + sectionSize - offset, this.startPoint.y + sectionSize - offset);
        ctx.moveTo(this.startPoint.x + sectionSize - offset, this.startPoint.y + offset);
        ctx.lineTo(this.startPoint.x + offset, this.startPoint.y + sectionSize - offset);
        ctx.stroke();
    }

    drawO(utils) {

        let ctx = utils.context;     
        let sectionSize = this.size;

        let radius = sectionSize / 4;
        let center = {
            x: (this.startPoint.x + this.endPoint.x) / 2,
            y: (this.startPoint.y + this.endPoint.y) / 2,
        }

        ctx.strokeStyle = "#01bBC2";
        ctx.lineWidth = utils.lineWidth;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

}