import React from "react";
import { MenuItem, MenuItemGroup } from "../menu/base";

export default function AppleMenu({ logout }) {
  return (
    <div className="fixed top-6 left-4 w-56 bg-gray bg-gray-200 bg-opacity-90 blur rounded-b-lg">
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
        <MenuItem onClick={logout}>Sleep</MenuItem>
        <MenuItem onClick={logout}>Restart...</MenuItem>
        <MenuItem onClick={logout}>Shut Down...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem onClick={logout}>Lock Screen</MenuItem>
        <MenuItem onClick={logout}>Log Out Xiaohan Zou...</MenuItem>
      </MenuItemGroup>
    </div>
  );
}
