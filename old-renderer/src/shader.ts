
export class Shader {
    private webgl : WebGLRenderingContext;
    private program : WebGLProgram;

    constructor(refWebGL: WebGLRenderingContext) {
        this.webgl = refWebGL;
        this.program = this.init()
    }

    public vertexShaderSource : string = `
    attribute vec4 aVertexPosition;
    void main() {
        gl_Position = aVertexPosition;
    }
    `;

    public fragmentShaderSource : string = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);  // White color
    }
    `;

    public load(type: number, source: string): WebGLShader {
        const shader = this.webgl?.createShader(type)!;
        this.webgl?.shaderSource(shader, source);
        this.webgl?.compileShader(shader);
        
        if (!this.webgl?.getShaderParameter(shader, this.webgl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + this.webgl?.getShaderInfoLog(shader));
            this.webgl?.deleteShader(shader);
            return null!;
        }
        
        return shader;
    }
    


    public init() {
        const vertexShader = this.load(this.webgl?.VERTEX_SHADER as number, this.vertexShaderSource);
        const fragmentShader = this.load(this.webgl?.FRAGMENT_SHADER as number, this.fragmentShaderSource);
        
        const shaderProgram = this.webgl?.createProgram()!;
        this.webgl?.attachShader(shaderProgram, vertexShader);
        this.webgl?.attachShader(shaderProgram, fragmentShader);
        this.webgl?.linkProgram(shaderProgram);
        
        if (!this.webgl?.getProgramParameter(shaderProgram, this.webgl?.LINK_STATUS as number)) {
            alert('Unable to initialize the shader program: ' + this.webgl?.getProgramInfoLog(shaderProgram));
            return null!;
        }
        
        return shaderProgram;
    }


    public getProgram() : WebGLProgram {
        return this.program;
    }
} 