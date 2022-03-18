//
//
//
//https://openprocessing.org/sketch/1382134

// import React from "react";
// import p5 from "p5";

// class Sketch extends React.Component {
//   constructor(props) {
//     super(props);
//     //p5 instance mode requires a reference on the DOM to mount the sketch
//     //So we use react's createRef function to give p5 a reference
//     this.myRef = React.createRef();
//   }

//   // This uses p5's instance mode for sketch creation and namespacing
//   Sketch = (p) => {
//     // Native p5 functions work as they would normally but prefixed with
//     // a p5 object "p"
//     p.setup = () => {
//       //Everyhting that normally happens in setup works
//       p.createCanvas(1000, 1000);
//       p.pixelDensity(3);
//       p.background(50);
//       p.fill(0);
//       p.rect(0, 0, p.width, p.height);
//       p.drawingGraphics = p.createGraphics(p.width, p.height);
//       p.drawingGraphics.drawingContext.shadowColor = p.color(0, 30);
//       p.drawingGraphics.drawingContext.shadowBlur = 10;
//       for (var i = 0; i < 150; i++) {
//         let rr = 140;
//         let ang = p.random(5);
//         p.particles.push(
//           new p.Particle({
//             p: p.createVector(
//               p.width / 2 + rr * p.cos(ang),
//               p.height / 2 + rr * p.sin(ang)
//             ),
//             v: p.Vector.random2D().mult(5),
//             r: p.random(60) * p.random(0.3, 0.9),
//             speedFactor: p.random(0.1, 1),
//             shrinkFactor: p.random(0.95, 1),
//             color: p.random(p.colors),
//           })
//         );
//       }
//       // noprotect
//       p.overAllTexture = p.createGraphics(p.width, p.height);
//       p.overAllTexture.loadPixels();
//       // noStroke()
//       for (var i = 0; i < p.width + 50; i++) {
//         for (var o = 0; o < p.height + 50; o++) {
//           p.overAllTexture.set(
//             i,
//             o,
//             p.color(
//               100,
//               p.noise(i / 3, o / 3, (i * o) / 50) * p.random([0, 50, 100])
//             )
//           );
//         }
//       }
//       p.overAllTexture.updatePixels();
//     };

//     p.draw = () => {
//       // And everything that normally goes in draw in here

//       // blendMode(SCREEN)
//       p.particles.forEach((p) => {
//         p.update();
//         p.draw();
//       });
//       p.particles = p.particles.filter((p) => p.r > 0.01);
//       p.background(100);
//       p.fill(10, 20, 20);
//       p.rect(0, 0, p.width, p.height);
//       p.image(p.drawingGraphics, 0, 0);
//       p.push();
//       p.blendMode(p.MULTIPLY);
//       p.image(p.overAllTexture, 0, 0);
//       p.pop();
//       // ellipse(mouseX, mouseY, 20, 20);
//     };

//     function mousePressed() {
//       p.particles = [];
//       p.setup();
//     }
//   };

//   componentDidMount() {
//     //We create a new p5 object on component mount, feed it
//     class Particle {
//       constructor(args) {
//         this.p = args.p || createVector(0, 0);
//         this.v = args.v || createVector(0, 0);
//         this.a = args.a || createVector(0, 0);
//         this.r = args.r || 5;
//         this.speedFactor = args.speedFactor || 1;
//         this.shrinkFactor = args.shrinkFactor || 1;
//         this.blending = false;
//         this.color = color(args.color || random(colors));
//         this.color.setAlpha(random(50, 190));
//       }
//       draw() {
//         drawingGraphics.push();
//         this.blending && drawingGraphics.blendMode(SCREEN);
//         drawingGraphics.noStroke();
//         drawingGraphics.translate(this.p.x, this.p.y);
//         drawingGraphics.fill(this.color);
//         drawingGraphics.ellipse(0, 0, this.r);
//         drawingGraphics.pop();
//       }
//       update() {
//         this.p.add(this.v);
//         this.v.add(this.a);
//         this.v.x +=
//           ((noise(this.p.x / 5, frameCount / 5000) - 0.5) / 3) *
//             this.speedFactor +
//           sin(this.v.y / 50);
//         this.v.y +=
//           ((noise(this.p.y / 5, frameCount / 5000) - 0.5) / 3) *
//             this.speedFactor +
//           sin(this.v.x / 50);
//         // this.v.mult(1.01)
//         this.v.mult(0.99);
//         this.r *= 0.99 * this.shrinkFactor;
//         if (int(this.p.x) % 30 == 0 || int(this.p.y) % 30 == 0) {
//           this.v = p5.Vector.random2D().mult(this.speedFactor * 6);
//           if (random() < 0.4) {
//             this.color = color(random(colors2));
//             // color(args.color || random(colors))
//             this.color.setAlpha(random(50, 190));
//           }
//         }
//         if (random() < 0.1) {
//           this.blending = !this.blending;
//         }
//       }
//     }
//   }

//   render() {
//     return (
//       //This div will contain our p5 sketch
//       <div ref={this.myRef}></div>
//     );
//   }
// }

// export default Sketch;
