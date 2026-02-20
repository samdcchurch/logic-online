import { Point } from "../main.js";

export interface Renderable {
    isOnScreen(camera: Point, canvasWidth: number, canvasHeight: number): boolean;
    isFullyInBox(anchor: Point, width: number, height: number): boolean;
    draw(ctx: CanvasRenderingContext2D, camera: Point): void;
    select(): void;
    deselect(): void;
}