import axios from "axios";

let BASE_URL=process.env.VUE_APP_BASE_URL

let code = localStorage.getItem('code')
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
                "Authorization":"Bearer "+code
            }

        }).then(response => {
            resolve(response.data)
        }).catch(reason => {
            console.log("Error: ")
            console.log(reason)
            reject(reason)
        })


    })
}
