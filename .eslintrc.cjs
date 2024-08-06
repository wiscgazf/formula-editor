module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential"
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["src/**/*.vue", "src/**/*.less"],
      // 关闭组件名需要多个单词组成的规则
      rules: { "vue/multi-word-component-names": "off" },
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    "no-console": "off",
    "no-debugger": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
    quotes: ["error", "single"],
    semi: ["error", "never"],
  },
}
