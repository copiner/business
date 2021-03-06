console.log("common");

/*

渲染器进程的核心工作是将 HTML，CSS 和 JavaScript 转换为用户可以与之交互的网页

1.解析---------------构建 DOM
当渲染器进程收到一个导航请求，并开始接收 HTML 数据，主线程将开始处理文本字符串（HTML），将其解析成 DOM（Document Object Model）;
将 HTML 文档解析成 DOM 是完全依照于 HTML 协议。并且在 HTML 协议中，浏览器不会对错误的 HTML 进行错误提示,
 HTML 规范的主要原则是优雅的处理这些错误，而不是严格检查。

 2.子资源加载
 一个完整的 Web 站点通常会包含图片、CSS 和 JS 等外部资源，这些文件都需要从网络或者本地缓存中加载。
 主线程可以在解析构建 DOM 的时候，将他们逐个请求，但是为了加快速度，会同时使用 "预加载扫描（Preload Scanner）"。

如果 “预加载扫描” 发现有类似<img>或<link>这样的标签时，会由 HTML 解析器对该资源生成一个 Tokens，
然后在浏览器进程中，通过网络或者本地缓存来加载资源
2.1
当 HTML 解析器遇到 <script> 标签的时候，它会暂停解析 HTML 文档，然后对这个 JS 脚本进行加载、解析和执行
这么设计的原因，是因为 JS 可以使用类似 document.write() 方法来改变 DOM 的结构。
这就是 HTML 解析器在重新解析 HTML 之前，必须等待 JS 脚本执行的原因

HTML 遇到 JS 脚本则暂停对 HTML 的解析，这并不是绝对的

Web开发人员可以通过多种方式的配置，告知浏览器如何更优雅的加载资源。如果你的 JS 脚本中，没有使用到类似 document.write()
这样的方法，你可以在script标签中添加async或defer标记，
然后浏览器会异步加载和运行此 JS 脚本，不会阻断解析。

<script src="script.js"></script>

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，
也就是说不等待后续载入的文档元素，读到就加载并执行。

<script async src="script.js"></script>

有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

<script defer src="myscript.js"></script>

有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后


如果需要，也可以使用 JavaScript Modules，
还可以通过<link rel="preload">标签向浏览器明确标记此为重要的资源，将在页面加载完成之后被立刻使用，
对于这类资源，它会在页面加载生命周期的早期，被优先加载

2.2
仅仅解析成 DOM，还不足以完成页面渲染，因为还可以通过在 CSS 中，设置元素的样式来丰富渲染效果。
主线程将解析 CSS，并将效果渲染到指定的 DOM 节点上

即使你不使用任何 CSS 样式，每个 DOM 节点依然存在默认的渲染样式。
例如， h1 标签在视觉上就大于 h2 标签，并且每个元素还有默认的边距。这是因为浏览器具有默认样式表

3.布局（Layout）
到现在，渲染器进程知道每个 DOM 的结构和样式了，但是这依然不足以渲染页面,这就牵扯到布局（Layout）
布局是对元素定位的过程，主线程遍历 DOM 并计算样式，然后创建布局树（Layout Tree），在布局树中，包含 X、Y 坐标和边框大小等信息。
布局树是一个与 DOM 树类似的结构，但是它仅仅包含了页面上可见内容相关的信息。

举个例子，如果某个元素设置了display:none，则该元素将不会出现在布局树中，但是它会出现在 DOM 树中，
而如果该元素被设置为visibility:hidden则它会存在于布局树中。类似的例子还有
p::before{content:"Hi!"}这样的伪类，它会存在于布局树中，而不会存在于 DOM 树中

计算页面布局是一个很复杂的工作，即使最简单的从上到下的块流结构，也必须考虑字体的大小以及如何划分每一块，
因为它们会影响当前段落的大小和形状，然后影响下一块所在的位置

CSS 样式可以设置元素浮动到某一侧、隐藏 overflow 的元素，或者改变排版方向。
布局是一个非常复杂的工作，在 Chrome 中，有一个完整的工程师团队负责布局

4. 绘制（Paint）
拥有 DOM、CSS 和 LayoutTree 仍然不足以渲染页面。假设你正在尝试重绘一幅画，你除了需要知道元素的大小、外观和位置之外，还需要知道它们的绘制顺序
5.重绘（repaint）
渲染管道（Rendering Pipeline）中最重要的任务，就是在每个步骤开始前，根据前一次操作的结果，来创建新的数据。
例如，如果布局树中的某些内容发生变动，则需要为文档中受影响的部分，重新生成"绘制记录"

6.合成（Compositing）
现在浏览器知道文档的结构，每个元素的样式，页面的形状和绘制顺序，
将此信息转换为屏幕上的像素称为光栅化（rasterizing）。

光栅化是将几何数据经过一系列变换后最终转换为像素，从而呈现在显示设备上的过程

但是，现代浏览器运行一个更复杂的被称为合成（Compositing）的进程

合成是一种将页面的各个元素进行分层，分别光栅化，并在合成器线程中以一个单独的线程合成新页面的技术。如果页面发生滚动，
由于图层已经光栅化，因此它需要做的就是合成一个新帧。通过移动图层同时合成新帧，可以以相同的方式实现动画。

一旦创建了层树并确定了绘制顺序，主线程就会将该信息提交给合成器线程。
合成器线程会光栅化每个图层，一个图层可能想一个完整的页面那么大，因此合成器线程将他们分成图块，并将每个图块发送到光栅线程。
光栅线程格式化每个元素，并将他们存储在 GPU 内存中
*/
