import { gl } from './context';
import vertexShaderSource from './shaders/vertexShader.glsl';
import fragmentShaderSource from './shaders/fragmentShader.glsl';
import { createBufferInfoFromArrays, createProgramInfo, setBuffersAndAttributes } from 'twgl.js';

export const info = createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);

const position = gl.getAttribLocation(info.program, 'position');

const vertices = gl.createVertexArray();
gl.bindVertexArray(vertices);

export const positionBuffer = gl.createBuffer();
gl.enableVertexAttribArray(position);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const size = 2;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;
gl.vertexAttribPointer(position, size, type, normalize, stride, offset);

const buffers = createBufferInfoFromArrays(gl, {
	texture_coordinates_in: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]
});
setBuffersAndAttributes(gl, info, buffers);
