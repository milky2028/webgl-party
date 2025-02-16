import { compileShader } from './compileShader';
import { gl } from './context';
import vertexShaderSource from './vertexShader.glsl';
import fragmentShaderSource from './fragmentShader.glsl';

export const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
export const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
