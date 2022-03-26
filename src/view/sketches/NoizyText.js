//
//
//
//https://openprocessing.org/sketch/1379610

import React from "react";
import p5 from "p5";
import fontFile from "../sketches/fonts/Muli-Black.ttf";

const string = "C O D E  B O X"; //words to be displayed
const size = 100; //font size
// const fontFile = "Muli-Black.ttf";
const showText = true; //whether or not to have an overlay of the original text (in the background color)
const textAlpha = 100; //the alpha of the text if displayed (low value will make it slowly fade in)
const backgroundColor = 255; //kinda self-explanatory
const strokeAlpha = 20; //the alpha of the lines (lower numbers are more transparent)
const strokeColor = 100; //the line color

const fontSampleFactor = 0.8; //How many points there are: the higher the number, the closer together they are (more detail)

const noiseZoom = 0.01; //how zoomed in the perlin noise is (like Smooth lower = more smooth forms )
const noiseOctaves = 6; //The number of octaves for the noise (like spread higher = less spread)
const noiseFalloff = 0.5; //The falloff for the noise layers

const zOffsetChange = 0.001; //How much the noise field changes in the z direction each frame
const individualZOffset = 0.001; //how far away the points/lines are from each other in the z noise axies (the bigger the number, the more chaotic)

const lineSpeed = 2; //the maximum amount each point can move each frame

const newPointsCount = 9; //the number of new points added when the mouse is dragged

var font;
var points = [];
var startingPoints;

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
      font = p.loadFont(fontFile);
    }
    p.setup = () => {
      preload();
      //Everyhting that normally happens in setup works
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(backgroundColor);
      p.textFont(font);
      p.textSize(size);
      p.fill(backgroundColor, textAlpha);
      p.stroke(strokeColor, strokeAlpha);
      p.noiseDetail(noiseOctaves, noiseFalloff);

      startingPoints = font.textToPoints(
        string,
        p.width / 2 - p.textWidth(string) / 2,
        p.height / 2,
        size,
        { sampleFactor: fontSampleFactor }
      );

      for (let p = 0; p < startingPoints.length; p++) {
        points[p] = startingPoints[p];
        points[p].zOffset = p.random();
      }
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      if (showText) {
        p.noStroke();
        p.text(string, p.width / 2 - p.textWidth(string) / 2, p.height / 2);
        p.stroke(strokeColor, strokeAlpha);
      }
      for (let pt = 0; pt < points.length; pt++) {
        let p = points[pt];
        let noiseX = p.x * noiseZoom;
        let noiseY = p.y * noiseZoom;
        let noiseZ =
          p.frameCount * zOffsetChange + p.zOffset * individualZOffset;
        let newPX =
          p.x +
          p.map(p.noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
        let newPY =
          p.y +
          p.map(
            p.noise(noiseX, noiseY, noiseZ + 214),
            0,
            1,
            -lineSpeed,
            lineSpeed
          );
        p.line(p.x, p.y, newPX, newPY);
        p.x = newPX;
        p.y = newPY;
      }
    };
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
