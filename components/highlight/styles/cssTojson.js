const fs = require("fs")
cssToJson()




function cssToJson(folderPath){
    if(!folderPath) folderPath = "./"
    var pa = fs.readdirSync(folderPath);
    pa.forEach(function(ele,index){
        var result = getObject(getCss(ele))
        if(result){
            if(/\.css$/.test(ele)){
                let fileName = ele.replace(/\.css$/, ".js");
                fs.writeFile(fileName, 'export default '+JSON.stringify(result, null, 2), (err) => {
                  console.log(`[${fileName}]文件已被保存`);
                });
            }
        }
    })
}

function getCss(cssPath){
    let content = ""
    try{
        content = fs.readFileSync(cssPath, "utf8")
    }catch(e){}
    return content
}

function getObject(fileContent){
    if(!fileContent) return undefined
    let result = {}
    let reg = /([\.\-a-zA-z]+[\s]{0,}[,\s\.\-a-zA-z]+[\s]{0,})\{([^\{\}]+)\}/g
    let arr = reg.exec(fileContent)
    while(arr){
        let classStr = arr[1]
        let csses = arr[2].replace(/\n/g,"")
        let classArr = classStr.split(",")
        classArr.forEach((c) => {
            let str = myTrim(c).replace(/^\./, "")
            if(str.length > 0){
                result[str] = csses
            }
        })
        arr=reg.exec(fileContent);
    }
    return result
}

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}