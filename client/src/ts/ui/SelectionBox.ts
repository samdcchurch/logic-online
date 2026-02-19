import { Point } from "../main.js";
import { UIElement } from "./UIElement.js";

export class SelectionBox implements UIElement {
    private isActive: boolean;
    private anchorPoint: Point;
    private width: number;
    private height: number;

    constructor() {
        this.isActive = false;
        this.anchorPoint = {x: 0, y: 0};
        this.width = 0;
        this.height = 0;
    }

    start(anchorPoint: Point){
        this.isActive = true;
        this.anchorPoint = anchorPoint;
    }

    update(width: number, height: number){
        if(this.isActive){
            this.width = width;
            this.height = height;
        }
    }

    stop(){
        this.isActive = false;
    }

    draw(ctx: CanvasRenderingContext2D, camera: Point): void {
        if (this.isActive){
            ctx.strokeStyle = "rgb(0, 120, 214)";
            ctx.fillStyle = "rgba(0, 120, 214, 0.25)";

            ctx.beginPath();
            ctx.rect(this.anchorPoint.x - camera.x, this.anchorPoint.y - camera.y, this.width, this.height);
            ctx.fill();
            ctx.stroke();
        }
    }
}