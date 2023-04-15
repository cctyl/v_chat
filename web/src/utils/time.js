export default {
    getNowDateStr() {
        let now = new Date();
        let year = now.getFullYear();
        let month = ('0' + (now.getMonth() + 1)).slice(-2);
        let day = ('0' + now.getDate()).slice(-2);
        let hour = ('0' + now.getHours()).slice(-2);
        let minute = ('0' + now.getMinutes()).slice(-2);
        let second = ('0' + now.getSeconds()).slice(-2);
        let result = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        return result;
    }

}


