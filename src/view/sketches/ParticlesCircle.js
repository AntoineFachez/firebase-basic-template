import React from "react";
import p5 from "p5";

var ps;
var pressed = 0;
var img;
var drawMode = 1;
var posX;
var posY;
var gridX = 0;
var gridY = 0;

var imgP_X;
var imgP_Y;

var imgx;
var imgy;

var iter = 0;

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
      p.createCanvas(500, 500);
      p.background(0);
      var point = p.createVector(p.width / 2, p.height / 2);
      ps = new ParticleSystem(point.x, point.y);

      imgP_X = new Array();
      imgP_Y = new Array();

      for (var i = 0; i < 190; i++) {
        posX = 100 * p.cos((2 * p.PI * i) / 100) + p.width / 2;
        posY = 100 * p.sin((2 * p.PI * i) / 100) + p.height / 2;
        imgP_X.push(posX);
        imgP_Y.push(posY);
      }
    };

    p.draw = () => {
      // And everything that normally goes in draw in here

      p.blendMode(p.BLEND);
      p.background(0);
      p.blendMode(p.ADD);

      for (var i = 0; i < 10; i++) {
        //ellipse(imgP_X[i],imgP_Y[i],10,10);
      }

      if (p.frameCount % 10 == 0) {
        ps.initColor();
        //ps.initOrigin(mouseX, mouseY);
      }

      /*for(var i=0; i<imgP_X.length; i++){
    ellipse(imgP_X[i], imgP_Y[i],10,10);
  }*/
      //iter = floor(random(0,imgP_X.length-1));
      ps.addParticle(imgP_X[iter], imgP_Y[iter]);
      iter += 1;
      if (imgP_X.length <= iter) {
        iter = 0;
      }
      ps.run();
    };
    class ParticleSystem {
      constructor(x, y, f) {
        this.particles = new Array();
        this.origin = p.createVector(x, y);
        this.runtime = 0;
        this.colorR = 0;
        this.colorG = 0;
        this.colorB = 0;
        this.f = f;
      }

      addParticle(X, Y) {
        //noise
        /*
		var x_ = this.origin.x + noise(this.runtime)*100+100;
		var y_ = this.origin.y;
		*/

        //random
        /*
		var x_ = this.origin.x + random(-100,100);
		var y_ = this.origin.y + random(-100,100);
		*/

        //circle
        /*
		var rad = this.runtime;
		var x_ = this.origin.x + 80*p.cos(this.runtime);
		var y_ = this.origin.y + 80*p.sin(this.runtime);
		this.runtime = this.runtime + 0.1;
		if(2*p.PI < this.runtime){
			this.runtime = 0;
		}
		*/

        //wave

        /*var x_ = map(this.runtime,0,2*p.PI,0,p.width);
		var y_ = p.height/2 + 100*p.sin(this.runtime);

		this.runtime = this.runtime + 0.05;
		if(2*p.PI < this.runtime){
			this.runtime = 0;
		}*/

        //sp.piral

        /*var r = 10;
		var x_ = this.origin.x + r*this.runtime*p.cos(this.runtime);
		var y_ = this.origin.y + r*this.runtime*p.sin(this.runtime);
		this.runtime = this.runtime + 0.1;
		if(6*p.PI < this.runtime){
			this.runtime = 0;
		}*/

        //Lissajous figure

        /*var rad = this.runtime;
		var x_ = this.origin.x + 100*p.cos(3*this.runtime);
		var y_ = this.origin.y + 100*p.sin(2*this.runtime);
		this.runtime = this.runtime + 0.1;
		if(2*p.PI < this.runtime){
			this.runtime = 0;
		}*/

        //mouse
        //var x_ = mouseX;
        //var y_ = mouseY;

        var x_ = X;
        var y_ = Y;
        this.particles.push(
          new Particle(x_, y_, this.colorR, this.colorG, this.colorB)
        );
      }

      applyForce(fx, fy) {
        this.particles.forEach(function (value) {
          value.applyForce(fx, fy);
        });
      }

      run() {
        var removeIndexs = new Array();
        this.particles.forEach(function (value, index) {
          value.update();
          value.display();
          if (value.isDead()) {
            removeIndexs.push(index);
          }
        });
        for (var i = 0; i < removeIndexs.length; i++) {
          this.particles.splice(removeIndexs[i], 1);
        }

        for (var i = 0; i < this.particles.length; i++) {
          var p1 = p.createVector(
            this.particles[i].location.x,
            this.particles[i].location.y
          );
          for (var j = i + 1; j < this.particles.length; j++) {
            var p2 = p.createVector(
              this.particles[j].location.x,
              this.particles[j].location.y
            );
            displayline(
              p1,
              p2,
              this.particles[i].lifespan,
              this.particles[i].R,
              this.particles[i].G,
              this.particles[i].B
            );
          }
        }
      }

      initOrigin(X, Y) {
        this.origin.x = X;
        this.origin.y = Y;
      }
      initColor() {
        this.colorR = p.random(0, 255); //255;
        this.colorG = p.random(0, 255);
        this.colorB = p.random(0, 255);
      }
    }

    class Particle {
      constructor(x, y, R, G, B) {
        this.mass = 20;
        this.r = 5;
        this.location = p.createVector(x, y);
        this.velocity = p.createVector(
          p.random(-0.2, 0.2),
          p.random(-0.2, 0.2)
        );
        this.accelaration = p.createVector(0, 0);
        this.lifespan = 255;
        this.c = p.color(0, 0, 0);
        this.R = R;
        this.G = G;
        this.B = B;
      }

      run() {
        this.update();
        this.display();
      }

      applyForce(fx, fy) {
        var force = p.createVector(fx, fy);
        var f = p5.Vector.div(force, this.mass);
        this.accelaration.add(f);
      }

      update() {
        this.velocity.add(this.accelaration);
        this.location.add(this.velocity);
        this.accelaration.mult(0);
        this.lifespan = this.lifespan - 2;
      }

      display() {
        p.noStroke(0);
        this.c.setAlpha(this.lifespan);
        p.fill(this.c);
        //ellipse(this.location.x, this.location.y,5,5);
      }

      checkEdges() {
        if (this.location.x + this.r / 2 > p.width) {
          this.location.x = p.width - this.r / 2;
          this.velocity.x *= -1;
        } else if (this.location.x + this.r / 2 < 0) {
          this.location.x = this.r / 2;
          this.velocity.x *= -1;
        }
        if (this.location.y + this.r / 2 > p.height) {
          this.location.y = p.height - this.r / 2;
          this.velocity.y *= -1;
        }
      }

      isDead() {
        if (this.lifespan < 0) {
          return 1;
        } else {
          return 0;
        }
      }
    }

    function displayline(p1, p2, lifespan, R, G, B) {
      var lineAlpha = 7000;
      var connectionRadius = 30;
      var distance = p5.Vector.dist(p1, p2);
      var a = Math.pow(1 / (distance / connectionRadius + 1), 8);
      if (10 < distance && distance <= connectionRadius) {
        p.push();
        p.linecolor = p.color(150, lifespan, 0, a * lineAlpha);
        p.stroke(p.linecolor);
        //stroke(0,0,255);
        p.line(p1.x, p1.y, p2.x, p2.y);
        p.pop();
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
