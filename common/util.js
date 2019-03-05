function languageToColor(language){
	if(language) language = language.toLowerCase()
	let color = "#FFF"
	switch(language){
		case "css": color = '#563d7c'; break
		case "makefile": color = '#427819'; break
		case "java": color = '#b07219'; break
		case "c#": color = '#178600'; break
		case "kotlin": color = '#F18E33'; break
		case "javascript": color = '#f1e05a'; break
		case "c": color = '#555555'; break
		case "c++": color = '#f34b7d'; break
	}
	return color
}

function UTCStrToDate(utcStr){
	if(typeof utcStr != "string") return new Date()
	return new Date(Date.parse(utcStr))
}

function DateToString(date, onlyDate){
	var y = date.getFullYear();  
	var m = date.getMonth() + 1;  
	m = m < 10 ? ('0' + m) : m;  
	var d = date.getDate();  
	d = d < 10 ? ('0' + d) : d;  
	var h = date.getHours();  
	if(onlyDate){
		return y + '-' + m + '-' + d
	}
	var minute = date.getMinutes();  
	minute = minute < 10 ? ('0' + minute) : minute; 
	var second= date.getSeconds();  
	second = minute < 10 ? ('0' + second) : second;  
	return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second; 
}

function UTCStrToDateStr(utcStr){
	var date = UTCStrToDate(utcStr)
	return DateToString(date)
}

function UTCStrToDescription(utcStr){
	let date = UTCStrToDate(utcStr)
	let now = new Date()
	let msecDiff = now - date
	if (msecDiff < 0) return DateToString(date, true)
	//计算出相差天数
	var days=Math.floor(msecDiff/(24*3600*1000))
	 
	//计算出小时数

	var hoursDiff=msecDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
	var hours=Math.floor(hoursDiff/(3600*1000))
	//计算相差分钟数
	var minDiff=hoursDiff%(3600*1000)        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(minDiff/(60*1000))
	//计算相差秒数
	var secDiff=minDiff%(60*1000)      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(secDiff/1000)
	if(days > 30){
		return DateToString(date, true)
	}else if(days <= 30 && days > 0){
		return `${days}天前`
	}else if(hours > 0){
		return `${hours}小时前`
	}else if (minutes > 0){
		return `${minutes}分钟前`
	}else{
		return `${seconds}秒前`
	}
}

function parseQueryString(url) {
    var obj = {};
    var keyvalue = [];
    var key = "",
        value = "";
	url = ""+url
	var index = url.indexOf("?") + 1
	if(index < 1){
		return obj
	}
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	paraString.forEach((item) => {
		keyvalue = (""+item).split("=");
		if (keyvalue.length == 2){
			key = keyvalue[0];
			value = keyvalue[1];
			obj[key] = decodeURIComponent(value);
		}
	})
    return obj;
}

function setFileType(data){
	if(data.type == "tree"){
		data.type = "folder"
		return
	}
	if(data.type == "commit"){
		return
	}
	
	let name = data.path
	if(/^\.[^\.]+$/.test(data.path)){
		data.type = "binary"
		return
	}
	if(/\.md$/i.test(name)){
		data.type = "markup"
		return
	}
	if(/\.json$/i.test(name)){
		data.type = "binary"
		return
	}
	if(/\.(gif|jpg|jpeg|png|svg|bmp)$/i.test(name)){
		data.type = "media"
		return
	}
	
	data.type = "file"
	return
}

function getAuthorization(){
	let authorization = ""
	try{
		authorization = uni.getStorageSync('Authorization')
	}catch(e){
	}
	return authorization
}

exports.languageToColor = languageToColor
exports.UTCStrToDate = UTCStrToDate
exports.UTCStrToDateStr = UTCStrToDateStr
exports.UTCStrToDescription = UTCStrToDescription
exports.parseQueryString = parseQueryString
exports.setFileType = setFileType
exports.getAuthorization = getAuthorization