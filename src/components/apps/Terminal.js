import React, { Component } from "react";
import terminal from "../../configs/terminal";

export default class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
    this.history = [];
    this.curHistory = 0;
    this.curInputTimes = 0;
    this.curDirPath = [];
    this.curChildren = terminal;
    this.commands = {
      cd: this.cd,
      ls: this.ls,
      cat: this.cat,
      clear: this.clear,
      help: this.help
    };
  }

  componentDidMount() {
    this.reset();
    this.generateInputRow(this.curInputTimes);
  }

  reset = () => {
    const $terminal = document.querySelector("#terminal-content");
    $terminal.innerHTML = "";
  };

  getCurDirName = () => {
    if (this.curDirPath.length === 0) return "~";
    else return this.curDirPath[this.curDirPath.length - 1];
  };

  getCurChildren = () => {
    let children = terminal;
    for (let name of this.curDirPath) {
      children = children.find((item) => {
        return (item.title === name) & (item.type === "folder");
      }).children;
    }
    return children;
  };

  // move into a specified folder
  cd = (args) => {
    if (args === undefined || args === "~") {
      // move to root
      this.curDirPath = [];
      this.curChildren = terminal;
    } else if (args === ".") {
      // stay in the current folder
      return;
    } else if (args === "..") {
      // move to parent folder
      if (this.curDirPath.length === 0) return;
      this.curDirPath.pop();
      this.curChildren = this.getCurChildren();
    } else {
      // move to certain child folder
      const target = this.curChildren.find((item) => {
        return (item.title === args) & (item.type === "folder");
      });
      if (target === undefined) {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`cd: no such file or directory: ${args}`}</span>
        );
      } else {
        this.curChildren = target.children;
        this.curDirPath.push(target.title);
      }
    }
  };

  // display content of a specified folder
  ls = () => {
    let result = [];
    for (let item of this.curChildren) {
      result.push(
        <span
          key={`terminal-result-ls-${this.curInputTimes}-${item.id}`}
          className={`${
            item.type === "file" ? "text-white" : "text-purple-300"
          }`}
        >
          {item.title}
        </span>
      );
    }
    this.generateResultRow(
      this.curInputTimes,
      <div className="grid grid-cols-4 w-full">{result}</div>
    );
  };

  // display content of a specified file
  cat = (args) => {
    const file = this.curChildren.find((item) => {
      return (item.title === args) & (item.type === "file");
    });

    if (file === undefined) {
      this.generateResultRow(
        this.curInputTimes,
        <span>{`cat: ${args}: No such file or directory`}</span>
      );
    } else {
      this.generateResultRow(this.curInputTimes, <span>{file.content}</span>);
    }
  };

  // clear terminal
  clear = () => {
    this.curInputTimes += 1;
    this.reset();
  };

  help = () => {
    const help = (
      <ul className="list-disc ml-6 pb-1.5">
        <li>
          <span className="text-red-400">cat {"<file>"}</span> - See the content
          of {"<file>"}
        </li>
        <li>
          <span className="text-red-400">cd {"<dir>"}</span> - Move into
          {" <dir>"}, "cd .." to move to the parent directory, "cd" or "cd ~" to
          return to root
        </li>
        <li>
          <span className="text-red-400">ls</span> - See files and directories
          in the current directory
        </li>
        <li>
          <span className="text-red-400">clear</span> - Clear the screen
        </li>
        <li>
          <span className="text-red-400">help</span> - Display this help menu
        </li>
        <li>
          <span className="text-red-400">rm -rf /</span> - Just try :)
        </li>
        <li>
          press <span className="text-red-400">up arrow / down arrow</span> -
          Select history commands
        </li>
        <li>
          press <span className="text-red-400">tab</span> - Auto complete
        </li>
      </ul>
    );
    this.generateResultRow(this.curInputTimes, help);
  };

  autoComplete = (text) => {
    if (text === "") return text;

    const input = text.split(" ");
    const cmd = input[0];
    const args = input[1];

    let result = text;

    if (args === undefined) {
      const guess = Object.keys(this.commands).find((item) => {
        return item.substring(0, cmd.length) === cmd;
      });
      if (guess !== undefined) result = guess;
    } else if (cmd === "cd" || cmd === "cat") {
      const type = cmd === "cd" ? "folder" : "file";
      const guess = this.curChildren.find((item) => {
        return (
          item.type === type && item.title.substring(0, args.length) === args
        );
      });
      if (guess !== undefined) result = cmd + " " + guess.title;
    }
    return result;
  };

  keyPress = (e) => {
    const keyCode = e.key;
    const $input = document.querySelector(
      `#terminal-input-${this.curInputTimes}`
    );
    const input_text = $input.value.trim();
    const input = input_text.split(" ");

    if (keyCode === "Enter") {
      // ----------- run command -----------
      this.history.push(input_text);

      const cmd = input[0];
      const args = input[1];

      // we can"t edit the past input
      $input.setAttribute("readonly", true);

      if (cmd && Object.keys(this.commands).includes(cmd)) {
        this.commands[cmd](args);
      } else {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`zsh: command not found: ${cmd}`}</span>
        );
      }

      // point to the last history command
      this.curHistory = this.history.length;

      // generate new input row
      this.curInputTimes += 1;
      this.generateInputRow(this.curInputTimes);
    } else if (keyCode === "ArrowUp") {
      // ----------- previous history command -----------
      if (this.history.length > 0) {
        if (this.curHistory > 0) this.curHistory--;
        const historyCommand = this.history[this.curHistory];
        $input.value = historyCommand;
      }
    } else if (keyCode === "ArrowDown") {
      // ----------- next history command -----------
      if (this.history.length > 0) {
        if (this.curHistory < this.history.length) this.curHistory++;
        if (this.curHistory === this.history.length) $input.value = "";
        else {
          const historyCommand = this.history[this.curHistory];
          $input.value = historyCommand;
        }
      }
    } else if (keyCode === "Tab") {
      // ----------- auto complete -----------
      $input.value = this.autoComplete(input_text);
      // prevent tab outside the terminal
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
    }
  };

  focusOnInput = (id) => {
    document.querySelector(`#terminal-input-${id}`).focus();
  };

  generateInputRow = (id) => {
    const newRow = (
      <div key={`terminal-input-row-${id}`} className="w-full h-6 flex">
        <div className="w-max flex items-center">
          <span className="text-yellow-200">
            zou@macbook-pro{" "}
            <span className="text-green-300">{this.getCurDirName()}</span>
          </span>
          <span className="ml-1.5 text-red-400">{">"}</span>
        </div>
        <input
          id={`terminal-input-${id}`}
          className="flex-1 w-full px-1 text-white outline-none bg-transparent"
          onKeyDown={this.keyPress}
          autoFocus={true}
        />
      </div>
    );
    let content = this.state.content;
    content.push(newRow);
    this.setState({ content });
  };

  generateResultRow = (id, result) => {
    const newRow = (
      <div
        key={`terminal-result-row-${id}`}
        className="w-full h-max leading-5 flex"
      >
        {result}
      </div>
    );
    let content = this.state.content;
    content.push(newRow);
    this.setState({ content });
  };

  render() {
    return (
      <div
        className="terminal nightwind-prevent nightwind-prevent-block w-full h-full bg-gray-800 bg-opacity-90 text-white text-sm font-normal py-2 px-1.5 overflow-y-scroll"
        onClick={() => this.focusOnInput(this.curInputTimes)}
      >
        <div className="w-full h-max">
          <span className="text-green-300">ヽ(ˋ▽ˊ)ノ</span>: Hey, you found the
          terminal! Type `help` to get started.
        </div>
        <div id="terminal-content" className="mt-2">
          {this.state.content}
        </div>
      </div>
    );
  }
}
