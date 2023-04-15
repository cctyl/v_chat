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
                messages: [
                    {
                    id: 0,
                    name: "张三",
                    content: {
                        text: "6666666666666"
                    },
                    avatar: "https://img1.imgtp.com/2022/09/19/7alL9xne.png"
                }, {
                    id: 1,
                    name: "李四",
                    content: {
                        text: "6666666666666samj科技撒啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊是卡死的科技奥科吉卡死的科技科技安神科技科技ask佳都科技看见爱上科技的"
                    },
                    self: !0,
                    avatar: "https://img1.imgtp.com/2022/09/19/7alL9xne.png"
                }, {
                    id: 3332,
                    name: "李四",
                    type: "audio",
                    content: {
                        duration: 7,
                        audioUrl: "https://common-1251804846.cos.ap-guangzhou.myqcloud.com/test.mp3"
                    },
                    self: !0,
                    avatar: "https://img1.imgtp.com/2022/09/19/7alL9xne.png"
                }, {
                    id: 33,
                    name: "王五",
                    type: "audio",
                    duration: 7,
                    content: {
                        duration: 7,
                        audioUrl: "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9vbmVkcnYtbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwvc3Rvcl9vbmVkcnZfb25taWNyb3NvZnRfY29tL0VWSUtBcWRtNnZaTm5NTjJDeWVVWVk4QkYzSm02ZnJyY0lGRDg1SlR5ZGM0WXc.mp3"
                    },
                    self: !1,
                    avatar: "https://img1.imgtp.com/2022/09/19/7alL9xne.png"
                },
                    {
                        id: 4,
                        name: "李四",
                        self: !1,
                        type: "image",
                        content: {
                            imageUrl: "https://img1.imgtp.com/2022/09/19/sJu7LhuQ.jpg"
                        },
                        avatar: "https://img1.imgtp.com/2022/09/19/7alL9xne.png"
                    }, {
                        id: 44,
                        name: "刘飞",
                        self: !1,
                        content: {
                            text: "6666"
                        },
                        avatar: "",
                        time: "2021-07-26 11:39:22"
                    }, {
                        id: 7,
                        name: "李四",
                        content: {
                            text: "21321312"
                        },
                        self: !1,
                        isCancel: !0,
                        time: "2021-07-26 11:39:22",
                        avatar: "https://img1.imgtp.com/2022/09/19/7alL9xne.png"
                    }, {
                        id: 55,
                        name: "菲菲",
                        type: "video",
                        content: {
                            videoUrl: "http://vjs.zencdn.net/v/oceans.mp4"
                        },
                        self: !0,
                        avatar: "https://img1.imgtp.com/2022/09/19/7alL9xne.png",
                        isCancel: !1,
                        time: "2021-07-26 11:39:22"
                    }, {
                        id: 66,
                        name: "菲菲",
                        type: "file",
                        content: {
                            fileUrl: "https://im.popoim.com/upload/files/202107/296102102f6747.json",
                            fileName: "奥特女战士",
                            fileSize: "200kb",
                            fileExt: "json"
                        },
                        self: !0,
                        avatar: "https://img1.imgtp.com/2022/09/19/7alL9xne.png",
                        isCancel: !1,
                        time: "2021-07-26 11:39:22"
                    }],
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
                console.log(result)
            },
            loadMore() {
                console.log("加载更多...")
            },
            submit() {
                console.log("提交了...")
            },

        }
    }
</script>

<style scoped>

</style>
