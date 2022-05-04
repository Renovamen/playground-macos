import React, { useState } from "react";
import { BsQuestionSquareFill } from "react-icons/bs";
import { CgSleep } from "react-icons/cg";
import { RiShutDownLine, RiRestartLine } from "react-icons/ri";

import { useAppSelector } from "../redux/hooks";
import { wallpapers, user } from "../configs";
import type { MacActions } from "../types";

export default function Login(props: MacActions) {
  const [password, setPassword] = useState("");
  const [sign, setSign] = useState("Click to enter");
  const dark = useAppSelector((state) => state.system.dark);

  const keyPress = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    if (keyCode === "Enter") loginHandle();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const loginHandle = () => {
    if (user.password === "" || user.password === password) {
      // not set password or password correct
      props.setLogin(true);
    } else if (password !== "") {
      // password not null and incorrect
      setSign("Incorrect password");
    }
  };

  return (
    <div
      className="w-full h-full login text-center"
      style={{
        background: `url(${
          dark ? wallpapers.night : wallpapers.day
        }) center/cover no-repeat`
      }}
      onClick={() => loginHandle()}
    >
      <div className="inline-block w-auto relative top-1/2 -mt-40">
        {/* Avatar */}
        <img
          className="rounded-full w-24 h-24 my-0 mx-auto"
          src={user.avatar}
          alt="img"
        />
        <div className="font-semibold text-xl mt-2 text-white">{user.name}</div>

        {/* Password Input */}
        <div className="mx-auto grid grid-cols-5 w-44 h-8 mt-4 rounded-md bg-gray-300 backdrop-blur-2xl bg-opacity-50">
          <input
            className="text-sm col-start-1 col-span-4 outline-none focus:outline-none bg-transparent px-2 text-white"
            type="password"
            placeholder="Enter Password"
            onClick={(e) => e.stopPropagation()}
            onKeyPress={keyPress}
            value={password}
            onChange={handleInputChange}
          />
          <div className="col-start-5 col-span-1 flex-center">
            <BsQuestionSquareFill className="ml-1" color="white" />
          </div>
        </div>

        <div className="text-sm mt-2 text-gray-200 cursor-pointer">{sign}</div>
      </div>

      {/* buttons */}
      <div className="text-sm fixed bottom-16 left-0 right-0 mx-auto flex flex-row space-x-4 w-max">
        <div
          className="flex-center-v flex-col text-white w-24 cursor-pointer"
          onClick={(e) => props.sleepMac(e)}
        >
          <div className="h-10 w-10 bg-gray-700 rounded-full inline-flex-center">
            <CgSleep size={40} />
          </div>
          <span>Sleep</span>
        </div>
        <div
          className="flex-center-v flex-col text-white w-24 cursor-pointer"
          onClick={(e) => props.restartMac(e)}
        >
          <div className="h-10 w-10 bg-gray-700 rounded-full inline-flex-center">
            <RiRestartLine size={36} />
          </div>
          <span>Restart</span>
        </div>
        <div
          className="flex-center-v flex-col text-white w-24 cursor-pointer"
          onClick={(e) => props.shutMac(e)}
        >
          <div className="h-10 w-10 bg-gray-700 rounded-full inline-flex-center">
            <RiShutDownLine size={36} />
          </div>
          <span>Shut Down</span>
        </div>
      </div>
    </div>
  );
}
