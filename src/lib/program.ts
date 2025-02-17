import { gl } from './context';
import vertexShaderSource from './shaders/vertexShader.glsl';
import fragmentShaderSource from './shaders/fragmentShader.glsl';
import { createProgramInfo } from 'twgl.js';

export const programInfo = createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
export const { program } = programInfo;

const position = gl.getAttribLocation(program, 'position');
export const textureCoordinates = gl.getAttribLocation(program, 'texture_coordinates_in');

export const canvasSize = gl.getUniformLocation(program, 'canvas_size');
export const image = gl.getUniformLocation(program, 'image');

export const vertices = gl.createVertexArray();
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

const textureCoordinatesBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinatesBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER,
	new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
	gl.STATIC_DRAW
);

gl.enableVertexAttribArray(textureCoordinates);
gl.vertexAttribPointer(textureCoordinates, size, type, normalize, stride, offset);

const texture = gl.createTexture();
gl.activeTexture(gl.TEXTURE0 + 0);
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
