import FaceTime from "../components/apps/FaceTime";
import Terminal from "../components/apps/Terminal";
import Safari from "../components/apps/Safari";
import Notepad from "../components/apps/Notepad";
import VSCode from "../components/apps/VSCode";

const apps = [
  {
    id: "notepad",
    title: "Notepad",
    desktop: true,
    show: true,
    img: "icons/text.png",
    content: <Notepad />
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    show: false,
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
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    show: false,
    img: "icons/terminal.png",
    content: <Terminal />
  }
];

export default apps;
