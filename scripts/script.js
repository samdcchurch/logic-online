"use strict";


// CLASSES

class gateAND {
    static WIDTH = 6 * 40;
    static HEIGHT = 4 * 40;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isSelected = false;
    }

    isOnScreen(camera, canvas){
        const topLeft = {x: this.x - gateAND.WIDTH / 2, y: this.y - gateAND.HEIGHT / 2};
        if (topLeft.x + gateAND.WIDTH <= camera.x) return false;
        if (topLeft.x >= camera.x + canvas.width) return false;
        if (topLeft.y + gateAND.HEIGHT <= camera.y) return false;
        if (topLeft.y >= camera.y + canvas.height) return false;
        return true;
    }

    draw(ctx, camera){
        const relativeCenter = {x: this.x - camera.x, y: this.y - camera.y};

        if (this.isSelected){
            ctx.setLineDash([15]);
        }

        ctx.beginPath();

        ctx.arc(relativeCenter.x,relativeCenter.y,80,1.5 * Math.PI, 0.5 * Math.PI)
        ctx.lineTo(relativeCenter.x - 80, relativeCenter.y + 80);
        ctx.lineTo(relativeCenter.x - 80, relativeCenter.y - 80);
        ctx.lineTo(relativeCenter.x, relativeCenter.y - 80);

        ctx.moveTo(relativeCenter.x + 80, relativeCenter.y);
        ctx.lineTo(relativeCenter.x + 120, relativeCenter.y);
        ctx.moveTo(relativeCenter.x - 80, relativeCenter.y + 40);
        ctx.lineTo(relativeCenter.x - 120, relativeCenter.y + 40);
        ctx.moveTo(relativeCenter.x - 80, relativeCenter.y - 40);
        ctx.lineTo(relativeCenter.x - 120, relativeCenter.y - 40);

        ctx.stroke();
        //console.log(`drew AND gate`);
    }
};







// DOM Elements:
const canvas = document.getElementById("canvas");
const canvasContainer = document.getElementById("canvas-container");
const ctx = canvas.getContext("2d");




// Initialize vars
let camera = {
    x: 0,
    y: 0,
};

const renderableObjects = [];
const renderedObjects = [];





// Set observers
const canvasContainerResizeObserver = new ResizeObserver(() => {
    refreshCanvasDimensions();
    render();
}).observe(canvasContainer);


canvas.addEventListener("mousedown", (event) => {
    const startMouse = { x: event.clientX, y: event.clientY };
    const startCamera = { x: camera.x, y: camera.y };

    // If middle click
    if (event.button === 1){
        event.preventDefault();
        const panCamera = event => {
            updateCamera(startCamera.x + (startMouse.x - event.clientX), startCamera.y + (startMouse.y - event.clientY));
        }
        window.addEventListener('mousemove', panCamera);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', panCamera);
        });
    }

    // If left click
    if (event.button === 0) {

    }

});








const rect = new gateAND(120, 120);
const rect2 = new gateAND(400, 400);
addRenderableObject(rect);
addRenderableObject(rect2);














// Functions

function addRenderableObject(object){
    renderableObjects.push(object);
    render();
}

function refreshCanvasDimensions(){
    const w = canvasContainer.clientWidth;
    const h = canvasContainer.clientHeight;
    if (canvas.width !== w || canvas.height !== h){
        canvas.width = w;
        canvas.height = h;
    }
}

function updateCamera(x, y){
    camera.x = x;
    camera.y = y;
    panGridlines();
    render();
    // console.log(`camera X: ${camera.x}    camera Y: ${camera.y}`);
}

function panGridlines(){
    canvas.style.backgroundPosition = `${-camera.x}px ${-camera.y}px`;
}

function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderedObjects.length = 0;
    for (const object of renderableObjects) {
        if(object.isOnScreen(camera, canvas)) {
            object.draw(ctx, camera);
            renderedObjects.push(object);
        }
    }
}
