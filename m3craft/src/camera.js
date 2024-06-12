import { Vector2, Vector3 } from "./definitions.js";
export class Camera {
    constructor() {
        this.fov = 90;
        this.near = 100;
        this.far = 200;
        this.aspectratio = 800 / 600;
        this.zoom = 1;
        this.yaw = 1;
        this.pitch = 1;
        this.width = 800;
        this.height = 600;
        this.position = new Vector3(0, -10, 3);
        this.vertices = [
            [-1, -1, -1], // Vertex 0
            [1, -1, -1], // Vertex 1
            [1, 1, -1], // Vertex 2
            [-1, 1, -1], // Vertex 3
            [-1, -1, 1], // Vertex 4
            [1, -1, 1], // Vertex 5
            [1, 1, 1], // Vertex 6
            [-1, 1, 1] // Vertex 7
        ];
        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // Bottom face
            [4, 5], [5, 6], [6, 7], [7, 4], // Top face
            [0, 4], [1, 5], [2, 6], [3, 7] // Connecting sides
        ];
        this.projectionmatrix = [0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0];
        const fovRadians = this.fov * Math.PI / 180; // Convert fov to radians
        this.projectionmatrix[0] = this.far / (this.aspectratio * Math.tan(fovRadians / 2));
        this.projectionmatrix[5] = this.far / Math.tan(fovRadians / 2);
        this.projectionmatrix[10] = (this.far + this.near) / (this.far - this.near);
        this.projectionmatrix[11] = (-2 * this.far * this.near) / (this.far - this.near);
        this.projectionmatrix[14] = 1;
        this.projectionmatrix[15] = 0;
    }
    move_camera(new_pos) {
        let viewMatrix = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];
        return viewMatrix;
    }
    project_vertex(vertex) {
        // // Convert the 3D vertex to a 4D vertex for matrix multiplication
        // let v = [vertex[0], vertex[1], vertex[2], 1];
        // // Multiply the vertex by the projection matrix
        // let projected = this.multiply_matrix_by_vector3(this.projectionmatrix, v);
        // if (projected[3] !== 0) {
        //     projected[0] /= projected[3];
        //     projected[1] /= projected[3];
        //     projected[2] /= projected[3];
        // }
        // // Transform to screen coordinates (assuming screen dimensions of screenWidth and screenHeight)
        // let screenX = (projected[0] * 0.5 + 0.5) * this.width;
        // let screenY = (1 - (projected[1] * 0.5 + 0.5)) * this.height;
        return new Vector2(0, 0);
    }
    multiply_matrix_by_vector4(matrix, point) {
        let result = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            result[i] = point[0] * matrix[i] + point[1] * matrix[4 + i] + point[2] * matrix[8 + i] + point[3] * matrix[12 + i];
        }
        return result;
    }
}
export class Triangle {
    constructor(v1, v2, v3) {
        this.v1 = new Vector3(0, 0, 0);
        this.v2 = new Vector3(0, 0, 0);
        this.v3 = new Vector3(0, 0, 0);
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
}
export class Plane {
    constructor(v1, v2, v3, v4) {
        this.v1 = new Vector3(0, 0, 0);
        this.v2 = new Vector3(0, 0, 0);
        this.v3 = new Vector3(0, 0, 0);
        this.v4 = new Vector3(0, 0, 0);
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.v4 = v4;
    }
}
export class Cube {
    constructor(position, size) {
        this.position = new Vector3(0, 0, 0);
        this.size = 1;
        this.faces = [];
        this.position = position;
        this.size = size;
        this.faces = [
            new Plane(new Vector3(this.position.x - (1 * size), this.position.y - (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y - (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x - (1 * size), this.position.y + (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y + (1 * size), this.position.z + (1 * size))),
            new Plane(new Vector3(this.position.x - (1 * size), this.position.y + (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x - (1 * size), this.position.y + (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y + (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y + (1 * size), this.position.z + (1 * size))),
            new Plane(new Vector3(this.position.x + (1 * size), this.position.y + (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y - (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y + (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y - (1 * size), this.position.z - (1 * size))),
            new Plane(new Vector3(this.position.x - (1 * size), this.position.y + (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x - (1 * size), this.position.y - (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x - (1 * size), this.position.y + (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x - (1 * size), this.position.y - (1 * size), this.position.z - (1 * size))),
            new Plane(new Vector3(this.position.x - (1 * size), this.position.y - (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y - (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x - (1 * size), this.position.y + (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y + (1 * size), this.position.z - (1 * size))),
            new Plane(new Vector3(this.position.x - (1 * size), this.position.y - (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x - (1 * size), this.position.y - (1 * size), this.position.z + (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y - (1 * size), this.position.z - (1 * size)), new Vector3(this.position.x + (1 * size), this.position.y - (1 * size), this.position.z + (1 * size)))
        ];
    }
    getFaces() {
        return this.faces;
    }
}
