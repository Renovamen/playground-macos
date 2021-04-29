import React from "react";

export default function Login({ setlogon }) {
  return (
    <div
      className="text-center"
      style={{
        height: "100vh",
        width: "100vw",
        background: "url(img/wallpaper.jpg) center/cover no-repeat"
      }}
      onClick={() => setlogon(true)}
    >
      <div className="inline-block w-auto relative top-1/2 -mt-24">
        <img
          className="rounded-full w-24 h-24 my-0 mx-auto"
          src="img/avatar.jpg"
          alt="img"
        />
        <div className="font-semibold mt-4 bg-white rounded-md bg-opacity-10 blur py-1 px-5">
          <span className="text-white">Xiaohan Zou</span>
        </div>
        <div className="text-sm mt-2 text-gray-200">Click to enter</div>
      </div>
    </div>
  );
}
