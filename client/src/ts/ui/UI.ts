import { Point } from "../main.js";
import { UIElement } from "./UIElement.js";
import { SelectionBox } from "./SelectionBox.js";

export class UI {
    elements: UIElement[] = [];
    selectionBox: SelectionBox;

    constructor(){
        this.selectionBox = new SelectionBox();

        this.elements.push(this.selectionBox);
    }

    draw(ctx: CanvasRenderingContext2D, camera: Point){
        for (const element of this.elements){
            element.draw(ctx, camera);
        }
    }
}
