<script lang="ts">
	import { createImage } from '$lib/createImage';
	import { onMount } from 'svelte';
	import homerUrl from '$lib/images/homer.png';
	import { setRectangle } from '$lib/setRectangle';

	let container: HTMLDivElement;

	async function draw() {
		const { gl } = await import('$lib/context');
		const homer = await createImage(homerUrl);
		const { program, vertices, canvasSize, image, positionBuffer } = await import('$lib/program');

		const mipLevel = 0;
		const internalFormat = gl.RGBA;
		const srcFormat = gl.RGBA;
		const srcType = gl.UNSIGNED_BYTE;
		gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, homer);

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.useProgram(program);

		gl.bindVertexArray(vertices);
		gl.uniform2f(canvasSize, gl.canvas.width, gl.canvas.height);
		gl.uniform1i(image, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		setRectangle(gl, 0, 0, homer.width, homer.height);

		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

	let canvasMounted = false;
	onMount(async () => {
		const { canvas } = await import('$lib/context');
		if (!canvasMounted) {
			container.appendChild(canvas);
			canvasMounted = true;
		}

		await draw();
	});
</script>

<style>
	:global(#rendering-canvas) {
		border: 1px solid blueviolet;
	}
</style>

<div bind:this={container}></div>
<input type="file" />
