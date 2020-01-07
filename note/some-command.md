#### 环境安装

```
git init
npm install
```

#### 环境卸载

```
rm --recursive --force .git
rm --recursive --force node_modules package-lock.json
rm --recursive --force dist coverage .nyc_output
```

#### 一些命令

```
# 开发
npm run dev
# 产品
npm run pro
# 测试
npm run tes
```