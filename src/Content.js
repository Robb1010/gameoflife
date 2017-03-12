import React, {Component} from 'react';
import Start from './Start';
//import Grid from './Grid';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state={
            arr: [],
            width: 100,
            height: 50,
            interval: 5,
            generation: 0
        }
        this.addIt = this.addIt.bind(this);
        this.speed = this.speed.bind(this);
        this.size = this.size.bind(this);
    }

    makeGrid(height, width) {
        let arr = this.state.arr;
        for (let i=1; i < width * height; i++) {
            arr.push(0);
        }

        this.setState({
          arr: arr})
    }

    style(size, color) {
        return {'width': size, 'height': size, 'background-color': color}
    }

    addIt(e) {
      let arr = this.state.arr;
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const ctx = this.refs.canvas.getContext('2d');
      const square = 1000/this.state.width;
      const xPos = x-(x%square)+1;
      const yPos = y-(y%square);
      const a = ((yPos/square)*this.state.width)+((xPos+square-1)/square-1);
      arr[a] = 1;
      this.setState({arr: arr});
      ctx.beginPath();
      ctx.rect(xPos, yPos, square-1, square-1);
      ctx.fillStyle = "#6c9dd6";
      ctx.fill();
    }

    canvas(height, width) {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.fillStyle = "#404040";
      ctx.fillRect(0,0, 1000, 500);
      let side = 1000/width-1;
      let k = 0;
      let arr = this.state.arr;
      for(let j=0; j<500-side; j+=(500/height)){
        for(let i=1; i<1000-side+1; i+=(1000/width)) {
          ctx.beginPath();
          ctx.rect(i,j, side, side);
          if(arr[k]===1) {
          ctx.fillStyle = "#6c9dd6";
        } else ctx.fillStyle = "black";
          ctx.fill();
          k++;
        }
      }
    }

    random() {
      this.reset();
      let arr = this.state.arr;
      arr.map((number, index) => {
        if(Math.random() > 0.7) {
          arr[index] = 1;
        }
      })
      this.final(arr, 0);
    }

    reset() {
      let arr = this.state.arr;
      arr.map((number, index)=>arr[index]=0);
      this.final(arr, 0);
      if(this.refs.start.state.status === "Pause") {
        this.refs.start.startGame();
      }
    }


    final(arr, generation) {
        this.setState({arr: arr, generation: generation});
        this.canvas(this.state.height, this.state.width);
    }

    speed(event) {
      this.setState({
        interval: event.target.value
      });
      if(this.refs.start.state.status === "Pause") {
        this.refs.start.startGame("true", event.target.value);
      }
    }

    size(event) {
      if(this.refs.start.state.status === "Pause") {
        this.refs.start.startGame();
      }
      this.reset();
      if (event.target.value === "small") {
        this.setState({width:200, height: 100});
        this.canvas(100, 200);
        this.makeGrid(100, 200);
      }else if (event.target.value === "medium") {
        this.setState({width:100, height: 50});
        this.canvas(50, 100);
        this.makeGrid(50, 100);
      }else if (event.target.value === "large") {
        this.setState({width:50, height: 25});
        this.canvas(25, 50);
        this.makeGrid(25, 50);
      }
    }

    componentDidMount() {
      this.makeGrid(this.state.height, this.state.width);
      this.canvas(this.state.height, this.state.width);
    }

    render() {
      return (
      <div className="container">
        <button onClick={()=>this.random()} className="random">Random</button>
        <Start
        ref="start"
        final={this.final.bind(this)}
        width={this.state.width}
        height={this.state.height}
        interval={this.state.interval}
        arr={this.state.arr}
        generation={this.state.generation}
        />
      <div className="generation">Generation: {this.state.generation}</div>
      <div className="select">Size:
        <select onChange={this.size} defaultValue={"medium"}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="select">Speed:
          <select onChange={this.speed} defaultValue={"5"}>
            <option value="500">Slow</option>
            <option value="100">Fast</option>
            <option value="5">Very fast</option>
          </select>
        </div>
      <button onClick={()=>this.reset()}>Clear</button>
      <a className="wiki" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">?</a>
      <canvas ref="canvas" width={1000} height={500} onClick={this.addIt}>Get Google Chrome!</canvas>
      </div>
)}

}

export default Content;
