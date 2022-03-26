//
//
//
//https://openprocessing.org/sketch/1373576

import React from "react";
import p5 from "p5";
import imgRD from "../../images/p00l glow Square.png";

// const URL = "../../images/p00l glow Square.png";

const BG = "#FEFEFE";

let img;

let x, y, w, h, spx, spy;

let count = 0;
let maxCount = 10;

class Sketch extends React.Component {
  constructor(props) {
    super(props);
    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    this.myRef = React.createRef();
  }

  // This uses p5's instance mode for sketch creation and namespacing
  Sketch = (p) => {
    function preload() {
      img = p.loadImage(imgRD);
    }
    // Native p5 functions work as they would normally but prefixed with
    // a p5 object "p"
    p.setup = () => {
      preload();
      //Everyhting that normally happens in setup works
      p.createCanvas(p.windowWidth, p.windowHeight);

      p.pixelDensity(1);

      p.noFill();
      p.stroke(BG);
      p.strokeWeight(20);

      p.background(BG);

      const ratio = p.min(p.width / img.width, p.height / img.height) * 0.75;

      p.imageMode(p.CENTER);

      p.image(
        img,
        p.width / 2,
        p.height / 2,
        img.width * ratio,
        img.height * ratio
      );

      p.imageMode(p.CORNER);

      setProfile();
    };

    p.draw = () => {
      // preload();
      // And everything that normally goes in draw in here

      if (count >= maxCount) {
        setProfile();

        count = 0;
        maxCount = p.int(p.random(3, 8));
      }

      accel();

      let screenImg = p.get();

      let newImg = p.createImage(p.width, p.height);

      newImg.copy(screenImg, x, y, w, h, x, y, w, h);

      p.image(newImg, spx, spy);

      p.rect(0, 0, p.width, p.height);

      count++;
    };
    function setProfile() {
      if (p.random() < 0.5) {
        x = p.int(p.width / 2 + p.random(-img.width / 2, img.width / 2));
        y = 0;
        w = p.ceil(p.random(20, 100));
        h = p.height;
        spx = 0;
        spy = p.int(p.random(-5, 5));
      } else {
        x = 0;
        y = p.int(p.height / 2 + p.random(-img.height / 2, img.height / 2));
        w = p.width;
        h = p.ceil(p.random(20, 100));
        spx = p.int(p.random(-5, 5));
        spy = 0;
      }
    }

    function accel() {
      if (spx != 0) spx += spx / p.abs(spx);
      if (spy != 0) spy += spy / p.abs(spy);
    }

    function drawGra(_w, _h) {
      let gra = p.createGraphics(_w, _h);

      let num = 10;
      let spanX = _w / num;
      let spanY = _h / num;

      gra.noStroke();
      gra.fill(0);

      for (let y = 0; y < gra.height; y += spanY)
        for (let x = 0; x < gra.width; x += spanX) {
          gra.fill(p.random(255));
          gra.rect(x, y, spanX, spanY);
        }
      return gra;
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
