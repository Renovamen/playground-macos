import React, { Component } from "react";
import { FaApple } from "react-icons/fa";

type BootProps = {
  restart: boolean;
  sleep: boolean;
  setBooting: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

type BootState = {
  percent: number;
};

export default class Boot extends Component<BootProps, BootState> {
  private intervalId: any;

  constructor(props: BootProps) {
    super(props);
    this.state = {
      percent: 0
    };
    this.intervalId = null;
  }

  componentDidMount() {
    if (this.props.restart && !this.props.sleep) this.startLoading();
  }

  startLoading() {
    this.intervalId = setInterval(this.loading.bind(this), 1);
  }

  handleClick() {
    if (this.props.sleep) this.props.setBooting(false);
    else if (this.props.restart) return;
    else if (this.intervalId) return;
    else this.startLoading();
  }

  componentWillUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  loading() {
    const newPercent = this.state.percent + 0.15;
    if (newPercent >= 100) {
      clearInterval(this.intervalId);
      setTimeout(() => {
        this.props.setBooting(false);
      }, 500);
    } else this.setState({ percent: newPercent });
  }

  render() {
    return (
      <div
        className="nightwind-prevent nightwind-prevent-block w-full h-full bg-black flex flex-col justify-center items-center"
        onClick={this.handleClick.bind(this)}
      >
        <FaApple className="text-white -mt-4 w-20 h-20 sm:w-24 sm:h-24" />
        {this.intervalId && (
          <div className="absolute top-1/2 mt-16 sm:mt-24 left-0 right-0 mx-auto w-56 h-1 sm:h-1.5 bg-gray-500 rounded overflow-hidden">
            <span
              className="absolute top-0 bg-white h-full rounded-sm"
              style={{
                width: `${this.state.percent.toString()}%`
              }}
            />
          </div>
        )}
        {!this.props.restart && !this.intervalId && (
          <div className="absolute top-1/2 mt-16 sm:mt-20 left-0 right-0 mx-auto text-sm text-gray-200 text-center">
            Click to {this.props.sleep ? "wake up" : "boot"}
          </div>
        )}
      </div>
    );
  }
}
