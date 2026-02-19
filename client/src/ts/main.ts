import { UI } from "./ui/UI.js";
import { Renderable } from "./renderable/Renderable.js";
import { GateAND } from "./renderable/gates/GateAND.js";

export type Point = {
    x: number;
    y: number;
}



const canvas = document.getElementById("canvas");
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas element not found or is not a <canvas>.");
}
const ctx = canvas.getContext("2d");
if (!(ctx instanceof CanvasRenderingContext2D)) {
    throw new Error("Error in accessing canvas context.");
}
const canvasContainer = document.getElementById("canvas-container");
if (!(canvasContainer instanceof HTMLElement)) {
    throw new Error("Canvas container not found.");
}


let camera = {
    x: 0,
    y: 0,
}

const renderableObjects: Renderable[] = [];
const renderedObjects: Renderable[] = [];
const ui = new UI();


new ResizeObserver(() => {
    refreshCanvasDimensions(canvas, canvasContainer);
    render(canvas, ctx, ui);
}).observe(canvasContainer);

canvas.addEventListener("mousedown", (event) => {
    const startCamera = {...camera};

    // if middle click
    if (event.button === 1){
        const startMouse = {x: event.screenX, y: event.screenY};

        event.preventDefault();
        const panCamera = (event: MouseEvent) => {
            camera.x = startCamera.x + (startMouse.x - event.screenX);
            camera.y = startCamera.y + (startMouse.y - event.screenY);
            panCanvasGridlines(canvas);
            render(canvas, ctx, ui);

        }
        window.addEventListener("mousemove", panCamera);
        window.addEventListener("mouseup", (event) => {
            if (event.button === 1){
                window.removeEventListener("mousemove", panCamera);
            }
        });
    }

    // if left click
    if (event.button === 0) {
        // initial click is within canvas, so we can use offsetX/Y
        ui.selectionBox.start({x: event.offsetX + camera.x, y: event.offsetY + camera.y});
        // mouse may move outside canvas, so we must use screenX/Y to calculate width/height.
        const startMouseScreen = {x: event.screenX, y: event.screenY};
        const boxSelect = (event: MouseEvent) => {
            const width = (event.screenX - startMouseScreen.x) + (camera.x - startCamera.x);
            const height = (event.screenY - startMouseScreen.y) + (camera.y - startCamera.y);

            ui.selectionBox.update(width, height);
            render(canvas, ctx, ui);
        }
        window.addEventListener("mousemove", boxSelect);
        window.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                ui.selectionBox.stop();
                render(canvas, ctx, ui);
                window.removeEventListener("mousemove", boxSelect);
            }
        });
    }
});






const gate1 = new GateAND(120, 120);
const gate2 = new GateAND(400, 400);
addRenderableObject(gate1);
addRenderableObject(gate2);




function addRenderableObject(object: Renderable) {
    renderableObjects.push(object);
}

function refreshCanvasDimensions(canvas: HTMLCanvasElement, canvasContainer: HTMLElement){
    const w = canvasContainer.clientWidth;
    const h = canvasContainer.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
    }
}

function panCanvasGridlines(canvas: HTMLCanvasElement) {
    canvas.style.backgroundPosition = `${-camera.x}px ${-camera.y}px`;
    // TODO: potentially add some delay to avoid "ResizeObserver loop completed with undelivered notifications." error
}

function render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, ui: UI){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderedObjects.length = 0;
    for (const object of renderableObjects) {
        if (object.isOnScreen(camera, canvas.width, canvas.height)) {
            object.draw(ctx, camera);
            renderedObjects.push(object);
        }
    }

    ui.draw(ctx, camera);
}
