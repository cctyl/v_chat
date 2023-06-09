<template>
    <div>
        <m-chat
                ref="mChat"
                :messages="messages"
                @submit="submit"
                :loadMore="loadMore"
                height="100vh"
                :config="config"
                :comment="true"
                @extendItemClick="extendItemClick"
                :imgMaxSize="204800" :videoMaxSize="204800" :fileMaxSize="204800"
        >
        </m-chat>
    </div>


</template>

<script>
    import axios from "axios";
    import api from '../../api'
    import time from "../../utils/time";
    import fileUtil from "../../utils/fileUtil";
    import ajax from "../../api/ajax";

    export default {
        name: "mobile-index",
        data() {
            return {
                config: {
                    /**
                     * 主题 'light'(亮色)|'dark'(暗色)
                     */
                    theme: 'light',
                    /**
                     * 图片上传
                     */
                    image: {
                        /**
                         * 允许的文件类型
                         */
                        accept: ['image/*']
                    },
                    /**
                     * 文件上传
                     */
                    file: {
                        accept: ['*']
                    },
                    /**
                     * 视频上传
                     */
                    video: {
                        accept: ['video/*']
                    },
                    /**
                     * 是否开启图片预览 默认true
                     */
                    isImagePreview: true,
                    /**
                     * 图片预览配置（兼容vant ImagePreview 配置）
                     */
                    imagePreviewConfig: {
                        closeable: false
                    },
                    openExtends: ['refresh','clear'],
                    /**
                     * 需额外添加的扩展面板item
                     * 如需自定义图标参考vant-icon文档 https://vant-contrib.gitee.io/vant/v2/#/zh-CN/icon#zi-ding-yi-tu-biao
                     */
                    extendArr: [
                        {
                            type: "refresh",
                            text: "刷新",
                            icon: "replay",
                            classPrefix: 'van-icon'
                        },
                        {
                            type: "clear",
                            text: "清空",
                            icon: "brush-o",
                            classPrefix: 'van-icon'
                        },
                    ]
                },
                messages: [],
                fileList: [],
                ip: "",
                page: 1,
            }
        },
        async mounted() {

            await this.getMyIp()
            this.getMessage()
        },
        methods: {
            /**
             * 发送文件回调
             * 这个file是van-upload 返回的file，并不是真正文件流
             */
            async upload(file) {
                try {
                    // 创建一个 FormData 对象
                    const formData = new FormData();
                    formData.append('file', fileUtil.dataURLtoFileFun(file.content, file.file.name))
                    // config 中的 headers 需要设置'Content-Type': 'multipart/form-data'
                    const config = {
                        headers: {'Content-Type': 'multipart/form-data'},
                    };
                    // 发起 POST 请求
                    let loadToast = this.$toast.loading({
                        message: "上传中...",
                        duration: 0
                    });
                    let rawRes = await axios.post(process.env.VUE_APP_BASE_URL + '/open/example/upload', formData, config);
                    loadToast.clear();
                    if (rawRes.data.code === 20000) {
                        this.$toast("上传成功");
                        return  rawRes.data.data;
                    } else {
                        this.$toast("上传失败")
                    }
                } catch (err) {
                    console.error(err.response.data);
                }
            },
            /**
             * 获取当前ip
             *
             */
            async getMyIp() {
                let result = await api.getMyIp();
                this.ip = result.data;
            },
            /**
             * 获取消息
             */
            async getMessage(refresh, callback) {
                let result = await api.getMessageByPage(this.page, 10)
                if (result.length === 0) {
                    return;
                }
                //初始化数据
                if (!this.messages) {
                    this.messages = []
                }
                if (refresh) {
                    //刷新数据
                    this.messages = result.data
                } else {
                    //拼接数据
                    this.messages = result.data.concat(this.messages)
                }
                this.messages = this.messages.map((item) => {
                    if (item.ip === this.ip) {
                        item.self = true
                    }
                    item.content.fileUrl =  process.env.VUE_APP_FILE_DOWN_URL + item.content.fileUrl
                    return item
                });
                if (callback) {
                    callback()
                }
            },
            async loadMore() {
                this.page++;
                // 发起 POST 请求
                let loadToast = this.$toast.loading({
                    message: "加载中...",
                    duration: 0
                });
                await this.getMessage()
                loadToast.clear();
            },
            async submit(msg) {
                let sendObj = {...msg};
                sendObj.time = time.getNowDateStr();
                sendObj.ip = this.ip;
                sendObj.content = {
                    text: "", // 文本
                    duration: "", // 时长
                    imageUrl: "", // 图片地址
                    videoUrl: "", // 视频地址
                    audioUrl: "", // 音频地址
                    fileUrl: "", // 文件地址
                    fileName: "", // 文件名称
                    fileSize: "", // 文件大小
                    fileExt: "", // 文件扩展名
                };
                sendObj.type = msg.type;
                //判断类型 text|image|audio|video|file
                let tempUrl = ''
                switch (msg.type) {
                    case "text":
                        sendObj.content.text = msg.content;
                        break;
                    case "image":
                        sendObj.content.imageUrl = await this.upload(msg.content);
                        this.setFileInfo(sendObj, msg.content);
                        break;
                    case "audio":
                        sendObj.content.audioUrl = await this.upload(msg.content);
                        this.setFileInfo(sendObj, msg.content);
                        break;
                    case "video":
                        sendObj.content.videoUrl = await this.upload(msg.content);
                        this.setFileInfo(sendObj, msg.content);
                        break;
                    case "file":
                        tempUrl = await this.upload(msg.content);
                        console.log("上传返回的url："+tempUrl);
                        sendObj.content.fileUrl = tempUrl;
                        this.setFileInfo(sendObj, msg.content);
                        break;

                    default:
                        console.error("不支持的类型" + msg.type);
                        return;
                }
                //发送请求
                let loadToast = this.loadToast();
                let result = await api.sendMessage(sendObj);
                loadToast.clear();
                if (result.code !== 20000) {
                    this.$toast.fail({
                        message: `发送失败：${result.message}`,
                        closeOnClickOverlay: true
                    });
                } else {
                    this.$toast.success({
                        message: `发送成功`,
                        closeOnClick: true,
                        duration: 500
                    });
                    result.data.self = true;
                    this.messages.push(result.data)
                }

            },
            async clearMsg(){
                let result = await api.clearAll()
                console.log(result)
            },
            loadToast() {
                return this.$toast.loading();
            },
            /**
             * 自定义面板被点击了
             */
            extendItemClick(item) {
                console.log('扩展面板item点击了', item)
                switch (item.type) {
                    case 'refresh':{
                        let loadToast = this.loadToast();
                        this.getMessage(true, () => {
                            loadToast.clear()
                        });

                        break;
                    }
                    case 'clear':
                        this.clearMsg().then(value => {
                            this.$toast.success({
                                message: `清理成功`,
                                closeOnClick: true,
                                duration: 500
                            });
                            this.getMessage(true);
                        })

                        break;
                    default:
                        console.error("未适配的类型："+item.type)
                }

                // 控制扩展面板显示和隐藏
                this.$refs.mChat.toggleExtend();
            },

            /**
             * 设置文本数据
             * @param sendObj
             * @param content
             */
            setFileInfo(sendObj, content) {
                sendObj.content.fileName = content.file.name;
                sendObj.content.fileSize = content.file.size/1024;
                sendObj.content.fileExt = content.file.name.split('.').pop();
            }
        }
    }
</script>

<style scoped>

</style>
