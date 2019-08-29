module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    extends: ["plugin:vue/essential", '@vue/standard',],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: ["error", 4],
        "linebreak-style": 0,
        "no-mixed-operators": 0,
        "space-before-function-paren": 0,
        "no-use-v-if-with-v-for": 0,
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        "no-shadow": ["warn", { "builtinGlobals": true, "hoist": "never", allow:['state'] }],
        "func-names": ["error", "never"]
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        parser: "babel-eslint"
    }
};
