import React, { useState } from "react";
import Sketch from "react-p5";
// import font from "../../fonts/digitalDotBold.ttf";
import font from "../../fonts/FuturaLT-Light.ttf";

function TitleCanvas(props) {
  const initialState = {
    // to store the location of the text
    points: [],
    // to store the font used
    font: null,
    txt: "p 0 0 1",
  };
  const [state, setState] = useState(initialState);
  const txt = "log in";
  const width = 350;
  const height = 180;
  const size = 80;
  const preload = (p5) => {
    // loading a font to be able to convert text to points
    let myfont = p5.loadFont(font);
    setState({ font: myfont });
    // console.log(myfont);
  };

  const setup = (p5) => {
    const { font } = state;
    p5.createCanvas(width, height);
    // p5.background(80, 80, 80);
    // convert the text to points (x, y)
    let txtPoints = font.textToPoints(txt, -50, 70, size, {
      sampleFactor: 0.2,
      // simplifyThreshold: 0.1,
    });
    let txtPoints2ndLine = font.textToPoints("scouting", 30, 30, 100, {});
    setState({ points: txtPoints });
  };

  const draw = (p5) => {
    const { points } = state;
    // set background and text color

    p5.translate(p5.width / 4, p5.height / 3.5);
    p5.rotate(-0.2);
    let baseDotColor;
    let shadowBlur;
    let shadowOffsetX;
    let shadowOffsetY;
    let shadowColor;
    let circleSize;
    let stroke;
    // drawing circles for each point on the text
    for (let i = 0; i < points.length; i++) {
      // somewhat "randomizing" the colors of the dots
      let date = new Date();

      let seconds = date.getMilliseconds();
      let rate = seconds / 500;
      if (i % (rate % 100) === 0) {
        baseDotColor = "#fff";
        shadowBlur = 3;
        shadowOffsetX = 2;
        shadowOffsetY = 5;
        shadowColor = "#EF0CE8";
        circleSize = 3;
      } else {
        baseDotColor = "#f7c6f4";
        shadowBlur = 10;
        shadowOffsetX = 5;
        shadowOffsetY = 2;
        shadowColor = "#594558";
        circleSize = 4;
        // stroke = "#594558";
      }

      // draw the dots
      let p = points[i];
      p5.fill(baseDotColor);
      // p5.stroke(stroke);
      p5.circle(p.x, p.y, circleSize);
      p5.drawingContext.shadowOffsetX = shadowOffsetX;
      p5.drawingContext.shadowOffsetY = shadowOffsetY;
      p5.drawingContext.shadowBlur = shadowBlur;
      p5.drawingContext.shadowColor = shadowColor;
    }
  };

  return (
    <Sketch
      // className="poo1-animation"
      setup={setup}
      draw={draw}
      preload={preload}
    />
  );
}

export default TitleCanvas;
