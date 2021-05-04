import { FaPaw, FaVuejs } from "react-icons/fa";
import {
  GiNinjaHeroicStance,
  GiJumpingDog,
  GiEnergySword,
  GiCat,
  GiFishEscape
} from "react-icons/gi";
import { VscGithub } from "react-icons/vsc";
import { GoRepo } from "react-icons/go";
import { RiGamepadLine } from "react-icons/ri";
import { HiFire } from "react-icons/hi";
import { CgFormatText } from "react-icons/cg";
import { BiCube } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";

const bear = [
  {
    id: "profile",
    title: "Profile",
    icon: <FaPaw />,
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: <GiNinjaHeroicStance />,
        excerpt: "Hey there! I'm Xiaohan Zou, a dragon lost in human world..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: <VscGithub />,
        excerpt: "Here are some status about my github account..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: <GoRepo />,
    md: [
      {
        id: "portfolio-macos",
        title: "Portfolio macOS",
        file:
          "https://raw.githubusercontent.com/Renovamen/playground-macos/main/README.md",
        icon: <RiGamepadLine />,
        excerpt: "My portfolio website simulating macOS's GUI..."
      },
      {
        id: "flint",
        title: "Flint",
        file:
          "https://raw.githubusercontent.com/Renovamen/flint/main/README.md",
        icon: <HiFire />,
        excerpt: "A toy deep learning framework implemented in Numpy..."
      },
      {
        id: "metallic",
        title: "Metallic",
        file:
          "https://raw.githubusercontent.com/Renovamen/metallic/master/README.md",
        icon: <GiJumpingDog />,
        excerpt: "A meta-learning library base on PyTorch..."
      },
      {
        id: "alkaid",
        title: "Alkaid",
        file:
          "https://raw.githubusercontent.com/Renovamen/alkaid/main/README.md",
        icon: <GiCat />,
        excerpt: "A reinforcement-learning toolbox for PyTorch..."
      },
      {
        id: "oh-vue-icons",
        title: "Oh, Vue Icons!",
        file:
          "https://raw.githubusercontent.com/Renovamen/oh-vue-icons/master/README.md",
        icon: <FaVuejs />,
        excerpt: "Importing icons from different icon packs in Vue easily..."
      },
      {
        id: "gungnir",
        title: "Gungnir",
        file:
          "https://raw.githubusercontent.com/Renovamen/vuepress-theme-gungnir/main/README.md",
        icon: <GiEnergySword />,
        excerpt: "A blog theme for VuePress (there is also a Jekyll version)..."
      },
      {
        id: "text-classification",
        title: "Text Classification",
        file:
          "https://raw.githubusercontent.com/Renovamen/Text-Classification/master/README.md",
        icon: <CgFormatText />,
        excerpt: "PyTorch implementation of some text classificaiton models..."
      },
      {
        id: "image-captioning",
        title: "Image Captioning",
        file:
          "https://raw.githubusercontent.com/Renovamen/Image-Captioning/master/README.md",
        icon: <BsFillImageFill />,
        excerpt: "PyTorch implementation of some papers on image captioning..."
      },
      {
        id: "cube-solver",
        title: "Cube Solver",
        file:
          "https://raw.githubusercontent.com/Renovamen/Just-a-Cube/master/README.md",
        icon: <BiCube />,
        excerpt:
          "A rubik's cube solver (supports layer-by-layer and two-phase)..."
      },
      {
        id: "fishmail",
        title: "Fishmail",
        file:
          "https://raw.githubusercontent.com/Renovamen/Fishmail/master/README.md",
        icon: <GiFishEscape />,
        excerpt: "上班的时候装作在 Gmail 上查邮件的样子看知乎摸鱼..."
      }
    ]
  }
];

export default bear;
