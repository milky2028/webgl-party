import { fragmentShader, vertexShader } from './shaders';

export function createProgram(gl: WebGL2RenderingContext) {
	const program = gl.createProgram();
	if (!vertexShader || !fragmentShader) {
		console.log('Failed to initialize shaders.');
		return;
	}

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);
	const success: boolean = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!success) {
		console.error(gl.getProgramInfoLog(program));
		return;
	}

	return program;
}
