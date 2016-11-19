---
title: '造个轮子:XSlider--基于原生js轮播插件'
date: 2016-10-08 13:48:09
tags: [轮子,轮播,插件]
---

现在如果需要一款轮播的插件 实在是太容易了,网上一搜一大把,那些插件个个功能强大,界面华丽,但是真正需要应用到自己的工作项目中的时候,却发现有时需要修改一堆的样式,有时需要对自己的html结构大刀阔斧,甚至需要对自己的JS代码进行调整.于是,我干脆自己来整一套属于自己的轮播插件.

这个插件我会在github上一直更新,功能也会不端增加,包括修复bug和性能优化.




插件使用介绍：
#### 1、页面结构：

创建一个类似下面的页面结构,id可自定义,class名不可更改.
html代码部分:
```html
<section id="slider">
    <ul class="banner">
        <li>这是1</li>
        <li>这是2</li>
        <li>这是3</li>
    </ul>
    <ul class="idxs">
        <li class="on">1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <a href="javascript:;" class="left">&lt;</a>
    <a href="javascript:;" class="right">&gt;</a>
</section>
```
css代码部分:
```css
#slider {
  width:1920px;
  height:665px;
  overflow: hidden;
  background-color:#333;
  position:relative;
}
.banner{
  width:7680px;
  height:665px;
  position:absolute;
  padding:0;
  margin:0;
  left:0;
  top:0;
}
.banner li{
  float:left;
  width:1920px;
  height:665px;
  color:#fff;
  font-size:24px;
  font-weight:bold;
  margin-top:100px;
  text-align:center;
}
.idxs{
  width:300px;
  height:30px;
  position:absolute;
  bottom:20px;
  left:43%;
  list-style: none;
}
.idxs li{
  width:30px;
  height:30px;
  text-align:center;
  line-height:30px;
  background-color:#333;
  color:#fff;
  float:left;
  cursor: pointer;

}
.idxs li.on{
  background-color:#E4393C;
}
#slider a{
  display: block;
  width:80px;
  height:80px;
  color:#fff;
  font-size:40px;
  line-height:80px;
  text-align:center;
  position:absolute;
  top:40%;
  text-decoration: none;
}
#slider .left{
  left:0;
}
#slider .right{
  right:0;
}
```
#### 2、下面可以开始我们的js代码部分了

```javascript
var slider = new XSlider('slider');
```

这样便可以创建出一个默认的轮播插件.
如果想要自定义轮播的属性,可以给XSlider传入第二个参数,

如果希望兼容性好一些的话,可以使用js动画:
```javascript
{
    type:'js'//兼容ie8
}
```
如果希望可以使用css动画,可以如下设置:
```javascript
{
    type:'css',
    timing:'ease',//默认为linaer,还可以传入ease-in,ease-out,ease-in-out
}
```
#### 3、其他的自定义属性:

```javascript
{
    stepDur:500,//默认为500,轮播每完一次滚动的时长
    step:50,//默认为50,轮播滚动每一帧的距离
    duration:3000, //默认为3000,每隔3000ms自动滚动轮播一次
    autoResize:true,//默认为false,根据窗口大小重新调整宽高
}
```
#### 4、方法：

````
next :下一张
prev :上一张
isRun :检测是否正在切换图片,返回true/false
````



项目地址:[github](https://github.com/cMing404/XSlider)


