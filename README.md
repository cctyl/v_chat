# 临时聊天

## 简介

如题所示，这个项目就是实现了一个临时聊天的效果。

##### 痛点

因为我多台设备，android、ios、win、ubuntu，它们互相之间想互相发送消息。

在过去，我没有一个好的解决办法，通常情况下，我会选择打开电脑，打开微信，点击登录。然后到手机上同意登录，最后发送消息，然后win端再复制消息，最后再退出登录。

在win和android 或win 和ios之间，这么做勉强还可以。但是 android 与 android 之间，或者android 与 ios 之间，想要传递一个消息，那可太麻烦了。

##### 需求的出现

我只是想简简单单的传递一个消息，或者一张图片，或者一个小文件。不希望做这么多操作，所以这里要求1：操作简单。

另外，我是在多个设备之间进行传输，所以要求2：跨平台。

第三，我没有那么多时间（技术也不行）去开发多个平台的客户端，那么只能从我会的下手。

第四，这个项目的服务端占用的性能不应该过大，因为只有我一个人使用。

结合上述的需求和痛点，就有了下面的技术选型。



## 效果图

直接拿的组件[vue-chat](https://gitee.com/july-meteor/vue-mchat)的效果图

![MChat群聊界面](README.assets/MChat-group.png)

[m-chat](https://gitee.com/null_639_5368/m-chat)

![image-20230415125329407](README.assets/image-20230415125329407.png)

## 亮点

最大的亮点，就是使用了openAi 协助编写代码，在编写过程中，ai减轻了我很多的诸如百度、bing等相关工作量，

除此之外没啥亮点，就是简单的结合了 nodejs 和 vue，进行了一个小的 crud。

ui方面，直接使用了两个组件vue-mchat （pc端）以及 m-chat（移动端），在前端路由处做了浏览器类型判断

## 项目地址

https://github.com/cctyl/v_chat 

目前进度30%

## 技术栈

##### 前端

- vue2
- vue-route3
- axios

##### 后端

- nodejs + express
- mongodb + moogoose + transcaion
- jwt

##### 助手

- openAi 一枚

  在项目编写过程中，大量的使用了openAi 进行查询、纠错、优化。另外，有5%的代码，是ai编写的，你能发现它吗？

## 设计的细节

- 每个设备之间的访问问题怎么解决？

  我选择把应用部署到服务器上

- 部署在公网上，怎么保证不会被别人访问？

  - 方式1：密码
  - 方式2：token
  - 方式3：使用wireguard 组成一个大内网（我所采取的方案），然后通过ip直接访问

## 项目结构说明

```js
- api nodejs服务端
- file 文件资源上传下载目录
- public 前端打包生成的静态资源文件目录
- web vue前端目录
```

## 第三方库
- 感谢 m-chat https://gitee.com/null_639_5368/m-chat#demo 


- 感谢 vue-chat https://gitee.com/july-meteor/vue-mchat

- openAi 

  
