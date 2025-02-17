export const canvas = document.createElement('canvas');
canvas.id = 'rendering-canvas';
canvas.width = window.innerWidth;
canvas.height = 500;

export const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
