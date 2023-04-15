let vchatModel = require("../model/vchat")
const callback = require("../utils/callback")
const transcation = require("../utils/transcation")

module.exports = {

    //编写service方法时注意，需要用promise包裹住

    /**
     * 保存自己
     * @param vchatObj
     * @returns {Promise<unknown>}
     */
    save(vchatObj) {
        return new Promise((resolve, reject) => {
            let e = new vchatModel(vchatObj)
            e.save(callback(resolve,reject))
        })
    },
    /**
     * 分页查询
     * @param page
     * @param size
     */
    pageFind(page, size) {
        return new Promise((resolve, reject) => {
            vchatModel.find({}).skip( (page - 1) * size).limit(size*1).sort({'created':1}).exec(callback(resolve,reject))
        })
    },

    /**
     * 保存多条数据
     * @param vchatList
     * @returns {Promise<unknown>}
     */
    saveMany(vchatList){
        return new Promise(async (resolve, reject) => {
            try {
                await transcation.withTransaction(async () => {
                  await vchatModel.insertMany(vchatList)
                });
                console.log('事务已提交');
                resolve(true)
            } catch (error) {
                console.error('事务回滚', error.message);
                reject(error)
            }

        })
    }
}
