import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineLink } from "react-icons/ai";
import { IoCloudOfflineOutline } from "react-icons/io5";
import bear from "../../configs/bear";
import type { BearMdData, RootReduxState } from "../../types";

interface ContentProps {
  contentID: string;
  contentURL: string;
}

interface MiddlebarProps {
  items: BearMdData[];
  cur: number;
  setContent: (id: string, url: string, index: number) => void;
}

interface SidebarProps {
  cur: number;
  setMidBar: (items: BearMdData[], index: number) => void;
}

interface BearState extends ContentProps {
  curSidebar: number;
  curMidbar: number;
  midbarList: BearMdData[];
}

const Highlighter = (dark: boolean): any => {
  interface codeProps {
    node: any;
    inline: boolean;
    className: string;
    children: any;
  }

  return {
    code({ node, inline, className, children, ...props }: codeProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={dark ? dracula : prism}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };
};

const Sidebar = ({ cur, setMidBar }: SidebarProps) => {
  return (
    <div className="nightwind-prevent nightwind-prevent-block sidebar w-full h-full bg-gray-700 text-white overflow-y-scroll">
      <div className="h-12 pr-3 flex flex-row justify-end items-center">
        <IoCloudOfflineOutline className="mr-3" size={20} />
        <GiSettingsKnobs size={20} />
      </div>
      <ul>
        {bear.map((item, index) => (
          <li
            key={`bear-sidebar-${item.id}`}
            className={`pl-6 h-8 flex flex-row items-center cursor-default ${
              cur === index ? "bg-red-500" : "bg-transparent"
            } ${cur === index ? "" : "hover:bg-gray-600"}`}
            onClick={() => setMidBar(item.md, index)}
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Middlebar = ({ items, cur, setContent }: MiddlebarProps) => {
  return (
    <div className="midbar w-full h-full bg-gray-50 border-r border-gray-300 overflow-y-scroll">
      <ul>
        {items.map((item: BearMdData, index: number) => (
          <li
            key={`bear-midbar-${item.id}`}
            className={`h-24 flex flex-col cursor-default border-l-2 ${
              cur === index
                ? "border-red-500 bg-white"
                : "border-transparent bg-transparent"
            } hover:bg-white`}
            onClick={() => setContent(item.id, item.file, index)}
          >
            <div className="h-8 mt-3 flex flex-row flex-none items-center">
              <div className="-mt-1 w-10 text-gray-500 flex flex-none justify-center">
                {item.icon}
              </div>
              <span className="relative text-gray-900 flex-grow font-bold">
                {item.title}
                {item.link && (
                  <a
                    className="absolute top-1 right-4"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiOutlineLink className="text-gray-500" />
                  </a>
                )}
              </span>
            </div>
            <div className="h-16 ml-10 pb-2 pr-1 border-b border-gray-300 text-sm text-gray-500">
              {item.excerpt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getRepoURL = (url: string) => {
  return url.slice(0, -10) + "/";
};

const fixImageURL = (text: string, contentURL: string): string => {
  text = text.replace(/&nbsp;/g, "");
  if (contentURL.indexOf("raw.githubusercontent.com") !== -1) {
    const repoURL = getRepoURL(contentURL);

    const imgReg = /!\[(.*?)\]\((.*?)\)/;
    const imgRegGlobal = /!\[(.*?)\]\((.*?)\)/g;

    const imgList = text.match(imgRegGlobal);

    if (imgList) {
      for (const img of imgList) {
        const imgURL = (img.match(imgReg) as Array<string>)[2];
        if (imgURL.indexOf("http") !== -1) continue;
        const newImgURL = repoURL + imgURL;
        text = text.replace(imgURL, newImgURL);
      }
    }
  }
  return text;
};

const Content = ({ contentID, contentURL }: ContentProps) => {
  const [storeMd, setStoreMd] = useState<{ [key: string]: string }>({});
  const dark = useSelector((state: RootReduxState) => state.dark);

  const fetchMarkdown = useCallback(
    (id: string, url: string) => {
      if (!storeMd[id]) {
        fetch(url)
          .then((response) => response.text())
          .then((text) => {
            storeMd[id] = fixImageURL(text, url);
            setStoreMd({ ...storeMd });
          })
          .catch((error) => console.error(error));
      }
    },
    [storeMd]
  );

  useEffect(() => {
    fetchMarkdown(contentID, contentURL);
  }, [contentID, contentURL, fetchMarkdown]);

  return (
    <div className="markdown w-full h-full bg-gray-50 text-gray-700 overflow-scroll py-6">
      <div className="w-2/3 px-2 mx-auto">
        <ReactMarkdown
          linkTarget="_blank"
          remarkPlugins={[gfm]}
          components={Highlighter(dark as boolean)}
        >
          {storeMd[contentID]}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const Bear = () => {
  const [state, setState] = useState<BearState>({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: bear[0].md,
    contentID: bear[0].md[0].id,
    contentURL: bear[0].md[0].file
  });

  const setMidBar = (items: BearMdData[], index: number) => {
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0].id,
      contentURL: items[0].file
    });
  };

  const setContent = (id: string, url: string, index: number) => {
    setState({
      ...state,
      curMidbar: index,
      contentID: id,
      contentURL: url
    });
  };

  return (
    <div className="bear font-avenir flex flex-row w-full h-full">
      <div className="flex-none w-44">
        <Sidebar cur={state.curSidebar} setMidBar={setMidBar} />
      </div>
      <div className="flex-none w-60">
        <Middlebar
          items={state.midbarList}
          cur={state.curMidbar}
          setContent={setContent}
        />
      </div>
      <div className="flex-grow">
        <Content contentID={state.contentID} contentURL={state.contentURL} />
      </div>
    </div>
  );
};

export default Bear;
