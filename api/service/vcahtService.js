let vchatModel = require("../model/vchat")

module.exports = {

    //编写service方法时注意，需要用promise包裹住

    /**
     * 保存自己
     * @param vchatObj
     * @returns {Promise<unknown>}
     */
    save(vchatObj) {
        return new Promise((resolve, reject) => {
            console.log({...vchatObj})
            let e = new vchatModel({...vchatObj})
            e.save(function (err,doc) {
                if (err)
                    resolve(false)
                else
                    resolve(doc)
            })
        })
    }
}
