import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import "react-rangeslider/lib/index.css";
import { toggleWIFI } from "../../redux/action";

// ------- import icons -------
import { FaWifi } from "react-icons/fa";

class WifiMenu extends Component {
  constructor(props) {
    super(props);
    this.wifiRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (
      this.wifiRef &&
      !this.wifiRef.current.contains(e.target) &&
      !this.props.btnRef.current.contains(e.target)
    )
      this.props.toggleWifiMenu();
  }

  render() {
    return (
      <div
        className="fixed w-80 max-w-full top-8 right-0 sm:right-2 z-50 p-2 flex gap-2 bg-white bg-opacity-40 blur rounded-2xl text-black shadow-2xl"
        ref={this.wifiRef}
      >
        <div className="w-4/5 p-2 font-medium">Wi-Fi</div>
        <div className="w-1/5 p-2">
          <label class="switch-toggle">
            <input
              type="checkbox"
              checked={this.props.wifi}
              onClick={() => this.props.toggleWIFI(!this.props.wifi)}
            />
            <span class="slider-toggle round"></span>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dark: state.dark,
    wifi: state.wifi
  };
};

export default connect(mapStateToProps, {
  toggleWIFI
})(WifiMenu);
