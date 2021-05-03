import FaceTime from "../components/apps/FaceTime";
import Terminal from "../components/apps/Terminal";
import Safari from "../components/apps/Safari";
import Notepad from "../components/apps/Notepad";
import VSCode from "../components/apps/VSCode";

const apps = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "icons/launchpad.png"
  },
  {
    id: "notepad",
    title: "Notepad",
    desktop: true,
    show: false,
    img: "icons/text.png",
    content: <Notepad />
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    show: false,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    img: "icons/safari.png",
    content: <Safari />
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    show: false,
    img: "icons/vscode.png",
    content: <VSCode />
  },
  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    show: false,
    img: "icons/facetime.png",
    height: 530,
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    show: false,
    img: "icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "email",
    title: "Email",
    desktop: false,
    img: "icons/mail.png",
    link: "mailto:renovamenzxh@gmail.com"
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "icons/github.png",
    link: "https://github.com/Renovamen"
  }
];

export default apps;
