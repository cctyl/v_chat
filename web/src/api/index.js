/*
    该文件封装了各个请求，调用接口时无需手动输入路径，直接调用此api的方法即可

 */


import ajax from "./ajax";



export default {
    /**
     * 发送一条消息
     */
    sendMessage(vchatObj) {
        return ajax(`/auth/vchat/`, vchatObj, 'POST')
    },



    /**
     * 分页查询消息
     */
    getMessageByPage(page,size) {
        return ajax(`/auth/vchat/list?page=${page}&size=${size}`)
    },

    /**
     * 获取当前ip
     * @param page
     * @param size
     * @returns {*}
     */
    getMyIp(page,size) {
        return ajax(`/auth/vchat/getMyIp`)
    },
}
