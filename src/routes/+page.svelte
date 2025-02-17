<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;

	async function draw() {
		const { gl } = await import('$lib/context');
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		const { program, vertices, resolution, color } = await import('$lib/program');
		gl.useProgram(program);

		gl.bindVertexArray(vertices);
		gl.uniform2f(resolution, gl.canvas.width, gl.canvas.height);
		gl.uniform4f(color, 138 / 255, 43 / 255, 226 / 255, 1);

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
