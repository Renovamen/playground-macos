import nightwind from "nightwind/helper";
import { enterFullScreen, exitFullScreen } from "../utils/screen";

export const type = {
  TOGGLE_DARK: "TOGGLE_DARK",
  SET_VOLUME: "SET_VOLUME",
  SET_BRIGHTNESS: "SET_BRIGHTNESS",
  TOGGLE_WIFI: "TOGGLE_WIFI",
  TOGGLE_BLUETOOTH: "TOGGLE_BLUETOOTH",
  TOGGLE_AIRDROP: "TOGGLE_AIRDROP",
  TOGGLE_FULLSCREEN: "TOGGLE_FULLSCREEN"
};

export const toggleDark = (dark) => {
  nightwind.toggle();
  return {
    type: type.TOGGLE_DARK,
    dark
  };
};

export const setVolume = (volume) => {
  return {
    type: type.SET_VOLUME,
    volume
  };
};

export const setBrightness = (brightness) => {
  return {
    type: type.SET_BRIGHTNESS,
    brightness
  };
};

export const toggleFullScreen = (fullscreen) => {
  fullscreen ? enterFullScreen() : exitFullScreen();
  return {
    type: type.TOGGLE_FULLSCREEN,
    fullscreen
  };
};

export const toggleWIFI = (wifi) => {
  return {
    type: type.TOGGLE_WIFI,
    wifi
  };
};

export const toggleBleutooth = (bluetooth) => {
  return {
    type: type.TOGGLE_BLUETOOTH,
    bluetooth
  };
};

export const toggleAirdrop = (airdrop) => {
  return {
    type: type.TOGGLE_AIRDROP,
    airdrop
  };
};
