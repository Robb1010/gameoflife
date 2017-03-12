import React, {
  Component
} from 'react';

class Start extends Component {

  constructor(props) {
    super(props);
    this.state={
      status: "Start"
    }
  }

startGame(change, interval) {
  let generation = this.props.generation;
    if (this.state.status === "Start" || change==="true") {
        this.setState({status: "Pause"});
        clearInterval(this.game);
        this.game = setInterval(() => {
            const arr = this.props.arr;
            var num = [];
            //const total = this.props.total;
            arr.map((number, index) => {
                const width = this.props.width;
                const tileNo = this.props.width * this.props.height - this.props.width;

                if (index === 0) {
                    var sum = arr[tileNo + width - 1] + arr[tileNo] + arr[tileNo + 1] + arr[width - 1] + arr[1] + arr[width * 2 - 1] + arr[width] + arr[width + 1];
                } else if (index === tileNo) {
                    sum = arr[tileNo - 1] + arr[tileNo - width] + arr[tileNo - width + 1] + arr[tileNo + width - 1] + arr[tileNo + 1] + arr[0] + arr[width - 1] + arr[1];
                } else if (index === width - 1) {
                    sum = arr[tileNo + width - 2] + arr[tileNo + width - 1] + arr[tileNo] + arr[width - 2] + arr[0] + arr[width * 2 - 2] + arr[width * 2 - 1] + arr[width];
                } else if (index === tileNo + width - 1) {
                    sum = arr[tileNo - 2] + arr[tileNo - 1] + arr[tileNo - width] + arr[tileNo + width - 2] + arr[tileNo] + arr[width - 2] + arr[width - 1] + arr[0];
                } else if (index % width === width - 1) {
                    sum = arr[index - width - 1] + arr[index - width] + arr[index - width * 2 + 1] + arr[index - 1] + arr[index - width + 1] + arr[index + width - 1] + arr[index + width] + arr[index + 1];
                } else if (index % width === 0) {
                    sum = arr[index - 1] + arr[index - width] + arr[index - width + 1] + arr[index + width - 1] + arr[index + 1] + arr[index + width * 2 - 1] + arr[index + width] + arr[index + width + 1];
                } else if (index > width && index < tileNo - 1) {
                    sum = arr[index - width - 1] + arr[index - width] + arr[index - width + 1] + arr[index - 1] + arr[index + 1] + arr[index + width - 1] + arr[index + width] + arr[index + width + 1];
                } else if (index < width - 1 && index > 0) {
                    sum = arr[index + tileNo - 1] + arr[index + tileNo] + arr[index + tileNo + 1] + arr[index - 1] + arr[index + 1] + arr[index + width - 1] + arr[index + width] + arr[index + width + 1];
                } else if (index + 1 > tileNo + 1 && index + 1 < tileNo + width) {
                    sum = arr[index - width - 1] + arr[index - width] + arr[index - width + 1] + arr[index - 1] + arr[index + 1] + arr[index - tileNo + 1] + arr[index - tileNo] + arr[index - tileNo - 1];
                }

                if (arr[index] === 0 && sum === 3) {
                    num.push(1);
                } else if (arr[index] === 1 && sum < 2) {
                    num.push(0);
                } else if ((arr[index] === 1 && sum === 2) || (arr[index] === 1 && sum === 3)) {
                    num.push(1);
                } else if (arr[index] === 1 && sum > 3) {
                    num.push(0);
                } else
                    num.push(0);
                return num;
            })
            generation++;
            this.props.final(num, generation);
        }, interval)
    } else if (this.state.status === "Pause") {
        this.setState({status: "Start"});
        clearInterval(this.game)
    }
}

  render() {
    return ( <div>
              <button onClick={() => this.startGame("false", this.props.interval)}>{this.state.status}</button>
              </div>
            )
          }
  }

export default Start;
