import { FaPaw, FaVuejs } from "react-icons/fa";
import {
  GiNinjaHeroicStance,
  GiJumpingDog,
  GiEnergySword,
  GiCat,
  GiFishEscape
} from "react-icons/gi";
import { VscGithub } from "react-icons/vsc";
import { GoRepo, GoBrowser } from "react-icons/go";
import { RiGamepadLine } from "react-icons/ri";
import { HiFire } from "react-icons/hi";
import { CgFormatText } from "react-icons/cg";
import { BiCube, BiGame } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";

import { BearData } from "../types";

const bear: BearData[] = [
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
        excerpt: "Hey there! I'm a dragon lost in human world..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: <VscGithub />,
        excerpt: "Here are some status about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: <GoBrowser />,
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: <GoRepo />,
    md: [
      {
        id: "flint",
        title: "Flint",
        file: "https://raw.githubusercontent.com/Renovamen/flint/main/README.md",
        icon: <HiFire />,
        excerpt: "A deep learning framework implemented in Numpy...",
        link: "https://github.com/Renovamen/flint"
      },
      {
        id: "metallic",
        title: "Metallic",
        file: "https://raw.githubusercontent.com/Renovamen/metallic/master/README.md",
        icon: <GiJumpingDog />,
        excerpt: "A meta-learning library base on PyTorch...",
        link: "https://github.com/Renovamen/metallic"
      },
      {
        id: "alkaid",
        title: "Alkaid",
        file: "https://raw.githubusercontent.com/Renovamen/alkaid/main/README.md",
        icon: <GiCat />,
        excerpt: "A reinforcement-learning toolbox for PyTorch...",
        link: "https://github.com/Renovamen/alkaid"
      },
      {
        id: "portfolio-macos",
        title: "Portfolio macOS",
        file: "https://raw.githubusercontent.com/Renovamen/playground-macos/main/README.md",
        icon: <RiGamepadLine />,
        excerpt: "My portfolio website simulating macOS's GUI...",
        link: "https://github.com/Renovamen/playground-macos"
      },
      {
        id: "oh-vue-icons",
        title: "Oh, Vue Icons!",
        file: "https://raw.githubusercontent.com/Renovamen/oh-vue-icons/master/README.md",
        icon: <FaVuejs />,
        excerpt: "Importing icons from different icon packs in Vue easily...",
        link: "https://oh-vue-icons.netlify.app"
      },
      {
        id: "gungnir",
        title: "Gungnir",
        file: "https://raw.githubusercontent.com/Renovamen/vuepress-theme-gungnir/main/README.md",
        icon: <GiEnergySword />,
        excerpt: "A simple and beautiful blog theme for VuePress...",
        link: "https://vuepress-theme-gungnir.vercel.app"
      },
      {
        id: "text-classification",
        title: "Text Classification",
        file: "https://raw.githubusercontent.com/Renovamen/Text-Classification/master/README.md",
        icon: <CgFormatText />,
        excerpt: "PyTorch implementation of text classificaiton models...",
        link: "https://github.com/Renovamen/Text-Classification"
      },
      {
        id: "speech-emotion-recognition",
        title: "Speech Emotion",
        file: "https://raw.githubusercontent.com/Renovamen/Speech-Emotion-Recognition/master/README.md",
        icon: <AiFillAudio />,
        excerpt: "Speech emotion recognition using Keras and sklearn...",
        link: "https://github.com/Renovamen/Speech-Emotion-Recognition"
      },
      {
        id: "image-captioning",
        title: "Image Captioning",
        file: "https://raw.githubusercontent.com/Renovamen/Image-Captioning/master/README.md",
        icon: <BsFillImageFill />,
        excerpt: "PyTorch implementation of image captioning models...",
        link: "https://github.com/Renovamen/Image-Captioning"
      },
      {
        id: "cube-solver",
        title: "Cube Solver",
        file: "https://raw.githubusercontent.com/Renovamen/Just-a-Cube/master/README.md",
        icon: <BiCube />,
        excerpt: "A rubik's cube solver (layer-by-layer & two-phase)...",
        link: "https://cube.zxh.io"
      },
      {
        id: "midgard",
        title: "Interactable Resume",
        file: "https://raw.githubusercontent.com/Renovamen/midgard/master/README.md",
        icon: <BiGame />,
        excerpt: "An interactable version of my resume, powered by Vue...",
        link: "https://resume.zxh.io/"
      },
      {
        id: "fishmail",
        title: "Fishmail",
        file: "https://raw.githubusercontent.com/Renovamen/Fishmail/master/README.md",
        icon: <GiFishEscape />,
        excerpt: "上班的时候装作在 Gmail 上查邮件的样子看知乎摸鱼...",
        link: "https://fishmail.vercel.app"
      }
    ]
  }
];

export default bear;
