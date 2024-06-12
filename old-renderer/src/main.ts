import { WebGL } from "./webgl.js";
import { Camera, Triangle, Plane, Cube } from "./camera.js";
import { Matrix3, Vector2, Vector3 } from "./definitions.js";
//import { Shader } from "./shader.js";

console.log("Starting M3Craft!")



const renderer : WebGL = new WebGL()
const camera = new Camera();

let width  = renderer.getCanvasSize()[0]; // appr. 800 
let height = renderer.getCanvasSize()[1]; // appr. 600
var dragging : boolean = false

var rotationX : number = 69;
var rotationY : number = 10;

// var matrix : Matrix = new Matrix(0, 0, 0,
//                                  0, 0, 0,
//                                  0, 0, 0);

function render() {
    renderer.webgl?.clearColor(0.0, 0.0, 0.0, 1.0);
    renderer.webgl?.clear(renderer.webgl.COLOR_BUFFER_BIT);
    renderer.webgl?.useProgram(renderer.programInfo.program);

    //renderer.pdraw_line(-0.55, 0.5, 0.5, 0.5, 100);
    // webgl.pdraw_line(-0.5, 0.5, -0.5, -0.5, 100);
    // webgl.pdraw_line(0.5, 0.5, 0.5, -0.5, 100);
    // webgl.pdraw_line(-0.5, -0.5, 0.5, -0.5, 100);

    let a : Vector2 = new Vector2(1,2);

    camera.edges.forEach(edge => {
        let v0 = camera.project_vertex(camera.vertices[edge[0]]);
        let v1 = camera.project_vertex(camera.vertices[edge[1]]);

        renderer.vdrawl_line(v0, v1, 2);
    });

    let triangles = [
        new Triangle(
            new Vector3(100, 100, 100),
            new Vector3(-100, -100, 100), 
            new Vector3(100, -100, 100)
        ),

        new Triangle(
            new Vector3(100, 100, 100),
            new Vector3(-100, -100, 100), 
            new Vector3(-100, 100, 100)
        ),
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
        new Plane(
            new Vector3(-100, -100, 100),
            new Vector3(100, -100, 100),
            new Vector3(-100, 100, 100), 
            new Vector3(100, 100, 100)
        ),
        new Plane(
            new Vector3(-100, 100, -100),
            new Vector3(-100, 100, 100),
            new Vector3(100, 100, -100),
            new Vector3(100, 100, 100)
        ),
        new Plane(
            new Vector3(100, 100, 100), 
            new Vector3(100, -100, 100),
            new Vector3(100, 100, -100), 
            new Vector3(100, -100, -100)
        ),
        new Plane(
            new Vector3(-100, 100, 100), 
            new Vector3(-100, -100, 100),
            new Vector3(-100, 100, -100), 
            new Vector3(-100, -100, -100)
        ),
        new Plane(
            new Vector3(-100, -100, -100),
            new Vector3(100, -100, -100),
            new Vector3(-100, 100, -100), 
            new Vector3(100, 100, -100)
        ),
        new Plane(
            new Vector3(-100, -100, -100),
            new Vector3(-100, -100, 100),
            new Vector3(100, -100, -100),
            new Vector3(100, -100, 100)
        )
    ];

    let cubes : Cube[] = [
        new Cube(new Vector3(0, -200, 0), 100),
        new Cube(new Vector3(0, 0, 0), 100),
        new Cube(new Vector3(0, -200, 200), 100),
        new Cube(new Vector3(0, 200, 0), 100),
        new Cube(new Vector3(0, -200, -200), 100)
    ];





    let heading = rotationX * (3.14159/180);
    let headingTransform : Matrix3 = new Matrix3(
            Math.cos(heading), 0, -Math.sin(heading),
            0, 1, 0,
            Math.sin(heading), 0, Math.cos(heading)
    );


    let pitch = rotationY * (3.14159/180);
    let pitchTransform: Matrix3 = new Matrix3(
        1, 0, 0,
        0, Math.cos(pitch), Math.sin(pitch),
        0, -Math.sin(pitch), Math.cos(pitch)
    );  
    let transform: Matrix3 = headingTransform.multiply(pitchTransform);   

    transform.print()

    cubes.forEach(cube =>  {
        cube.getFaces().forEach(plane => {
            let point1 : Vector3 = transform.worldToScreen(plane.v1)
            let point2 : Vector3 = transform.worldToScreen(plane.v2)
            let point3 : Vector3 = transform.worldToScreen(plane.v3)
            let point4 : Vector3 = transform.worldToScreen(plane.v4)
    
            renderer.draw_line([point1.x, point1.y], [point2.x, point2.y], 1);
            renderer.draw_line([point3.x, point3.y], [point2.x, point2.y], 1);
            renderer.draw_line([point3.x, point3.y], [point1.x, point1.y], 1);
            renderer.draw_line([point3.x, point3.y], [point4.x, point4.y], 1);
            renderer.draw_line([point2.x, point2.y], [point4.x, point4.y], 1);
        });
    });



    return;

    triangles.forEach(triangle => {

        let point1 : Vector3 = transform.worldToScreen(triangle.v1)
        let point2 : Vector3 = transform.worldToScreen(triangle.v2)
        let point3 : Vector3 = transform.worldToScreen(triangle.v3)

        renderer.draw_line([point1.x, point1.y], [point2.x, point2.y], 1);
        renderer.draw_line([point3.x, point3.y], [point2.x, point2.y], 1);
        renderer.draw_line([point3.x, point3.y], [point1.x, point1.y], 1);


    });

 
} render();


