
function getCallback(resolve, reject) {
    return (error, result) => {
        if (error) {
            console.log("发生异常："+error.message);
            reject(error);
        } else {
            resolve(result)
        }
    };
}

module.exports = getCallback
