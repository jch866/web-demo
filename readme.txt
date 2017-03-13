1.pc端的HTML5 API
2.基于webview的hybrid native app 开发
3. APP h5开发
http://www.jb51.net/books/ js电子书

MAC的apache根目录的设置只能有两个吗？一个默认的，一个是在uers下面的 ： "/Users/jch/Sites"
其它的为什么不行，如：DocumentRoot "/Users/jch/documents/webDemo"
(其它的是不是因为权限问题导致不能访问，主要是documents权限待确定)
即使把文件拷贝到根目录下，能否访问，是不是和文件夹权限有关系？
如何把其它文件目录映射到根目录下面

如何更好组织异步代码？
避免使用回调函数的方法：
1：消息通知
2：ES6  promise  generator(ES6语言特性层面)


addClass()操作注意选择器权重问题
get请求到的数据是base64加密过的，避免被爬走
github查看代码修改记录，代码对比
git命令对比代码
先获取章节数据，根据章节ID取章节内容，然后返回加密文件，前端解码
章节错误处理机制完善

结构方面，H5提供了语义化标签
API方面，更多的API支持
相比native app  ，   h5 app
快速的更新和迭代
一次开发，多终端受益，嵌到webview中
native app 提供更流畅的用户体验

HTML5 WEB APP 现状
1.不能做一次开发，多终端适配
2.相比NATIVE APP  HYBRID APP动画或者DOM层方法
CPU  GPU
多编译了一次 js -- java -- 机器语言
HTML5 WEB APP发展趋势，无限趋近于NATIVE APP
REACT  facebook 解决性能问题

需要的技术
HTML CSS JS
服务器的调试经验
HTML5 API CSS3  JS设计模式

多次实例化，创建新对象，占用更多内存
响应式布局

准备工作：
交互图原型
设计图
阅读器，头 尾，中间展示，分页，翻页，加载

使用base64格式的图片制作ICON
优势：1，减少请求，2，加快首屏显示速度

新API 本地数据缓存，还有跟硬件相关的特性
可以更好完成性能提升
dom QuerySelector
postMessage 跨域通信
window.performance.timing 性能检测接口
window.localStorage
new Worker('a.js')//a.js非UI操作且和当前文件是同域的
a.js类似后台计算线程

iframe. jsonp. 跨域
xmlHttpRequest
viewport

var body = document.getElementsByTagName('body')
body = body[0];
body.addEventListener('touchstart',function(){
	console.log('start');
},false)
body.addEventListener('touchmove',function(){
	console.log('move');
},false)
body.addEventListener('touchend',function(){
	console.log('end');
},false)

//鼠标和touch事件混用有什么后果？顺序不确定，比如点击不动，或者长按
body.addEventListener('mousemove',function(){
	console.log('mousemove');
},false)
body.addEventListener('mousedown',function(){
	console.log('mousedown');
},false)
body.addEventListener('mouseup',function(){
	console.log('mouseup');
},false)
body.addEventListener('click',function(){
	console.log('click');
},false)


性能陷阱
script放在body后是PC端注意点
避免reflow回流  repaint重绘 它们开销大
1.减少对DOM的操作
2.尽量缓存可以缓存的数据
Cache-Control
E-tag

localstroage.setItem("data",JSON.stringify({a:1}))
JSON.parse(localstroage.getItem("data"))

indexedDB
3.使用CSS3 transform代替DOM的变化   Animation.css

不要给position:absolute/relative的元素增加CSS3	动画，性能开销更大
适当使用硬件加速 例如用CANVAS画图 ，或者加transform:translate3d(0, 0 ,0)等

交互图，需求分解，开发

技术选型  轻量化框架，维护简单，快速开发（语言熟练程序，交互解读，需求变更）

移动端：用原生JS还是框架
pc端：浏览器差异大，用JQUERY是为了统一


开发和学习成本
对于功能简单的应用，引用框架比用原生的成本较大

模块块拆分
PC: CSS   JS   HTML
移动端：有时候要把模块合在一起，有些不存在复用

把JS放在页面里，可以少一次请求
jquery.base64.js 数据解码
jquery.jsonp.js  跨域











在阿里云上搞个Git远程仓库。
搭建一个gitlab
建议用命令复制ssh key,用文本软件打开有可能出错!
mac
pbcopy < ~/.ssh/id_rsa.pub

windows
clip < ~/.ssh/id_rsa.pub

linux
sudo apt-get install xclip
xclip -sel clip < ~/.ssh/id_rsa.pub

…or create a new repository on the command line

echo "# web-demo" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/jch866/web-demo.git
git push -u origin master

…or push an existing repository from the command line

git remote add origin https://github.com/jch866/web-demo.git
git push -u origin master

…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

学习专用【安静的纯音乐】