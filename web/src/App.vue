<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    import vue from "./main";

    export default {
        name: 'App',
        created () {
            let code = this.$route.query.code;
            if (code){
                this.$toast(`获得code${code}`)
                localStorage.setItem('code',code)
            }else {
                this.$toast.fail({
                    message: `code未获取成功,当前url=${window.location.href}`,
                    closeOnClickOverlay: true,
                    duration: 5000
                });
            }

        }
    }
</script>

<style>
    html, body {
        height: 100%;
        width: 100%;
    }

    #app {
        height: 100%;
        width: 100%;
    }
</style>
