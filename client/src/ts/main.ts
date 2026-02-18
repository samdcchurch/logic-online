import { Gate } from "./gates/Gate.js";
import { GateAND } from "./gates/GateAND.js";

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

const renderableObjects: Gate[] = [];
const renderedObjects: Gate[] = [];


const canvasContainerResizeObserver = new ResizeObserver(() => {
    refreshCanvasDimensions(canvas, canvasContainer);
    render(canvas, ctx);
}).observe(canvasContainer);

canvas.addEventListener("mousedown", (event) => {
    const startMouse = {x: event.clientX, y: event.clientY};
    const startCamera = {x: camera.x, y: camera.y};

    // if middle click
    if (event.button === 1){
        event.preventDefault();
        const panCamera = (event: MouseEvent) => {
            camera.x = startCamera.x + (startMouse.x - event.clientX);
            camera.y = startCamera.y + (startMouse.y - event.clientY);
            panCanvasGridlines(canvas);
            render(canvas, ctx);

        }
        window.addEventListener("mousemove", panCamera);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", panCamera);
        });
    }

    // if left click
    if (event.button === 0) {

    }
});






const gate1 = new GateAND(120, 120);
const gate2 = new GateAND(400, 400);
addRenderableObject(gate1);
addRenderableObject(gate2);




function addRenderableObject(object: Gate) {
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
}

function render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderedObjects.length = 0;
    for (const object of renderableObjects) {
        if (object.isOnScreen(camera, canvas.width, canvas.height)) {
            object.draw(ctx, camera);
            renderedObjects.push(object);
        }
    }
}
