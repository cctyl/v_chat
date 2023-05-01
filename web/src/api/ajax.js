import axios from "axios";

let BASE_URL=process.env.VUE_APP_BASE_URL
import vue from "../main"

export default function ajax(url, data = {}, type = "GET") {
    return new Promise(function (resolve, reject) {
        axios({
            method: type,
            url: url,
            baseURL:BASE_URL,
            data:data,
            withCredentials:true,
            //测试用
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('code')
            }

        }).then(response => {
            if (response.data.code===20000){
                resolve(response.data)
            }else {
                vue.$toast.fail({
                    message: `发送失败：${JSON.stringify(response.data)}`,
                    closeOnClickOverlay: true
                });
                if (response.data.code === 20003 || response.data.code === 20001){
                    console.log("token过期")
                    // localStorage.removeItem("code")
                    // document.cookie = 'asiad_id_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                }
                reject(response.data)
            }

        }).catch(reason => {
            console.log("Error: ")
            console.log(reason)
            reject(reason)
        })


    })
}
