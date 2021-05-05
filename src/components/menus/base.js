import React, { Component } from "react";

export class MenuItem extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        className="px-5 leading-6 text-black cursor-default hover:bg-blue-500 hover:text-white"
      >
        {this.props.children}
      </li>
    );
  }
}

export class MenuItemGroup extends Component {
  render() {
    const border =
      this.props.border === false ? "" : "border-b-2 border-gray-400";
    return <ul className={`py-1 ${border}`}>{this.props.children}</ul>;
  }
}
