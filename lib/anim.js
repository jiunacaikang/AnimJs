/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/animationFrame.js":
/*!**************************************!*\
  !*** ./src/common/animationFrame.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀\nvar requestAnimationFrame = window.requestAnimationFrame;\nvar cancelAnimationFrame = window.cancelAnimationFrame;\n\n//通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式\nfor (var i = 0; i < _prefixes.length; i++) {\n    if (requestAnimationFrame && cancelAnimationFrame) {\n        break;\n    }\n\n    requestAnimationFrame = requestAnimationFrame || window[_prefixes[i] + 'RequestAnimationFrame'];\n    cancelAnimationFrame = cancelAnimationFrame || window[_prefixes[i] + 'CancelAnimationFrame'] || window[_prefixes[i] + 'CancelRequestAnimationFrame'];\n}\n\n//如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout\nif (!requestAnimationFrame || !cancelAnimationFrame) {\n    var _lastTime = 0;\n    requestAnimationFrame = function requestAnimationFrame(callback, element) {\n        var currTime = new Date().getTime();\n        //为了使setTimteout的尽可能的接近每秒60帧的效果\n        var timeToCall = Math.max(0, 16 - (currTime - _lastTime));\n        var id = window.setTimeout(function () {\n            callback(currTime + timeToCall);\n        }, timeToCall);\n        _lastTime = currTime + timeToCall;\n        return id;\n    };\n\n    cancelAnimationFrame = function cancelAnimationFrame(id) {\n        window.clearTimeout(id);\n    };\n}\n\n//得到兼容各浏览器的API\nwindow.requestAnimationFrame = requestAnimationFrame;\nwindow.cancelAnimationFrame = cancelAnimationFrame;\n\n//# sourceURL=webpack:///./src/common/animationFrame.js?");

/***/ }),

