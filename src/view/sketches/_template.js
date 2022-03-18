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
    // Native p5 functions work as they would normally but prefixed with
    // a p5 object "p"
    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.simple();
      p.background(100);
      p.colourMode(p.HSB);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      p.colourMode(p.HSB);
    };
    function tree(x, y, angle, brightness, length, ran, saturation) {
      let ran2 = p.randomNumber(1, 8);
      let ran3 = p.randomNumber(6, 15);
      let ran4 = p.randomNumber(2, 4);
      let ran5 = p.randomNumber(1, 10) / 10;
      let ran6 = p.randomNumber(-20, 20) / 10;
      let ran7 = p.randomNumber(-20, 20);
      let ran8 = p.randomNumber(-20, 20);
      let ran9 = p.randomNumber(2, 3);

      //branch
      p.strokeWeight(length / 6.5);
      p.stroke(72 - ran7, 90 - ran7, brightness - ran8, length / 20 + ran4);
      var x1 = x + length * p.sin(angle);
      var y1 = y - length * p.cos(angle);

      p.line(x, y, x1, y1);

      // stop condition
      if (length > ran / ran3) {
        let bool = Math.random() >= 0.5;
        //		if (bool = 1 ){
        //smaller tree to the left
        tree(
          x1,
          y1,
          angle + (ran2 + ran7) * ran4 * ran5,
          brightness + ran3,
          length * 0.8,
          80
        );
        //	}else{
        //smaller tree to the right
        tree(
          x1,
          y1,
          angle - (ran2 + ran8) * ran4 * ran5,
          brightness + ran2,
          length * 0.8,
          80
        );
        //	}
        if ((bool = 1)) {
          //another smaller tree to the right, but branching at halfway along line
          //		tree((x+x1)/2, (y+y1)/2, angle + ((ran2 + ran3 ) * ran4) * ran5, brightness + ran3, length * 0.8);
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
