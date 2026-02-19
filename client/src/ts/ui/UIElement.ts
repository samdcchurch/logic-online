import { Point } from "../main.js";

export interface UIElement {
    draw(ctx: CanvasRenderingContext2D, camera: Point): void;
}