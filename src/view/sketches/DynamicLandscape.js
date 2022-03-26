import React from "react";
import p5 from "p5";

//Christopher Reyes
//itschrisreyes.myportfolio.com
//Project-03 (Dynamic Drawing)

var backgroundR = 209;
var backgroundG = 153;
var backgroundB = 198;

var ringSize = 0;
var ringColor = 256;

const baseline = window.innerHeight / 2;
// const width = window.innerWidth;
// const height = window.innerHeight;
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

      p.createCanvas(p.windowWidth, 360);
      p.angleMode(p.DEGREES);
    };

    function windowResized() {
      p.resizeCanvas(p.windowWidth, 400);
    }
    p.draw = () => {
      windowResized();
      var colorConstrain = p.constrain(p.mouseX, 102, 540);

      p.background(backgroundR, backgroundG, backgroundB);
      p.fromBG = p.color(209, 153, 198);
      p.toBG = p.color(199, 211, 183);
      p.backgroundColor = p.lerpColor(p.fromBG, p.toBG, p.mouseX / p.width);
      p.background(p.backgroundColor);

      var moonConstrainX = p.constrain(p.mouseX, 102, p.windowWidth);

      //Moon, moves in the X direction as p.mouseX changes
      p.noStroke();
      p.fill(256);
      p.ellipse(moonConstrainX, 80, 64, 64);

      //Moon shadow, follows moon at a rate that eventually overtakes it
      //Color set to be the same as the background to hide it
      p.fill(backgroundR, backgroundG, backgroundB);
      p.fill(p.backgroundColor);
      p.ellipse(moonConstrainX * 1.3 - 95, 80, 54, 54);
      p.rotate(spinConstraint);
      //Mountain ring, changes scale according to p.mouseX
      p.noFill();
      p.stroke(ringColor);
      p.strokeWeight(5);
      var spinConstraint = p.constrain(p.mouseX, 102, p.windowWidth);
      ringSize = p.constrain(p.mouseX, 100, p.windowWidth) - 100;
      p.ellipse(248, 158, ringSize, ringSize);

      //Secondary rings that rotate while revolving around mountain's peak,
      //based on p.mouseX position
      var spinConstraint = p.constrain(p.mouseX, 102, p.windowWidth);

      p.push();
      p.translate(248, 158);
      p.rotate(spinConstraint);
      p.arc(
        248,
        158,
        ringSize,
        ringSize,
        spinConstraint + 5,
        spinConstraint + 115
      );
      p.arc(
        248,
        158,
        ringSize,
        ringSize,
        spinConstraint + 125,
        spinConstraint + 235
      );
      p.arc(
        248,
        158,
        ringSize,
        ringSize,
        spinConstraint + 245,
        spinConstraint + 355
      );
      p.pop();

      p.push();
      p.translate(248, 158);
      p.rotate(spinConstraint - 160);
      p.arc(
        248,
        158,
        ringSize * 0.75,
        ringSize * 0.75,
        spinConstraint + 5,
        spinConstraint + 115
      );
      p.arc(
        248,
        158,
        ringSize * 0.75,
        ringSize * 0.75,
        spinConstraint + 125,
        spinConstraint + 235
      );
      p.arc(
        248,
        158,
        ringSize * 0.75,
        ringSize * 0.75,
        spinConstraint + 245,
        spinConstraint + 355
      );
      p.pop();

      //Hides rings when they get too small - given same color as background
      if (ringSize == 0) {
        ringColor = p.backgroundColor;
      } else {
        ringColor = 256;
      }

      p.noStroke();

      //Draws triangles for mountains that change colors as p.mouseX changes
      //Note: For organization, for each mountain, the left side is drawn first
      //
      //Mountain color variable format: Mount(#)[(L)eft||(R)ight]

      //Mountain 1, transitions from pink to blue
      p.fill(232, 151, 168);
      p.fromMount1L = p.color(232, 151, 168);
      p.toMount1L = p.color(105, 175, 173);
      p.mount1LColor = p.lerpColor(
        p.fromMount1L,
        p.toMount1L,
        p.mouseX / p.width
      );
      p.fill(p.mount1LColor);
      p.triangle(111, 226, 57, baseline, -3, baseline);

      p.fill(206, 122, 137);
      p.fromMount1R = p.color(206, 122, 137);
      p.toMount1R = p.color(97, 142, 153);
      p.mount1RColor = p.lerpColor(
        p.fromMount1R,
        p.toMount1R,
        p.mouseX / p.width
      );
      p.fill(p.mount1RColor);
      p.triangle(111, 226, 57, baseline, 189, baseline);

      //Mountain 2, pink
      p.fill(232, 151, 168);
      p.triangle(41, 254, -13, baseline, -73, baseline);
      p.fill(206, 122, 137);
      p.triangle(41, 254, -13, baseline, 119, baseline);

      //Mountain 3, pink
      p.fill(232, 151, 168);
      p.triangle(510, 366, 456, baseline, 396, baseline);
      p.fill(206, 122, 137);
      p.triangle(510, 366, 456, baseline, 588, baseline);

      //Mountain 4, largest, transitions from yellow to navy
      p.fill(229, 225, 163);
      p.fromMount4L = p.color(229, 225, 163);
      p.toMount4L = p.color(31, 60, 78);
      p.mount4LColor = p.lerpColor(
        p.fromMount4L,
        p.toMount4L,
        p.mouseX / p.width
      );
      p.fill(p.mount4LColor);
      p.triangle(248, 158, 154, baseline, -111, baseline);

      p.fill(214, 192, 123);
      p.fromMount4R = p.color(214, 192, 123);
      p.toMount4R = p.color(10, 30, 49);
      p.mount4RColor = p.lerpColor(
        p.fromMount4R,
        p.toMount4R,
        p.mouseX / p.width
      );
      p.fill(p.mount4RColor);
      p.triangle(248, 158, 154, baseline, 591, baseline);

      //Stray cloud with transparency
      p.fill(256, 125);
      p.quad(210.5, 272, 250.5, 290, 210.5, 308, 170.5, 290);

      //Mountain 5, transitions from pink to dark green
      p.fill(232, 151, 168);
      p.fromMount5L = p.color(232, 151, 168);
      p.toMount5L = p.color(51, 93, 97);
      p.mount5LColor = p.lerpColor(
        p.fromMount5L,
        p.toMount5L,
        p.mouseX / p.width
      );
      p.fill(p.mount5LColor);
      p.triangle(193, 290, 139, baseline, 79, baseline);

      p.fill(206, 122, 137);
      p.fromMount5R = p.color(206, 122, 137);
      p.toMount5R = p.color(37, 77, 68);
      p.mount5RColor = p.lerpColor(
        p.fromMount5R,
        p.toMount5R,
        p.mouseX / p.width
      );
      p.fill(p.mount5RColor);
      p.triangle(193, 290, 139, baseline, 271, baseline);

      //Mountain 6, transitions from blue to pale green
      p.fill(175, 232, 229);
      p.fromMount6L = p.color(175, 232, 229);
      p.toMount6L = p.color(170, 191, 156);
      p.mount6LColor = p.lerpColor(
        p.fromMount6L,
        p.toMount6L,
        p.mouseX / p.width
      );
      p.fill(p.mount6LColor);
      p.triangle(108, 334, 93, baseline, -30, baseline);

      p.fill(127, 201, 201);
      p.fromMount6R = p.color(127, 201, 201);
      p.toMount6R = p.color(130, 171, 142);
      p.mount6RColor = p.lerpColor(
        p.fromMount6R,
        p.toMount6R,
        p.mouseX / p.width
      );
      p.fill(p.mount6RColor);
      p.triangle(108, 334, 93, baseline, 253, baseline);

      //Mountain 7, transitions from green to light blue
      p.fill(160, 232, 160);
      p.fromMount7L = p.color(160, 232, 160);
      p.toMount7L = p.color(105, 175, 173);
      p.mount7LColor = p.lerpColor(
        p.fromMount7L,
        p.toMount7L,
        p.mouseX / p.width
      );
      p.fill(p.mount7LColor);
      p.triangle(295, 323, 229, baseline, 153, baseline);

      p.fill(117, 175, 117);
      p.fromMount7R = p.color(117, 175, 117);
      p.toMount7R = p.color(97, 142, 153);
      p.mount7RColor = p.lerpColor(
        p.fromMount7R,
        p.toMount7R,
        p.mouseX / p.width
      );
      p.fill(p.mount7RColor);
      p.triangle(295, 323, 229, baseline, 399, baseline);

      //Clouds with transparency
      p.fill(256, 125);
      p.quad(332.5, 231, 372.5, 249, 332.5, 267, 292.5, 249);
      p.quad(393.5, 217, 433.5, 235, 393.5, 253, 353.5, 235);
      p.quad(298.5, 240, 338.5, 258, 298.5, 276, 258.5, 258);
      p.quad(275.5, 235, 315.5, 253, 275.5, 271, 235.5, 253);
      p.quad(258.5, 214, 298.5, 232, 258.5, 250, 218.5, 232);
      p.quad(313.5, 265, 353.5, 283, 313.5, 301, 273.5, 283);
      p.quad(339.5, 369, 379.5, 387, 339.5, 405, 299.5, 387);
      p.quad(403.5, 258, 443.5, 276, 403.5, 294, 363.5, 276);
      p.quad(353.5, 265, 393.5, 283, 353.5, 301, 313.5, 283);
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
