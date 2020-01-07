# vue-test-utils-mocha-example

> Example project using mocha-webpack and vue-test-utils

#### 一些命令
```md
# 开发
npm run dev
# 产品
npm run pro
# 测试
npm run tes
```

dev环境时，使用`cross-env`传递一个`NODE_ENV`变量，变量取值为'dev'。
使用webpack的webpack-dev-server建立一个简单的服务器。通过命令行的方式传入`--open`实现打开浏览器，`--hot`实现自动刷新。

pro环境时，使用`cross-env`传递一个`NODE_ENV`变量，变量取值为'pro'。
通过命令行的方式使用webpack，传入`--progress`选项查看构建进度，传入 `--hide-modules`选项隐藏node_modules中的类库。


tes环境时，使用`cross-env`传递一个`NODE_ENV`变量，变量取值为'tes'。
通过命令行的方式使用nyc测代码覆盖率。传入`--reporter=lcov`和 `--reporter=text`选项指定报告格式为`lcov`和`text`这两种。
通过命令行的方式使用mocha-webpack，让mocha运行测试用例之前，先用webpack打包构建源码再进行测试。传入`--webpack-config webpack.config.js`指定webpack的配置文件为工程根目录下的`webpack.config.js`文件，传入`--require test/setup.js`选项指定在测试之前，加载`test/setup.js`这个文件。
测试符合这个匹配规则`test/**/*.spec.js`的文件。

#### 一些依赖

- `vue-test-utils`
- `mocha` & `mocha-webpack`
- `jsdom` & `jsdom-global` (for setting up DOM environment in tests)
- `webpack-node-externals` (for excluding NPM deps from test bundle)
- `expect` (for assertions)
  - This is the package used internally by Jest, so [usage is the same](http://facebook.github.io/jest/docs/en/expect.html#content). You can also use [chai](http://chaijs.com/) + [sinon](http://sinonjs.org/).
- `nyc` & `babel-plugin-istanbul` (for coverage)

#### 一些配置

`package.json`
Added `test` script and setting for `nyc`:

``` js
{
  // ...
  "scripts": {
    // ...
    "test": "cross-env NODE_ENV=tes nyc mocha-webpack --webpack-config webpack.config.js --require test/setup.js test/**/*.spec.js"
  },
  "nyc": {
    "include": [
      "src/**/*.(js|vue)"
    ],
    "instrument": false,
    "sourceMap": false
  }
}
```

`webpack.config.js`

Added test-specific configs:

``` js
if (process.env.NODE_ENV === 'tes') {
  // exclude NPM deps from test bundle
  module.exports.externals = [require('webpack-node-externals')()]
  // use inline source map so that it works with mocha-webpack
  module.exports.devtool = 'inline-cheap-module-source-map'
}
```



`test/setup.js`

Global setup for tests. This is run first with `mocha-webpack`'s `--require` flag.

``` js
// setup JSDOM
require('jsdom-global')()

// make expect available globally
global.expect = require('expect')
```

`.babelrc`

Added `"plugins": ["istanbul"]`:

```js
{
  "env": {
    // ...
    "tes": {
      "plugins": ["istanbul"]
    }
  }
}
```

#### 快速使用

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run pro

# run unit tests
npm run tes
```

For detailed explanation on how things work, consult the [docs for how to build](./docs/how-to-build).