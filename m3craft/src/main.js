import { WebGL } from "./webgl.js";
import { Camera, Triangle, Plane, Cube } from "./camera.js";
import { Matrix4, Vector3 } from "./definitions.js";
//import { Shader } from "./shader.js";
console.log("Starting M3Craft!");
const renderer = new WebGL();
const camera = new Camera();
let width = renderer.getCanvasSize()[0]; // appr. 800 
let height = renderer.getCanvasSize()[1]; // appr. 600
var dragging = false;
var debug = false;
let ptimestamp = 0;
let framerateElement = document.getElementById('framerate');
function render(timestamp) {
    var _a, _b, _c;
    (_a = renderer.webgl) === null || _a === void 0 ? void 0 : _a.clearColor(0.0, 0.0, 0.0, 1.0);
    (_b = renderer.webgl) === null || _b === void 0 ? void 0 : _b.clear(renderer.webgl.COLOR_BUFFER_BIT);
    (_c = renderer.webgl) === null || _c === void 0 ? void 0 : _c.useProgram(renderer.programInfo.program);
    let frametime = timestamp - ptimestamp;
    ptimestamp = timestamp;
    debug ? console.log("frame took " + frametime + "ms to render.") : (1);
    framerateElement.textContent = "" + Math.round(1000 / frametime);
    // camera.yaw += 3.5;
    // camera.pitch += 0.7;
    let triangles = [
        new Triangle(new Vector3(100, 100, 100), new Vector3(-100, -100, 100), new Vector3(100, -100, 100)),
        new Triangle(new Vector3(100, 100, 100), new Vector3(-100, -100, 100), new Vector3(-100, 100, 100)),
        /*
        new Triangle(
            new Vector3(-100, 100, -100),
            new Vector3(100, -100, -100),
            new Vector3(100, 100, 100)
        ),

        new Triangle(
            new Vector3(-100, 100, -100),
            new Vector3(100, -100, -100),
            new Vector3(-100, -100, 100)
        ),
        */
    ];
    let planes = [
        new Plane(new Vector3(-100, -100, 100), new Vector3(100, -100, 100), new Vector3(-100, 100, 100), new Vector3(100, 100, 100)),
        new Plane(new Vector3(-100, 100, -100), new Vector3(-100, 100, 100), new Vector3(100, 100, -100), new Vector3(100, 100, 100)),
        new Plane(new Vector3(100, 100, 100), new Vector3(100, -100, 100), new Vector3(100, 100, -100), new Vector3(100, -100, -100)),
        new Plane(new Vector3(-100, 100, 100), new Vector3(-100, -100, 100), new Vector3(-100, 100, -100), new Vector3(-100, -100, -100)),
        new Plane(new Vector3(-100, -100, -100), new Vector3(100, -100, -100), new Vector3(-100, 100, -100), new Vector3(100, 100, -100)),
        new Plane(new Vector3(-100, -100, -100), new Vector3(-100, -100, 100), new Vector3(100, -100, -100), new Vector3(100, -100, 100))
    ];
    let cubes = [
        new Cube(new Vector3(0, -200, 0), 100),
        new Cube(new Vector3(0, 0, 0), 100),
        new Cube(new Vector3(0, -200, 200), 100),
        new Cube(new Vector3(0, 200, 0), 100),
        new Cube(new Vector3(0, -200, -200), 100)
    ];
    let yaw = camera.yaw * (Math.PI / 180); // Convert degrees to radians
    let pitch = camera.pitch * (Math.PI / 180);
    let yawTransform = new Matrix4(Math.cos(yaw), 0, -Math.sin(yaw), 0, 0, 1, 0, 0, Math.sin(yaw), 0, Math.cos(yaw), 0, 0, 0, 0, 1);
    let pitchTransform = new Matrix4(1, 0, 0, 0, 0, Math.cos(pitch), Math.sin(pitch), 0, 0, -Math.sin(pitch), Math.cos(pitch), 0, 0, 0, 0, 1);
    var translationMatrix = new Matrix4(1, 0, 0, -camera.position.x, 0, 1, 0, -camera.position.y, 0, 0, 1, -camera.position.z, 0, 0, 0, 1);
    let transformMatrix = translationMatrix.multiply(yawTransform).multiply(pitchTransform);
    // transformMatrix = transformMatrix.multiply(translationMatrix);
    //transformMatrix.print();
    camera.position.print();
    // let heading = rotationX * (3.14159/180);
    // let headingTransform : Matrix3 = new Matrix3(
    //         Math.cos(heading), 0, -Math.sin(heading),
    //         0, 1, 0,
    //         Math.sin(heading), 0, Math.cos(heading)
    // );
    // let pitch = rotationY * (3.14159/180);
    // let pitchTransform: Matrix3 = new Matrix3(
    //     1, 0, 0,
    //     0, Math.cos(pitch), Math.sin(pitch),
    //     0, -Math.sin(pitch), Math.cos(pitch)
    // );  
    //let transform: Matrix3 = new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);// headingTransform.multiply(pitchTransform);   
    //transform.print()
    cubes.forEach(cube => {
        cube.getFaces().forEach(plane => {
            let point1 = transformMatrix.worldToScreen(plane.v1);
            let point2 = transformMatrix.worldToScreen(plane.v2);
            let point3 = transformMatrix.worldToScreen(plane.v3);
            let point4 = transformMatrix.worldToScreen(plane.v4);
            renderer.draw_line([point1.x, point1.y], [point2.x, point2.y], 1);
            renderer.draw_line([point3.x, point3.y], [point2.x, point2.y], 1);
            renderer.draw_line([point3.x, point3.y], [point1.x, point1.y], 1);
            renderer.draw_line([point3.x, point3.y], [point4.x, point4.y], 1);
            renderer.draw_line([point2.x, point2.y], [point4.x, point4.y], 1);
        });
    });
    // triangles.forEach(triangle => {
    //     let point1 : Vector3 = transformMatrix.worldToScreen(triangle.v1)
    //     let point2 : Vector3 = transformMatrix.worldToScreen(triangle.v2)
    //     let point3 : Vector3 = transformMatrix.worldToScreen(triangle.v3)
    //     renderer.draw_line([point1.x, point1.y], [point2.x, point2.y], 1);
    //     renderer.draw_line([point3.x, point3.y], [point2.x, point2.y], 1);
    //     renderer.draw_line([point3.x, point3.y], [point1.x, point1.y], 1);
    // });
    requestAnimationFrame(render);
}
render();
let oldMouseX = 0;
let oldMouseY = 0;
function moveCamera(mouseX, mouseY) {
    let wfactor = (180 / width) * 2;
    let hfactor = (90 / height) * 2;
    let woffset = 40;
    let hoffset = 8;
    if (Math.abs(mouseX - oldMouseX) > 20 || Math.abs(mouseY - oldMouseY) > 20) {
        oldMouseX = mouseX;
        oldMouseY = mouseY;
    }
    camera.yaw += (mouseX - oldMouseX) * 0.8; // clamp(mouseX*wfactor - width/4 + woffset, -180, 180)
    camera.pitch += (mouseY - oldMouseY) * 0.6; // clamp(mouseY*hfactor - height/4 + hoffset, -90, 90)
    oldMouseX = mouseX;
    oldMouseY = mouseY;
    // console.log("x: " + camera.yaw + " y: " + camera.pitch)
}
document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 87:
            { // W
                camera.position.z += 1;
                debug ? console.log("[W] was pressed.") : (1);
            }
            break;
        case 83:
            { // S
                camera.position.z -= 1;
                debug ? console.log("[S] was pressed.") : (1);
            }
            break;
        case 68:
            { // D
                camera.position.x += 1;
                debug ? console.log("[D] was pressed.") : (1);
            }
            break;
        case 65:
            { // A
                camera.position.x -= 1;
                debug ? console.log("[A] was pressed.") : (1);
            }
            break;
        case 32:
            {
                camera.yaw += 1.3;
            }
            break;
        default:
            {
                debug ? console.log("Other Button pressed.") : (1);
            }
            break;
    }
});
document.addEventListener('mousemove', function (event) {
    if (dragging)
        moveCamera(event.clientX, event.clientY);
});
document.addEventListener('mousedown', function (event) {
    dragging = true;
});
document.addEventListener('mouseup', function (event) {
    dragging = false;
    /*
    let wfactor = (180/width) * 2
    let hfactor = (90/height) * 2

    let woffset = 40
    let hoffset = 8
    oldMouseX = clamp(event.clientX*wfactor - width/4 + woffset, -180, 180)
    oldMouseY = clamp(event.clientY*hfactor - height/4 + hoffset, -90, 90)
    console.log(event.clientX + " " + event.clientY)
    */
});
document.addEventListener('wheel', function (event) {
    const zoomSensitivity = -0.1;
    camera.zoom += event.deltaY * zoomSensitivity;
    camera.zoom = Math.max(20, Math.min(100, camera.zoom)); // Clamping the FoV between 20 and 100 degrees
    // const fovRadians = camera.zoom * Math.PI / 180; // Convert fov to radians
    // camera.projectionmatrix[0] = camera.far / (camera.aspectratio * Math.tan(fovRadians / 2));
    // camera.projectionmatrix[5] = camera.far / Math.tan(fovRadians / 2);
    // camera.projectionmatrix[10] = (camera.far + camera.near) / (camera.far - camera.near);
    // camera.projectionmatrix[11] = (-2 * camera.far * camera.near) / (camera.far - camera.near);    
});
function clamp(value, floor, ceil) {
    return min(max(value, floor), ceil);
}
function min(a, b) {
    return a < b ? a : b;
}
function max(a, b) {
    return a < b ? b : a;
}
