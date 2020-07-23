# Thepetshop

#### 项目名称

​	宠物商场

#### 演示

- 官网 ：http://s.boqii.com/
- 上线网址 ：
  - 宠物商城app：http://112.74.92.122:4000/
  - 宠物后台管理系统：http://112.74.92.122:3188/

#### git仓库地址     https://github.com/gzh52001/ThePetShop.git

#### 团队与分工

- 格式：组长： 李国富     成员：李健民，梅启华，林海聪
- 负责模块说明
  - 李健民 
    - 负责技术选型、任务分配、提供解决方案等
    - 参与购物车、登录、注册、我的、修改信息、分类模块的实现
  - 梅启华
    - 负责页面效果、数据交互、用户体验优化、兼容性等工作
    - 参与首页、搜索页、商品详情、订单页、待发货与待收货 模块的实现
  - 李国富
    - 负责项目统筹、进度把控、协调，接口编写、数据爬取、数据库操作等等
    - 参与写后台接口，接口文档的编写，后台管理系统的订单功能及页面的实现
  - 林海聪
    - 负责分析项目、确认模块并形成需求文档
    - 参与后台管理系统主页，登录，管理员注册，用户列表，商品列表，添加,修改商品 模块的实现

#### 项目页面截图

宠物商城

<img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\app-1.png" alt="app-1" style="zoom:25%;" /><img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\app-2.png" alt="app-2" style="zoom:25%;" /><img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\app-3.png" alt="app-3" style="zoom:25%;" /><img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\app-4.png" alt="app-4" style="zoom:25%;" /><img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\app-5.png" alt="app-5" style="zoom:25%;" />

宠物后台管理系统

<img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\mms-2.png" alt="mms-2" style="zoom:2%;" />

<img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\mms-3.png" alt="mms-3" style="zoom:25%;" />

<img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\mms-4.png" alt="mms-4" style="zoom:25%;" />

<img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\mms-5.png" alt="mms-5" style="zoom:25%;" />

<img src="C:\Users\李国富\Desktop\react项目\ThePetShop\petshop\mms-1.png" alt="mms-1" style="zoom:25%;" />

#### 项目目录说明

```txt
thepetshop-app
|- build //构建目录，打包后的数据都在这里，上线版本就是这个
|- public //存放静态资源目录，里面的文件不会被重命名
	|- favicon.ico  // 网页小图标
	|- index.html  // 单页面入口
|- src      // 存放源文件目录
	|- assets //存放静态资源目录，比如css、img
	|- api //存放各种接口的目录，这里的文件用来发送ajax请求（调用封装的axios发送请求返回结果给组件使用）
	|- components  // 存放组件目录
	|- store //存放数据的公共状态仓库目录，reudx
	|- views //存放路由组件，点击切换路由涉及的组件放这里
	|- utils //存放工具方法
	|- index.js   // 打包入口文件
	|- App.js   // 根组件，组件的总入口
|- .env.development  //开发环境常量配置，里面是开发时用的域名和端口号，开发时候用，使用 process.env.REACT_APP_SERVICE_API 获取值
|- .env.production // 生产文件常量配置，里面是上线时用的域名和端口号，上线时候用，使用 process.env.REACT_APP_SERVICE_API 获取值
|- config-overrides.js // 扩展webpack 配置
|- node_modules // 依赖目录
|- .gitignore //设置忽略文件，不被提交到git仓库
|- package.json //依赖目录
|- package-lock.json //锁定版本
|- README.md //项目说明
```



```txt
thepetshop-mms
|- build //构建目录，打包后的数据都在这里，上线版本就是这个
|- public //存放静态资源目录，里面的文件不会被重命名
	|- favicon.ico  // 网页小图标
	|- index.html  // 单页面入口
|- src      // 存放源文件目录
	|- assets //存放静态资源目录，比如css、img
	|- api //存放各种接口的目录，这里的文件用来发送ajax请求（调用封装的axios发送请求返回结果给组件使用）
	|- components  // 存放组件目录
	|- store //存放数据的公共状态仓库目录，reudx
	|- views //存放路由组件，点击切换路由涉及的组件放这里
	|- utils //存放工具方法
	|- index.js   // 打包入口文件
	|- App.js   // 根组件，组件的总入口
|- .env.development  //开发环境常量配置，里面是开发时用的域名和端口号，开发时候用，使用 process.env.REACT_APP_SERVICE_API 获取值
|- .env.production // 生产文件常量配置，里面是上线时用的域名和端口号，上线时候用，使用 process.env.REACT_APP_SERVICE_API 获取值
|- config-overrides.js // 扩展webpack 配置
|- node_modules // 依赖目录
|- .gitignore //设置忽略文件，不被提交到git仓库
|- package.json //依赖目录
|- package-lock.json //锁定版本
|- README.md //项目说明
```

