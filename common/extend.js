/**
 * 方法Array.orderBy(function(item){return item.property})
 * 功能：迭代数组.
 * 参数：判断方法function(item),{item：元素} {返回值：元素的某一个属性的值}
 * 返回：为每一个元素运行参数函数，按参数提供的方法返回值进行排序.
 */
Array.prototype.orderBy = function(param){
	return this.sort((a, b) => {
		let left = param(a)
		let right = param(b) 
		if(left > right) return 1
		if(left < right) return -1
		return 0
	})
}
Array.prototype.orderByDesc = function(param){
	return this.sort((a, b) => {
		let left = param(a)
		let right = param(b) 
		if(left < right) return 1
		if(left > right) return -1
		return 0
	})
}