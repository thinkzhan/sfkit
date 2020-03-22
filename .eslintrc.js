// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    env: {
        browser: false,
        node: true,
        es6: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: ['plugin:vue/essential', 'standard'], // required to lint *.vue files
    plugins: ['vue'],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'standard/computed-property-even-spacing': [0],
        'space-before-function-paren': [2, 'never'],
        eqeqeq: [0],
        semi: [0],
        'no-constant-condition': [0],
        'vue/no-use-v-if-with-v-for': [0],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
    globals: {
        App: true,
        Page: true,
        wx: true,
        swan: true,
        tt: true,
        my: true,
        getApp: true,
        getPage: true,
        requirePlugin: true,
        mpvue: true,
        mpvuePlatform: true,
        getCurrentPages: true
    }
};
