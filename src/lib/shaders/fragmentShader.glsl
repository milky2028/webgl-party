#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

in vec2 texture_coordinates_out;

uniform sampler2D image;
 
// we need to declare an output for the fragment shader
out vec4 color_output;
 
void main() {
  // look up color on the texture
  color_output = texture(image, texture_coordinates_out);
}