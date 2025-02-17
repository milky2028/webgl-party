<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;

	async function onFileUpload(event: Event & { currentTarget: HTMLInputElement }) {
		const file = event.currentTarget?.files?.[0];

		const { gl } = await import('$lib/context');
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		const { program, vertices } = await import('$lib/program');
		gl.useProgram(program);
		gl.bindVertexArray(vertices);

		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}

	let canvasMounted = false;
	onMount(async () => {
		const { canvas } = await import('$lib/context');
		if (!canvasMounted) {
			container.appendChild(canvas);
			canvasMounted = true;
		}
	});
</script>

<style>
	:global(#rendering-canvas) {
		width: 800px;
		height: 500px;
		border: 1px solid blueviolet;
	}
</style>

<div bind:this={container}></div>
<input type="file" onchange={onFileUpload} />
