///
///
///
///https://openprocessing.org/sketch/1431377

import React from "react";
import p5 from "p5";

class Sketch extends React.Component {
  constructor(props) {
    super(props);
    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    this.myRef = React.createRef();
  }

  // This uses p5's instance mode for sketch creation and namespacing
  Sketch = (p) => {
    let font;
    let points;
    let bounds;
    const fSize = 160;
    let particles = [];
    // Native p5 functions work as they would normally but prefixed with
    // a p5 object "p"
    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(1020, 1920);
      p.opentype.load("Inconsolata-Medium.ttf", function (err, f) {
        p.font = f;
        addTypeParticles("COUNTRYSIDE");
      });
    };

    p.draw = () => {
      // And everything that normally goes in draw in here

      if (!font) return;
      p.background(0, 10);
      p.noFill();
      p.stroke(255);
      p.particles.forEach((particle) => {
        p.particle.update();
        p.particle.draw();
      });
      //save('fdp.png')
    };

    function keyPressed(ev) {
      if (!font) return;
      addTypeParticles(ev.key);
    }

    const slicingCirculationWindow = (arr, size, increment = 1) => {
      if (size > arr.length) {
        return arr;
      }
      const result = [];
      for (let i = 0; i < arr.length; i += increment) {
        if (i + size > arr.length) {
          result.push(
            arr.slice(i, i + size).concat(arr.slice(0, i + size - arr.length))
          );
        } else {
          result.push(arr.slice(i, i + size));
        }
      }
      return result;
    };
    function addTypeParticles(str) {
      particles = [];
      const x = p.width / 2;
      const y = p.height / 2;
      const path = font.getPath(str, x, y, fSize);
      const boundingBox = path.getBoundingBox();
      const boundingBoxCenter = {
        x: (boundingBox.x2 - boundingBox.x1) / 2,
        y: (boundingBox.y1 - boundingBox.y2) / 2,
      };
      const points = path.commands
        .map((cmd) => {
          if (
            cmd.type === "M" ||
            cmd.type === "L" ||
            cmd.type === "Q" ||
            cmd.type === "Q"
          ) {
            return {
              x: cmd.x - boundingBoxCenter.x,
              y: cmd.y - boundingBoxCenter.y,
            };
          } else {
            return null;
          }
        })
        .filter((point) => point !== null);
      const pointSet = p.slicingCirculationWindow(points, 2);
      pointSet.forEach((points) => {
        const pos = points[0];
        const speed = {
          x: (points[1].x - points[0].x) * 0.03,
          y: (points[1].y - points[0].y) * 0.03,
        };
        particles.push(new Particle(pos, speed));
      });
    }

    class Particle {
      constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
      }

      update() {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
      }

      draw() {
        p.fill(255);
        p.noStroke();
        p.ellipse(this.pos.x, this.pos.y, 5, 5);
      }
    }

    function drawOpentypePath(path) {
      for (let cmd of path.commands) {
        if (cmd.type === "M") {
          p.beginShape();
          p.vertex(cmd.x, cmd.y);
        } else if (cmd.type === "L") {
          p.vertex(cmd.x, cmd.y);
        } else if (cmd.type === "C") {
          p.bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === "Q") {
          p.quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === "Z") {
          p.endShape(p.CLOSE);
        }
      }
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
