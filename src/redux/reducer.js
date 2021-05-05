import { type } from "./action";

const initState = {
  dark: false,
  volume: 100,
  wifi: true,
  bluetooth: true,
  airdrop: true,
  fullscreen: false
};

export const Reducer = (state = initState, action = {}) => {
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
    default:
      return state;
  }
};
