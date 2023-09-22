module.exports = {
  extends: "@renovamen/eslint-config-react",
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
};
