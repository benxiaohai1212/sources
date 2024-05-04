官方下载地址：  
http://www.sublimetext.com/3  
http://www.sublimetext.com/2

### Ubuntu安装sublime并且支持搜狗输入法  

1. git clone https://github.com/lyfeyaj/sublime-text-imfix.git  
2. cd sublime-text-imfix && ./sublime-imfix   

### Sublime Test 3 破解
破解步骤
1. 到官网下载软件并安装
2. 打开网站: https://hexed.it
3. 点击“Open file”，然后选择“sublime_text.exe” （ sublime_text.exe文件位于Sublime Text 3的安装目录下 ）
4. 选择右侧的“Search”，然后在“Search for”框输入“97 94 0D”，点击“Search Now”

Sublime Text 3 破解版, Sublime Text 3.2.1 for Mac/Win/Linux 专业代码编辑器

5. 下方出现一个搜索结果；这里为 0x0058F144
6. 点击搜索结果，修改搜索结果“97 94 0D”为“00 00 00”
7. 点击“Export”把修改好的exe程序下载并替换原来的sublime_text.exe
8. 打开sublime text3，然后Help-Enter License-输入下方的license
```
----- BEGIN LICENSE -----
TwitterInc
200 User License
EA7E-890007
1D77F72E 390CDD93 4DCBA022 FAF60790
61AA12C0 A37081C5 D0316412 4584D136
94D7F7D4 95BC8C1C 527DA828 560BB037
D1EDDD8C AE7B379F 50C9D69D B35179EF
2FE898C4 8E4277A8 555CE714 E1FB0E43
D5D52613 C3D12E98 BC49967F 7652EED2
9D2D2E61 67610860 6D338B72 5CF95C69
E36B85CC 84991F19 7575D828 470A92AB
------ END LICENSE ------
```
9、 最后，为了防止sublime text3检测，添加以下内容到host文件中
```
127.0.0.1 www.sublimetext.com
127.0.0.1 sublimetext.com
127.0.0.1 sublimehq.com
127.0.0.1 telemetry.sublimehq.com
127.0.0.1 license.sublimehq.com
127.0.0.1 45.55.255.55
127.0.0.1 45.55.41.223
0.0.0.0 license.sublimehq.com
0.0.0.0 45.55.255.55
0.0.0.0 45.55.41.223
```
10、如何安装插件？
按Ctrl+Shift+P—->输入install，选择安装插件

### sublime安装插件  

* 使用Package Control组件安装（sublime3），按`Ctrl + ~`

```
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

* Emmet（原名 Zen Coding）  
  一种快速编写html/css的方法  
  *注意：安装Emmet的同时，也会自动安装其依赖PyV8 binary库，安装PyV8库会用较长时间，可以在Sublime左下角看到安装进程状态*

* html5  
  支持hmtl5规范的插件包  
  *注意：与Emmet插件配合使用，效果更好*  
  *使用方法：新建html文档>输入html5>敲击Tab键>自动补全html5规范文档  *

* jQuery  
  支持JQuery规范的插件包  

* javascript-API-Completions  
  支持Javascript、JQuery、Twitter Bootstrap框架、HTML5标签属性提示的插件，是少数支持sublime text 3的后缀提示的插件，HTML5标签提示sublime text 3自带，不过JQuery提示还是很有用处的，也可设置要提示的语言。 

* JSFormat  
  JS代码格式化插件。
  *使用方法：使用快捷键`ctrl+alt+f`*

* SublimeLinter  
  一个支持lint语法的插件，可以高亮linter认为有错误的代码行，也支持高亮一些特别的注释，比如“TODO”，这样就可以被快速定位。（IntelliJ IDEA的TODO功能很赞，这个插件虽然比不上，但是也够用了吧）

* BracketHighlighter  
  类似于代码匹配，可以匹配括号，引号等符号内的范围。

* Alignment  
  代码对齐，如写几个变量，选中这几行，`Ctrl+Alt+A`，哇，齐了。

* Ctags  
  函数跳转，我的电脑上是Alt+点击 函数名称，会跳转到相应的函数

* Doc​Blockr  
  注释插件，生成幽美的注释。标准的注释，包括函数名、参数、返回值等，并以多行显示，省去手动编写。  
  使用方法(参考链接内容)：http://www.cnblogs.com/huangtailang/p/4499988.html
  配置信息

```
{
    "jsdocs_extra_tags":["@AuthorHTL","@DateTime {{datetime}}"]
}
```

* SideBarEnhancements  
  侧栏右键功能增强，非常实用  
  使用方法(参考链接内容)：http://www.w3cfuns.com/notes/13810/d9b9ed2fb80785dae88a5344ef0f30d4.html

* Terminal
  配置快捷键
  ctrl+shift+t 打开文件所在文件夹，
  ctrl+shift+alt+t 打开文件所在项目的根目录文件夹

```
[
    { "keys": ["ctrl+shift+t"], "command": "open_terminal" },
    { "keys": ["ctrl+shift+alt+t"], "command": "open_terminal_project_folder" }
]
```

自定义快捷键

```
[
    {
      "keys": ["ctrl+shift+t"],
      "command": "open_terminal_project_folder",
      "args": {
        "parameters": ["-T", "Working in directory %CWD%"]
      }
    },
    {
      "keys": ["ctrl+alt+t"],
      "command": "open_terminal",
      "args": {
        "parameters": ["-T", "Working in directory %CWD%"]
      }
    }
]
```

