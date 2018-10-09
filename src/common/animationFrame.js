const _prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀
let requestAnimationFrame = window.requestAnimationFrame;
let cancelAnimationFrame = window.cancelAnimationFrame;

//通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for (let i = 0; i < _prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) {
        break;
    }

    requestAnimationFrame = requestAnimationFrame || window[_prefixes[i] + 'RequestAnimationFrame'];
    cancelAnimationFrame = cancelAnimationFrame || window[_prefixes[i] + 'CancelAnimationFrame'] || window[_prefixes[i] + 'CancelRequestAnimationFrame'];
}

//如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
    let _lastTime = 0;
    requestAnimationFrame = function (callback, element) {
        let currTime = new Date().getTime();
        //为了使setTimteout的尽可能的接近每秒60帧的效果
        let timeToCall = Math.max(0, 16 - (currTime - _lastTime));
        let id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        _lastTime = currTime + timeToCall;
        return id;
    };

    cancelAnimationFrame = function (id) {
        window.clearTimeout(id);
    };
}

//得到兼容各浏览器的API
window.requestAnimationFrame = requestAnimationFrame;
window.cancelAnimationFrame = cancelAnimationFrame;