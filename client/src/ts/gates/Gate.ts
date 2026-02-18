import { Point } from "../main.js";

export interface Gate {
    isOnScreen(camera: Point, canvasWidth: number, canvasHeight: number): boolean;
    draw(ctx: CanvasRenderingContext2D, camera: Point): void;
};