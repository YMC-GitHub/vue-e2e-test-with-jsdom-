
#### 代码打包
`入口文件`

dev时，pro时和tes时的脚本入口文件都为`./src/main.js` [code](../webpack.config.js#L5)



`出口文件`

dev时，pro时和tes时的脚本输出文件都为`./dist/build.js` [code](../webpack.config.js#L6,L10)

```
npm install --save-dev webpack
```

`模块查找`

dev时，pro时和tes时如果通过`require('vue$')`或者`import vue from('vue$)`时，引入的是`vue/dist/vue.esm.js`文件 [code](../webpack.config.js#L13)

dev时，pro时和tes时如果通过`const xx =require('@xx')`或者`import xx from('@xx)`时，引入的是`src`目录下的文件，实现引入类库简写。 [code](../webpack.config.js#L14)

```
npm install --save vue
```


`模块匹配`

dev时，pro时和tes时，对以.vue为后缀的文件使用`vue-loader`加载 [code](../webpack.config.js#L19,L22) ； 对以.js为后缀的文件使用`babel-loader`加载，node_modules目录中的不在内 [code](../webpack.config.js#L23,L27)； 对以.png或.jpg或.jpeg或.gif或.svg为后缀的文件使用`file-loader`加载，并将它们的名字改为`[name].[ext]?[hash]`这种格式（原先的文件名字+.+后缀+哈斯（文件指纹））[code](../webpack.config.js#L28,L24)。

```
npm install --save-dev vue-loader vue-template-compiler babel-loader css-loader file-loader 
```


`建服务器`

dev时，使用webpack-dev-server，建立简单的服务器，通过在webpack.config.js中设置一些参数 [code](../webpack.config.js#L37,L40)，以及在命令行中传入一些参数。


```
npm install --save-dev webpack-dev-server
```



`源码映射`

dev时，使用`#eval-source-map` [code](../webpack.config.js#L44)

pro时，使用`#source-map` [code](../webpack.config.js#L48)

tes时，使用`eval` [code](../webpack.config.js#L70)


`代码压缩`

pro时，使用`webpack.optimize.UglifyJsPlugin`对脚本文件进行压缩。

`外化依赖`


在我们的测试中，可能会引入一些不能在浏览器环境中使用的依赖，以及一些不能被webpack正确打包的依赖，
tes时，可以使用`webpack-node-externals`插件外化它们。 [code](../webpack.config.js#L69)

#### 环境模拟

tes时，Vue 测试工具`@vue/test-utils`需要一个浏览器环境来运。在这里使用`jsdom-global`在nodejs环境中进行模拟。

`安装依赖`
```
npm install --save-dev jsdom jsdom-global
```

`使用依赖`
在`test/setup.js`文件中添加：
```
require('jsdom-global')()
```

#### 用断言库

有很多的断言库，如`chai`,`sinon`，`expect`等。下面以`expect`示例：

`安装依赖`
```
npm install --save-dev expect
```

`引入依赖`
在`test/setup.js`文件中添加：
```
global.expect = require('expect')
```

#### 前沿脚本
从es3到es5，从es5到es6+，作为开发者，需要跟着潮流走。
此处用babel对js脚本文件编译进行处理，并让webpack运行babel，以及运行nyc在脚本文件注入一些插桩。


`安装依赖`
```md
# 让babel 对js脚本文件编译进行处理
npm install --save-dev babel-core babel-preset-env
# 让webpack运行babel
npm install --save-dev babel-loader
# 运行nyc在脚本文件注入一些插桩
npm install --save-dev babel-plugin-istanbul
```

`配置依赖`

在`.babelrc`文件中添加：

在配置中设置env的`dev`，`pro`和`tes`的三个字段，分别代表几种不同的环境。在命令行中通过传入`coss-env BABEL_ENV=dev`可实现跨站点传入变量BABEL_ENV。如果没传入BABEL_ENV，会读取NODE_ENV的取值。此处没传入BABEL_ENV变量，因为我以及设置了NODE_ENV的取值，让它读取NODE_ENV的取值吧。

dev时，使用设置babel-env的modules选项为false，不对脚本文件进行babel编译。[code](../.babelrc#L3,L7)

pro时，使用设置babel-env的modules选项为umd，对脚本文件使用babel根据umd规范进行编译。[code](../.babelrc#L8,L12)

tes时，使用设置babel-env的modules选项为false，不对脚本文件进行babel编译。使用babel-plugin-istanbul插件，运行nyc在脚本文件注入一些插桩。[code](../.babelrc#L13,L21)


#### 添加设计

一个计数功能，当点击某按钮时，在原先的数量上加1。最开始的数量为0。

#### 开发编码

[src/Counter.vue](../src/Counter.vue)

00.编写单文件的组件基础结构。`template,scipts`

01.一个文本元素显示当前数量。

02.一个按钮元素带有点击事件。

03.一个状态变量存储数量取值。`count`

04.一个点击处理函数进行递增。`increment`


#### 测试编码

[test/Counter.spec.js ](../test/Counter.spec.js )


00.编写测试文件的基础结构。`引入测试工具、引入某一组件、编写测试案例，编写测试用例，编写测试断言`

01.挂载组件。

02.查找元素。

03.触发事件。

04.操作状态。`获取/修改/删除`

05.模拟属性


#### 运行测试
```
npm run tes
```