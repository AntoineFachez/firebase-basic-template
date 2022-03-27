import React, { useState } from "react";
import Sketch from "react-p5";
// import Roboto from "../../fonts/digitalDotBold.ttf";
import font from "../../fonts/FuturaLT-Light.ttf";

function TitleCanvas(props) {
  const initialState = {
    // to store the location of the text
    points: [],
    // to store the font used
    font: null,
  };
  const [state, setState] = useState(initialState);

  const preload = (p5) => {
    // loading a font to be able to convert text to points
    let myfont = p5.loadFont(font);
    setState({ font: myfont });
    // console.log(myfont);
  };

  const setup = (p5) => {
    const { font } = state;
    p5.createCanvas(600, 400);
    // convert the text to points (x, y)
    let txtPoints = font.textToPoints("p o o1", 50, 50, 100, {});
    setState({ points: txtPoints });
  };

  const draw = (p5) => {
    const { points } = state;
    // set background and text color
    p5.background(0, 0, 0);

    p5.translate(p5.width / 4, p5.height / 4);

    let baseDotColor;
    // drawing circles for each point on the text
    for (let i = 0; i < points.length; i++) {
      // somewhat "randomizing" the colors of the dots
      let date = new Date();
      let seconds = date.getSeconds();
      if (i % (seconds % 20) === 0) {
        baseDotColor = "#ff69b4";
      } else {
        baseDotColor = "#fff";
      }

      // draw the dots
      let p = points[i];
      p5.fill(baseDotColor);
      p5.circle(p.x, p.y, 7);
    }
  };

  return <Sketch setup={setup} draw={draw} preload={preload} />;
}

export default TitleCanvas;
