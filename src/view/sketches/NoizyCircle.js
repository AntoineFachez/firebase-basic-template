import React from "react";
import p5 from "p5";

let num = 360;
let a_x = [num];
let a_y = [num];
let count = 0;
let hu;

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
    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(500, 500);
      p.colorMode(p.HSB, 360, 100, 100, 100);

      hu = p.random(255);
      p.strokeWeight(0.7);

      p.background(0);
      for (let i = 0; i < a_x.length; i++) {
        a_x[i] = p.random(-3, 3);
        a_y[i] = p.random(-3, 3);
      }
    };

    p.draw = () => {
      // And everything that normally goes in draw in here

      _noise(p.width / 2, p.height / 2, 50);

      if (p.mouseIsPressed) {
        p.background(0);
        for (let i = 0; i < num; i++) {
          a_x[i] = 0;
          a_y[i] = 0;
        }
      }
    };
    function _noise(x, y, size) {
      count = 0;
      p.push();
      p.translate(x, y);
      for (let i = 0; i < num; i += 1) {
        p.stroke((hu + p.map(i, 0, 360, 0, 360)) % 360, 50, 80, 50);
        p.point(
          size * p.cos(p.radians(i)) + a_x[i],
          size * p.sin(p.radians(i)) + a_y[i]
        );
        a_x[i] += p.random(-4, 4) * p.noise(x, p.frameCount * 0.01);
        a_y[i] += p.random(-4, 4) * p.noise(x, p.frameCount * 0.01);
      }

      p.pop();
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
