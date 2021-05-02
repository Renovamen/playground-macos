import React, { Component } from "react";

class MenuItem extends Component {
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

class MenuItemGroup extends Component {
  render() {
    const border =
      this.props.border === false ? "" : "border-b-2 border-gray-400";
    return <ul className={`py-1 ${border}`}>{this.props.children}</ul>;
  }
}

export default function AppleMenu({ setlogon }) {
  return (
    <div className="fixed top-6 left-4 w-56 bg-gray bg-gray-200 bg-opacity-80 blur rounded-b-lg">
      <MenuItemGroup>
        <MenuItem>About This Mac</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>System Preferences...</MenuItem>
        <MenuItem>App Store...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Recent Items</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Force Quit...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem onClick={() => setlogon(false)}>Sleep</MenuItem>
        <MenuItem onClick={() => setlogon(false)}>Restart...</MenuItem>
        <MenuItem onClick={() => setlogon(false)}>Shut Down...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem onClick={() => setlogon(false)}>Lock Screen</MenuItem>
        <MenuItem onClick={() => setlogon(false)}>
          Log Out Xiaohan Zou...
        </MenuItem>
      </MenuItemGroup>
    </div>
  );
}
