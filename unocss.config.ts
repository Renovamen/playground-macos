import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["flex-center-v", "flex items-center"],
    ["flex-center-h", "flex justify-center"],
    ["inline-flex-center", "inline-flex items-center justify-center"],
    ["no-outline", "outline-none focus:outline-none"],
    [
      "window-btn",
      "w-3 h-3 text-black rounded-full inline-flex-center no-outline"
    ],
    [
      "menu-box-border",
      "border-gray-400 border-opacity-50 dark:(border-gray-500 border-opacity-50)"
    ],
    [
      "menu-box",
      "fixed shadow-base text-black bg-gray-200 bg-opacity-90 shadow-2xl menu-box-border dark:(text-white bg-gray-700 bg-opacity-90)"
    ],
    [
      "safari-btn",
      "h-6 outline-none focus:outline-none rounded flex-center border border-gray-300 dark:border-gray-600"
    ],
    [
      "cc-btn",
      "rounded-full p-2 bg-blue-500 text-white dark:(bg-blue-400 text-black)"
    ],
    [
      "cc-btn-active",
      "rounded-full p-2 bg-gray-400 bg-opacity-25 text-gray-700 dark:(bg-gray-500 bg-opacity-25 text-gray-200)"
    ],
    ["cc-text", "text-xs text-gray-500 dark:text-gray-400"],
    [
      "cc-mode",
      "text-gray-700 bg-gray-400 bg-opacity-25 rounded-full p-2 dark:(text-gray-200 bg-gray-500 bg-opacity-25)"
    ],
    [
      "cc-grid",
      "shadow-base bg-gray-200 bg-opacity-80 rounded-xl backdrop-blur-2xl dark:(bg-gray-700 bg-opacity-80)"
    ],
    ["battery-level", "absolute rounded-xs h-2 top-1/2 -mt-1 ml-0.5 left-0"]
  ],
  rules: [
    ["shadow-base", { "box-shadow": "0px 0px 5px 0px rgba(0, 0, 0, 0.3)" }],
    ["max-w-launchpad", { "max-width": "1100px" }],
    ["h-spotlight", { height: "341px" }],
    ["rounded-xs", { "border-radius": "1px" }],
    ["leading-cc", { "line-height": "0.9rem" }]
  ],
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
