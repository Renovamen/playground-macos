import { type } from "./action";

const initState = {
  dark: false,
  volume: 100,
  brightness: 80,
  wifi: true,
  bluetooth: true,
  airdrop: true,
  fullscreen: false,
  dockSize: 50,
  dockMag: 2
};

export const Reducer = (state = initState, action: any = {}) => {
  switch (action.type) {
    case type.TOGGLE_DARK:
      return {
        ...state,
        dark: action.dark
      };
    case type.SET_VOLUME:
      return {
        ...state,
        volume: action.volume
      };
    case type.SET_BRIGHTNESS:
      return {
        ...state,
        brightness: action.brightness
      };
    case type.TOGGLE_FULLSCREEN:
      return {
        ...state,
        fullscreen: action.fullscreen
      };
    case type.TOGGLE_WIFI:
      return {
        ...state,
        wifi: action.wifi
      };
    case type.TOGGLE_BLUETOOTH:
      return {
        ...state,
        bluetooth: action.bluetooth
      };
    case type.TOGGLE_AIRDROP:
      return {
        ...state,
        airdrop: action.airdrop
      };
    case type.SET_DOCK_SIZE:
      return {
        ...state,
        dockSize: action.dockSize
      };
    case type.SET_DOCK_MAG:
      return {
        ...state,
        dockMag: action.dockMag
      };
    default:
      return state;
  }
};
