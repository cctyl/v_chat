let xlsx = require('node-xlsx')
const fs = require('fs')
const fse = require('fs-extra')

const moment = require("moment")
let path = require("path")  //路径处理模块

/**
 * 读取excel表格
 * @param fileName 文件名
 * @param sheetIndex 读取哪个sheet，默认读取第一个sheet
 */
function readExcel(fileName, sheetIndex = 0) {

    // 解析得到文档中的所有 sheet
    let sheets = xlsx.parse(fs.readFileSync(fileName));
    console.log(sheets)
    //拿到指定的表
    let sheet = sheets[sheetIndex]

    //只要表中的行，不需要表名
    let sheetDataArr = sheet.data
    return sheetDataArr
}



/**
 * 将数据写入excel（单张表）
 * 传入的数据格式应当如下，如果用上方的readExcel读取，那么格式就是这样的。
     [
         [ 'Distance', 'X', 'Y', 'Z' ],
         [ 0, 103.769807, 24.04164, 1926.778761 ],
         [ 5, 103.769831, 24.04168, 1927.116442 ],
         [ 10, 103.769854, 24.041719, 1927.449834 ],
         [ 15, 103.769878, 24.041759, 1927.77894 ],
         [ 20, 103.769901, 24.041799, 1928.103759 ],
         [ 25, 103.769924, 24.041838, 1928.42429 ],
         [ 30, 103.76994, 24.041865, 1928.639517 ]
     ]

 */
function writeExcelSingle(sheetList) {
    //1.表的模板
    let sheetObj = [
        //一个对象就是一个sheet
        {
            name: 'sheet01',
            data: sheetList
        }
    ]

    //2.数据进行缓存
    let buffer = xlsx.build(sheetObj);

    //3.生成一个文件路径
    let dataStr = moment().format('YYYYMMDD');

    //3.1 拼接成一个目录，这种方式可以帮你处理中间的斜杠
    let dir = path.join("public/output/excel", dataStr)

    //3.2 生成目录
    fse.ensureDir(dir, err => {
        if (!err) {
            console.log("目录创建成功")
        }
    })

    //3.3 定义后缀
    let extname = ".xlsx";
    //3.4 根据时间戳生成文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let filePath = dir+"/" + uniqueSuffix + extname


    fs.writeFile(filePath, buffer, err => {
        if (err) {
            console.log(err)
        } else {
            console.log("写入成功")
        }
    })

    return "/output/excel/" + dataStr +"/"+uniqueSuffix + extname

}


module.exports = {
    writeExcelSingle,
    readExcel
}