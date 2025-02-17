<script lang="ts">
	import { createImage } from '$lib/createImage';
	import { onMount } from 'svelte';
	import homerUrl from '$lib/images/homer.png';
	import { setRectangle } from '$lib/setRectangle';

	let container: HTMLDivElement;

	async function draw(
		gl: WebGL2RenderingContext,
		program: typeof import('$lib/program'),
		homer: HTMLImageElement
	) {
		const start = performance.now();

		const mipLevel = 0;
		const internalFormat = gl.RGBA;
		const srcFormat = gl.RGBA;
		const srcType = gl.UNSIGNED_BYTE;
		gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, homer);

		gl.uniform1i(program.image, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, program.positionBuffer);
		setRectangle(gl, 0, 0, homer.width, homer.height);

		gl.drawArrays(gl.TRIANGLES, 0, 6);

		console.log(performance.now() - start);
	}

	let canvasMounted = false;
	onMount(async () => {
		const { canvas } = await import('$lib/context');
		if (!canvasMounted) {
			container.appendChild(canvas);
			canvasMounted = true;
		}

		const [{ gl }, program, homer] = await Promise.all([
			import('$lib/context'),
			import('$lib/program'),
			createImage(homerUrl)
		]);

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.useProgram(program.program);
		gl.uniform2f(program.canvasSize, gl.canvas.width, gl.canvas.height);
		gl.bindVertexArray(program.vertices);

		await draw(gl, program, homer);
	});
</script>

<style>
	:global(#rendering-canvas) {
		border: 1px solid blueviolet;
	}
</style>

<div bind:this={container}></div>
<input type="file" />
