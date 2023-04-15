import axios from "axios";

let BASE_URL="http://100.64.0.1:8081"


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
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ2LCJpYXQiOjE2ODE1MzYwODMsImV4cCI6MTY4MjE0MDg4M30.tvewXDHqFIkAZ_UFdvkkjDhXtSgof4I2N0b-zdnbsxg"
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
