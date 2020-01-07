# vue-test-with-jsdom

## desc

test vue with jsdom

note: you can also test your project with [Vue CLI](https://cli.vuejs.org/)

## some deps for test

- `vue-test-utils`
- `mocha` & `mocha-webpack` (test with mocha framework)
- `jsdom` & `jsdom-global` (for setting up DOM environment in tests)
- `webpack-node-externals` (for excluding NPM deps from test bundle)
- `expect` (for assertions)
  - This is the package used internally by Jest, so [usage is the same](http://facebook.github.io/jest/docs/en/expect.html#content). You can also use [chai](http://chaijs.com/) + [sinon](http://sinonjs.org/).
- `nyc` & `babel-plugin-istanbul` (for coverage)

## some config

`package.json`

01.Added `test` script  ([package.json](./package.json#L11))

02.set for `nyc` coverage with nyc  ([package.json](./package.json#L41-#L47))


`webpack.config.js`

01.exclude NPM deps from test bundle ([webpack.config.js](./webpack.config.js#L108))

02.use inline source map so that it works with mocha-webpack ([webpack.config.js](./webpack.config.js#L109))


`test/setup.js`

01.Global setup JSDOM for tests ([test/setup.js](./test/setup.js#L2))

02.Global setup expect for tests ([test/setup.js](./test/setup.js#L5))

note: run first with `mocha-webpack`'s `--require` flag ([package.json](./package.json#L11)). 


`.babelrc`

01.set test env symbol ([.babelrc](./babelrc#L13))

02.use `istanbul` plugin for test  ([.babelrc](./babelrc#L20))


## some command

```sh
# run for dev env
npm run dev
# run for pro env
#npm run pro
# run for tes env
npm run tes

# run build
# run build for dev
npm run build:dev
# run build for pro
npm run build:pro
```

for dev env , use `cross-env` passed key `NODE_ENV` with val 'dev' for `process.env` . use webpack 's webpack-dev-server to setup a simple server . passed `--open` to open browser , `--hot` to automaticaly refresh .

for pro env , use `cross-env` passed key `NODE_ENV` with val 'pro' for `process.env` . use webpack by cli. passed `--progress` to get process progress , `--hide-modules` to hide lib in node_modules dir.

for tes env , use `cross-env` passed key `NODE_ENV` with val 'tes' for `process.env` . use nyc by cli : passed `--reporter=lcov` and `--reporter=text` to set reporter for `lcov` and `text` . use mocha-webpack by cli :
use webpack to build then run mocha ,passed `--webpack-config webpack.config.js` to set the webpack config file ,passed `--require test/setup.js` to load `test/setup.js` before test the files  `test/**/*.spec.js`

## get more

For detailed explanation on how he work, consult  [webpack](https://www.npmjs.com/package/webpack).

For detailed explanation on how he work, consult  [webpack-cli](https://www.npmjs.com/package/webpack-cli).

For detailed explanation on how he work, consult  [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server).

For detailed explanation on how he work, consult  [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals).

For detailed explanation on how he work, consult  [mocha-webpack](https://www.npmjs.com/package/mocha-webpack).

For detailed explanation on how he work, consult  [mocha](https://mochajs.org/).

For detailed explanation on how he work, consult  [nyc](https://www.npmjs.com/package/nyc).

For detailed explanation on how he work, consult  [babel-plugin-istanbul](https://www.npmjs.com/package/babel-plugin-istanbul).

For detailed explanation on how he work, consult  [jsdom](https://www.npmjs.com/package/jsdom).


## author

yemiancheng <ymc-github@gmail.com>

## contributor

Evan You <yyx990803@gmail.com>

## license

MIT