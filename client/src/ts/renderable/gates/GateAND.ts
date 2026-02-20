import { Point } from "../../main.js";
import { Renderable } from "../Renderable.js";
import { Gate } from "./Gate.js";

export class GateAND implements Gate, Renderable {
    x: number;
    y: number;
    isSelected: boolean;

    static WIDTH = 6 * 40;
    static HEIGHT = 4 * 40;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.isSelected = false;
    }

    isOnScreen(camera: Point, canvasWidth: number, canvasHeight: number) {
        const topLeft = {x: this.x - GateAND.WIDTH / 2, y: this.y - GateAND.HEIGHT / 2};
        if (topLeft.x + GateAND.WIDTH <= camera.x) return false;
        if (topLeft.x >= camera.x + canvasWidth) return false;
        if (topLeft.y + GateAND.HEIGHT <= camera.y) return false;
        if (topLeft.y >= camera.y + canvasHeight) return false;
        return true;
    }

    isFullyInBox(anchor: Point, width: number, height: number) {
        const topLeft = {x: this.x - GateAND.WIDTH / 2, y: this.y - GateAND.HEIGHT / 2};
        if (topLeft.x < anchor.x) return false;
        if (topLeft.x + GateAND.WIDTH > anchor.x + width) return false;
        if (topLeft.y < anchor.y) return false;
        if (topLeft.y + GateAND.HEIGHT > anchor.y + height) return false;
        return true;
    }

    draw(ctx: CanvasRenderingContext2D, camera: Point) {
        const relativeCenter = {x: this.x - camera.x, y: this.y - camera.y};

        ctx.strokeStyle = "rgb(0, 0, 0)";

        if(this.isSelected){
            ctx.setLineDash([15]);
        }
        else {
            ctx.setLineDash([]);
        }

        ctx.beginPath();

        ctx.arc(relativeCenter.x, relativeCenter.y, 80, 1.5*Math.PI, 0.5*Math.PI);
        ctx.lineTo(relativeCenter.x-80, relativeCenter.y+80);
        ctx.lineTo(relativeCenter.x-80, relativeCenter.y-80);
        ctx.lineTo(relativeCenter.x, relativeCenter.y-80);

        ctx.moveTo(relativeCenter.x+80, relativeCenter.y);
        ctx.lineTo(relativeCenter.x+120, relativeCenter.y);
        ctx.moveTo(relativeCenter.x-80, relativeCenter.y+40);
        ctx.lineTo(relativeCenter.x-120, relativeCenter.y+40);
        ctx.moveTo(relativeCenter.x-80, relativeCenter.y-40);
        ctx.lineTo(relativeCenter.x-120, relativeCenter.y-40);

        ctx.stroke();
        //console.log(`drew AND gate`);
    }

    select() {
        this.isSelected = true;
    }

    deselect() {
        this.isSelected = false;
    }
}