type VertexOrFragment =
	| WebGL2RenderingContext['VERTEX_SHADER']
	| WebGL2RenderingContext['FRAGMENT_SHADER'];

export function compileShader(
	gl: WebGL2RenderingContext,
	shaderSource: string,
	type: VertexOrFragment
) {
	const shader = gl.createShader(type);
	if (!shader) {
		console.error('Failed to create shader.');
		return;
	}

	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);

	const success: boolean = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!success) {
		gl.deleteShader(shader);
		console.error(gl.getShaderInfoLog(shader));
		return;
	}

	return shader;
}
