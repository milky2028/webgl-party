#version 300 es
  
// an attribute is an input (in) to a vertex shader that receives data from a buffer
in vec2 position;
in vec2 texture_coordinates_in;

uniform vec2 canvas_size;

// pass texture coordinates to fragment shader
out vec2 texture_coordinates_out;
  
// all shaders have a main function
void main() {
  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = position / canvas_size;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = zeroToTwo - 1.0;
 
  // gl_Position is a special variable a vertex shader is responsible for setting
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

  // pass texture coordinates to fragment shader
  texture_coordinates_out = texture_coordinates_in;
}