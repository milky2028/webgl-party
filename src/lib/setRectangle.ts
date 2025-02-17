export function setRectangle(gl: WebGL2RenderingContext, width: number, height: number) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([0, 0, width, 0, 0, height, 0, height, width, 0, width, height]),
		gl.STATIC_DRAW
	);
}
