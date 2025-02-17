import { gl } from './context';
import vertexShaderSource from './shaders/vertexShader.glsl';
import fragmentShaderSource from './shaders/fragmentShader.glsl';
import {
	createBufferInfoFromArrays,
	createProgramInfo,
	createVAOFromBufferInfo,
	setBuffersAndAttributes,
	setUniforms
} from 'twgl.js';

export const info = createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);

const position = gl.getAttribLocation(info.program, 'position');
export const positionBuffer = gl.createBuffer();
gl.enableVertexAttribArray(position);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.useProgram(info.program);

const buffers = createBufferInfoFromArrays(gl, {
	texture_coordinates_in: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]
});

setBuffersAndAttributes(gl, info, buffers);
setUniforms(info, { canvas_size: [gl.canvas.width, gl.canvas.height] });
createVAOFromBufferInfo(gl, info, buffers);
