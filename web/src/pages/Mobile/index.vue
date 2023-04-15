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
                fileList: []

            }
        },
        mounted() {
            this.init()
        },
        methods: {
            /**
             * 初始化聊天记录
             */
            async init(){
                let result = await api.getMessageByPage()
                this.messages = result.data
            },
            loadMore() {
                console.log("加载更多...")
            },
           async submit(msg) {
                let sendObj = {...msg}
                sendObj.time = time.getNowDateStr();

                switch (msg.type) {
                    case "text":
                        console.log("这是一条消息:"+msg.content);
                        break;
                    default:
                        throw new Error("不支持的类型"+msg.type)
                }
                console.log("提交了..."+JSON.stringify(sendObj))
                let result = await api.sendMessage(sendObj)
                if (result.code !== 200) {
                    this.$toast.fail({
                        message:`发送失败${result.message}`
                    });
                }
            },

        }
    }
</script>

<style scoped>

</style>
