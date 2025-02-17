export async function createBuffer(file: File) {
	return new Promise<{ buffer: Uint8ClampedArray; x: number; y: number }>((resolve) => {
		const img = new Image();
		img.src = URL.createObjectURL(file);
		img.onload = async () => {
			const canvas = new OffscreenCanvas(img.width, img.height);
			const ctx = canvas.getContext('2d');
			ctx?.drawImage(img, 0, 0);
			const imageData = ctx?.getImageData(0, 0, img.width, img.height);

			resolve({
				buffer: imageData?.data as Uint8ClampedArray,
				x: img.width,
				y: img.height
			});
		};
	});
}
