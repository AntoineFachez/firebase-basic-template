import React, { Component } from "react";
import p5 from "p5";
import image from "../../images/p00l glow Square.png";

export default class RotatePuzzle extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    var nAgents = 10000;

    let agent = [];

    this.img = p.loadImage(image);

    p.setup = () => {
      p.createCanvas(400, 400);
      for (let i = 0; i < nAgents; i++) {
        let x = p.random(0, p.width);
        let y = p.random(0, p.height);
        let myRGB = this.img.get(x, y);
        agent.push(new Agent(x, y, myRGB));
      }
    };

    p.draw = () => {
      p.background(0, 0, 0);
      p.imageMode(p.CENTER);
      p.translate(p.width / 2, p.height / 2);
      p.image(this.img, 0, 0, p.width / 2, p.width / 2);
    };

    class Agent {
      constructor(x0, y0, color0) {
        this.p = p.createVector(x0, y0);
        this.direction = 1;
        this.color = color0;
        this.scale = 5;
        this.strokeWidth = 0.01;
        this.distance = 0;
        this.step = 3;
        this.pOld = p.createVector(this.p.x, this.p.y);
        this.split = 4;
      }

      update(xx, yy) {
        this.p.x +=
          this.direction * p.vector_field(this.p.x, this.p.y, this.scale).x;
        this.p.y +=
          this.direction * p.vector_field(this.p.x, this.p.y, this.scale).y;

        this.distance += this.step;
        this.scale = p.map(this.p.x, 0, p.width, 3, 10);
        p.stroke(this.color);
        p.line(this.pOld.x, this.pOld.y, this.p.x, this.p.y);
        this.pOld.set(this.p);
      }
    }

    function vector_field(x, y, myScale) {
      x = p.map(x, 0, p.width, -myScale, myScale);
      y = p.map(y, 0, p.height, -myScale, myScale);

      let k1 = 5;
      let k2 = 3;

      let u = p.sin(k1 * y) + p.floor(p.cos(k2 * y));
      let v = p.sin(k2 * x) - p.cos(k1 * x);

      // litle trick to move from left to right

      if (u <= 1) {
        //u = -u;
      }

      return p.createVector(u, v);
    }
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}
