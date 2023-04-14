var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");
let path = require("path")
let moment = require("moment")
const fse = require('fs-extra')
var fs = require("fs");

/**
 * 根据模板和数据，生成docx文件，返回网络访问路径
 * @param templateFilePath 模板文件路径，public前面不需要加 /
 * @param docxData 数据对象。格式是： {key1: value1 }
 * @returns {string}
 */
function exportWord(templateFilePath, docxData = {}) {
    // 1.读取模板文件作为压缩文件
    var content = fs.readFileSync(
        templateFilePath,
        "binary"
    );
    var zip = new PizZip(content);

    //2. 生成doc对象
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    //3. 渲染数据
    doc.render(docxData);

    //4.生成数据
    var buf = doc.getZip().generate({type: "nodebuffer"});

    //5. 设置导出目录
    let dataStr = moment().format('YYYYMMDD');
    let dir = path.join("public/output/docx", dataStr)
    fse.ensureDir(dir, err => {
        if (!err) {
            console.log("目录创建成功")
        }
    })

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    //6.写入本地
    let filePath = dir + "/" + uniqueSuffix + ".docx"; //本地真实路径
    let accessPath = "/output/docx/" + dataStr + "/" + uniqueSuffix + ".docx"  //网络访问的路径

    fs.writeFileSync(filePath, buf);

    return accessPath
}

module.exports = {

    exportWord
}
