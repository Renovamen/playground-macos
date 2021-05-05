import React, { Component } from "react";
import { Rnd } from "react-rnd";
import { IoCloseOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";

const FullIcon = ({ size }) => {
  return (
    <svg
      viewBox="0 0 13 13"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
    >
      <path fill="none" d="M0 0h12.038v12.038H0z" />
      <path d="M9.26 12.03L.006 2.73v9.3H9.26zM2.735.012l9.3 9.3v-9.3h-9.3z" />
    </svg>
  );
};

const ExitFullIcon = ({ size }) => {
  return (
    <svg
      viewBox="0 0 19 19"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
    >
      <path fill="none" d="M0 0h18.972v18.973H0z" />
      <path d="M18.373 9.23L9.75.606V9.23h8.624zM.6 9.742l8.623 8.624V9.742H.599z" />
    </svg>
  );
};

const TrafficLights = ({ id, close, max, setMax, setMin }) => {
  const closeWindow = (e) => {
    e.stopPropagation();
    close(id);
  };

  return (
    <div className="traffic_lights flex flex-row absolute left-0 space-x-2 pl-2 mt-1.5">
      <button
        className="w-3 h-3 rounded-full bg-red-500 outline-none focus:outline-none inline-flex justify-center items-center"
        onClick={closeWindow}
        onTouchEnd={closeWindow}
      >
        <IoCloseOutline size={11} />
      </button>
      <button
        className={`w-3 h-3 rounded-full ${
          max ? "bg-gray-400" : "bg-yellow-500"
        } outline-none focus:outline-none inline-flex justify-center items-center`}
        onClick={() => setMin(id)}
        onTouchEnd={() => setMin(id)}
        disabled={max ? 1 : 0}
      >
        <FiMinus size={11} className={max ? "invisible" : ""} />
      </button>
      <button
        className="w-3 h-3 rounded-full bg-green-500 outline-none focus:outline-none  inline-flex justify-center items-center"
        onClick={() => setMax(id)}
        onTouchEnd={() => setMax(id)}
      >
        {max ? <ExitFullIcon size={10} /> : <FullIcon size={6.5} />}
      </button>
    </div>
  );
};

export default class Window extends Component {
  constructor(props) {
    super(props);
    const maxW = document.body.offsetWidth;
    const maxH = document.body.offsetHeight;
    const width = Math.min(maxW, props.width ? props.width : "640");
    const height = Math.min(maxH, props.height ? props.height : "400");
    this.state = {
      width: width,
      height: height,
      maxW: maxW,
      maxH: maxH,
      x: Math.random() * (maxW - width),
      y: Math.random() * (maxH - height - 100)
    };
    this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    const maxW = document.body.offsetWidth;
    const maxH = document.body.offsetHeight;
    const width = Math.min(maxW, this.state.width);
    const height = Math.min(maxH, this.state.height);

    this.setState({
      maxW: maxW,
      maxH: maxH,
      width: width,
      height: height
    });
  };

  render() {
    const round = this.props.max ? "rounded-none" : "rounded-lg";
    const minimized = this.props.min
      ? "opacity-0 invisible transition-opacity duration-300"
      : "";
    const width = this.props.max ? this.state.maxW : this.state.width;
    const height = this.props.max ? this.state.maxH : this.state.height;

    let children = React.cloneElement(this.props.children, { width: width });

    return (
      <Rnd
        size={{
          width: width,
          height: height
        }}
        position={{
          x: this.props.max ? 0 : this.state.x,
          y: this.props.max ? 0 : this.state.y
        }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.setState({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
            ...position
          });
        }}
        minWidth={this.props.minWidth ? this.props.minWidth : 200}
        minHeight={this.props.minHeight ? this.props.minHeight : 150}
        dragHandleClassName="window-bar"
        disableDragging={this.props.max}
        style={{ zIndex: this.props.z }}
        onMouseDown={() => this.props.focus(this.props.id)}
        className={`absolute ${round} overflow-hidden bg-transparent w-full h-full shadow-md ${minimized}`}
        id={`window-${this.props.id}`}
      >
        <div
          className="window-bar relative h-6 text-center bg-gray-200"
          onDoubleClick={() => this.props.setMax(this.props.id)}
        >
          <TrafficLights
            id={this.props.id}
            close={this.props.close}
            max={this.props.max}
            setMax={this.props.setMax}
            setMin={this.props.setMin}
          />
          <span className="font-semibold text-gray-700">
            {this.props.title}
          </span>
        </div>
        <div className="innner-window w-full overflow-y-hidden">{children}</div>
      </Rnd>
    );
  }
}
