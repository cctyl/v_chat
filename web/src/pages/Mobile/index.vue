<template>

    <m-chat
            ref="mChat"
            :messages="messages"
            @submit="submit"
            :loadMore="loadMore"
            height="100vh"
            :config="config"
            :comment="true"
    >
    </m-chat>
</template>

<script>

    import api from '../../api'
    import time from "../../utils/time";

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
                         * 上传大小最大值(kb)
                         */
                        maxSize: 500,
                        /**
                         * 允许的文件类型
                         */
                        accept: ['image/*']
                    },
                    /**
                     * 文件上传
                     */
                    file: {
                        maxSize: 500,
                        accept: ['*']
                    },
                    /**
                     * 视频上传
                     */
                    video: {
                        maxSize: 500,
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
                    }
                },
                messages: [],
                fileList: [],
                ip: ""
            }
        },
        async mounted() {
            await this.getMyIp()
            this.init()
        },
        methods: {
            /**
             * 获取当前ip
             *
             */
            async getMyIp() {
                let result = await api.getMyIp()
                this.ip = result.data
            },
            /**
             * 初始化聊天记录
             */
            async init() {
                let result = await api.getMessageByPage()
                this.messages = result.data
                this.messages = result.data.map((item) => {
                    if (item.ip === this.ip) {
                        item.self = true
                    }
                    return item
                })

            },
            loadMore() {
                console.log("加载更多...")
            },
            async submit(msg) {
                let sendObj = {...msg}
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
                //判断类型
                switch (msg.type) {
                    case "text":
                        sendObj.content.text = msg.content
                        break;
                    default:
                        console.error("不支持的类型" + msg.type)
                }
                //发送请求
                let loadToast  = this.$toast.loading()
                let result = await api.sendMessage(sendObj)
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
                    result.data.self =  true;
                    this.messages.push(result.data)
                }

            },

        }
    }
</script>

<style scoped>

</style>
