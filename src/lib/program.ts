import { gl } from './context';
import { createProgram } from './createProgram';

export const program = createProgram(gl) as WebGLProgram;
if (!program) {
	throw new Error('Failed to create program.');
}

const position = gl.getAttribLocation(program, 'position');
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = [0, 0, 0, 0.5, 0.7, 0];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

export const vertices = gl.createVertexArray();
gl.bindVertexArray(vertices);
gl.enableVertexAttribArray(position);

const size = 2;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;
gl.vertexAttribPointer(position, size, type, normalize, stride, offset);
