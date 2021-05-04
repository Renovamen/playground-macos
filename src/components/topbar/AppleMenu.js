import React from "react";
import { MenuItem, MenuItemGroup } from "../menu/base";

export default function AppleMenu({ setlogon }) {
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
