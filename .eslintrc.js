module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  plugins: ['react'],
  globals: {
    window: true,
    $: true,
    wx: true,
    AMap: true
  },

  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "arrow-body-style": [2], //直接返回省略return
    "array-bracket-spacing": [2, "never"], //数组中括号前后不允许空格
    indent: [2, 4, {
      "SwitchCase": 1
    }], //两格缩进
    quotes: [2, "single"], //单引号
    semi: [1, "always"], //句末必须加分号

    "brace-style": [2, "1tbs"], //大括号风格
    //comma-dangle: [2, "never"] ,//禁用拖尾逗号
    "computed-property-spacing": [2, "never"], //禁止在计算属性中使用空格
    "no-undef": [0],
    //no-cond-assign: [2, 'always'] ,//判断语句无赋值语句
    "no-dupe-keys": [2], //对象无重复键名
    "no-dupe-args": [2], //参数名无重复
    "no-redeclare": [2], //禁止多次声明同一变量
    "no-unused-vars": [1, {
      "vars": "local",
      "args": "none",
      "caughtErrors": "none"
    }], //禁止未使用过的变量
    "no-else-return": [2],
    "no-multiple-empty-lines": [2, {
      "max": 1
    }], //禁止多行空行
    "no-tabs": [2], //不能使用tab
    "no-spaced-func": [2], //函数调用时 函数名与()之间不能有空格
    "no-with": [2],
    "no-array-constructor": [2], //禁止使用数组构造器
    "no-caller": [1], //禁止使用arguments.caller或arguments.callee
    "no-class-assign": [2], //禁止给类赋值
    "no-constant-condition": [2], //禁止在条件中使用常量表达式 if(true) if(1)
    "no-duplicate-case": [2], //switch中的case标签不能重复
    "no-empty": [2], //块语句中的内容不能为空
    "no-empty-character-class": [2], //正则表达式中的[]内容不能为空
    "no-eq-null": [2], //禁止对null使用==或!=运算符
    "no-ex-assign": [2], //禁止给catch语句中的异常参数赋值
    "no-extend-native": [2], //禁止扩展native对象
    "no-extra-semi": [2], //禁止多余的冒号
    "no-extra-parens": [2], //禁止非必要的括号
    "no-fallthrough": [1], //禁止switch穿透
    "no-new-func": [1], //禁止使用new Function
    "no-octal": [2], //禁止使用八进制数字
    "no-floating-decimal": [2], //禁止省略浮点数中的0 .5 3.
    "no-lone-blocks": [2], //禁止不必要的嵌套块
    "no-nested-ternary": [2], //禁止使用嵌套的三目运算
    "no-new-wrappers": [2], //禁止使用new创建包装实例，new String new Boolean new Number
    "no-return-assign": [2], //return 语句中不能有赋值表达式
    "no-self-compare": [2], //不能比较自身
    'no-sparse-arrays': [2], //禁止稀疏数组， [1,,2]
    "no-trailing-spaces": [1], //一行结束后面不要有空格
    "no-undef-init": [2], //变量初始化时不能直接给它赋值为undefined
    "no-const-assign": [2], //禁止修改const声明的变量
    //object-curly-newline: [2, {"multiline": true}] ,//花括号内属性必须换行
    "object-curly-spacing": [2, "always"], //花括号前后必须空格
    "space-unary-ops": [2, {
      "words": true,
      "nonwords": true,
      "overrides": {
        "!": false,
        ".": false,
        "+": false,
        "-": false
      }
    }], //一元操作符前后必须加空格
    "key-spacing": [2, {
      "beforeColon": false,
      "afterColon": true,
      "mode": "strict"
    }], //{a: 1} 冒号与键无空格，与值有一个空格
    "keyword-spacing": [2, {
      "before": true,
      "after": true
    }], //关键词前后必须加空格
    "space-before-blocks": [2, "always"], //强制{}之前加空格
    "space-before-function-paren": [2, "never"], //function () function与() 之间不加空格
    "space-in-parens": [2, "never"], //圆括号前后不加空格
    "prefer-const": [2], //用const
    "prefer-destructuring": [2, {
      "array": false,
      "object": true
    }], //用对象解构
    "eqeqeq": [1] //===
  }
}
