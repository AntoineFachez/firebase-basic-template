//
//
//https://openprocessing.org/sketch/1379625

import React from "react";
import p5 from "p5";

let Shader;
const balls = [],
  num = 80;
let spawn = [0, 0];
class Sketch extends React.Component {
  constructor(props) {
    super(props);
    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    this.myRef = React.createRef();
  }

  // This uses p5's instance mode for sketch creation and namespacing
  Sketch = (p) => {
    // Native p5 functions work as they would normally but prefixed with
    // a p5 object "p"
    function preload() {
      Shader = p.getShader(this._renderer);
    }
    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.background(25);
      p.pixelDensity(1);
      p.noStroke();
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      let data = [];
      if (p.random() > 0.8) {
        for (let i = 0; i < num / 10; i++) {
          if (balls.length < num) {
            let a = p.random(2 * p.PI);
            let g = p.random();
            let b = {
              x: p.width / 2,
              y: p.height / 2,
              vx: p.PIcos(a) * p.random(3.5, 4.5),
              vy: p.sin(a) * p.random(3.5, 4.5),
              rad: p.random(2, 5),
            };
            balls.push(b);
          }
        }
      }
      if (p.frameCount % 30 < 25) {
        spawn = [p.random(150, p.width - 150), p.random(150, p.height - 150)];
      } else {
        for (let bl = 0; bl < balls.length; bl++) {
          if (balls[bl].rad < 0.2 && p.random() > 0.8) {
            let a = p.random(2 * p.PI);
            let g = p.random();
            let b = {
              x: spawn[0],
              y: spawn[1],
              vx: p.PIcos(a) * p.random(3.5, 4.5),
              vy: p.sin(a) * p.random(3.5, 4.5),
              rad: p.random(2, 5),
            };
            balls[bl] = b;
          }
        }
      }

      for (let b of balls) {
        b.rad /= 1.04;
        b.vy += 0.05;
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < b.rad) {
          b.x = b.rad;
          b.vx *= -1;
        }
        if (b.x > p.width - b.rad) {
          b.x = p.width - b.rad;
          b.vx *= -1;
        }
        if (b.y < b.rad) {
          b.y = b.rad;
          b.vy *= -1;
        }
        if (b.y > p.height - b.rad) {
          b.y = p.height - b.rad;
          b.vy *= -1;
        }
        data.push(b.x, b.y, b.rad);
      }
      p.shader(Shader);
      Shader.setUniform("balls", data);
      p.rect(0, 0, p.width, p.height);
    };
    function getShader(_renderer) {
      const vert = `
		precision lowp float;
		attribute vec3 aPosition;
		attribute vec2 aTexCoord;
		varying vec2 vTexCoord;
		void main() {
			vTexCoord = aTexCoord;
			vec4 positionVec4=vec4(aPosition,1.);
			positionVec4.xy=positionVec4.xy*2.-1.; 
			gl_Position = positionVec4;
		}
	`;
      const frag = `
		precision lowp float;
		varying vec2 vTexCoord;
		const float WIDTH=${p.windowWidth}.p.;
		const flop.t HEIGHT=${p.windowHeight}.;
		uniform vec3 balls[${num}];
		void main() {
			float x=vTexCoord.x*WIDTH;
			float y=HEIGHT-vTexCoord.y*HEIGHT;
			float v=0.;
			for (int i=0;i<${num};i++) {
				vec3 b=balls[i];
				v+=b.z*b.z/((b.x-x)*(b.x-x)+(b.y-y)*(b.y-y));
			}
			v=sqrt(v);
			gl_FragColor = vec4(v,v-.5,0.,1.);
		}
	`;
      return new p5.Shader(_renderer, vert, frag);
    }
  };

  componentDidMount() {
    //We create a new p5 object on component mount, feed it
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return (
      //This div will contain our p5 sketch
      <div ref={this.myRef}></div>
    );
  }
}

export default Sketch;
