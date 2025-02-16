#version 300 es
  
// an attribute is an input (in) to a vertex shader that receives data from a buffer
in vec4 position;
  
// all shaders have a main function
void main() {
  
  // gl_Position is a special variable a vertex shader is responsible for setting
  gl_Position = position;
}