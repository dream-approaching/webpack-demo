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

#### commit 4

执行 npx webpack，会将我们的脚本作为入口起点，然后 输出 为 main.js。Node 8.2+ 版本提供的 npx 命令，可以运行在初始安装的 webpack 包(package)的 webpack 二进制文件<br><br>
在浏览器中打开 index.html，如果一切访问都正常，你应该能看到以下文本：'Hello webpack'

#### commit 5 使用一个配置文件

在 webpack 4 中，可以无须任何配置使用，然而大多数项目会需要很复杂的设置，这就是为什么 webpack 仍然要支持 配置文件。这比在终端(terminal)中手动输入大量命令要高效的多，所以让我们创建一个取代以上使用 CLI 选项方式的配置文件：

```
 webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

#### commit 6

执行 `npx webpack --config webpack.config.js`<br><br>
如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。
