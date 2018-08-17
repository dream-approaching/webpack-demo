### 起步

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

#### commit 7 NPM 脚本(NPM Scripts)

考虑到用 CLI 这种方式来运行本地的 webpack 不是特别方便，我们可以设置一个快捷方式。在 package.json 添加一个 npm 脚本(npm script)：

```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "build": "webpack"
    },
```

现在，可以使用 npm run build 命令，来替代我们之前使用的 npx 命令<br>

通过向 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：npm run build -- --colors。

### 资源管理

#### commit 8 加载 css

现在我们尝试整合一些其他资源，例如图像，看看 webpack 怎么处理

在 webpack 出现之前，前端开发人员会使用 grunt 和 gulp 等工具来处理资源，并将它们从`/src`文件夹移动到`/dist`或`/build`目录中。同样的方式也被用于 Javascript 模块，但是，像 webpack 这样的工具，将动态打包所有的依赖项。

webpack 最出色的功能之一就是，除了 Javascript，还可以通过 loader 引入任何其他类型的文件。

为了从 js 模块中`import`一个 css 文件，需要在[module 配置](https://www.webpackjs.com/configuration/module/)中安装并添加[style-loader](https://www.webpackjs.com/loaders/style-loader/)和[css-loader](https://www.webpackjs.com/loaders/css-loader/)

webpack.config.js

```
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。

添加一个新的 style.css 文件，并将其导入到 index.js 中

再次在浏览器中打开 index.html，你应该看到 Hello webpack 现在的样式是红色。要查看 webpack 做了什么，请检查页面（不要查看页面源代码，因为它不会显示结果），并查看页面的 head 标签。它应该包含我们在 index.js 中导入的 style 块元素。

请注意，在多数情况下，你也可以进行 [CSS 分离](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/)，以便在生产环境中节省加载时间。最重要的是，现有的 loader 可以支持任何你可以想到的 CSS 处理器风格 - [postcss](https://www.webpackjs.com/loaders/postcss-loader/), [sass](https://www.webpackjs.com/loaders/sass-loader/) 和 [less](https://www.webpackjs.com/loaders/less-loader/) 等。

#### commit 9 加载图片

使用 file-loader，我们可以轻松地将这些内容混合到 CSS 中：
`yarn add file-loader --dev`

webpack.config.js

```
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

现在，当 import MyImage from './my-image.png'，该图像将被处理并添加到 output 目录，_并且_ MyImage 变量将包含该图像在处理后的最终 url。当使用 [css-loader](https://www.webpackjs.com/loaders/css-loader/) 时，如上所示，你的 CSS 中的 url('./my-image.png') 会使用类似的过程去处理。loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。[html-loader](https://www.webpackjs.com/loaders/html-loader/) 以相同的方式处理 <img src="./my-image.png" />。

#### commit 10 加载字体

file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。

这就是说，我们可以将它们用于任何类型的文件，包括字体。

`更新 webpack.config.js 来处理字体文件`

```
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

#### commit 11 加载数据

此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)。让我们处理这三类文件：

`yarn add csv-loader xml-loader --dev`

webpack.config.js

```
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

现在，可以 import 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，所导入的 Data 变量将包含可直接使用的已解析 JSON：
