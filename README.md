# fpsAnim

fps animation
``` bash
npm run dev 

#uglify & drop console.log
npm run build
```


演示地址：<a href="https://jiunacaikang.github.io/fpsAnim/demo/" target="_blank">fpsAnim</a>
# 使用方法(可以链式调用)
```javascript
//普通实例化 num是动画帧数 fps是帧率
var an = new Anim(num,fps);

//给动画实例添加 动画执行的方法 i是当前帧 根据当前帧来切换
an.run = function(i){
    //code here
    console.log(i);
};

//动画初始化 或者动画重新开始时调用 实例化默认会执行
an.init();

//动画启动 times是播放几次传非true表示无限循环 fn是播放完times次后的回调
an.start(times,fn);

//动画暂停 fn是暂停时的回调
an.pause(fn);

//动画继续 fn是继续时的回调
an.play(fn);

//动画停止 n是停止在第几帧 fn是停止时回调 会覆盖start时的回调
//注意：n = 0立即停止 n = -1停止在最后一帧 n = -2 停止在倒数第二帧 以此类推
an.stop(n,fn);

//动画启动 立即调用thenStop 播放times次后 停止在第n帧
an.start(times).thenStop(n);

//调节帧率 n是需要设置的帧率 fn是设置帧率时的回调
an.setFps(n,fn);

//实例化一个立即播放的canvas帧动画 id是以canvas渲染时canvas的id cb是以canvas渲染结束回调
//此方式注意:
//1.需要传入canvas的id
//2.canvas标签要绑定需要的图片地址
//3.canvas需设置宽高且宽高为一帧的尺寸
//4.另外可以在canvas标签设置播放多少次后结束、以及结束后停留在第几帧和结束回调
var an = new Anim(num,ftp,id,cb);
```