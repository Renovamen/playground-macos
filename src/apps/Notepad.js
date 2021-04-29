import React, { useState } from "react";
import Window from "../components/Window";

function NotepadContent() {
  return (
    <div className="w-full h-full bg-gray-100 text-gray-700 overflow-scroll px-8 py-6">
      <div className="charapter">
        <div className="font-medium text-gray-800 text-lg heading">
          About Me
        </div>
        <div className="paragraph mt-4">
          Hey there! I'm Xiaohan Zou, <s>a dragon lost in human world</s> now an
          intern at CETC and a research assistant at Peking University. Before
          that, I got my bachelor's degree in Software Engineering at Tongji
          University. I'm trying to find a balance between research and
          engineering.
        </div>
        <div className="paragraph mt-4">
          Research-wise, I'm mainly working on topics related to exploring the
          capability of machines to develop intelligent behavior upon what they
          have learned, like meta-learning and continual learning.
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
}

export default function Notepad({ show, setShow, active, z }) {
  const [textMax, setTextMax] = useState(false);
  return (
    <Window
      content={<NotepadContent />}
      title="Notepad"
      show={show}
      setShow={setShow}
      max={textMax}
      setMax={setTextMax}
      active={active}
      z={z}
    />
  );
}
