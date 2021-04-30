import React, { useState } from "react";
import Window from "../components/Window";

const NotepadContent = () => {
  return (
    <div className="w-full h-full bg-gray-100 text-gray-700 overflow-scroll px-8 py-6">
      <div className="charapter">
        <div className="font-medium text-gray-800 text-lg heading">
          About Me
        </div>
        <div className="paragraph mt-4">
          Hey there! I'm Xiaohan Zou, <s>a dragon lost in human world</s> now an
          intern at CETC and a research assistant at Peking University. Before
          that, I got my bachelor's degree in{" "}
          <a
            className="text-blue-500"
            href="http://sse.tongji.edu.cn/"
            target="_blank"
            rel="noreferrer"
          >
            Software Engineering
          </a>{" "}
          at{" "}
          <a
            className="text-blue-500"
            href="https://www.tongji.edu.cn/"
            target="_blank"
            rel="noreferrer"
          >
            Tongji University
          </a>
          . I'm trying to find a balance between research and engineering.
        </div>
        <div className="paragraph mt-4">
          Research-wise, I'm mainly working on topics related to exploring the
          capability of machines to develop intelligent behavior upon what they
          have learned, like meta-learning and continual learning.
        </div>
      </div>

      <div className="charapter mt-8">
        <div className="font-medium text-gray-800 text-lg heading">
          About This Site
        </div>
        <div className="paragraph mt-4">
          This site is inspired by{" "}
          <a
            className="text-blue-500"
            href="https://www.apple.com/in/macos/big-sur/"
            target="_blank"
            rel="noreferrer"
          >
            macOS Big Sur
          </a>
          , developed using{" "}
          <a
            className="text-blue-500"
            href="https://reactjs.org/"
            target="_blank"
            rel="noreferrer"
          >
            React
          </a>{" "}
          and{" "}
          <a
            className="text-blue-500"
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer"
          >
            tailwindcss
          </a>
          , and hosted on{" "}
          <a
            className="text-blue-500"
            href="https://vercel.com/"
            target="_blank"
            rel="noreferrer"
          >
            Vercel
          </a>
          . Some of the icons are generated using{" "}
          <a
            className="text-blue-500"
            href="https://github.com/sindresorhus/file-icon-cli"
            target="_blank"
            rel="noreferrer"
          >
            sindresorhus/file-icon-cli
          </a>
          .
        </div>
        <div className="paragraph mt-4">
          The source code is hosted{" "}
          <a
            className="text-blue-500"
            href="https://github.com/Renovamen/playground-macos"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </div>
      </div>

      <div className="charapter mt-8">
        <div className="font-medium text-gray-800 text-lg heading">Contact</div>
        <div className="paragraph mt-4">
          Reach me at:
          <ul className="mt-2 list-disc list-inside">
            <li>
              Email:{" "}
              <a className="text-blue-500" href="mailto:renovamenzxh@gmail.com">
                renovamenzxh@gmail.com
              </a>{" "}
              /{" "}
              <a
                className="text-blue-500"
                href="mailto:xiaohan.zou@foxmail.com"
              >
                xiaohan.zou@foxmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-500"
                href="https://github.com/Renovamen"
                target="_blank"
                rel="noreferrer"
              >
                @Renovamen
              </a>
            </li>
            <li>
              知乎:{" "}
              <a
                className="text-blue-500"
                href="https://www.zhihu.com/people/chao-neng-gui-su"
                target="_blank"
                rel="noreferrer"
              >
                @Renovamen
              </a>
            </li>
            <li>
              Blog:{" "}
              <a
                className="text-blue-500"
                href="https://renovamen.ink"
                target="_blank"
                rel="noreferrer"
              >
                renovamen.ink
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-500"
                href="https://www.linkedin.com/in/xiaohan-zou-55bba0160"
                target="_blank"
                rel="noreferrer"
              >
                Xiaohan Zou
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="charapter mt-8">
        <div className="font-medium text-gray-800 text-lg heading">Résumé</div>
        <div className="paragraph mt-4">
          My résumé can be found{" "}
          <a
            className="text-blue-500"
            href="https://renovamen.ink/files/cv/brief/en.pdf"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default function Notepad({ show, setShow, active, z }) {
  const [textMax, setTextMax] = useState(false);
  return (
    <Window
      title="Notepad"
      show={show}
      setShow={setShow}
      max={textMax}
      setMax={setTextMax}
      active={active}
      z={z}
    >
      <NotepadContent />
    </Window>
  );
}
