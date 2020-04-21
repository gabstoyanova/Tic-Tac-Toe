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
        this.offset = 50;
        this.mouseIn = false;
        this.size = endX - startX;
    }

    drawX(utils) {

        let ctx = utils.context;
        let sectionSize = this.size;

        ctx.strokeStyle = "#bf4059";
        ctx.lineWidth = utils.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x + this.offset, this.startPoint.y + this.offset);
        ctx.lineTo(this.startPoint.x + sectionSize - this.offset, this.startPoint.y + sectionSize - this.offset);
        ctx.moveTo(this.startPoint.x + sectionSize - this.offset, this.startPoint.y + this.offset);
        ctx.lineTo(this.startPoint.x + this.offset, this.startPoint.y + sectionSize - this.offset);
        ctx.stroke();
    }

    drawO(utils) {

        let ctx = utils.context;
        // let lineWidth = utils.lineWidth;      
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