import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import bear from "../../configs/bear";
import { BearMdData } from "../../types";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineLink } from "react-icons/ai";

interface BearRedux {
  dark?: boolean;
}

interface BearState {
  curSidebar: number;
  curMidbar: number;
  contentID: string;
  contentURL: string;
  midbarList: BearMdData[];
}

interface ContentProps extends BearRedux {
  id: string;
  url: string;
}

interface ContentState {
  storeMd: {
    [key: string]: string;
  };
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
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };
};

class Sidebar extends Component<SidebarProps> {
  render() {
    return (
      <div className="sidebar w-full h-full bg-gray-700 text-white overflow-y-scroll">
        <div className="h-12 pr-3 flex flex-row justify-end items-center">
          <IoCloudOfflineOutline className="mr-3" size={20} />
          <GiSettingsKnobs size={20} />
        </div>
        <ul>
          {bear.map((item, index) => (
            <li
              key={`bear-sidebar-${item.id}`}
              className={`pl-6 h-8 flex flex-row items-center cursor-default ${
                this.props.cur === index ? "bg-red-500" : "bg-transparent"
              } ${this.props.cur === index ? "" : "hover:bg-gray-600"}`}
              onClick={() => this.props.setMidBar(item.md, index)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class Middlebar extends Component<MiddlebarProps> {
  render() {
    return (
      <div className="midbar w-full h-full bg-gray-50 border-r border-gray-300 overflow-y-scroll">
        <ul>
          {this.props.items.map((item: BearMdData, index: number) => (
            <li
              key={`bear-midbar-${item.id}`}
              className={`h-24 flex flex-col cursor-default border-l-2 ${
                this.props.cur === index
                  ? "border-red-500 bg-white"
                  : "border-transparent bg-transparent"
              } hover:bg-white`}
              onClick={() => this.props.setContent(item.id, item.file, index)}
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
  }
}

class Content extends Component<ContentProps, ContentState> {
  constructor(props: ContentProps) {
    super(props);
    this.state = {
      storeMd: {}
    };
  }

  componentDidMount() {
    this.fetchMarkdown(this.props.id, this.props.url);
  }

  componentDidUpdate(prevProps: ContentProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchMarkdown(this.props.id, this.props.url);
    }
  }

  fetchMarkdown(id: string, url: string) {
    let storeMd = this.state.storeMd;
    if (!storeMd[id]) {
      fetch(url)
        .then((response) => response.text())
        .then((text) => {
          text = this.fixImageURL(text, url);
          storeMd[id] = text;
          this.setState({ storeMd });
        })
        .catch((error) => console.error(error));
    }
  }

  getRepoURL(url: string) {
    return url.slice(0, -10) + "/";
  }

  fixImageURL(text: string, mdURL: string): string {
    text = text.replace(/&nbsp;/g, "");
    if (mdURL.indexOf("raw.githubusercontent.com") !== -1) {
      const repoURL = this.getRepoURL(mdURL);

      const imgReg = /!\[(.*?)\]\((.*?)\)/;
      const imgRegGlobal = /!\[(.*?)\]\((.*?)\)/g;

      const imgList = text.match(imgRegGlobal);

      if (imgList) {
        for (let img of imgList) {
          const imgURL = (img.match(imgReg) as Array<string>)[2];
          if (imgURL.indexOf("http") !== -1) continue;
          const newImgURL = repoURL + imgURL;
          text = text.replace(imgURL, newImgURL);
        }
      }
    }
    return text;
  }

  render() {
    return (
      <div className="markdown w-full h-full bg-gray-50 text-gray-700 overflow-scroll py-6">
        <div className="w-2/3 px-2 mx-auto">
          <ReactMarkdown
            children={this.state.storeMd[this.props.id]}
            linkTarget="_blank"
            remarkPlugins={[gfm]}
            components={Highlighter(this.props.dark as boolean)}
          />
        </div>
      </div>
    );
  }
}

class Bear extends Component<BearRedux, BearState> {
  constructor(props: BearRedux) {
    super(props);
    this.state = {
      curSidebar: 0,
      curMidbar: 0,
      midbarList: bear[0].md,
      contentURL: bear[0].md[0].file,
      contentID: bear[0].md[0].id
    };
  }

  setMidBar = (items: BearMdData[], index: number) => {
    this.setState({
      midbarList: items,
      curSidebar: index,
      contentURL: items[0].file,
      contentID: items[0].id,
      curMidbar: 0
    });
  };

  setContent = (id: string, url: string, index: number) => {
    this.setState({
      contentID: id,
      contentURL: url,
      curMidbar: index
    });
  };

  render() {
    return (
      <div className="bear font-avenir flex flex-row w-full h-full">
        <div className="flex-none w-44">
          <Sidebar cur={this.state.curSidebar} setMidBar={this.setMidBar} />
        </div>
        <div className="flex-none w-60">
          <Middlebar
            items={this.state.midbarList}
            cur={this.state.curMidbar}
            setContent={this.setContent}
          />
        </div>
        <div className="flex-grow">
          <Content
            id={this.state.contentID}
            url={this.state.contentURL}
            dark={this.props.dark}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: BearRedux): BearRedux => {
  return {
    dark: state.dark
  };
};

export default connect(mapStateToProps, null)(Bear);
