import * as WebGL from "./webgl";
import GL from "./gl-obj";
import loadImages from "./image-loader";
import createCanvas from "./create-canvas";
import { Quint, gsap } from "gsap";

let requireShaderScript = require("glslify");

let vertShader = requireShaderScript('./shaders/simple.vert');
let fragShader = requireShaderScript('./shaders/water.frag');

const defaultOptions={
  renderShadow:false,
  minRefraction:256,
  maxRefraction:512,
  brightness:1,
  alphaMultiply:20,
  alphaSubtract:5,
  parallaxBg:5,
  parallaxFg:20
}
function RainRenderer(canvas,canvasLiquid, imageFg, imageBg, imageShine=null,options={}){

  this.canvas=canvas;
  this.canvasLiquid=canvasLiquid;
  this.imageShine=imageShine;
  this.imageFg=imageFg;
  this.imageBg=imageBg;
  this.options=Object.assign({},defaultOptions, options);
  this.init();
}

RainRenderer.prototype={
  canvas:null,
  gl:null,
  canvasLiquid:null,
  width:0,
  height:0,
  imageShine:"",
  imageFg:"",
  imageBg:"",
  textures:null,
  programWater:null,
  programBlurX:null,
  programBlurY:null,
  parallaxX:0,
  parallaxY:0,
  renderShadow:false,
  options:null,
  init(){
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.gl=new GL(this.canvas, {alpha:false},vertShader,fragShader);
    let gl=this.gl;
    this.programWater=gl.program;

    gl.createUniform("2f","resolution",this.width,this.height);
    gl.createUniform("1f","textureRatio",this.imageBg.width/this.imageBg.height);
    gl.createUniform("1i","renderShine",this.imageShine==null?false:true);
    gl.createUniform("1i","renderShadow",this.options.renderShadow);
    gl.createUniform("1f","minRefraction",this.options.minRefraction);
    gl.createUniform("1f","refractionDelta",this.options.maxRefraction-this.options.minRefraction);
    gl.createUniform("1f","brightness",this.options.brightness);
    gl.createUniform("1f","alphaMultiply",this.options.alphaMultiply);
    gl.createUniform("1f","alphaSubtract",this.options.alphaSubtract);
    gl.createUniform("1f","parallaxBg",this.options.parallaxBg);
    gl.createUniform("1f","parallaxFg",this.options.parallaxFg);


    gl.createTexture(null,0);

    this.textures=[
      {name:'textureShine', img:this.imageShine==null?createCanvas(2,2):this.imageShine},
      {name:'textureFg', img:this.imageFg},
      {name:'textureBg', img:this.imageBg}
    ];

    this.textures.forEach((texture,i)=>{
      gl.createTexture(texture.img,i+1);
      gl.createUniform("1i",texture.name,i+1);
    });

    this.draw();
  },
  draw(){
    this.gl.useProgram(this.programWater);
    this.gl.createUniform("2f", "parallax", this.parallaxX,this.parallaxY);
    this.updateTexture();
    this.gl.draw();

    requestAnimationFrame(this.draw.bind(this));
  },
  resize(){
    // Get the current actual size of the main canvas element
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const dpi = window.devicePixelRatio;

    // Calculate display size vs drawing buffer size
    const displayWidth = Math.round(width * dpi);
    const displayHeight = Math.round(height * dpi);

    // console.log(`RainRenderer resizing. Client: ${width}x${height}, Display: ${displayWidth}x${displayHeight}`); // Debugging

    // Check if dimensions actually changed
    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {

      // Update the main canvas attributes
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;

       // Update internal width/height properties (optional but good practice)
       this.width = displayWidth;
       this.height = displayHeight;


      // Update the WebGL viewport
      // Use this.gl.gl if gl-obj wraps the context in a 'gl' property
      // Or just this.gl if gl-obj returns the context directly
      // Check gl-obj.js - it stores the context in this.gl
      if (this.gl && this.gl.gl && this.gl.gl.viewport) {
          this.gl.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
          // console.log(`Viewport updated to: ${this.canvas.width}x${this.canvas.height}`); // Debugging
      } else {
           console.error("Could not access gl.viewport");
      }


      // Update the resolution uniform
      // Use this.gl which is the GL object wrapper from gl-obj.js
       if (this.gl && this.gl.createUniform) {
         this.gl.useProgram(this.programWater); // Ensure correct program is active
         this.gl.createUniform("2f", "resolution", this.canvas.width, this.canvas.height);
        //  console.log(`Resolution uniform updated to: ${this.canvas.width}x${this.canvas.height}`); // Debugging
       } else {
         console.error("Could not access gl.createUniform");
       }


      // Note: Camera aspect ratio update would go here if there was a camera object
    }
  },
  updateTextures(){
    this.textures.forEach((texture,i)=>{
      this.gl.activeTexture(i+1);
      this.gl.updateTexture(texture.img);
    })
  },
  updateTexture(){
    this.gl.activeTexture(0);
    this.gl.updateTexture(this.canvasLiquid);
  },
  get overlayTexture(){

  },
  set overlayTexture(v){

  }
}

export default RainRenderer;
