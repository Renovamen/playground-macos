import React, { Component } from "react";
import { FaApple } from "react-icons/fa";

export default class Boot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      intervalId: null
    };
  }

  componentDidMount() {
    if (this.props.restart && !this.props.sleep) this.startLoading();
  }

  startLoading() {
    const intervalId = setInterval(this.loading.bind(this), 1);
    this.setState({ intervalId: intervalId });
  }

  handleClick() {
    if (this.props.sleep) this.props.setBooting(false);
    else if (this.props.restart) return;
    else if (this.state.intervalId) return;
    else this.startLoading();
  }

  componentWillUnmount() {
    if (this.state.intervalId) clearInterval(this.state.intervalId);
  }

  loading() {
    const newPercent = this.state.percent + 0.1;
    if (newPercent >= 100) {
      clearInterval(this.state.intervalId);
      setTimeout(() => {
        this.props.setBooting(false);
      }, 500);
    } else {
      this.setState({ percent: newPercent });
    }
  }

  render() {
    return (
      <div
        className="nightwind-prevent nightwind-prevent-block w-screen h-screen bg-black flex flex-col justify-center items-center"
        onClick={this.handleClick.bind(this)}
      >
        <FaApple className="text-white" size={100} />
        {this.state.intervalId && (
          <div className="absolute top-1/2 left-0 right-0 mx-auto mt-28 w-56 h-1.5 bg-gray-500 rounded overflow-hidden">
            <span
              className="absolute top-0 bg-white h-full rounded-sm"
              style={{
                width: `${this.state.percent.toString()}%`
              }}
            />
          </div>
        )}
        {!this.props.restart && !this.state.intervalId && (
          <div className="text-sm text-gray-200 text-center absolute top-1/2 mt-24 left-0 right-0 mx-auto">
            Click to {this.props.sleep ? "wake up" : "boot"}
          </div>
        )}
      </div>
    );
  }
}
