const terminal = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi! This is Xiaohan Zou, now an intern at CETC and a research
              assistant at Peking University.
            </div>
            <div className="mt-1">
              I got my bachelor's degree in Software Engineering at Tongji
              University in 2020. I'm now waiting for starting my graduate
              study.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content:
          "Continual Learning / Meta-Learning / Reinforcement Learning / Neutral Language Processing"
      },
      {
        id: "about-who-cares",
        title: "who-cares.txt",
        type: "file",
        content:
          "I'm open to research / algorithm engineer internships for summer 2021 (base in China) lol."
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:renovamenzxh@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                renovamenzxh@gmail.com
              </a>{" "}
              /{" "}
              <a
                className="text-blue-300"
                href="mailto:xiaohan.zou@foxmail.com"
                target="_blank"
                rel="noreferrer"
              >
                xiaohan.zou@foxmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/Renovamen"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/Renovamen
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/xiaohan-zou-55bba0160"
                target="_blank"
                rel="noreferrer"
              >
                https://www.linkedin.com/in/xiaohan-zou-55bba0160
              </a>
            </li>
            <li>
              Blog:{" "}
              <a
                className="text-blue-300"
                href="https://zxh.io"
                target="_blank"
                rel="noreferrer"
              >
                https://zxh.io
              </a>
            </li>
            <li>
              知乎:{" "}
              <a
                className="text-blue-300"
                href="https://www.zhihu.com/people/chao-neng-gui-su"
                target="_blank"
                rel="noreferrer"
              >
                https://www.zhihu.com/people/chao-neng-gui-su
              </a>
            </li>
          </ul>
        )
      }
    ]
  }
];

export default terminal;
