<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;

	function onFileUpload(event: Event & { currentTarget: HTMLInputElement }) {
		const file = event.currentTarget?.files?.[0];
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
