const mongoose = require('mongoose');
const transactionOptions = {
    readPreference: 'primary',
    readConcern: {level: 'local'},
    writeConcern: {w: 'majority'} // 写入确认级别
};



module.exports = {
    startSession() {
        return mongoose.startSession();
    },
    async withTransaction(callback) {
        let session = await mongoose.startSession();
        await session.withTransaction(callback, transactionOptions);
    }
}
