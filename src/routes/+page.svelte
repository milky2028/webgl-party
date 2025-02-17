<script lang="ts">
	import { onMount } from 'svelte';
	import { setRectangle } from '$lib/setRectangle';
	import { createBuffer } from '$lib/createBuffer';
	import { setUniforms } from 'twgl.js';

	let container: HTMLDivElement;

	function draw(
		gl: WebGL2RenderingContext,
		program: typeof import('$lib/program'),
		image: { buffer: Uint8ClampedArray; x: number; y: number }
	) {
		const start = performance.now();

		const mipLevel = 0;
		const internalFormat = gl.RGBA;
		const srcFormat = gl.RGBA;
		const srcType = gl.UNSIGNED_BYTE;
		gl.texImage2D(
			gl.TEXTURE_2D,
			mipLevel,
			internalFormat,
			image.x,
			image.y,
			0,
			srcFormat,
			srcType,
			image.buffer
		);

		gl.uniform1i(program.image, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, program.positionBuffer);
		setRectangle(gl, 0, 0, image.x, image.y);

		gl.drawArrays(gl.TRIANGLES, 0, 6);

		console.log(performance.now() - start);
	}

	let canvasMounted = false;
	onMount(async () => {
		const [{ canvas }] = await Promise.all([import('$lib/context'), import('$lib/program')]);
		if (!canvasMounted) {
			container.appendChild(canvas);
			canvasMounted = true;
		}
	});

	async function onFile(event: Event & { currentTarget: HTMLInputElement }) {
		const file = event.currentTarget.files?.[0];
		if (!file) return console.error('No file for some reason');

		const [{ gl }, program, homer] = await Promise.all([
			import('$lib/context'),
			import('$lib/program'),
			createBuffer(file)
		]);

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.useProgram(program.program);

		setUniforms(program.info, { canvas_size: [gl.canvas.width, gl.canvas.height] });
		gl.bindVertexArray(program.vertices);

		draw(gl, program, homer);
	}
</script>

<style>
	:global(#rendering-canvas) {
		border: 1px solid blueviolet;
	}
</style>

<div bind:this={container}></div>
<input type="file" onchange={onFile} />
