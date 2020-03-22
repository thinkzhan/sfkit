## 说明

权限后台

### 描述

- api目录下只描述api列表，接口统一通过this.$serv调用，插件已注入，无需依赖。错误处理（如非200）已在lib/fetch统一处理，比较脏的数据处理可放在service处理

- config/domain下定义所有接口域名，本地可选择开启prxoy模式，/MOCK前缀的路径自动开启mock模式, 请求路径对应mock目录下文件


### 权限控制

- `router/index` 定义了页面权限和操作按钮权限
- `router/interceptor` 动态控制了页面权限
- 按钮权限通过指令 `v-auth="'add'"`或者 `v-if="$auth('add')"`添加





