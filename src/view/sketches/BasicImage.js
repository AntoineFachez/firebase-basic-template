import React, { Component } from "react";
import p5 from "p5";
import image from "../../images/p00l glow Square.png";

export default class RotatePuzzle extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    // var nAgents = 10000;

    // let agent = [];

    this.img = p.loadImage(image);

    p.setup = () => {
      p.createCanvas(400, 400);
      //
    };

    p.draw = () => {
      p.background(0, 0, 0);
      p.image(this.img, 0, 0, p.width / 2, p.width / 2);
      // p.imageMode(p.CENTER);
      // p.translate(p.width / 2, p.height / 2);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}
