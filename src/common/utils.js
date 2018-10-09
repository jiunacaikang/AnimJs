export default {
    getType: arg => Object.prototype.toString.call(arg).slice(8, -1)
}