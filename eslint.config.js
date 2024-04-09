import { renovamen } from "@renovamen/eslint-config";

export default renovamen({
  files: ["**/*.ts", "**/*.tsx"],
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
});
