export const canvas = document.createElement('canvas');
canvas.id = 'rendering-canvas';
export const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
