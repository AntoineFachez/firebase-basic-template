import React from "react";
import Sketch from "react-p5";
// import Roboto from "../../fonts/digitalDotBold.ttf";
import font from "../../fonts/FuturaLT-Light.ttf";

class TitleCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // to store the location of the text
      points: [],
      // to store the font used
      font: null,
    };
  }

  preload = (p5) => {
    // loading a font to be able to convert text to points
    let myfont = p5.loadFont(font);
    this.setState({ font: myfont });
    console.log(myfont);
  };

  setup = (p5, canvasParentRef) => {
    const { font } = this.state;
    p5.createCanvas(600, 400).parent(canvasParentRef);
    // convert the text to points (x, y)
    let txtPoints = font.textToPoints("p o o1", 50, 50, 100, {});
    this.setState({ points: txtPoints });
  };

  draw = (p5) => {
    const { points } = this.state;
    // set background and text color
    p5.background(0, 0, 0);

    p5.translate(p5.width / 4, p5.height / 4);
  };

  render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} preload={this.preload} />
    );
  }
}

export default TitleCanvas;
