export class Shader {
    constructor(refWebGL) {
        this.vertexShaderSource = `
    attribute vec4 aVertexPosition;
    void main() {
        gl_Position = aVertexPosition;
    }
    `;
        this.fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);  // White color
    }
    `;
        this.webgl = refWebGL;
        this.program = this.init();
    }
    load(type, source) {
        var _a, _b, _c, _d, _e, _f;
        const shader = (_a = this.webgl) === null || _a === void 0 ? void 0 : _a.createShader(type);
        (_b = this.webgl) === null || _b === void 0 ? void 0 : _b.shaderSource(shader, source);
        (_c = this.webgl) === null || _c === void 0 ? void 0 : _c.compileShader(shader);
        if (!((_d = this.webgl) === null || _d === void 0 ? void 0 : _d.getShaderParameter(shader, this.webgl.COMPILE_STATUS))) {
            alert('An error occurred compiling the shaders: ' + ((_e = this.webgl) === null || _e === void 0 ? void 0 : _e.getShaderInfoLog(shader)));
            (_f = this.webgl) === null || _f === void 0 ? void 0 : _f.deleteShader(shader);
            return null;
        }
        return shader;
    }
    init() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const vertexShader = this.load((_a = this.webgl) === null || _a === void 0 ? void 0 : _a.VERTEX_SHADER, this.vertexShaderSource);
        const fragmentShader = this.load((_b = this.webgl) === null || _b === void 0 ? void 0 : _b.FRAGMENT_SHADER, this.fragmentShaderSource);
        const shaderProgram = (_c = this.webgl) === null || _c === void 0 ? void 0 : _c.createProgram();
        (_d = this.webgl) === null || _d === void 0 ? void 0 : _d.attachShader(shaderProgram, vertexShader);
        (_e = this.webgl) === null || _e === void 0 ? void 0 : _e.attachShader(shaderProgram, fragmentShader);
        (_f = this.webgl) === null || _f === void 0 ? void 0 : _f.linkProgram(shaderProgram);
        if (!((_g = this.webgl) === null || _g === void 0 ? void 0 : _g.getProgramParameter(shaderProgram, (_h = this.webgl) === null || _h === void 0 ? void 0 : _h.LINK_STATUS))) {
            alert('Unable to initialize the shader program: ' + ((_j = this.webgl) === null || _j === void 0 ? void 0 : _j.getProgramInfoLog(shaderProgram)));
            return null;
        }
        return shaderProgram;
    }
    getProgram() {
        return this.program;
    }
}
