import React from "react";
import Sketch from "react-p5";
// import Roboto from "../../fonts/digitalDotBold.ttf";
import font from "../../fonts/FuturaLT-Light.ttf";

let url = "https://coolors.co/9b5de5-f15bb5-fee440-00bbf9-00f5d4";
let palette = url
  .replace("https://coolors.co/", "")
  .split("-")
  .map((c) => `#${c}`);

let vmin, vmax;

let fs;
let points;
let bounds;
let txt = "poo1";
let ctx;
let contours = [];

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
  };

  setup = (p5, canvasParentRef) => {
    const { font } = this.state;
    p5.createCanvas(600, 400).parent(canvasParentRef);
    // convert the text to points (x, y)
    vmin = p5.width < p5.height ? p5.width : p5.height;
    vmax = p5.width > p5.height ? p5.width : p5.height;
    fs = vmin * 0.0085;

    points = font.textToPoints(txt, 0, 0, fs, {
      sampleFactor: 8,
      simplifyThreshold: 0,
    });
    bounds = font.textBounds(txt, 0, 0, fs);

    for (let i = 0; i < points.length; i++) {
      let p1 = points[i];
      if (i === 0) {
        contours.push([]);
      } else {
        let p0 = points[i - 1];
        let d = p5.dist(p0.x, p0.y, p1.x, p1.y);
        if (d > fs / 10) {
          contours.push([]);
        }
      }
      contours[contours.length - 1].push(p1);
    }

    contours.sort(function (a, b) {
      let avrAx = 0;
      for (let i = 0; i < a.length; i++) {
        avrAx += a[i].x;
      }
      avrAx /= a.length;
      let avrBx = 0;
      for (let i = 0; i < b.length; i++) {
        avrBx += b[i].x;
      }
      avrBx /= b.length;
      return avrAx - avrBx;
    });

    ctx = p5.drawingContext;
    ctx.shadowBlur = fs * 3;
    p5.strokeWeight(fs * 0.0225);
    p5.strokeJoin(p5.ROUND);
    p5.noFill();
  };
  neon = (p5, drawStroke) => {
    for (let i = 0; i < contours.length; i++) {
      let points = contours[i];

      p5.beginShape(p5.TESS);
      for (let j = 0; j < points.length; j++) {
        let p = points[j];
        let c = p5.color(palette[i % palette.length]);
        let r = c.levels[0];
        let g = c.levels[1];
        let b = c.levels[2];
        let n = p5.noise(i, p5.frameCount * (drawStroke ? 0.03 : 6));
        n = 1.0 - n * n;
        let a = (p5.floor(n * 2) / 2 + 0.1) * 255;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${drawStroke ? 1 : n})`;
        if (drawStroke) {
          p5.stroke(r, g, b, a);
        } else {
          p5.stroke(0);
        }
        p5.vertex(p.x, p.y);
      }
      p5.endShape(p5.LOSE);
    }
    console.log(points);
  };

  draw = (p5, neon) => {
    p5.background(20);
    p5.blendMode(p5.ADD);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.scale(fs * 3.3);
    p5.translate(-bounds.w / 2, bounds.h / 2);
    neon(false);
    neon(true);
    p5.blendMode(p5.BLEND);
  };

  render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} preload={this.preload} />
    );
  }
}

export default TitleCanvas;
