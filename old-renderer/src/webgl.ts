import { Shader } from "./shader.js";
import { Vector2 } from "./definitions.js";



export class WebGL {
    public canvas: HTMLCanvasElement
    private canvasSize: [number, number]
    public webgl: WebGLRenderingContext
    private vertexBuffer: WebGLBuffer
    private shader: Shader;


    // private programInfo: {
    //     program: WebGLProgram;
    //     attribLocations: {
    //         vertexPosition: number;
    //     };
    // };

    public programInfo : any;
    private program: any;

    public constructor() {
        this.canvas = document.getElementById("webglCanvas") as HTMLCanvasElement;
        this.canvasSize = [this.canvas.width, this.canvas.height];
        this.webgl = this.canvas.getContext('webgl') as WebGLRenderingContext;
        this.vertexBuffer = this.webgl.createBuffer() as WebGLBuffer;
        this.shader = new Shader(this.webgl);

        //this.programInfo = { program: null, attribLocations: 10.0}

        if (!this.webgl) {
            alert('Unable to intialize WebGL!');
            throw new Error('WebGL not available');
        }

        this.program = this.shader.getProgram();
        if (!this.program) {
            alert('Unable to initialize the shader program');
            throw new Error('Shader program not available');
        }

        this.programInfo = {
            program: this.program,
            attribLocations: {
                vertexPosition: this.webgl.getAttribLocation(this.shader.getProgram(), 'aVertexPosition'),
            },
        };


        // const program = this.webgl.createProgram() as WebGLProgram;
        // this.webgl.attachShader(program, this.shader.load(this.webgl.VERTEX_SHADER, this.shader.vertexShaderSource) as WebGLShader);
        // this.webgl.attachShader(program, this.shader.load(this.webgl.VERTEX_SHADER, this.shader.fragmentShaderSource) as WebGLShader);
        // this.webgl.linkProgram(program);

        // if (!this.webgl.getProgramParameter(program, this.webgl.LINK_STATUS)) {
        //     alert('Unable to initialize the shader program: ' + this.webgl.getProgramInfoLog(program));
        //     this.webgl.deleteProgram(program);
        //     return;
        // }
    }

    public render() {
        this.webgl?.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black
        this.webgl?.clear(this.webgl.COLOR_BUFFER_BIT);
    
        this.webgl?.useProgram(this.programInfo);
    
        // Tell WebWebGL.webgl how to pull out the positions from the position buffer
        this.webgl?.bindBuffer(this.webgl?.ARRAY_BUFFER, this.vertexBuffer);
        this.webgl?.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, this.webgl.FLOAT, false, 0, 0);
        this.webgl?.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    }


    public pdraw_line(x0: number, y0: number, x1: number, y1: number, thickass: number) : void {
        this.draw_line([x0, y0], [x1, y1], thickass);
    }

    public vdrawl_line(p0: Vector2, p1: Vector2, thickass: number): void {
        this.draw_line([p0.x, p0.y], [p1.x, p1.y], thickass);

    }


    public draw_line(start: [number, number], end: [number, number], thickass: number) : void {

        let x1 = start[0];
        let y1 = start[1];
        let x2 = end[0];
        let y2 = end[1];

        if (start[0] >= -1 && start[0] <= 1 && start[1] >= -1 && start[1] <= 1 && end[0] >= -1 && end[0] <= 1 && end[1] >= -1 && end[1] <= 1) {
            x1 = start[0];
            y1 = start[1];
            x2 = end[0];
            y2 = end[1];
        } else {
            x1 = start[0] / this.canvasSize[0];
            y1 = start[1] / this.canvasSize[1];
            x2 = end[0] / this.canvasSize[0];
            y2 = end[1] / this.canvasSize[1];
        }


        const vertices = new Float32Array([
            x1, y1,
            x2, y2
        ]);
        
        const vertexBuffer = this.webgl.createBuffer();
        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, vertexBuffer);
        this.webgl.bufferData(this.webgl.ARRAY_BUFFER, vertices, this.webgl.STATIC_DRAW);


        this.webgl?.bindBuffer(this.webgl?.ARRAY_BUFFER, vertexBuffer);
        this.webgl?.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, this.webgl.FLOAT, false, 0, 0);
        this.webgl?.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
        this.webgl?.drawArrays(this.webgl?.LINES, 0, 10);  // Draw the line


        // this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.vertexBuffer);
        // this.webgl.bufferData(this.webgl.ARRAY_BUFFER, vertices, this.webgl.STATIC_DRAW);
        // this.webgl?.drawArrays(this.webgl?.LINES, 0, thickass);
    }

    public draw_rectangle(P1: Vector2, P2: Vector2, thickass: number) : void {
        this.pdraw_line(P1.x, P1.y, P1.x, P2.y, thickass);
        this.pdraw_line(P1.x, P2.y, P2.x, P2.y, thickass);
        this.pdraw_line(P1.x, P1.y, P2.x, P1.y, thickass);
        this.pdraw_line(P2.x, P1.y, P2.x, P2.y, thickass);
    }

    public setProgramInfo(programInfo: WebGLProgram) {
        this.programInfo = programInfo;
    } 

    public getCanvasSize() { 
        return this.canvasSize;
    }
}