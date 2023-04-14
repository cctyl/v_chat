const jwt = require("../utils/jwt") //jwt生成


function main() {
    let encrypt = jwt.encrypt(12346);
    console.log(encrypt)

}

main()
