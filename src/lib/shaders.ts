import { compileShader } from './compileShader';
import { gl } from './context';
import vertexShaderSource from './shaders/vertexShader.glsl';
import fragmentShaderSource from './shaders/fragmentShader.glsl';

export const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
export const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
