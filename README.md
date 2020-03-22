## 说明

后台 - 开发商用

支持stylus, pug

### 规范描述

- api目录下只描述api列表，接口统一通过this.$serv调用，插件已注入，无需依赖。错误处理（如非200）已在lib/fetch统一处理，比较脏的数据处理可放在service处理

- config/domain下定义所有接口域名，本地可选择开启prxoy模式，/MOCK前缀的路径自动开启mock模式, 请求路径对应mock目录下文件

- components/TableSearch组件慎用，除非需求固定