/***/ "./src/common/utils.js":
/*!*****************************!*\
  !*** ./src/common/utils.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar getType = exports.getType = function getType(arg) {\n    return Object.prototype.toString.call(arg).slice(8, -1);\n};\n\nvar assert = exports.assert = function assert(condition, msg) {\n    if (!condition) throw new Error(msg);\n};\n\n//# sourceURL=webpack:///./src/common/utils.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\n__webpack_require__(/*! ./common/animationFrame */ \"./src/common/animationFrame.js\");\n\nvar _utils = __webpack_require__(/*! ./common/utils */ \"./src/common/utils.js\");\n\n/**\r\n * [Anim description]\r\n * @param {[number]} total [动画帧数 构建实例必传参数]\r\n * @param {[number]} fps [动画帧率 默认为35]\r\n * @param {[String]} id [canvas id]\r\n * @param {[Function]} cb [canvas动画结束回调，只在canvas动画时有效]\r\n */\nfunction Anim(total, fps, id, cb) {\n    (0, _utils.assert)(this instanceof Anim, \"使用有误，请new实例化Anim\");\n    (0, _utils.assert)(0 < total && !isNaN(total), \"参数有误，num必传且为正整数\");\n\n    this.init = function () {\n        // ‘_’ 开头的变量 为内部变量 可访问 不能修改\n        this._totalFrame = total; //动画帧数\n        this._fps = fps || 35; //帧率\n        this._frameDurning = 1; //帧过渡变化 向下取整默认为1\n        this._lastFrame = -1; //用来判断是否执行run回调\n        this._totleTimes = undefined; //动画总次数\n        this._curTime = 1; //动画当前次数\n        this._animId && cancelAnimationFrame(this._animId);\n        this._animId = null; //动画返回id\n        this._animName = this._animName || 'anim-' + Date.now();\n        this._started = false; //动画开始\n        this._paused = false; //动画暂停\n        this._stoped = false; //动画结束\n        this._stopTo = 0; //停止在第几帧\n        this._cb = null; //停止后的回调\n        this._autoPlay = false; //自动播放\n        if (id && !this.run) {\n            //\n            try {\n                this._autoPlayFn(id);\n            } catch (e) {\n                throw new Error(e);\n            }\n        }\n        console.log(\"%c\" + this._animName + \" init\", \"color:#4bbff6\");\n        return this;\n    };\n    /**\r\n     * [_run 内部方法 动画运行时]\r\n     */\n    this._run = function () {\n        var _this = this;\n\n        if (this._curTime > this._totleTimes) {\n            //不调用stop时 停止\n            if (this._thenStop) {\n                this.stop(this._stopTo);\n            } else {\n                this._curTime = 1;\n                cancelAnimationFrame(this._animId);\n                this._cb && this._cb();\n                this._stoped = true;\n                console.log(\"%c\" + this._animName + \" has stoped!\", \"color:#16cd00\");\n                return false;\n            }\n        } else if (this._stoped && this._stopTo == Math.floor(this._frameDurning)) {\n            //调用了stop 需要判断this._stoped 是否为true\n            console.log(\"%c\" + this._animName + \" stop at: \" + this._stopTo, \"color:#16cd00\");\n            cancelAnimationFrame(this._animId);\n            this._cb && this._cb();\n            this._stoped = true;\n            return false;\n        }\n\n        this._animId = requestAnimationFrame(function () {\n            return _this._run();\n        });\n        this._frameDurning += this._fps / 60; //60是1000ms页面rerender的次数 每次render的时间间隔大概是16、17ms\n        var curFrame = Math.floor(this._frameDurning);\n        if (curFrame > this._totalFrame) {\n            //下一次动画开始\n            this._frameDurning = curFrame = 1;\n            this._curTime += 1;\n        }\n        if (this._lastFrame != curFrame) {\n            //进入到下一帧 执行回调\n            //run方法具有多态性质，每个动画实例实现逻辑单独扩展\n            this.run && (0, _utils.getType)(this.run) === 'Function' && this.run(curFrame);\n            this._lastFrame = curFrame;\n        }\n    };\n    /**\r\n     * [_autoPlayFn 内部方法 canvas渲染自动播放]\r\n     * @param {[String]} id canvas id\r\n     */\n    this._autoPlayFn = function (id) {\n        var that = this;\n        that._autoPlay = true; //标记自动播放\n        //以canvas形式渲染\n        var canvas = document.getElementById(id);\n        var ctx = canvas.getContext(\"2d\");\n        var w = canvas.width,\n            h = canvas.height;\n        var src = canvas.getAttribute(\"data-src\");\n        var times = canvas.getAttribute(\"data-times\");\n        var stopTo = Number(canvas.getAttribute(\"data-stopTo\")) || 0;\n        var img = new Image();\n        img.src = src;\n        img.onload = function () {\n            //给动画实例添加运动时的逻辑方法\n            if (!that.run) {\n                that.run = function (i) {\n                    i -= 1; //i是从1开始的\n                    var perCount = Math.floor(img.width / w);\n                    var line = i % perCount; //第几列\n                    var row = Math.floor(i / perCount); //第几行\n                    ctx.clearRect(0, 0, w, h);\n                    ctx.drawImage(img, w * line, h * row, w, h, 0, 0, w, h);\n                };\n            }\n            //动画开始\n            if (times === 0 || times === '0') {\n                that.start().stop(stopTo, cb);\n            } else if (times === '' || times < 0) {\n                that.start();\n            } else {\n                that.start(times).thenStop(stopTo, cb);\n            }\n            that._started = true; //标记为开始\n            that._run(); //手动调用this._run 开始动画\n        };\n    };\n\n    this.init();\n}\n/**\r\n * [start 动画启动]\r\n * @param {[number]}  times [动画播放次数，传非true，则循环播放]\r\n * @param {Function} cb [播放结束，回调函数，会被stop行为的回调函数给覆盖]\r\n */\nAnim.prototype.start = function (times, cb) {\n    cb && (0, _utils.getType)(cb) === 'Function' && (this._cb = cb);\n    times && (this._totleTimes = times);\n    !this._autoPlay && this._run(); //如果是自动经播放不用再次执行this._run\n    this._started = true;\n    return this;\n};\n/**\r\n * [setFps 设置fps]\r\n * @param {[number]} n [要设置的fps]\r\n * @param {Function} cb [播放回调函数]\r\n */\nAnim.prototype.setFps = function (n, cb) {\n    if (!this._started && !this._paused || this._stoped) return this;\n    if (isNaN(n) || n <= 0) {\n        console.error(\"fps设置有误\");\n        return this;\n    }\n    console.log(\"设置fps: \" + n);\n    this._fps = n;\n    cb && (0, _utils.getType)(cb) === 'Function' && cb();\n    return this;\n};\n/**\r\n * [pause 暂停]\r\n * @param {Function} cb [暂停的回调函数]\r\n */\nAnim.prototype.pause = function (cb) {\n    if (!this._started) {\n        console.log(\"%c\" + this._animName + \" 未开始 不能使用pause()\", \"color:red\");\n        return this;\n    }\n    if (this._stoped || this._paused) return this;\n    console.log(\"animate pause\");\n    this._paused = true; //暂停标记\n    this._autoPlay = false; //为了可以再次开始\n    cancelAnimationFrame(this._animId);\n    cb && (0, _utils.getType)(cb) === 'Function' && cb();\n    return this;\n};\n/**\r\n * [play 暂停后播放]\r\n * @param {Function} cb [播放回调函数]\r\n */\nAnim.prototype.play = function (cb) {\n    var _this2 = this;\n\n    if (this._stoped || !this._paused) return this;\n    console.log(\"animate play\");\n    this._paused = false;\n    this._animId = requestAnimationFrame(function () {\n        return _this2.start(_this2.times);\n    });\n    cb && (0, _utils.getType)(cb) === 'Function' && cb();\n    return this;\n};\n/**\r\n * [thenStop 设置播放n次后停止]\r\n * @param {[number]} n [停止在第几帧,0代表立即停止,-1代表最后一帧]\r\n * @param {Function} cb [停止的回调函数]\r\n */\nAnim.prototype.thenStop = function (n, cb) {\n    this._thenStop = true;\n    n = n == 0 ? Math.floor(this._frameDurning) : Number(n);\n    n <= -1 && (n = Math.max(this._totalFrame + n + 1, 1));\n    n && (this._stopTo = Math.min(this._totalFrame, n));\n    cb && (0, _utils.getType)(cb) === 'Function' && (this._cb = cb);\n};\n/**\r\n * [stop 停止]\r\n * @param {[number]} n [停止在第几帧,0代表立即停止,-1代表最后一帧]\r\n * @param {Function} cb [停止的回调函数]\r\n */\nAnim.prototype.stop = function (n, cb) {\n    var _this3 = this;\n\n    if (this._stoped) return this;\n    this._stoped = true;\n    n = n == 0 ? Math.floor(this._frameDurning) : Number(n);\n    n <= -1 && (n = Math.max(this._totalFrame + n + 1, 1));\n    n && (this._stopTo = Math.min(this._totalFrame, n));\n    cb && (0, _utils.getType)(cb) === 'Function' && (this._cb = cb);\n    console.log(\"%c\" + this._animName + \" will stop at: \" + this._stopTo, \"color:#4bbff6\");\n\n    if (Math.floor(this._frameDurning) <= this._stopTo) {\n        this._totleTimes = this._curTime;\n    } else {\n        //要停止的帧数 小于当前帧 需要多播放一次动画 在下一次动画中停止\n        this._totleTimes = this._curTime + 1;\n    }\n    if (this._paused) {\n        //如果此时动画是暂停的 需要立即启动然后再停止\n        this._animId = requestAnimationFrame(function () {\n            return _this3.start(_this3.times, cb);\n        });\n    }\n};\n\nwindow.Anim = Anim;\nexports.default = Anim;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });