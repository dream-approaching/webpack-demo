#### commit 1 初始化

* 初始化 npm
* 本地安装 webpack，webpack-cli

#### commit 2

现在我们将创建以下目录结构：

```
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

我们还需要调整 package.json 文件，以便确保我们安装包是私有的(private)，并且移除 main 入口。这可以防止意外发布你的代码。

```
{
+   "private": true,
-   "main": "index.js",
}
```

在此示例中，`<script>` 标签之间存在隐式依赖关系。index.js 文件执行之前，还依赖于页面中引入的 lodash。之所以说是隐式的是因为 index.js 并未显式声明需要引入 lodash，只是假定推测已经存在一个全局变量 \_。

使用这种方式去管理 JavaScript 项目会有一些问题：

无法立即体现，脚本的执行依赖于外部扩展库(external library)。如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。让我们使用 webpack 来管理这些脚本。

#### commit 3

* 新建 dist 文件夹，并移入 index.html
* 安装 lodash 插件`yarn add lodash`
* 修改 index.js 中 lodash 的引入
* 修改 index.html 中 js 的引入
