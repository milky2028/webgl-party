export function createImage(url: string) {
	return new Promise<HTMLImageElement>((resolve) => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(img);
	});
}
