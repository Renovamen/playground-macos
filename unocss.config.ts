import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

const colorReg = (prefix: string) =>
  new RegExp("^" + prefix + "-([0-9a-z]+)(/(\\d+))?$");

const colorAttr = (prefix: string, [, color, , opacity]: RegExpMatchArray) => {
  let lightColor = "",
    darkColor = "";

  if (["black", "white"].includes(color)) {
    lightColor = color;
    darkColor = color === "white" ? "black" : "white";
  } else {
    lightColor = `gray-${color}`;
    darkColor = `gray-${(900 - +color).toString()}`;
  }

  const attr = `${prefix}-${lightColor}${opacity ? "/" + opacity : ""}`;
  const darkAttr = `${prefix}-${darkColor}${opacity ? "/" + opacity : ""}`;

  return `${attr} dark:${darkAttr}`;
};

export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["inline-flex-center", "inline-flex items-center justify-center"],
    ["hstack", "flex items-center"],
    ["vstack", "flex justify-center"],
    ["no-outline", "outline-none focus:outline-none"],
    [colorReg("c-text"), (v) => colorAttr("text", v)],
    [colorReg("c-border"), (v) => colorAttr("border", v)],
    [colorReg("c-bg"), (v) => colorAttr("bg", v)],
    [
      "window-btn",
      "w-3 h-3 text-black rounded-full inline-flex-center no-outline"
    ],
    ["menu-box-border", "c-border-400/50"],
    ["menu-box", "fixed shadow-base c-text-black c-bg-200/90 menu-box-border"],
    [
      "safari-btn",
      "h-6 outline-none focus:outline-none rounded flex-center border c-border-300"
    ],
    ["cc-btn", "rounded-full p-2 c-text-white bg-blue-500 dark:bg-blue-400"],
    [
      "cc-btn-active",
      "rounded-full p-2 c-text-700 bg-gray-400/25 dark:bg-gray-300/25"
    ],
    ["cc-text", "text-xs c-text-500"],
    ["cc-grid", "shadow-base c-bg-200/80 rounded-xl backdrop-blur-2xl"],
    ["battery-level", "absolute rounded-[1px] h-2 top-1/2 -mt-1 ml-0.5 left-0"]
  ],
  rules: [
    ["shadow-base", { "box-shadow": "0px 0px 5px 0px rgba(0, 0, 0, 0.3)" }]
  ],
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
