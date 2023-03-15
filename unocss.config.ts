import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

const colorReg = (prefix: string) => new RegExp("^" + prefix + "-([0-9a-z]+)(/(\\d+))?$");

const colorAttr = (prefix: string, [, color, , opacity]: RegExpMatchArray) => {
  let lightColor = "",
    darkColor = "";

  if (["black", "white"].includes(color)) {
    lightColor = color;
    darkColor = color === "white" ? "black" : "white";
  } else {
    lightColor = `gray-${color}`;
    darkColor = `gray-${(
      (+color === 900 || +color === 50 ? 950 : 900) - +color
    ).toString()}`;
  }

  const attr = `${prefix}-${lightColor}${opacity ? "/" + opacity : ""}`;
  const darkAttr = `${prefix}-${darkColor}${opacity ? "/" + opacity : ""}`;

  return `${attr} dark:${darkAttr}`;
};

export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["hstack", "flex items-center"],
    ["vstack", "flex justify-center"],
    ["no-outline", "outline-none focus:outline-none"],
    [colorReg("c-text"), (v) => colorAttr("text", v)],
    [colorReg("c-border"), (v) => colorAttr("border", v)],
    [colorReg("c-bg"), (v) => colorAttr("bg", v)],
    ["shadow-menu", "shadow-md shadow-black/25 dark:shadow-black/50"],
    ["window-btn", "w-3 h-3 text-black rounded-full flex-center no-outline"],
    ["menu-border", "border-gray-500/50"],
    [
      "menu-box",
      "fixed top-8.5 c-text-black c-bg-200/90 border menu-border rounded-lg shadow-menu"
    ],
    [
      "safari-btn",
      "h-6 outline-none focus:outline-none rounded flex-center border c-border-300"
    ],
    ["cc-btn", "flex-center rounded-full w-8 h-8 text-white bg-blue-500"],
    [
      "cc-btn-active",
      "flex-center rounded-full w-8 h-8 c-text-700 bg-gray-400/25 dark:bg-gray-300/25"
    ],
    ["cc-text", "text-xs c-text-500"],
    ["cc-grid", "c-bg-200/80 rounded-xl cc-grid-shadow backdrop-blur-2xl"],
    ["battery-level", "absolute rounded-[1px] h-2 top-1/2 -mt-1 ml-0.5 left-0"]
  ],
  rules: [["cc-grid-shadow", { "box-shadow": "0px 1px 5px 0px rgba(0, 0, 0, 0.3)" }]],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      extraProperties: {
        display: "inline-block"
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
