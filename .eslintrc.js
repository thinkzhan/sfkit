module.exports = {
    root: true,
    extends: [
        'eslint:recommended'
        // 'airbnb-base',
        // 'plugin:vue/essential'
    ],
    env: {
        browser: true,
        es6: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        // parser: 'babel-eslint',
        sourceType: 'module'
    },
    globals: {
        ENV: true,
        window: true,
        document: false,
        require: true,
        process: true,
        __dirname: true,
        module: true,
        exports: true
    },
    plugins: ['html', 'vue'],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        },
        'html/html-extensions': ['.html', '.vue']
    },
    rules: {
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'function-paren-newline': [0],
        'no-tabs': [2],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state', 'item']
            }
        ],
        'global-require': 'off',
        'no-restricted-globals': [0],
        'no-underscore-dangle': [
            'error',
            {
                allow: ['_this']
            }
        ],
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true
            }
        ],
        'object-curly-spacing': ['error', 'always'],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'arrow-parens': ['error', 'as-needed'],
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }
        ],
        'quote-props': [0],
        'no-use-before-define': [
            'error',
            {
                functions: false
            }
        ],
        'no-restricted-syntax': [0],
        'no-script-url': [0],
        'no-nested-ternary': [0],
        'func-names': [0],
        'no-useless-escape': [0],
        'no-mixed-operators': [0],
        'no-extra-semi': [2],  //禁止多余的冒号
        'no-extra-parens': [2], //禁止非必要的括号
        'class-methods-use-this': [0],
        'max-len': [
            'error',
            {
                code: 150,
                ignoreRegExpLiterals: true
            }
        ],
        'no-bitwise': [
            'error',
            {
                allow: ['~']
            }
        ],
        'import/no-unresolved': [0],
        'import/extensions': ['js', 'jsx'],
        'no-new': [0],
        'no-console': [0],
        'no-cond-assign': [0],
        'no-unused-expressions': [0],
        'import/no-dynamic-require': [0],
        'no-param-reassign': [0],
        'no-plusplus': [0],
        'no-underscore-dangle': [0],
        'no-undef': [2],
        'no-const-assign': [2],
        'no-undef-init': [2],
        'prefer-destructuring': [
            'error',
            {
                array: false,
                object: true
            },
            {
                enforceForRenamedProperties: false
            }
        ],
        'semi': [1, "always"],  //句末必须加分号
        'prefer-const': [2],   //用const,
        'no-unused-vars': [1, { 'vars': 'all', 'args': 'none' }],
        'no-case-declarations': [0]
    }
};
