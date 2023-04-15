/*
*
* 统一响应工具类
*
* */

/**
 * 一个code 枚举，所有的code都从这里取出
 * @type {{}}
 */
let code = {
    ok: 20000,//通用成功响应
    error: 20001,// 通用失败响应
    unregistered:20002,//未登陆响应


}

function R(code,message,data) {
    //响应码
    this.code = code;
    //响应信息
    this.message = message;
    //响应数据
    this.data = data;

    /**
     * 设置响应信息
     * @param message
     */
    this.setMessage = function (message) {
        this.message = message
        return this //返回自己，形成链式调用
    }

    /**
     * 设置响应码
     * @param code
     * @returns {setCode}
     */
    this.setCode = function (code) {
        this.code = code
        return this //返回自己，形成链式调用
    }

    /**
     * 设置响应的数据
     * @param data
     * @returns {R}
     */
    this.setData = function (data) {
        this.data = data
        return this //返回自己，形成链式调用
    }


}

/**
 * 响应成功时调用的方法
 */
function ok(c = code.ok,message = "成功",data={}) {
    return new R(c,message,data);
}

/**
 * 响应成功时调用的方法
 */
function error(c = code.error,message="失败",data={}) {
    return new R(c,message,data);
}


module.exports = {
    error,
    ok,
    code
}
