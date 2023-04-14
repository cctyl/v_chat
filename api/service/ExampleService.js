let exampleModel = require("../model/example")

module.exports = {

    //编写service方法时注意，需要用promise包裹住

    /**
     * 保存自己
     * @param exampleData
     * @returns {Promise<unknown>}
     */
    saveExample(exampleData) {
        return new Promise((resolve, reject) => {
            let e = new exampleModel(exampleData)

            e.save(function (err,doc) {
                if (err)
                    resolve(false)
                else
                    resolve(doc)
            })

        })
    }
}