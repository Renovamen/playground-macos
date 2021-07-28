import React, { useRef, useEffect } from "react";
import { MenuItem, MenuItemGroup } from "./base";

interface AppleMenuProps {
  logout: () => void;
  shut: (e: React.MouseEvent<HTMLLIElement>) => void;
  restart: (e: React.MouseEvent<HTMLLIElement>) => void;
  sleep: (e: React.MouseEvent<HTMLLIElement>) => void;
  toggleAppleMenu: () => void;
  btnRef: any;
}

export default function AppleMenu({
  logout,
  shut,
  restart,
  sleep,
  toggleAppleMenu,
  btnRef
}: AppleMenuProps) {
  const ref = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      )
        toggleAppleMenu();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, toggleAppleMenu, btnRef]);

  return (
    <div
      className="fixed top-6 left-4 w-56 bg-gray-200 bg-opacity-90 blur border-b border-l border-r border-gray-400 border-opacity-50 rounded-b-lg shadow-2xl"
      style={{ boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)" }}
      ref={ref}
    >
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
        <MenuItem onClick={sleep}>Sleep</MenuItem>
        <MenuItem onClick={restart}>Restart...</MenuItem>
        <MenuItem onClick={shut}>Shut Down...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem onClick={logout}>Lock Screen</MenuItem>
        <MenuItem onClick={logout}>Log Out Xiaohan Zou...</MenuItem>
      </MenuItemGroup>
    </div>
  );
}
