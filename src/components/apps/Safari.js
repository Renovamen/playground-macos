import React, { Component } from "react";

export default class Safari extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goURL: "https://renovamen.ink/",
      currentURL: "https://renovamen.ink/"
    };
  }

  setGoURL = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13) this.setState({ goURL: e.target.value });
  };

  render() {
    return (
      <div className="w-full h-full bg-white">
        <div className="h-8 flex justify-center items-center bg-white">
          <input
            type="text"
            value={this.state.currentURL}
            onChange={(e) => this.setState({ currentURL: e.target.value })}
            onKeyPress={this.setGoURL}
            className="h-6 w-4/5 p-2 rounded text-center font-normal text-gray-500 bg-gray-100"
          />
        </div>
        <iframe
          title={"Safari clone browser"}
          src={this.state.goURL}
          frameBorder="0"
          className="h-full w-full"
        />
      </div>
    );
  }
}
