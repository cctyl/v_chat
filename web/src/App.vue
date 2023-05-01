<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from "vue";
    export default {
        name: 'App',
        created() {
            let code = localStorage.getItem("code");
            if (code) {
                this.$toast(`App获得code=${code}`)
            } else {
                this.$toast.fail({
                    message: `App获取code未成功,当前url=${window.location.href}`,
                    closeOnClickOverlay: true,
                    duration: 5000
                });

                this.$destroy()
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