function moveCamera(mouseX: number, mouseY: number) {

    let wfactor = (180/width) * 2
    let hfactor = (90/height) * 2

    let woffset = 40
    let hoffset = 8

    rotationX = clamp(mouseX*wfactor - width/4 + woffset, -180, 180);
    rotationY = clamp(mouseY*hfactor - height/4 + hoffset, -90, 90);

    console.log("x: " + rotationX + " y: " + rotationY)

    render();
}

    
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 87: { // W
            camera.position.z += 1;
        } break;
        case 83: { // S
            camera.position.z -= 1;
        } break;
        case 68: { // D
            camera.position.x += 1;
        } break;
        case 65: { // A
            camera.position.x -= 1;
        } break;
        default: {
            console.log("Other Button pressed.")
        } break;
    }
    render();
});

document.addEventListener('mousemove', function(event) {
    if (dragging)
        moveCamera(event.clientX, event.clientY);
    
});

document.addEventListener('mousedown', function(event) {
    dragging = true
});
document.addEventListener('mouseup', function(event) {
    dragging = false
});
document.addEventListener('wheel', function(event) {
    const zoomSensitivity = -0.1;
    camera.zoom += event.deltaY * zoomSensitivity;
    camera.zoom = Math.max(20, Math.min(100, camera.zoom)); // Clamping the FoV between 20 and 100 degrees

    // const fovRadians = camera.zoom * Math.PI / 180; // Convert fov to radians
    // camera.projectionmatrix[0] = camera.far / (camera.aspectratio * Math.tan(fovRadians / 2));
    // camera.projectionmatrix[5] = camera.far / Math.tan(fovRadians / 2);
    // camera.projectionmatrix[10] = (camera.far + camera.near) / (camera.far - camera.near);
    // camera.projectionmatrix[11] = (-2 * camera.far * camera.near) / (camera.far - camera.near);
    render(); // Re-render the scene with the new projection matrix
});


function clamp(value: number, floor: number, ceil: number): number {
   return min(max(value, floor), ceil); 
}

function min(a: number, b: number): number {
    return a < b ? a : b; 
}
function max(a: number, b: number): number {
    return a < b ? b : a; 
}