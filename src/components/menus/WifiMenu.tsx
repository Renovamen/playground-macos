import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import "react-rangeslider/lib/index.css";
import { toggleWIFI } from "../../redux/action";

interface WifiMenuRedux {
  wifi: boolean;
}

interface WifiMenuProps extends WifiMenuRedux {
  toggleWifiMenu: () => void;
  toggleWIFI: Function;
  btnRef: any;
}

class WifiMenu extends Component<WifiMenuProps, {}> {
  private wifiRef = createRef<any>();

  constructor(props: WifiMenuProps) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e: MouseEvent): void {
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
        className="fixed h-10 w-80 max-w-full top-8 right-0 sm:right-2 px-2 py-0.5 flex gap-2 bg-gray-200 bg-opacity-90 blur rounded-lg text-black shadow-2xl"
        ref={this.wifiRef}
      >
        <div className="w-4/5 p-2 font-medium">Wi-Fi</div>
        <div className="w-1/5 px-3.5 py-2">
          <label className="switch-toggle">
            <input
              type="checkbox"
              checked={this.props.wifi}
              onChange={() => this.props.toggleWIFI(!this.props.wifi)}
            />
            <span className="slider-toggle"></span>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: WifiMenuRedux) => {
  return {
    wifi: state.wifi
  };
};

export default connect(mapStateToProps, {
  toggleWIFI
})(WifiMenu);
