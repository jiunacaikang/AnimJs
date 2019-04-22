import './common/animationFrame'
import { getType,assert } from './common/utils'

/**
 * [Anim description]
 * @param {[number]} total [动画帧数 构建实例必传参数]
 * @param {[number]} fps [动画帧率 默认为35]
 * @param {[String]} id [canvas id]
 * @param {[Function]} cb [canvas动画结束回调，只在canvas动画时有效]
 */
function Anim(total, fps, id, cb) {
    assert(this instanceof Anim,"使用有误，请new实例化Anim");
    assert(0 < total && !isNaN(total),"参数有误，num必传且为正整数")

    this.init = function () {
        // ‘_’ 开头的变量 为内部变量 可访问 不能修改
        this._totalFrame = total; //动画帧数
        this._fps = fps || 35; //帧率
        this._frameDurning = 1; //帧过渡变化 向下取整默认为1
        this._lastFrame = -1; //用来判断是否执行run回调
        this._totleTimes = undefined; //动画总次数
        this._curTime = 1; //动画当前次数
        this._animId && cancelAnimationFrame(this._animId);
        this._animId = null; //动画返回id
        this._animName = this._animName || 'anim-' + Date.now();
        this._started = false; //动画开始
        this._paused = false; //动画暂停
        this._stoped = false; //动画结束
        this._stopTo = 0; //停止在第几帧
        this._cb = null; //停止后的回调
        this._autoPlay = false; //自动播放
        if (id && !this.run) { //
            try {
                this._autoPlayFn(id);
            } catch (e) {
                throw new Error(e)
            }
        }
        console.log("%c" + this._animName + " init", "color:#4bbff6");
        return this;
    }
    /**
     * [_run 内部方法 动画运行时]
     */
    this._run = function () {
        if (this._curTime > this._totleTimes) { //不调用stop时 停止
            if (this._thenStop) {
                this.stop(this._stopTo);
            } else {
                this._curTime = 1;
                cancelAnimationFrame(this._animId);
                this._cb && this._cb();
                this._stoped = true;
                console.log("%c" + this._animName + " has stoped!", "color:#16cd00");
                return false;
            }
        } else if (this._stoped && this._stopTo == Math.floor(this._frameDurning)) {
            //调用了stop 需要判断this._stoped 是否为true
            console.log("%c" + this._animName + " stop at: " + this._stopTo, "color:#16cd00");
            cancelAnimationFrame(this._animId);
            this._cb && this._cb();
            this._stoped = true;
            return false;
        }

        this._animId = requestAnimationFrame(() => this._run());
        this._frameDurning += this._fps / 60; //60是1000ms页面rerender的次数 每次render的时间间隔大概是16、17ms
        let curFrame = Math.floor(this._frameDurning);
        if (curFrame > this._totalFrame) { //下一次动画开始
            this._frameDurning = curFrame = 1;
            this._curTime += 1;
        }
        if (this._lastFrame != curFrame) { //进入到下一帧 执行回调
            //run方法具有多态性质，每个动画实例实现逻辑单独扩展
            this.run && getType(this.run) === 'Function' && this.run(curFrame);
            this._lastFrame = curFrame;
        }
    }
    /**
     * [_autoPlayFn 内部方法 canvas渲染自动播放]
     * @param {[String]} id canvas id
     */
    this._autoPlayFn = function (id) {
        let that = this;
        that._autoPlay = true; //标记自动播放
        //以canvas形式渲染
        let canvas = document.getElementById(id);
        let ctx = canvas.getContext("2d");
        let w = canvas.width,
            h = canvas.height;
        let src = canvas.getAttribute("data-src");
        let times = canvas.getAttribute("data-times");
        let stopTo = Number(canvas.getAttribute("data-stopTo")) || 0;
        let img = new Image();
        img.src = src;
        img.onload = function () {
            //给动画实例添加运动时的逻辑方法
            if (!that.run) {
                that.run = function (i) {
                    i -= 1; //i是从1开始的
                    let perCount = Math.floor(img.width / w);
                    let line = i % perCount; //第几列
                    let row = Math.floor(i / perCount); //第几行
                    ctx.clearRect(0, 0, w, h);
                    ctx.drawImage(img, w * line, h * row, w, h, 0, 0, w, h);
                }
            }
            //动画开始
            if (times === 0 || times === '0') {
                that.start().stop(stopTo, cb);
            } else if (times === '' || times < 0) {
                that.start();
            } else {
                that.start(times).thenStop(stopTo, cb);
            }
            that._started = true; //标记为开始
            that._run(); //手动调用this._run 开始动画
        }
    }

    this.init();
}
/**
 * [start 动画启动]
 * @param {[number]}  times [动画播放次数，传非true，则循环播放]
 * @param {Function} cb [播放结束，回调函数，会被stop行为的回调函数给覆盖]
 */
