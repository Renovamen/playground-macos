import React, { Component } from "react";
import bear from "../../configs/bear";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";

const Highlighter = (dark) => {
  return {
    code({ node, inline, className, children, ...props }) {
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

class Sidebar extends Component {
  render() {
    return (
      <div className="nightwind-prevent w-full h-full bg-gray-700 text-white overflow-y-scroll">
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

class Middlebar extends Component {
  render() {
    return (
      <div className="w-full h-full bg-gray-50 border-r border-gray-300 overflow-y-scroll">
        <ul>
          {this.props.items.map((item, index) => (
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
                <div className="w-10 text-gray-500 flex flex-none justify-center">
                  {item.icon}
                </div>
                <span className="text-gray-900 flex-grow font-medium">
                  {item.title}
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

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeMd: {}
    };
  }

  componentDidMount() {
    this.fetchMarkdown(this.props.id, this.props.url);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchMarkdown(this.props.id, this.props.url);
    }
  }

  fetchMarkdown(id, url) {
    let storeMd = this.state.storeMd;
    if (!storeMd[id]) {
      fetch(url)
        .then((response) => response.text())
        .then((text) => {
          storeMd[id] = text.replace(/&nbsp;/g, "");
          this.setState({ storeMd });
        })
        .catch((error) => console.error(error));
    }
  }

  render() {
    return (
      <div className="bear w-full h-full bg-gray-50 text-gray-700 overflow-scroll py-6">
        <div className="w-2/3 px-2 mx-auto">
          <ReactMarkdown
            children={this.state.storeMd[this.props.id]}
            linkTarget="_blank"
            remarkPlugins={[gfm]}
            components={Highlighter(this.props.dark)}
          />
        </div>
      </div>
    );
  }
}

export default class Bear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curSidebar: 0,
      curMidbar: 0,
      midbarList: bear[0].md,
      contentURL: bear[0].md[0].file,
      contentID: bear[0].md[0].id
    };
  }

  setMidBar = (items, index) => {
    this.setState({
      midbarList: items,
      curSidebar: index,
      contentURL: items[0].file,
      contentID: items[0].id,
      curMidbar: 0
    });
  };

  setContent = (id, url, index) => {
    this.setState({
      contentID: id,
      contentURL: url,
      curMidbar: index
    });
  };

  render() {
    return (
      <div className="flex flex-row w-full h-full">
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
