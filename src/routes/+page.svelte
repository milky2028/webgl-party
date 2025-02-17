<script lang="ts">
	import { onMount } from 'svelte';
	import { setRectangle } from '$lib/setRectangle';
	import { createBuffer } from '$lib/createBuffer';
	import { createTexture, setUniforms } from 'twgl.js';

	let container: HTMLDivElement;

	function draw(
		gl: WebGL2RenderingContext,
		program: typeof import('$lib/program'),
		image: { buffer: Uint8ClampedArray; x: number; y: number }
	) {
		const start = performance.now();

		const texture = createTexture(gl, { src: image.buffer, width: image.x, height: image.y });
		setUniforms(program.info, { image: texture });

		gl.bindBuffer(gl.ARRAY_BUFFER, program.positionBuffer);
		setRectangle(gl, image.x, image.y);

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
		gl.useProgram(program.info.program);

		setUniforms(program.info, { canvas_size: [gl.canvas.width, gl.canvas.height] });

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