Anim.prototype.start = function (times, cb) {
    cb && getType(cb) === 'Function' && (this._cb = cb);
    times && (this._totleTimes = times);
    !this._autoPlay && this._run(); //如果是自动经播放不用再次执行this._run
    this._started = true;
    return this;
}
/**
 * [setFps 设置fps]
 * @param {[number]} n [要设置的fps]
 * @param {Function} cb [播放回调函数]
 */
Anim.prototype.setFps = function (n, cb) {
    if (!this._started && !this._paused || this._stoped) return this;
    if (isNaN(n) || n <= 0) {
        console.error("fps设置有误")
        return this;
    }
    console.log("设置fps: " + n)
    this._fps = n;
    cb && getType(cb) === 'Function' && cb();
    return this;
}
/**
 * [pause 暂停]
 * @param {Function} cb [暂停的回调函数]
 */
Anim.prototype.pause = function (cb) {
    if (!this._started) {
        console.log("%c" + this._animName + " 未开始 不能使用pause()", "color:red");
        return this;
    }
    if (this._stoped || this._paused) return this;
    console.log("animate pause")
    this._paused = true; //暂停标记
    this._autoPlay = false; //为了可以再次开始
    cancelAnimationFrame(this._animId);
    cb && getType(cb) === 'Function' && cb();
    return this;
}
/**
 * [play 暂停后播放]
 * @param {Function} cb [播放回调函数]
 */
Anim.prototype.play = function (cb) {
    if (this._stoped || !this._paused) return this;
    console.log("animate play");
    this._paused = false;
    this._animId = requestAnimationFrame(() => this.start(this.times));
    cb && getType(cb) === 'Function' && cb();
    return this;
}
/**
 * [thenStop 设置播放n次后停止]
 * @param {[number]} n [停止在第几帧,0代表立即停止,-1代表最后一帧]
 * @param {Function} cb [停止的回调函数]
 */
Anim.prototype.thenStop = function (n, cb) {
    this._thenStop = true;
    n = n == 0 ? Math.floor(this._frameDurning) : Number(n);
    n <= -1 && (n = Math.max(this._totalFrame + n + 1, 1));
    n && (this._stopTo = Math.min(this._totalFrame, n));
    cb && getType(cb) === 'Function' && (this._cb = cb);
}
/**
 * [stop 停止]
 * @param {[number]} n [停止在第几帧,0代表立即停止,-1代表最后一帧]
 * @param {Function} cb [停止的回调函数]
 */
Anim.prototype.stop = function (n, cb) {
    if (this._stoped) return this;
    this._stoped = true;
    n = n == 0 ? Math.floor(this._frameDurning) : Number(n);
    n <= -1 && (n = Math.max(this._totalFrame + n + 1, 1));
    n && (this._stopTo = Math.min(this._totalFrame, n));
    cb && getType(cb) === 'Function' && (this._cb = cb);
    console.log("%c" + this._animName + " will stop at: " + this._stopTo, "color:#4bbff6");

    if (Math.floor(this._frameDurning) <= this._stopTo) {
        this._totleTimes = this._curTime;
    } else { //要停止的帧数 小于当前帧 需要多播放一次动画 在下一次动画中停止
        this._totleTimes = this._curTime + 1;
    }
    if (this._paused) { //如果此时动画是暂停的 需要立即启动然后再停止
        this._animId = requestAnimationFrame(() => this.start(this.times, cb));
    }
}

window.Anim = Anim;
export default Anim;