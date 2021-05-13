# sites-server-ts
![截图](https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/githubimg/QQ%E6%88%AA%E5%9B%BE20210407215111.jpg)

## 简介
“<a target="_blank" href="https://sites.link">站点聚合平台</a>，让更多的人知道您的网站”，小站正在处于初期阶，功能正在一步步完善中
如果您想协助小站，包括但不限于建议、交互、代码、服务器，您都可以直接与我联系
或者发送至我的邮箱：adaxh@qq.com
参与其中，您将会出现在开发人员列表中。
> This site is in the initial stage. At present, the developer is only me, a humble and small front end, and the function is being improved step by step
> If you want to assist this site, including but not limited to suggestions, interaction, code and server, you can contact me directly
> or send it to my email address: adaxh@qq.com
> Participate, and you will appear in the developer list

[![DeepScan grade](https://deepscan.io/api/teams/13594/projects/16596/branches/359188/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=13594&pid=16596&bid=359188)

## 这是什么仓库
这是站点聚合平台的后端代码，以下是涉及到的npm(技术栈？)：
- koa@2.0+
- TypeScript@4.2.0+
- Mongodb
- ...

## 文件目录
- controller :  路由控制器
- service :     业务逻辑层
- entity :      实体类目录
- common :      一些手写的工具（注解，DI等）
- config :      一些启动配置

目前已经重写完成的功能/模块：
- [x] 用户模块
- [ ] 站点模块
- [ ] 缓存
- [ ] 安全


## 如何启动dev
1. 安装node
2. 使用npm包管理工具，推荐使用<a href="https://www.npmjs.com/package/tyarn" target="_blank">tyarn</a>
3. 安装依赖：  `$npm i` or `$tyarn`
4. 启动server： `npm run dev` or `tyarn dev`
5. build：yarn build

