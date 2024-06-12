import { Shader } from "./shader.js";
export class WebGL {
    constructor() {
        this.canvas = document.getElementById("webglCanvas");
        this.canvasSize = [this.canvas.width, this.canvas.height];
        this.webgl = this.canvas.getContext('webgl');
        this.vertexBuffer = this.webgl.createBuffer();
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
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = this.webgl) === null || _a === void 0 ? void 0 : _a.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black
        (_b = this.webgl) === null || _b === void 0 ? void 0 : _b.clear(this.webgl.COLOR_BUFFER_BIT);
        (_c = this.webgl) === null || _c === void 0 ? void 0 : _c.useProgram(this.programInfo);
        // Tell WebWebGL.webgl how to pull out the positions from the position buffer
        (_d = this.webgl) === null || _d === void 0 ? void 0 : _d.bindBuffer((_e = this.webgl) === null || _e === void 0 ? void 0 : _e.ARRAY_BUFFER, this.vertexBuffer);
        (_f = this.webgl) === null || _f === void 0 ? void 0 : _f.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, this.webgl.FLOAT, false, 0, 0);
        (_g = this.webgl) === null || _g === void 0 ? void 0 : _g.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    }
    pdraw_line(x0, y0, x1, y1, thickass) {
        this.draw_line([x0, y0], [x1, y1], thickass);
    }
    vdrawl_line(p0, p1, thickass) {
        this.draw_line([p0.x, p0.y], [p1.x, p1.y], thickass);
    }
    draw_line(start, end, thickass) {
        var _a, _b, _c, _d, _e, _f;
        let x1 = start[0];
        let y1 = start[1];
        let x2 = end[0];
        let y2 = end[1];
        if (start[0] >= -1 && start[0] <= 1 && start[1] >= -1 && start[1] <= 1 && end[0] >= -1 && end[0] <= 1 && end[1] >= -1 && end[1] <= 1) {
            x1 = start[0];
            y1 = start[1];
            x2 = end[0];
            y2 = end[1];
        }
        else {
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
        (_a = this.webgl) === null || _a === void 0 ? void 0 : _a.bindBuffer((_b = this.webgl) === null || _b === void 0 ? void 0 : _b.ARRAY_BUFFER, vertexBuffer);
        (_c = this.webgl) === null || _c === void 0 ? void 0 : _c.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, this.webgl.FLOAT, false, 0, 0);
        (_d = this.webgl) === null || _d === void 0 ? void 0 : _d.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
        (_e = this.webgl) === null || _e === void 0 ? void 0 : _e.drawArrays((_f = this.webgl) === null || _f === void 0 ? void 0 : _f.LINES, 0, 10); // Draw the line
        // this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.vertexBuffer);
        // this.webgl.bufferData(this.webgl.ARRAY_BUFFER, vertices, this.webgl.STATIC_DRAW);
        // this.webgl?.drawArrays(this.webgl?.LINES, 0, thickass);
    }
    draw_rectangle(P1, P2, thickass) {
        this.pdraw_line(P1.x, P1.y, P1.x, P2.y, thickass);
        this.pdraw_line(P1.x, P2.y, P2.x, P2.y, thickass);
        this.pdraw_line(P1.x, P1.y, P2.x, P1.y, thickass);
        this.pdraw_line(P2.x, P1.y, P2.x, P2.y, thickass);
    }
    setProgramInfo(programInfo) {
        this.programInfo = programInfo;
    }
    getCanvasSize() {
        return this.canvasSize;
    }
}
