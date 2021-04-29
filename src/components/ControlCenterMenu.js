import React from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

import { FiBluetooth, FiRss, FiMoon, FiSun, FiVolume2 } from "react-icons/fi";
import { BsBrightnessAltHigh, BsPlayFill } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";

const SliderComponent = ({ icon }) => {
  const [value, setValue] = React.useState(Math.floor(Math.random() * 100));
  return (
    <div className="slider flex flex-row w-full">
      <div className="h-8 p-2 bg-white rounded-l-full">{icon}</div>
      <Slider
        min={1}
        max={100}
        value={value}
        tooltip={false}
        orientation="horizontal"
        onChange={(v) => setValue(v)}
      />
    </div>
  );
};

export default function ControlCenterMenu() {
  return (
    <div className="fixed w-96 top-8 right-2 z-50 p-2 grid grid-cols-4 grid-rows-5 gap-2 bg-white bg-opacity-25 blur rounded-2xl text-black shadow-2xl">
      <div className="row-span-2 col-span-2 bg-white bg-opacity-50 rounded-xl p-2 flex flex-col justify-around">
        <div className="flex flex-row items-center space-x-2 pr-6">
          <FaWifi
            color="white"
            size={36}
            className="bg-blue-500 rounded-full p-2"
          />
          <div className="flex flex-col">
            <span className="font-medium">Wifi</span>
            <span className="font-thin text-xs">Home</span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2 pr-6">
          <FiBluetooth
            color="white"
            size={36}
            className="bg-blue-500 rounded-full p-2"
          />
          <div className="flex flex-col">
            <span className="font-medium">Bluetooth</span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2 pr-6">
          <FiRss
            color="white"
            size={36}
            className="bg-blue-500 rounded-full p-2"
          />
          <div className="flex flex-col">
            <span className="font-medium">AirDrop</span>
            <span className="font-thin text-xs">Contacts Only</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-white bg-opacity-50 blur rounded-xl p-2 flex flex-row items-center space-x-2">
        <FiMoon
          size={36}
          fill="true"
          className="bg-white bg-opacity-50 rounded-full p-2"
        />
        <div className="flex flex-col">
          <span className="font-medium">Do Not Disturb</span>
        </div>
      </div>
      <div className="bg-white bg-opacity-50 blur rounded-xl p-2 flex flex-col justify-center items-center text-center">
        <BsBrightnessAltHigh size={20} />
        <span className="text-xs">Keyboard Brightness</span>
      </div>
      <div className="bg-white bg-opacity-50 blur rounded-xl p-2 flex flex-col justify-center items-center text-center">
        <IoCopyOutline />
        <span className="text-xs mt-1">Screen Mirroring</span>
      </div>
      <div className="col-span-4 bg-white bg-opacity-50 blur rounded-xl p-2 space-y-2 flex flex-col justify-around">
        <span className="font-medium">Display</span>
        <SliderComponent icon={<FiSun size={16} className="text-gray-500" />} />
      </div>
      <div className="col-span-4 bg-white bg-opacity-50 blur rounded-xl p-2 space-y-2 flex flex-col justify-around">
        <span className="font-medium">Sound</span>
        <SliderComponent
          icon={<FiVolume2 size={16} className="text-gray-500" />}
        />
      </div>
      <div className="col-span-4 bg-white bg-opacity-50 blur rounded-xl p-2 pr-4 flex flex-row justify-between items-center space-x-4">
        <img
          src="http://p1.music.126.net/z0IO1vEsowL9mD_5yzUjeA==/109951163936068098.jpg"
          alt="cover art"
          className="w-16 rounded-lg"
        />
        <div className="flex flex-col flex-grow justify-start">
          <span className="font-medium">Sunflower</span>
          <span className="font-extralight">Post Malone / Swae Lee</span>
        </div>
        <BsPlayFill size={24} />
      </div>
    </div>
  );
}
