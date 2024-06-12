export class Vector2 {
    public x: number = 0;
    public y: number = 0;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Vector3 {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public normalize() : Vector3 {
        let m = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
        return new Vector3( 
            this.x / m,
            this.y / m,
            this.z / m
        ); 
    }

    public subtract(other: Vector3) : Vector3 {
        return new Vector3(
            this.x - other.x, 
            this.y - other.y,
            this.z - other.z
        );
    }

    public cross(other: Vector3) : Vector3 {
        return new Vector3(
            this.y*other.z - this.z*other.y,
            this.z*other.x - this.x*other.z,
            this.x*other.y - this.y*other.x
        );
    }

    public multiply(factor: number) : Vector3 {
        return new Vector3(
            this.x*factor,
            this.y*factor,
            this.z*factor
        );
    }

    public dot(other: Vector3) : number {
        return this.x*this.x + this.y*other.y + this.z*other.z;
    } 
}

export class Matrix3 {
    public matrix : number[] = [0, 0, 0,
                                0, 0, 0,
                                0, 0, 0];
    

    public constructor(x1: number, x2: number, x3: number,
                       y1: number, y2: number, y3: number,
                       z1: number, z2: number, z3: number
    ) {
        this.matrix[0] = x1;
        this.matrix[1] = x2;
        this.matrix[2] = x3;
        this.matrix[3] = y1;
        this.matrix[4] = y2;
        this.matrix[5] = y3;
        this.matrix[6] = z1;
        this.matrix[7] = z2;
        this.matrix[8] = z3;
    }

    public multiply(other: Matrix3) : Matrix3 {
        let result = new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                for (let i = 0; i < 3; i++) {
                    result.matrix[row * 3 + col] += this.matrix[row * 3 + i] * other.matrix[i * 3 + col];
                }
            }
        }
        return result;
    }

    public worldToScreen(inVec: Vector3) : Vector3 {
        return new Vector3(
            inVec.x*this.matrix[0] + inVec.y*this.matrix[3] + inVec.z* this.matrix[6],
            inVec.x*this.matrix[1] + inVec.y*this.matrix[4] + inVec.z* this.matrix[7],
            inVec.x*this.matrix[2] + inVec.y*this.matrix[5] + inVec.z* this.matrix[8]
        );
    }


    public print() : void {
        let text : string = ""
        for (let col = 0; col < 3; col++) {
            text += this.matrix[col*3+0] + ", " + this.matrix[col*3+1] + ", " + this.matrix[col*3+2]
            text += "\n";
        }
        console.log(text)
    }
    
}